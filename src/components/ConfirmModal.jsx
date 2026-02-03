import React from 'react';
import { X, AlertTriangle, CheckCircle } from 'lucide-react';

const ConfirmModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  message, 
  type = 'danger', // 'danger' or 'success'
  confirmText = 'Confirm' 
}) => {
  if (!isOpen) return null;

  const isDanger = type === 'danger';

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all scale-100">
        
        {/* Header */}
        <div className={`p-6 flex items-start gap-4 ${isDanger ? 'bg-red-50' : 'bg-emerald-50'}`}>
          <div className={`p-3 rounded-full shrink-0 ${isDanger ? 'bg-red-100 text-red-600' : 'bg-emerald-100 text-emerald-600'}`}>
            {isDanger ? <AlertTriangle size={24} /> : <CheckCircle size={24} />}
          </div>
          <div className="flex-1">
            <h3 className={`text-lg font-bold ${isDanger ? 'text-red-900' : 'text-emerald-900'}`}>
              {title}
            </h3>
            <p className={`mt-1 text-sm ${isDanger ? 'text-red-700' : 'text-emerald-700'}`}>
              {message}
            </p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Footer / Actions */}
        <div className="p-4 bg-gray-50 flex justify-end gap-3 border-t border-gray-100">
          {/* Only show Cancel button if it's a Danger action (like Delete) */}
          {isDanger && (
            <button 
              onClick={onClose}
              className="px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Cancel
            </button>
          )}
          
          <button 
            onClick={() => {
              if (onConfirm) onConfirm();
              onClose();
            }}
            className={`px-6 py-2 text-sm font-bold text-white rounded-lg shadow-md transition-all
              ${isDanger 
                ? 'bg-red-600 hover:bg-red-700 shadow-red-200' 
                : 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-200'
              }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;