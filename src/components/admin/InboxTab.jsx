import React, { useState } from 'react';
import { Trash2, Mail, Calendar, ChevronDown, ChevronUp } from 'lucide-react';
import { api } from '../../services/api';
// 👇 1. Import Modal
import ConfirmModal from '../ConfirmModal';

const InboxTab = ({ messages, setMessages, refreshData }) => {
  const [expandedMessageId, setExpandedMessageId] = useState(null);
  
  // 👇 2. Modal State
  const [modal, setModal] = useState({
    isOpen: false,
    type: 'danger',
    title: '',
    message: '',
    confirmText: 'Confirm',
    onConfirm: null
  });

  const toggleMessage = async (msg) => {
    if (expandedMessageId === msg.id) {
      setExpandedMessageId(null);
      return;
    }
    setExpandedMessageId(msg.id);
    if (!msg.read) {
      const updatedMessages = messages.map(m => 
        m.id === msg.id ? { ...m, read: true } : m
      );
      setMessages(updatedMessages); 
      await api.markAsRead(msg.id);
    }
  };

  // 👇 3. Helper to close modal
  const closeModal = () => setModal({ ...modal, isOpen: false });

  // 👇 4. Delete Handler with Modal
  const handleDeleteClick = (e, id) => {
    e.stopPropagation();
    setModal({
        isOpen: true,
        type: 'danger',
        title: 'Delete Message?',
        message: 'Are you sure you want to delete this message permanently?',
        confirmText: 'Delete',
        onConfirm: async () => {
            await api.deleteMessage(id);
            refreshData();
        }
    });
  };

  const getReplyLink = (msg) => {
    const subject = encodeURIComponent(`Re: ${msg.subject}`);
    const originalDate = msg.sent_at?.seconds 
      ? new Date(msg.sent_at.seconds * 1000).toLocaleDateString() 
      : 'recently';
    const body = encodeURIComponent(
      `Hi ${msg.firstName},\n\nThank you for reaching out!\n\n\n` + 
      `--------------------------------------------------\n` +
      `On ${originalDate}, you wrote:\n\n` +
      `${msg.message}`
    );
    return `mailto:${msg.email}?subject=${subject}&body=${body}`;
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return '';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="space-y-6">
        {/* 👇 5. Render Modal */}
        <ConfirmModal 
            isOpen={modal.isOpen}
            onClose={closeModal}
            onConfirm={modal.onConfirm}
            title={modal.title}
            message={modal.message}
            type={modal.type}
            confirmText={modal.confirmText}
        />

        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Mail className="text-blue-600" /> Inbox Messages
        </h2>

        {messages.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
            <Mail size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 text-lg">Your inbox is empty.</p>
            </div>
        ) : (
            <div className="grid gap-4">
            {messages.map((msg) => (
                <div 
                key={msg.id} 
                onClick={() => toggleMessage(msg)}
                className={`bg-white rounded-xl shadow-sm border transition-all cursor-pointer overflow-hidden
                    ${!msg.read ? 'border-l-4 border-l-blue-500 border-gray-200 bg-blue-50/30' : 'border-gray-200'}
                    ${expandedMessageId === msg.id ? 'ring-2 ring-blue-100' : 'hover:shadow-md'}
                `}
                >
                <div className="p-4 flex flex-col md:flex-row justify-between md:items-center gap-4">
                    <div className="flex items-center gap-3">
                    {!msg.read && <div className="w-2.5 h-2.5 rounded-full bg-blue-500 shrink-0"></div>}
                    <div>
                        <h3 className={`text-lg ${!msg.read ? 'font-bold text-gray-900' : 'font-medium text-gray-700'}`}>
                        {msg.subject}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span className="font-medium text-emerald-600">{msg.firstName} {msg.lastName}</span>
                        </div>
                    </div>
                    </div>
                    
                    <div className="flex items-center gap-4 text-gray-400 text-sm ml-6 md:ml-0">
                    <span className="flex items-center gap-1">
                        <Calendar size={14} /> {formatDate(msg.sent_at)}
                    </span>
                    {expandedMessageId === msg.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </div>
                </div>
                
                {expandedMessageId === msg.id && (
                    <div className="px-6 pb-6 pt-2 border-t border-gray-100 bg-gray-50/50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="text-sm text-gray-500 mb-4">
                        From: <span className="font-medium text-gray-700">{msg.email}</span>
                    </div>
                    <div className="bg-white rounded-lg p-4 text-gray-700 whitespace-pre-wrap leading-relaxed border border-gray-200">
                        {msg.message}
                    </div>
                    <div className="mt-4 pt-4 flex justify-end gap-3">
                        <button 
                        onClick={(e) => handleDeleteClick(e, msg.id)}
                        className="text-sm font-bold text-red-500 hover:text-red-700 flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-red-50 transition-colors"
                        >
                        <Trash2 size={16} /> Delete
                        </button>
                        <a 
                        href={getReplyLink(msg)} 
                        onClick={(e) => e.stopPropagation()}
                        className="text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 flex items-center gap-2 px-4 py-2 rounded-lg transition-colors shadow-sm"
                        >
                        <Mail size={16} /> Reply
                        </a>
                    </div>
                    </div>
                )}
                </div>
            ))}
            </div>
        )}
    </div>
  );
};

export default InboxTab;