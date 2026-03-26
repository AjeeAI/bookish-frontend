import React from 'react';
import { Cookie } from 'lucide-react';

const Cookies = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-12 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-amber-100 rounded-full text-amber-600 mb-4">
            <Cookie size={32} />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Cookie Policy</h1>
          <p className="text-gray-600">Last Updated: {new Date().toLocaleDateString()}</p>
        </div>

        {/* Content Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12 prose prose-amber max-w-none">
          <h3>1. What Are Cookies?</h3>
          <p>
            Cookies are small text files placed on your device to help the site provide a better user experience.
          </p>

          <h3>2. How We Use Cookies</h3>
          <p>Bookish uses cookies primarily for <strong>Functionality and Security</strong>:</p>
          <ul>
            <li><strong>Performance:</strong> We may use local storage to remember your preferences (like recent searches) to make the site faster.</li>
          </ul>

          <h3>3. Managing Cookies</h3>
          <p>
            You can choose to disable cookies through your individual browser options. However, this may affect your ability to interact 
            with certain features of our website.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Cookies;