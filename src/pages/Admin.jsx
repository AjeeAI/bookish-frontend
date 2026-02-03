import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { FileText, Mail } from 'lucide-react';
import ArticlesTab from '../components/admin/ArticlesTab';
import InboxTab from '../components/admin/InboxTab';

const Admin = () => {
  const navigate = useNavigate();
  
  // Data State
  const [activeTab, setActiveTab] = useState('articles');
  const [articles, setArticles] = useState([]);
  const [messages, setMessages] = useState([]);

  // Auth Check & Load Data
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
    loadData();
  }, [navigate]);

  const loadData = async () => {
    const fetchedArticles = await api.getArticles();
    setArticles(fetchedArticles);
    
    const fetchedMessages = await api.getMessages();
    setMessages(fetchedMessages);
  };

  const unreadCount = messages.filter(m => !m.read).length;

  return (
    <div className="max-w-full mx-auto px-4 py-12 min-h-screen bg-gray-50">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <div className="flex gap-4 items-center">
          <button onClick={() => {localStorage.clear(); navigate('/login')}} className="text-red-600 font-medium hover:text-red-800">
            Logout
          </button>
        </div>
      </div>

      {/* TABS SWITCHER */}
      <div className="flex space-x-2 bg-white p-1 rounded-xl shadow-sm border border-gray-200 mb-8 w-fit mx-auto md:mx-0">
        <button
          onClick={() => setActiveTab('articles')}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
            activeTab === 'articles' ? 'bg-emerald-100 text-emerald-800 shadow-sm' : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <FileText size={20} />
          Articles ({articles.length})
        </button>
        
        <button
          onClick={() => setActiveTab('inbox')}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
            activeTab === 'inbox' ? 'bg-blue-100 text-blue-800 shadow-sm' : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <Mail size={20} />
          Inbox
          {unreadCount > 0 && (
            <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full animate-pulse">
              {unreadCount}
            </span>
          )}
        </button>
      </div>

      {/* RENDER ACTIVE TAB */}
      {activeTab === 'articles' ? (
        <ArticlesTab articles={articles} refreshData={loadData} />
      ) : (
        <InboxTab messages={messages} setMessages={setMessages} refreshData={loadData} />
      )}

    </div>
  );
};

export default Admin;