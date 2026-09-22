import React, { useState } from 'react';
import { useProducts } from '../../context/ProductContext';
import { Plus, Pencil, Trash2, FolderTree, X, Check } from 'lucide-react';

export default function AdminCategories() {
  const { categories, products, addCategory, updateCategory, deleteCategory } = useProducts();
  const [newName, setNewName] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const getProductCount = (slug) => products.filter(p => p.categorySlug === slug).length;

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newName.trim()) return;
    addCategory({ name: newName.trim() });
    setNewName('');
  };

  const handleEdit = (id) => {
    if (!editName.trim()) return;
    updateCategory(id, { name: editName.trim() });
    setEditingId(null);
    setEditName('');
  };

  const handleDelete = (id) => {
    deleteCategory(id);
    setDeleteConfirm(null);
  };

  const startEdit = (cat) => {
    setEditingId(cat.id);
    setEditName(cat.name);
  };

  return (
    <div className="max-w-2xl">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#101726]">Categories</h1>
        <p className="text-gray-500 text-sm mt-1">{categories.length} categories</p>
      </div>

      {/* Add Category Form */}
      <form onSubmit={handleAdd} className="bg-white rounded-xl border border-gray-200 p-4 mb-6 flex gap-3">
        <input
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="New category name..."
          className="flex-1 px-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#b38947] focus:border-transparent"
        />
        <button
          type="submit"
          disabled={!newName.trim()}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#b38947] text-white rounded-lg font-medium hover:bg-[#916a2e] transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus className="w-4 h-4" /> Add
        </button>
      </form>

      {/* Categories List */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {categories.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <FolderTree className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p className="font-medium">No categories yet</p>
            <p className="text-sm mt-1">Add your first category above.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {categories.map(cat => (
              <div key={cat.id} className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition-colors">
                {editingId === cat.id ? (
                  /* Edit Mode */
                  <>
                    <input
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="flex-1 px-3 py-1.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#b38947]"
                      autoFocus
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleEdit(cat.id);
                        if (e.key === 'Escape') setEditingId(null);
                      }}
                    />
                    <button
                      onClick={() => handleEdit(cat.id)}
                      className="w-8 h-8 rounded-lg bg-green-100 text-green-600 flex items-center justify-center hover:bg-green-200 transition-colors"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="w-8 h-8 rounded-lg bg-gray-100 text-gray-500 flex items-center justify-center hover:bg-gray-200 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </>
                ) : (
                  /* Display Mode */
                  <>
                    <div className="w-10 h-10 rounded-lg bg-[#f4edd6] flex items-center justify-center shrink-0">
                      <FolderTree className="w-5 h-5 text-[#b38947]" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm text-[#101726]">{cat.name}</p>
                      <p className="text-xs text-gray-400">Slug: {cat.slug}</p>
                    </div>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">
                      {getProductCount(cat.slug)} products
                    </span>
                    <button
                      onClick={() => startEdit(cat)}
                      className="w-8 h-8 rounded-lg text-[#b38947] hover:bg-[#f4edd6] flex items-center justify-center transition-colors"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    {deleteConfirm === cat.id ? (
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleDelete(cat.id)}
                          className="px-2.5 py-1 rounded-lg text-xs font-medium text-white bg-red-500 hover:bg-red-600"
                        >
                          Yes
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(null)}
                          className="px-2.5 py-1 rounded-lg text-xs font-medium text-gray-600 hover:bg-gray-100"
                        >
                          No
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setDeleteConfirm(cat.id)}
                        className="w-8 h-8 rounded-lg text-red-400 hover:bg-red-50 flex items-center justify-center transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
