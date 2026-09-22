const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');

const env = fs.readFileSync('.env', 'utf8').split('\n').reduce((acc, line) => {
  const [key, ...val] = line.split('=');
  if (key && val) acc[key.trim()] = val.join('=').trim().replace(/['"']/g, '');
  return acc;
}, {});

const supabaseUrl = env.REACT_APP_SUPABASE_URL;
const supabaseKey = env.REACT_APP_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const categories = [
  { name: 'Living Room', slug: 'living-room' },
  { name: 'Bedroom', slug: 'bedroom' },
  { name: 'Dining Room', slug: 'dining-room' },
  { name: 'Home Office', slug: 'home-office' },
  { name: 'Outdoor', slug: 'outdoor' },
];

const products = [
  {
    name: 'Modern Velvet Sofa',
    slug: 'modern-velvet-sofa',
    categorySlug: 'living-room',
    price: 1299.99,
    image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=800&auto=format&fit=crop',
    isNew: true,
    isOnSale: false,
    description: 'A luxurious modern velvet sofa that brings elegance to any living room.',
  },
  {
    name: 'Solid Oak Dining Table',
    slug: 'solid-oak-dining-table',
    categorySlug: 'dining-room',
    price: 899.99,
    image: 'https://images.unsplash.com/photo-1577140917170-285929fb55b7?q=80&w=800&auto=format&fit=crop',
    isNew: false,
    isOnSale: true,
    originalPrice: 1099.99,
    description: 'Beautifully crafted solid oak dining table, seats up to 8 people.',
  },
  {
    name: 'Ergonomic Office Chair',
    slug: 'ergonomic-office-chair',
    categorySlug: 'home-office',
    price: 349.99,
    image: 'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?q=80&w=800&auto=format&fit=crop',
    isNew: false,
    isOnSale: false,
    description: 'Premium ergonomic office chair with lumbar support and adjustable armrests.',
  },
  {
    name: 'Minimalist Platform Bed',
    slug: 'minimalist-platform-bed',
    categorySlug: 'bedroom',
    price: 799.99,
    image: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?q=80&w=800&auto=format&fit=crop',
    isNew: true,
    isOnSale: false,
    description: 'Sleek and modern minimalist platform bed frame made from sustainable wood.',
  },
  {
    name: 'Teak Outdoor Lounge Chair',
    slug: 'teak-outdoor-lounge-chair',
    categorySlug: 'outdoor',
    price: 459.99,
    image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=800&auto=format&fit=crop',
    isNew: false,
    isOnSale: true,
    originalPrice: 559.99,
    description: 'Weather-resistant teak outdoor lounge chair with plush waterproof cushions.',
  },
  {
    name: 'Mid-Century Armchair',
    slug: 'mid-century-armchair',
    categorySlug: 'living-room',
    price: 399.99,
    image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=800&auto=format&fit=crop',
    isNew: false,
    isOnSale: false,
    description: 'A stylish mid-century inspired armchair featuring solid wood legs and premium upholstery.',
  },
  {
    name: 'Rustic Pine Nightstand',
    slug: 'rustic-pine-nightstand',
    categorySlug: 'bedroom',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1532372320572-cda25653a26d?q=80&w=800&auto=format&fit=crop',
    isNew: false,
    isOnSale: false,
    description: 'A charming rustic pine nightstand with a single drawer and open shelf.',
  },
  {
    name: 'Industrial Bookshelf',
    slug: 'industrial-bookshelf',
    categorySlug: 'home-office',
    price: 289.99,
    image: 'https://images.unsplash.com/photo-1594620302200-9a762244a156?q=80&w=800&auto=format&fit=crop',
    isNew: true,
    isOnSale: false,
    description: 'An industrial-style bookshelf made of matte black steel and reclaimed wood.',
  }
];

async function seed() {
  console.log('Seeding Supabase Database...');

  // Seed Categories
  const catMap = {};
  for (const cat of categories) {
    const { data, error } = await supabase.from('categories').insert(cat).select().single();
    if (error) {
      console.error('Error inserting category:', cat.name, error.message);
    } else {
      catMap[cat.slug] = data.id;
      console.log('Inserted category:', cat.name);
    }
  }

  // Seed Products
  for (const prod of products) {
    const pData = {
      name: prod.name,
      slug: prod.slug,
      description: prod.description,
      price: prod.price,
      compare_at_price: prod.isOnSale ? prod.originalPrice : null,
      category_id: catMap[prod.categorySlug],
      is_featured: prod.isNew
    };

    const { data: insertedProduct, error: pError } = await supabase.from('products').insert(pData).select().single();
    if (pError) {
      console.error('Error inserting product:', prod.name, pError.message);
    } else {
      console.log('Inserted product:', prod.name);
      // Seed Image
      const { error: iError } = await supabase.from('product_images').insert({
        product_id: insertedProduct.id,
        storage_path: prod.image,
        sort_order: 0
      });
      if (iError) console.error('Error inserting image for:', prod.name, iError.message);
    }
  }

  console.log('Seeding Complete!');
}

seed();
