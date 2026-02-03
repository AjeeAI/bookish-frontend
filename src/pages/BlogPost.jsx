import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Twitter, Facebook } from 'lucide-react';
import { api } from '../services/api';

const BlogPost = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    api.getArticleById(id).then(setArticle);
  }, [id]);

  if (!article) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Cover Image */}
      <div className="h-[400px] w-full relative">
        <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
        <div className="absolute top-8 left-8">
            <Link to="/blog" className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors shadow-lg">
                <ArrowLeft size={20} className="text-gray-700" />
            </Link>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 -mt-24 relative z-10">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm">
          
          {/* Metadata */}
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
            <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full font-medium">
              {article.category}
            </span>
            <span className="flex items-center gap-1"><Calendar size={14} /> {article.date}</span>
            <span className="flex items-center gap-1"><User size={14} /> {article.author}</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            {article.title}
          </h1>

          <div className="border-l-4 border-emerald-500 pl-4 mb-8">
            <p className="text-lg text-slate-700 italic font-medium">
              {article.excerpt}
            </p>
          </div>

          <div className="prose prose-emerald max-w-none text-gray-600 leading-relaxed space-y-4 whitespace-pre-wrap">
            
              {article.content}
            
            
          </div>

          <hr className="my-8 border-gray-100" />

          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <span className="text-sm text-gray-500 mr-2">Share this post:</span>
              <button className="text-gray-400 hover:text-blue-400"><Twitter size={18} /></button>
              <button className="text-gray-400 hover:text-blue-600"><Facebook size={18} /></button>
            </div>
            <Link to="/blog" className="text-emerald-600 font-semibold text-sm hover:underline">
              Back to Blog
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default BlogPost;