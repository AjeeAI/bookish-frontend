import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { api } from '../services/api';
import ArticleCard from '../components/ArticleCard';

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [email, setEmail] = useState('');

  useEffect(() => {
    api.getArticles().then(allData => {
      // 👇 NEW: Filter out 'Image posts' immediately
      // Now 'articles' will ONLY contain Articles, Poems, and Stories
      const textPosts = allData.filter(post => post.category !== 'Image posts');
      setArticles(textPosts);
    });
  }, []);

  // Now this will always be the latest TEXT post (Article/Poem/Story)
  const featuredArticle = articles[0]; 

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Hero Section */}
      <section className="relative min-h-[500px] flex items-center">
        <div className="absolute inset-0 z-0">
          {/* You can keep this static image, OR use {featuredArticle?.image || "default_url"} if you want the hero to match the post */}
          <img 
            src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560" 
            alt="Forest" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50 md:bg-gradient-to-r md:from-black/70 md:to-transparent" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 w-full py-12 md:py-0">
          <div className="max-w-2xl text-white">
            <span className="inline-block px-3 py-1 mb-4 bg-emerald-500 rounded-full text-xs font-bold uppercase tracking-wider">
              Featured Post
            </span>
            
            <h1 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 leading-tight">
              {featuredArticle?.title || "The Silence of the Ancient Forest"}
            </h1>
            
            <p className="text-base md:text-lg text-gray-200 mb-6 md:mb-8 leading-relaxed line-clamp-3 md:line-clamp-4">
              {featuredArticle?.excerpt}
            </p>
            
            {/* Added check: Only show button if we actually have an ID */}
            <Link 
              to={featuredArticle ? `/blog/${featuredArticle.id}` : '/blog'}
              className="inline-flex items-center bg-white text-emerald-900 px-6 py-3 rounded-full font-semibold hover:bg-emerald-50 transition-colors"
            >
              Read Full Story <ArrowRight className="ml-2" size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Writings */}
      <section className="max-w-7xl mx-auto px-4 py-12 md:py-20">
        <div className="flex justify-between items-end mb-8 md:mb-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">Latest Writings</h2>
            <p className="text-gray-600 text-sm md:text-base">Fresh from the desk, straight to your screen.</p>
          </div>
          <Link to="/blog" className="text-emerald-600 font-medium hover:text-emerald-700 flex items-center text-sm md:text-base">
            View All <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* slice(1) still works: it skips the Featured Post and shows the next ones */}
          {articles.slice(1).map(article => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="max-w-7xl mx-auto px-4 mb-20">
        <div className="bg-[#0f4c3a] rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden">
          <div className="relative z-10 max-w-xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Stay in the Loop</h2>
            <p className="text-emerald-100 mb-8 text-sm md:text-base">
              Subscribe to our newsletter for weekly doses of nature, poetry, and mindfulness.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <input 
                type="email" 
                placeholder="Your email address" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-grow px-6 py-3 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
              <button 
                onClick={() => api.subscribeNewsletter(email)}
                className="px-8 py-3 bg-emerald-500 hover:bg-emerald-400 text-white rounded-full font-semibold transition-colors"
              >
                Subscribe
              </button>
            </div>
          </div>
          <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-teal-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 translate-x-1/2 translate-y-1/2"></div>
        </div>
      </section>

    </div>
  );
};

export default Home;