import React from 'react';
import { Shield } from 'lucide-react';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-12 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-emerald-100 rounded-full text-emerald-600 mb-4">
            <Shield size={32} />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Privacy Policy</h1>
          <p className="text-gray-600">Last Updated: {new Date().toLocaleDateString()}</p>
        </div>

        {/* Content Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12 prose prose-emerald max-w-none">
          <h3>1. Introduction</h3>
          <p>
            Welcome to <strong>Bookish</strong>. We respect your privacy and are committed to protecting your personal data. 
            This privacy policy explains how we handle your information when you visit our website.
          </p>

          <h3>2. Information We Collect</h3>
          <p>We collect minimal data necessary to provide our services:</p>
          <ul>
            <li><strong>Voluntary Information:</strong> When you fill out our contact form or subscribe to our newsletter, we collect your Name and Email Address.</li>
            <li><strong>Technical Data:</strong> We use Google Firebase, which may collect IP addresses and usage data for security and analytics purposes.</li>
          </ul>

          <h3>3. How We Use Your Information</h3>
          <ul>
            <li><strong>Newsletter:</strong> To send you weekly updates on nature, poetry, and mindfulness. You may unsubscribe at any time.</li>
            <li><strong>Contact:</strong> To respond to your inquiries sent via our contact form.</li>
            <li><strong>Security:</strong> To protect the website from spam and abuse.</li>
          </ul>

          <h3>4. Third-Party Services</h3>
          <p>We do not sell your data. However, we use trusted third-party services to run this website:</p>
          <ul>
            <li><strong>Google Firebase:</strong> Hosting, Database, and Authentication.</li>
            <li><strong>Cloudinary:</strong> Image hosting and optimization.</li>
          </ul>

          <h3>5. Your Rights</h3>
          <p>
            You have the right to request a copy of the data we hold about you or request its deletion. 
            To exercise these rights, please contact us via our contact page.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Privacy;