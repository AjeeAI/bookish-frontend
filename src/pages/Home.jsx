import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Loader } from 'lucide-react'; // 👈 Import Loader
import { api } from '../services/api';
import ArticleCard from '../components/ArticleCard';
import Skeleton from '../components/Skeleton';
import ConfirmModal from '../components/ConfirmModal'; // 👈 Import Modal

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);
  
  // 👇 1. New State for Subscription
  const [isSubscribing, setIsSubscribing] = useState(false);
  
  // 👇 2. Modal State
  const [modal, setModal] = useState({
    isOpen: false,
    type: 'success', // We will use 'success' green theme
    title: '',
    message: '',
    confirmText: 'Awesome',
    onConfirm: null
  });

  const closeModal = () => setModal({ ...modal, isOpen: false });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allData = await api.getArticles();
        const textPosts = allData.filter(post => post.category !== 'Image posts');
        setArticles(textPosts);
      } catch (error) {
        console.error("Error fetching home data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // 👇 3. Handle Subscribe Logic
 const handleSubscribe = async () => {
    if (!email || !email.includes('@')) {
      // You can use a modal here too if you prefer
      alert("Please enter a valid email address."); 
      return;
    }

    setIsSubscribing(true);
    try {
      await api.subscribeNewsletter(email);
      
      // Case A: Success (New Subscriber)
      setModal({
        isOpen: true,
        type: 'success',
        title: 'Welcome to the Family!',
        message: 'You have successfully subscribed to our newsletter. Expect monthly doses of stories in your inbox.',
        confirmText: 'Yay!',
        onConfirm: () => setEmail('')
      });
      
    } catch (error) {
      console.error(error);

      // Case B: Already Subscribed
      if (error.message === "ALREADY_SUBSCRIBED") {
        setModal({
            isOpen: true,
            type: 'success', // We keep it green because it's not a "bad" error
            title: 'Already on the list!',
            message: 'Good news – you are already subscribed to our newsletter. You won\'t miss a thing.',
            confirmText: 'Okay',
            onConfirm: () => setEmail('')
        });
      } else {
        // Case C: Real Error (Network, Firebase permission, etc)
        setModal({
            isOpen: true,
            type: 'danger', 
            title: 'Subscription Failed',
            message: 'Something went wrong. Please check your connection and try again.',
            confirmText: 'Try Again'
        });
      }
    } finally {
      setIsSubscribing(false);
    }
  };
  const featuredArticle = articles[0]; 

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* 👇 4. Render Modal */}
      <ConfirmModal 
        isOpen={modal.isOpen}
        onClose={closeModal}
        onConfirm={modal.onConfirm}
        title={modal.title}
        message={modal.message}
        type={modal.type}
        confirmText={modal.confirmText}
      />

      {/* Hero Section ... (No changes here) */}
      <section className="relative min-h-[500px] flex items-center">
         {/* ... (Keep your existing Hero code) ... */}
         {/* I'm hiding it here for brevity, paste your existing Hero code */}
         {loading ? (
            <div className="absolute inset-0 bg-gray-900 w-full h-full flex items-center px-4">
                <div className="max-w-7xl mx-auto w-full">
                    <div className="max-w-2xl">
                        <Skeleton className="h-6 w-32 mb-6 bg-gray-700 rounded-full" />
                        <Skeleton className="h-12 w-3/4 mb-4 bg-gray-700" />
                        <Skeleton className="h-12 w-1/2 mb-8 bg-gray-700" />
                        <Skeleton className="h-4 w-full mb-3 bg-gray-700" />
                        <Skeleton className="h-4 w-5/6 mb-8 bg-gray-700" />
                        <Skeleton className="h-12 w-48 rounded-full bg-gray-700" />
                    </div>
                </div>
            </div>
         ) : (
            <>
                <div className="absolute inset-0 z-0">
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
                    <Link 
                    to={featuredArticle ? `/blog/${featuredArticle.id}` : '/blog'}
                    className="inline-flex items-center bg-white text-emerald-900 px-6 py-3 rounded-full font-semibold hover:bg-emerald-50 transition-colors"
                    >
                    Read Full Story <ArrowRight className="ml-2" size={20} />
                    </Link>
                </div>
                </div>
            </>
         )}
      </section>

      {/* Latest Writings ... (No changes here) */}
      <section className="max-w-7xl mx-auto px-4 py-12 md:py-20">
         {/* ... Paste your existing Latest Writings code ... */}
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
            {loading ? (
               [...Array(3)].map((_, i) => (
                  <div key={i} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 h-full flex flex-col">
                        <Skeleton className="h-48 w-full mb-4 rounded-xl" />
                        <div className="flex gap-2 mb-3">
                            <Skeleton className="h-4 w-16 rounded-full" />
                            <Skeleton className="h-4 w-20 rounded-full" />
                        </div>
                        <Skeleton className="h-6 w-3/4 mb-2" />
                        <Skeleton className="h-4 w-full mb-2" />
                        <Skeleton className="h-4 w-2/3" />
                  </div>
               ))
            ) : (
               articles.slice(1).map(article => (
                  <ArticleCard key={article.id} article={article} />
               ))
            )}
         </div>
      </section>

      {/* 👇 5. UPDATED NEWSLETTER SECTION */}
      <section className="max-w-7xl mx-auto px-4 mb-20">
        <div className="bg-[#0f4c3a] rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden">
          <div className="relative z-10 max-w-xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Stay in the Loop</h2>
            <p className="text-emerald-100 mb-8 text-sm md:text-base">
              Subscribe to our newsletter for monthly doses of everyday storytelling.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <input 
                type="email" 
                placeholder="Your email address" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubscribing}
                className="flex-grow px-6 py-3 rounded-full text-gray-900 bg-white border-2 border-emerald-100 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent placeholder-gray-400 transition-all disabled:bg-gray-200"
              />
              <button 
                onClick={handleSubscribe} // 👈 Use the new handler
                disabled={isSubscribing}
                className="px-8 py-3 bg-emerald-500 hover:bg-emerald-400 text-white rounded-full font-semibold transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center min-w-[140px]"
              >
                {isSubscribing ? <Loader className="animate-spin" size={20} /> : 'Subscribe'}
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