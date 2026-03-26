import React from 'react';
import { Scale } from 'lucide-react';

const Terms = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-12 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-full text-blue-600 mb-4">
            <Scale size={32} />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Terms of Service</h1>
          <p className="text-gray-600">Last Updated: {new Date().toLocaleDateString()}</p>
        </div>

        {/* Content Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12 prose prose-blue max-w-none">
          <h3>1. Acceptance of Terms</h3>
          <p>
            By accessing and using <strong>Bookish</strong>, you accept and agree to be bound by the terms and provision of this agreement.
          </p>

          <h3>2. Intellectual Property (Copyright)</h3>
          <p>
            All content published on this website, including but not limited to <strong>articles, poems, stories, and photography</strong>, 
            is the intellectual property of <strong>Bookish</strong> and its creators.
          </p>
          <ul>
            <li><strong>You may not:</strong> Copy, reproduce, republish, or distribute our content (especially photography and poetry) without explicit written permission.</li>
            <li><strong>You may:</strong> Share links to our content on social media, provided that full credit is given to Bookish.</li>
          </ul>

          <h3>3. User Conduct</h3>
          <p>
            You agree to use this website only for lawful purposes. You are prohibited from using the contact form to send spam, 
            abusive content, or malicious software.
          </p>

          <h3>4. Disclaimer</h3>
          <p>
            The content provided on Bookish (articles, mindfulness tips) is for informational and inspirational purposes only. 
            It is not intended as a substitute for professional advice. We make no representations as to the accuracy or 
            completeness of any information on this site.
          </p>

          <h3>5. Limitation of Liability</h3>
          <p>
            Bookish will not be liable for any errors or omissions in this information nor for the availability of this information.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Terms;