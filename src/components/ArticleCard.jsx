import React from 'react';
import { Link } from 'react-router-dom';
import { User, Calendar, ArrowRight, Image as ImageIcon, BookOpen } from 'lucide-react';

const ArticleCard = ({ article }) => {

  const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { month: 'short', day: 'numeric', year: 'numeric' });
};
  // Helper to choose icon based on category
  const getIcon = (cat) => {
    if (cat.includes('Image')) return <ImageIcon size={14} />;
    return <BookOpen size={14} />;
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 flex flex-col h-full">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={article.image} 
          alt={article.title} 
          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-xs font-semibold text-emerald-700 shadow-sm">
            {getIcon(article.category)} {article.category}
          </span>
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
          <span className="flex items-center gap-1"><User size={12} /> {article.author}</span>
          <span className="flex items-center gap-1"><Calendar size={12} /> {formatDate(article.date)}</span>
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 mb-2 leading-tight">
          <Link to={`/blog/${article.id}`} className="hover:text-emerald-600 transition-colors">
            {article.title}
          </Link>
        </h3>
        
        <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-grow">
          {article.excerpt}
        </p>
        
        <Link 
          to={`/blog/${article.id}`} 
          className="inline-flex items-center text-emerald-600 font-semibold text-sm hover:gap-2 transition-all group"
        >
          Read Article <ArrowRight size={16} className="ml-1 group-hover:ml-0" />
        </Link>
      </div>
    </div>
  );
};

export default ArticleCard;