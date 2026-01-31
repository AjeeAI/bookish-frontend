import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { api } from '../services/api';
import ArticleCard from '../components/ArticleCard';

const Blog = () => {
  const [articles, setArticles] = useState([]);
  const [filter, setFilter] = useState('All');
  const categories = ['All', 'Articles', 'Poems', 'Image posts', 'Stories'];

  useEffect(() => {
    api.getArticles().then(setArticles);
  }, []);

  const filteredArticles = filter === 'All' 
    ? articles 
    : articles.filter(a => a.category === filter);

  return (
    <div className="min-h-screen bg-gray-50 pt-12 pb-20">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">The Library</h1>
          <p className="text-gray-600 mb-8">
            Explore our collection of articles, stories, and poems tailored for the mindful soul.
          </p>

          {/* Search Bar */}
          <div className="relative max-w-md mx-auto mb-8">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Search for articles..." 
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
          {filteredArticles.map(article => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;