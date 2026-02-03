import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Search } from 'lucide-react';
import { api } from '../services/api';
import ArticleCard from '../components/ArticleCard';

const Blog = () => {
  const [articles, setArticles] = useState([]);
  const [filter, setFilter] = useState('All');
  
  // 1. REMOVED 'Image posts' from this list so no button appears for it
  const categories = ['All', 'Articles', 'Poems', 'Stories'];

  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState(location.state?.initialSearch || ''); 

  useEffect(() => {
    api.getArticles().then(setArticles);
  }, []);

  // 2. NEW: Create a "Clean List" that excludes Photography
  // This ensures Image posts NEVER show up on this page, even under "All"
  const textBasedArticles = articles.filter(article => article.category !== 'Image posts');

  const filteredArticles = textBasedArticles.filter(article => {
    // Check Category (using the clean list)
    const matchesCategory = filter === 'All' || article.category === filter;

    // Check Search
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = article.title.toLowerCase().includes(searchLower) || 
                          (article.excerpt && article.excerpt.toLowerCase().includes(searchLower));

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 pt-12 pb-20">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Bookish Library</h1>
          <p className="text-gray-600 mb-8">
            Explore our collection of articles, stories, and poems tailored for the mindful soul.
          </p>

          {/* Search Bar */}
          <div className="relative max-w-md mx-auto mb-8">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Search for articles..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  filter === cat 
                    ? 'bg-[#1a1a2e] text-white shadow-lg' 
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-emerald-500 hover:text-emerald-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.length > 0 ? (
            filteredArticles.map(article => (
              <ArticleCard key={article.id} article={article} />
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500 py-12">
              No articles found matching your search.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Blog;