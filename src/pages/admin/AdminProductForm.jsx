import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useProducts } from '../../context/ProductContext';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';
import { ArrowLeft, Save, ImageIcon, Upload, Loader2 } from 'lucide-react';
import Toast from '../../components/ui/Toast';

export default function AdminProductForm() {
  const { id } = useParams();
  const isEditing = Boolean(id);
  const navigate = useNavigate();
  const { products, categories, addProduct, updateProduct } = useProducts();

  const [form, setForm] = useState({
    name: '',
    price: '',
    originalPrice: '',
    categorySlug: categories[0]?.slug || '',
    categoryId: categories[0]?.id || '',
    image: '', // existing image URL (for edits)
    description: '',
    rating: '4.5',
    reviews: '0',
    isNew: false,
    isOnSale: false,
    file: null, // holds selected file for upload
  });

  const [errors, setErrors] = useState({});
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  // Toast notification state
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  // Load product data for editing
  useEffect(() => {
    if (isEditing) {
      const product = products.find(p => p.id === id);
      if (product) {
        setForm({
          name: product.name || '',
          price: product.price?.toString() || '',
          originalPrice: product.originalPrice?.toString() || '',
          categorySlug: product.categorySlug || '',
          categoryId: product.categoryId || '',
          image: product.image || '',
          description: product.description || '',
          rating: product.rating?.toString() || '4.5',
          reviews: product.reviews?.toString() || '0',
          isNew: product.isNew || false,
          isOnSale: product.isOnSale || false,
        });
      } else {
        navigate('/admin/products');
      }
    }
  }, [id, isEditing, products, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    // Clear error on change
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleCategoryChange = (e) => {
    const slug = e.target.value;
    const cat = categories.find(c => c.slug === slug);
    setForm(prev => ({
      ...prev,
      categorySlug: slug,
      categoryId: cat?.id || '',
    }));
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    // Validate file type
    if (!file.type.startsWith('image/')) {
      setErrors(prev => ({ ...prev, file: 'Please select an image file' }));
      return;
    }
    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setErrors(prev => ({ ...prev, file: 'Image must be less than 5MB' }));
      return;
    }
    setForm(prev => ({ ...prev, file }));
    setPreviewUrl(URL.createObjectURL(file));
    setErrors(prev => ({ ...prev, file: '' }));
  };

  // Upload to Supabase Storage
  const uploadImage = async (file) => {
    if (!isSupabaseConfigured || !file) return null;

    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `products/${fileName}`;

    const mime = file.type || 'application/octet-stream';

    // Must use upsert: false because we only set an INSERT policy, not an UPDATE policy!
    const { error } = await supabase.storage
      .from('product-images')
      .upload(filePath, file, { contentType: mime, upsert: false });

    if (error) {
      console.error('🛑 Supabase upload error:', error);
      throw error;
    }

    const { data } = supabase.storage.from('product-images').getPublicUrl(filePath);
    return data?.publicUrl ?? '';
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Product name is required';
    if (!form.price || parseFloat(form.price) <= 0) newErrors.price = 'Valid price is required';
    if (!form.categorySlug) newErrors.categorySlug = 'Category is required';
    // Require an image file for new product; allow existing image on edit
    if (!isEditing && !form.file) newErrors.file = 'Product image file is required';
    if (!form.description.trim()) newErrors.description = 'Description is required';
    if (form.isOnSale && (!form.originalPrice || parseFloat(form.originalPrice) <= parseFloat(form.price))) {
      newErrors.originalPrice = 'Original price must be higher than sale price';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setUploading(true);
    try {
      // Upload image to Supabase if one was selected
      let imageUrl = form.image;
      if (form.file) {
        const uploadedUrl = await uploadImage(form.file);
        if (uploadedUrl) imageUrl = uploadedUrl;
      }

      const productData = {
        name: form.name.trim(),
        price: parseFloat(form.price),
        originalPrice: form.isOnSale ? parseFloat(form.originalPrice) : undefined,
        categorySlug: form.categorySlug,
        categoryId: form.categoryId,
        image: imageUrl,
        description: form.description.trim(),
        rating: parseFloat(form.rating),
        reviews: parseInt(form.reviews, 10),
        isNew: form.isNew,
        isOnSale: form.isOnSale,
      };

      // After successful add/update, show toast
      if (isEditing) {
        updateProduct(id, productData);
        setToast({ show: true, message: 'Product updated successfully', type: 'success' });
      } else {
        addProduct(productData);
        setToast({ show: true, message: 'Product created successfully', type: 'success' });
      }
      navigate('/admin/products');
    } catch (err) {
      console.error('Failed to upload image:', err);
      setErrors(prev => ({ ...prev, file: 'Failed to upload image. Please try again.' }));
      setToast({ show: true, message: 'Failed to upload image. Please try again.', type: 'info' });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-3xl">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => navigate('/admin/products')}
          className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-[#101726]">
            {isEditing ? 'Edit Product' : 'Add New Product'}
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            {isEditing ? 'Update the product details below' : 'Fill in the details to create a new product'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-[#101726] mb-4">Basic Information</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Product Name *</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="e.g. Modern Velvet Sofa"
                className={`w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-[#b38947] focus:border-transparent ${errors.name ? 'border-red-300' : 'border-gray-300'}`}
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Description *</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={3}
                placeholder="Describe the product..."
                className={`w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-[#b38947] focus:border-transparent resize-none ${errors.description ? 'border-red-300' : 'border-gray-300'}`}
              />
              {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Category *</label>
              <select
                name="categorySlug"
                value={form.categorySlug}
                onChange={handleCategoryChange}
                className={`w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-[#b38947] focus:border-transparent cursor-pointer ${errors.categorySlug ? 'border-red-300' : 'border-gray-300'}`}
              >
                <option value="">Select a category</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.slug}>{cat.name}</option>
                ))}
              </select>
              {errors.categorySlug && <p className="text-red-500 text-xs mt-1">{errors.categorySlug}</p>}
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-[#101726] mb-4">Pricing</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Price ($) *</label>
              <input
                name="price"
                type="number"
                step="0.01"
                min="0"
                value={form.price}
                onChange={handleChange}
                placeholder="0.00"
                className={`w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-[#b38947] focus:border-transparent ${errors.price ? 'border-red-300' : 'border-gray-300'}`}
              />
              {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Original Price ($)</label>
              <input
                name="originalPrice"
                type="number"
                step="0.01"
                min="0"
                value={form.originalPrice}
                onChange={handleChange}
                placeholder="0.00"
                disabled={!form.isOnSale}
                className={`w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-[#b38947] focus:border-transparent disabled:bg-gray-100 disabled:text-gray-400 ${errors.originalPrice ? 'border-red-300' : 'border-gray-300'}`}
              />
              {errors.originalPrice && <p className="text-red-500 text-xs mt-1">{errors.originalPrice}</p>}
            </div>
          </div>

          <div className="flex items-center gap-6 mt-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                name="isOnSale"
                type="checkbox"
                checked={form.isOnSale}
                onChange={handleChange}
                className="w-4 h-4 accent-[#b38947] rounded"
              />
              <span className="text-sm text-gray-700">On Sale</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                name="isNew"
                type="checkbox"
                checked={form.isNew}
                onChange={handleChange}
                className="w-4 h-4 accent-[#b38947] rounded"
              />
              <span className="text-sm text-gray-700">Mark as New</span>
            </label>
          </div>
        </div>

        {/* Image */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-[#101726] mb-4">Product Image</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Upload Image {!isEditing && '*'}
            </label>
            <label
              className={`flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-xl cursor-pointer transition-colors hover:border-[#b38947] hover:bg-[#faf6ee] ${errors.file ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-gray-50'}`}
            >
              <div className="flex flex-col items-center justify-center py-4">
                <Upload className="w-8 h-8 text-gray-400 mb-2" />
                <p className="text-sm text-gray-500">
                  <span className="font-semibold text-[#b38947]">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-400 mt-1">PNG, JPG, WEBP (max 5MB)</p>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
            </label>
            {errors.file && <p className="text-red-500 text-xs mt-1">{errors.file}</p>}
          </div>
          {/* Preview */}
          {(previewUrl || form.image) && (
            <div className="mt-4">
              <p className="text-xs text-gray-500 mb-2">Preview:</p>
              <div className="relative inline-block">
                <img
                  src={previewUrl || form.image}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded-lg border border-gray-200 bg-gray-100"
                />
                {previewUrl && (
                  <button
                    type="button"
                    onClick={() => {
                      setPreviewUrl(null);
                      setForm(prev => ({ ...prev, file: null }));
                    }}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
          )}
          {!previewUrl && !form.image && (
            <div className="mt-4 w-32 h-32 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
              <ImageIcon className="w-8 h-8 text-gray-300" />
            </div>
          )}
        </div>

        {/* Rating */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-[#101726] mb-4">Rating & Reviews</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Rating (0-5)</label>
              <input
                name="rating"
                type="number"
                step="0.1"
                min="0"
                max="5"
                value={form.rating}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#b38947] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Number of Reviews</label>
              <input
                name="reviews"
                type="number"
                min="0"
                value={form.reviews}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#b38947] focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={uploading}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#b38947] text-white rounded-lg font-semibold hover:bg-[#916a2e] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {uploading ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Uploading...</>
            ) : (
              <><Save className="w-4 h-4" /> {isEditing ? 'Update Product' : 'Create Product'}</>
            )}
          </button>
          <button
            type="button"
            onClick={() => navigate('/admin/products')}
            className="px-6 py-3 rounded-lg font-semibold text-gray-600 hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
      {/* Toast notification */}
      {toast.show && (
        <Toast
          message={toast.message}
          isVisible={toast.show}
          onClose={() => setToast({ ...toast, show: false })}
          type={toast.type}
        />
      )}
    </div>
  );
}
