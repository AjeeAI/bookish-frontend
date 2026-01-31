import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { Trash2, Edit, X } from 'lucide-react';

const Admin = () => {
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const [editId, setEditId] = useState(null); // Track which ID we are editing
  
  const [form, setForm] = useState({
    title: '', excerpt: '', content: '', cover_image_url: '', category_id: 1
  });

  // Helper to map Category Names back to IDs
  const categoryMap = {
    "Articles": 1,
    "Poems": 2,
    "Image posts": 3,
    "Stories": 4
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) navigate("/login");
    loadArticles();
  }, []);

  const loadArticles = () => api.getArticles().then(setArticles);

  // --- 1. POPULATE FORM FOR EDITING ---
  const handleEdit = (article) => {
    setEditId(article.id);
    setForm({
      title: article.title,
      excerpt: article.excerpt || "", // Handle null excerpts
      content: article.content,
      cover_image_url: article.image || "", // Note: API returns 'image', form needs 'cover_image_url'
      category_id: categoryMap[article.category] || 1
    });
    // Scroll to top to show form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // --- 2. CANCEL EDIT MODE ---
  const cancelEdit = () => {
    setEditId(null);
    setForm({ title: '', excerpt: '', content: '', cover_image_url: '', category_id: 1 });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        // --- UPDATE EXISTING ---
        await api.updateArticle(editId, form);
        alert("Article Updated Successfully!");
        setEditId(null); // Exit edit mode
      } else {
        // --- CREATE NEW ---
        await api.createArticle(form);
        alert("Article Published!");
      }
      
      // Reset Form & Reload
      setForm({ title: '', excerpt: '', content: '', cover_image_url: '', category_id: 1 });
      loadArticles();
      
    } catch (error) {
      console.error(error);
      alert("Error saving article. Please try again.");
    }
  };

  const handleDelete = async (id) => {
    if(window.confirm("Delete this post?")) {
      await api.deleteArticle(id);
      loadArticles();
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <button onClick={() => {localStorage.clear(); navigate('/')}} className="text-red-500 font-medium">
          Logout
        </button>
      </div>

      {/* --- EDITOR FORM --- */}
      <div className={`p-6 rounded-xl shadow-sm mb-12 border transition-colors duration-300 ${editId ? 'bg-amber-50 border-amber-200' : 'bg-white border-gray-100'}`}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            {editId ? `Editing Post #${editId}` : 'Write New Article'}
          </h2>
          {editId && (
            <button onClick={cancelEdit} className="text-gray-500 flex items-center gap-1 text-sm hover:text-gray-700">
              <X size={16}/> Cancel Edit
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input 
              placeholder="Title" className="border p-2 rounded focus:ring-2 focus:ring-emerald-500 outline-none" required 
              value={form.title} onChange={e => setForm({...form, title: e.target.value})} 
            />
            <input 
              placeholder="Image URL" className="border p-2 rounded focus:ring-2 focus:ring-emerald-500 outline-none" required 
              value={form.cover_image_url} onChange={e => setForm({...form, cover_image_url: e.target.value})} 
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
             <select 
                className="border p-2 rounded focus:ring-2 focus:ring-emerald-500 outline-none" 
                value={form.category_id} onChange={e => setForm({...form, category_id: parseInt(e.target.value)})}
             >
                <option value={1}>Articles</option>
                <option value={2}>Poems</option>
                <option value={3}>Image posts</option>
                <option value={4}>Stories</option>
             </select>
             <input 
                placeholder="Excerpt (Short Summary)" className="border p-2 rounded focus:ring-2 focus:ring-emerald-500 outline-none" required 
                value={form.excerpt} onChange={e => setForm({...form, excerpt: e.target.value})} 
             />
          </div>
          <textarea 
            placeholder="Full Content..." rows="6" className="border p-2 rounded w-full focus:ring-2 focus:ring-emerald-500 outline-none" required 
            value={form.content} onChange={e => setForm({...form, content: e.target.value})}
          ></textarea>
          
          <button 
            type="submit" 
            className={`px-6 py-2 rounded font-bold text-white transition-colors ${editId ? 'bg-amber-600 hover:bg-amber-700' : 'bg-emerald-600 hover:bg-emerald-700'}`}
          >
            {editId ? 'Update Post' : 'Publish Post'}
          </button>
        </form>
      </div>

      {/* --- MANAGE POSTS LIST --- */}
      <h2 className="text-xl font-semibold mb-4">Manage Posts</h2>
      <div className="grid gap-4">
        {articles.map(article => (
          <div key={article.id} className="flex justify-between items-center bg-white p-4 rounded shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div>
                <h3 className="font-bold text-gray-800">{article.title}</h3>
                <p className="text-sm text-gray-500">{article.date} | <span className="text-emerald-600">{article.category}</span></p>
            </div>
            
            <div className="flex gap-2">
              {/* EDIT BUTTON */}
              <button 
                onClick={() => handleEdit(article)} 
                className="text-blue-500 hover:bg-blue-50 p-2 rounded transition-colors"
                title="Edit Post"
              >
                <Edit size={18}/>
              </button>
              
              {/* DELETE BUTTON */}
              <button 
                onClick={() => handleDelete(article.id)} 
                className="text-red-500 hover:bg-red-50 p-2 rounded transition-colors"
                title="Delete Post"
              >
                <Trash2 size={18}/>
              </button>
            </div>
          </div>
        ))}
        {articles.length === 0 && <p className="text-gray-500">No articles found.</p>}
      </div>
    </div>
  );
};

export default Admin;