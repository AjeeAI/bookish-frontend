import React, { useState } from 'react';
import { Trash2, Edit, X, Image as ImageIcon, Loader, Plus, Link as LinkIcon, UploadCloud } from 'lucide-react';
import { api } from '../../services/api';
import ConfirmModal from '../ConfirmModal'; // 👈 Import the Modal

const ArticlesTab = ({ articles, refreshData }) => {
  const [editId, setEditId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Image States
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploadMode, setUploadMode] = useState('file'); // 'file' or 'url'

  // Modal State
  const [modal, setModal] = useState({
    isOpen: false,
    type: 'danger', 
    title: '',
    message: '',
    confirmText: 'Confirm',
    onConfirm: null
  });

  const [form, setForm] = useState({
    title: '', excerpt: '', content: '', image: '', category: 'Articles'
  });

  // Check if Image Post
  const isImagePost = form.category === 'Image posts';

  // --- MODAL HELPERS ---
  const closeModal = () => setModal({ ...modal, isOpen: false });

  // --- HANDLERS ---
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      setForm({ ...form, image: '' });
    }
  };

  const handleUrlChange = (e) => {
    let url = e.target.value;
    // Google Drive Link Auto-Fix
    if (url.includes('drive.google.com') && url.includes('/d/')) {
      const idMatch = url.match(/\/d\/(.*?)\//);
      if (idMatch && idMatch[1]) {
        url = `https://lh3.googleusercontent.com/d/${idMatch[1]}`;
      }
    }
    setForm({ ...form, image: url });
    setImagePreview(url); 
    setImageFile(null);   
  };

  const clearImage = () => {
    setImageFile(null);
    setImagePreview(null);
    setForm({ ...form, image: '' });
  };

  const handleEdit = (article) => {
    setEditId(article.id);
    setForm({
      title: article.title,
      excerpt: article.excerpt || "",
      content: article.content,
      image: article.image || "",
      category: article.category || "Articles"
    });
    
    if (article.image) {
      setImagePreview(article.image);
      setUploadMode('url'); 
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEdit = () => {
    setEditId(null);
    setForm({ title: '', excerpt: '', content: '', image: '', category: 'Articles' });
    setImageFile(null);
    setImagePreview(null);
    setUploadMode('file');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      let finalImageUrl = form.image;
      
      if (uploadMode === 'file' && imageFile) {
        finalImageUrl = await api.uploadImage(imageFile);
      } else if (uploadMode === 'url' && form.image) {
         // Even if it's a link, we pass it to api to handle (if you added the Cloudinary fetch logic)
         // Or it just passes through if you kept the simple version.
         finalImageUrl = await api.uploadImage(form.image);
      }

      const articleData = {
        ...form,
        image: finalImageUrl,
        ...(!editId && { created_at: new Date() }) 
      };

      if (editId) {
        await api.updateArticle(editId, articleData);
        // Success Modal
        setModal({
            isOpen: true,
            type: 'success',
            title: 'Success!',
            message: 'Your article has been updated successfully.',
            confirmText: 'Awesome',
            onConfirm: cancelEdit
        });
      } else {
        await api.createArticle(articleData);
        // Success Modal
        setModal({
            isOpen: true,
            type: 'success',
            title: 'Published!',
            message: 'Your new post is live on the website.',
            confirmText: 'Great',
            onConfirm: cancelEdit
        });
      }
      refreshData();
    } catch (error) {
      console.error(error);
      alert("Error saving article.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete Handler with Modal
  const handleDeleteClick = (id) => {
    setModal({
      isOpen: true,
      type: 'danger',
      title: 'Delete Post?',
      message: 'This action cannot be undone. Are you sure you want to remove this post?',
      confirmText: 'Yes, Delete',
      onConfirm: async () => {
        await api.deleteArticle(id);
        refreshData();
      }
    });
  };

  return (
    <>
      {/* RENDER MODAL */}
      <ConfirmModal 
        isOpen={modal.isOpen}
        onClose={closeModal}
        onConfirm={modal.onConfirm}
        title={modal.title}
        message={modal.message}
        type={modal.type}
        confirmText={modal.confirmText}
      />

      {/* EDITOR FORM */}
      <div className={`p-8 rounded-2xl shadow-sm mb-12 border transition-colors duration-300 ${editId ? 'bg-amber-50 border-amber-200' : 'bg-white border-gray-100'}`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            {editId ? <Edit size={24} className="text-amber-600"/> : <Plus size={24} className="text-emerald-600"/>}
            {editId ? `Editing Post` : 'Write New Article'}
          </h2>
          {editId && (
            <button onClick={cancelEdit} className="text-gray-500 flex items-center gap-1 text-sm hover:text-gray-700 bg-white px-3 py-1 rounded-full border">
              <X size={16}/> Cancel Edit
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-2">Title</label>
              <input 
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 outline-none" 
                required 
                value={form.title} 
                onChange={e => setForm({...form, title: e.target.value})} 
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Category</label>
              <select 
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 outline-none bg-white"
                value={form.category} 
                onChange={e => setForm({...form, category: e.target.value})}
              >
                <option value="Articles">Articles</option>
                <option value="Poems">Poems</option>
                <option value="Stories">Stories</option>
                <option value="Image posts">Image posts</option>
              </select>
            </div>
          </div>

          {/* IMAGE SECTION */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-bold text-gray-700">Cover Image</label>
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button 
                  type="button"
                  onClick={() => setUploadMode('file')}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${uploadMode === 'file' ? 'bg-white shadow-sm text-emerald-600' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  <UploadCloud size={14} className="inline mr-1"/> Upload
                </button>
                <button 
                  type="button"
                  onClick={() => setUploadMode('url')}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${uploadMode === 'url' ? 'bg-white shadow-sm text-emerald-600' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  <LinkIcon size={14} className="inline mr-1"/> Link
                </button>
              </div>
            </div>

            {imagePreview ? (
              <div className="relative w-full h-64 bg-gray-100 rounded-lg overflow-hidden border border-gray-200 group">
                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button type="button" onClick={clearImage} className="bg-red-500 text-white px-4 py-2 rounded-full font-bold shadow-lg flex items-center gap-2">
                    <Trash2 size={16} /> Remove
                  </button>
                </div>
              </div>
            ) : (
              <>
                {uploadMode === 'file' ? (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-emerald-500 hover:bg-emerald-50 transition-all cursor-pointer relative">
                    <input type="file" accept="image/*" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                    <div className="flex flex-col items-center">
                      <div className="bg-emerald-100 p-3 rounded-full mb-3"><ImageIcon className="text-emerald-600" size={24} /></div>
                      <span className="text-gray-900 font-medium">Click to upload image</span>
                      <span className="text-gray-400 text-xs mt-1">SVG, PNG, JPG or GIF</span>
                    </div>
                  </div>
                ) : (
                  <div className="relative">
                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                       <LinkIcon className="text-gray-400" size={18} />
                     </div>
                     <input 
                       type="text"
                       placeholder="https://drive.google.com/..."
                       className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 outline-none"
                       value={form.image}
                       onChange={handleUrlChange}
                     />
                  </div>
                )}
              </>
            )}
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Excerpt {isImagePost ? '(Optional)' : ''}
            </label>
            <input 
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 outline-none" 
              required={!isImagePost} 
              value={form.excerpt} 
              onChange={e => setForm({...form, excerpt: e.target.value})} 
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Content {isImagePost ? '(Optional)' : ''}
            </label>
            <textarea 
              rows="12" 
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 outline-none whitespace-pre-wrap" 
              required={!isImagePost}
              value={form.content} 
              onChange={e => setForm({...form, content: e.target.value})}
            ></textarea>
          </div>
          
          <button 
            type="submit" 
            disabled={isSubmitting}
            className={`w-full py-4 rounded-xl font-bold text-white shadow-lg flex justify-center items-center gap-2 transition-all 
              ${editId ? 'bg-amber-600 hover:bg-amber-700' : 'bg-emerald-600 hover:bg-emerald-700'}`}
          >
            {isSubmitting ? <Loader className="animate-spin" /> : (editId ? 'Update Post' : 'Publish Post')}
          </button>
        </form>
      </div>

      {/* ARTICLE LIST */}
      <div className="grid gap-4">
        {articles.map(article => (
          <div key={article.id} className="group bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all flex justify-between items-center">
            <div className="flex gap-4 items-center">
                <div className="w-16 h-16 rounded-lg bg-gray-100 overflow-hidden shrink-0">
                  {article.image ? <img src={article.image} alt="" className="w-full h-full object-cover" /> : <div className="flex items-center justify-center h-full"><ImageIcon size={20} className="text-gray-300"/></div>}
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 text-lg line-clamp-1">{article.title}</h3>
                  <div className="flex gap-2 text-sm text-gray-500 mt-1">
                    <span className="bg-gray-100 px-2 py-0.5 rounded text-xs uppercase">{article.category}</span>
                    <span>• {new Date(article.created_at?.toDate ? article.created_at.toDate() : article.created_at).toLocaleDateString()}</span>
                  </div>
                </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleEdit(article)} className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg"><Edit size={20}/></button>
              <button onClick={() => handleDeleteClick(article.id)} className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg"><Trash2 size={20}/></button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ArticlesTab;