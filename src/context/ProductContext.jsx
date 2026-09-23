import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { products as seedProducts } from '../data/products';
import { categories as seedCategories } from '../data/categories';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

const ProductContext = createContext();

const PRODUCTS_KEY = 'lionn_products';
const CATEGORIES_KEY = 'lionn_categories';

export function ProductProvider({ children }) {
  const [products, setProducts] = useState(() => {
    try {
      const stored = localStorage.getItem(PRODUCTS_KEY);
      return stored ? JSON.parse(stored) : seedProducts;
    } catch {
      return seedProducts;
    }
  });
  
  const [categories, setCategories] = useState(() => {
    try {
      const stored = localStorage.getItem(CATEGORIES_KEY);
      return stored ? JSON.parse(stored) : seedCategories;
    } catch {
      return seedCategories;
    }
  });
  
  const [isLoading, setIsLoading] = useState(true);

  // Load initial data
  useEffect(() => {
    async function loadData() {
      if (isSupabaseConfigured) {
        try {
          // Fetch categories
          const { data: catData, error: catError } = await supabase
            .from('categories')
            .select('*');
          
          if (catError) throw catError;

          // Fetch products with their images and category relationships
          const { data: prodData, error: prodError } = await supabase
            .from('products')
            .select(`
              *,
              categories (slug),
              product_images (storage_path)
            `);
            
          if (prodError) throw prodError;

          // Map Supabase schema to Frontend schema
          if (catData && prodData) {
            setCategories(catData);
            
            const mappedProducts = prodData.map(p => ({
              id: p.id,
              name: p.name,
              slug: p.slug,
              price: p.price,
              originalPrice: p.compare_at_price || undefined,
              categoryId: p.category_id,
              categorySlug: p.categories?.slug || '',
              description: p.description,
              image: p.product_images?.[0]?.storage_path || 'https://via.placeholder.com/400',
              // Defaulting rating/reviews/flags since they aren't in the base schema natively
              rating: 4.5,
              reviews: Math.floor(Math.random() * 100),
              isNew: p.is_featured,
              isOnSale: (p.compare_at_price && p.compare_at_price > p.price) ? true : false,
            }));
            
            setProducts(mappedProducts);
            setIsLoading(false);
            return; // Successfully loaded from Supabase, exit
          }
        } catch (err) {
          console.error('Supabase fetch failed, falling back to localStorage:', err);
          // Fall through to localStorage if Supabase fails (e.g. invalid keys or schema)
        }
      }

      // LocalStorage Fallback
      try {
        const storedProducts = localStorage.getItem(PRODUCTS_KEY);
        const storedCategories = localStorage.getItem(CATEGORIES_KEY);
        setProducts(storedProducts ? JSON.parse(storedProducts) : seedProducts);
        setCategories(storedCategories ? JSON.parse(storedCategories) : seedCategories);
      } catch {
        setProducts(seedProducts);
        setCategories(seedCategories);
      }
      setIsLoading(false);
    }

    loadData();
  }, []);

  // Persist to localStorage whenever data changes (acts as an offline backup)
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
      localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
    }
  }, [products, categories, isLoading]);

  // ── Product CRUD ──
  const addProduct = useCallback(async (product) => {
    // 1. Prepare frontend object
    const newProduct = {
      ...product,
      id: isSupabaseConfigured ? undefined : 'p' + Date.now(), // Supabase generates UUIDs
      slug: product.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
    };

    if (isSupabaseConfigured) {
      try {
        // Find category ID based on slug
        const cat = categories.find(c => c.slug === product.categorySlug);
        
        // Insert product
        const { data: pData, error: pError } = await supabase
          .from('products')
          .insert({
            name: product.name,
            slug: newProduct.slug,
            description: product.description,
            price: product.price,
            compare_at_price: product.originalPrice || null,
            category_id: cat?.id || null,
            is_featured: product.isNew || false,
          })
          .select()
          .single();

        if (pError) throw pError;

        // Insert image
        if (product.image) {
          await supabase.from('product_images').insert({
            product_id: pData.id,
            storage_path: product.image,
            sort_order: 0
          });
        }

        newProduct.id = pData.id;
      } catch (err) {
        console.error('Failed to add product to Supabase:', err);
        alert('Failed to save to database. Product saved locally.');
      }
    }

    setProducts(prev => [...prev, newProduct]);
    return newProduct;
  }, [categories]);

  const updateProduct = useCallback(async (id, updates) => {
    const newSlug = updates.name ? updates.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') : undefined;

    if (isSupabaseConfigured) {
      try {
        const cat = updates.categorySlug ? categories.find(c => c.slug === updates.categorySlug) : undefined;
        
        const dbUpdates = {
          ...(updates.name && { name: updates.name, slug: newSlug }),
          ...(updates.description !== undefined && { description: updates.description }),
          ...(updates.price !== undefined && { price: updates.price }),
          ...(updates.originalPrice !== undefined && { compare_at_price: updates.originalPrice }),
          ...(cat && { category_id: cat.id }),
          ...(updates.isNew !== undefined && { is_featured: updates.isNew }),
        };

        if (Object.keys(dbUpdates).length > 0) {
          const { error } = await supabase.from('products').update(dbUpdates).eq('id', id);
          if (error) throw error;
        }

        if (updates.image !== undefined) {
          // Upsert logic for image would go here for a robust app
          // For now we attempt a simple insert/update
          await supabase.from('product_images').update({ storage_path: updates.image }).eq('product_id', id);
        }
      } catch (err) {
        console.error('Failed to update product in Supabase:', err);
      }
    }

    setProducts(prev =>
      prev.map(p => {
        if (p.id === id) {
          return { ...p, ...updates, slug: newSlug || p.slug };
        }
        return p;
      })
    );
  }, [categories]);

  const deleteProduct = useCallback(async (id) => {
    // Optimistically update UI
    const previousProducts = products;
    setProducts(prev => prev.filter(p => p.id !== id));
    if (isSupabaseConfigured) {
      try {
        // Delete related images first
        await supabase.from('product_images').delete().eq('product_id', id);
        // Then delete the product
        await supabase.from('products').delete().eq('id', id);
      } catch (err) {
        console.error('Failed to delete product in Supabase:', err);
        // Revert UI if deletion fails
        setProducts(previousProducts);
      }
    }
  }, [products]);

  // ── Category CRUD ──
  const addCategory = useCallback(async (category) => {
    const slug = category.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    let newId = 'c' + Date.now();

    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.from('categories').insert({
          name: category.name,
          slug: slug,
        }).select().single();
        
        if (error) throw error;
        newId = data.id;
      } catch (err) {
        console.error('Failed to add category to Supabase:', err);
      }
    }

    const newCategory = { ...category, id: newId, slug };
    setCategories(prev => [...prev, newCategory]);
    return newCategory;
  }, []);

  const updateCategory = useCallback(async (id, updates) => {
    const newSlug = updates.name ? updates.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') : undefined;

    if (isSupabaseConfigured) {
      try {
        const { error } = await supabase.from('categories').update({
          ...(updates.name && { name: updates.name, slug: newSlug })
        }).eq('id', id);
        if (error) throw error;
      } catch (err) {
        console.error('Failed to update category in Supabase:', err);
      }
    }

    setCategories(prev =>
      prev.map(c => {
        if (c.id === id) {
          return { ...c, ...updates, slug: newSlug || c.slug };
        }
        return c;
      })
    );
  }, []);

  const deleteCategory = useCallback(async (id) => {
    if (isSupabaseConfigured) {
      try {
        await supabase.from('categories').delete().eq('id', id);
      } catch (err) {
        console.error('Failed to delete category in Supabase:', err);
      }
    }
    setCategories(prev => prev.filter(c => c.id !== id));
  }, []);

  const resetToDefaults = useCallback(() => {
    setProducts(seedProducts);
    setCategories(seedCategories);
  }, []);

  const value = {
    products,
    categories,
    isLoading,
    addProduct,
    updateProduct,
    deleteProduct,
    addCategory,
    updateCategory,
    deleteCategory,
    resetToDefaults,
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
}
