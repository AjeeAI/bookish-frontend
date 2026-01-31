import React, { useState } from 'react';
import { Mail, MapPin, Phone, Twitter, Instagram } from 'lucide-react';
import { api } from '../services/api';

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    api.sendMessage(formData).then(() => {
      alert("Message sent!");
      setFormData({ firstName: '', lastName: '', email: '', subject: 'General Inquiry', message: '' });
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Get in Touch</h1>
        <p className="text-gray-600">Have a story to share or a question to ask? We'd love to hear from you.</p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Contact Info Card */}
        <div className="bg-emerald-600 text-white p-10 rounded-3xl col-span-1">
          <h2 className="text-2xl font-bold mb-8">Contact Information</h2>
          
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <Mail className="mt-1 opacity-80" />
              <div>
                <p className="font-medium">Email Us</p>
                <p className="text-emerald-100 text-sm">okikisblog@gmail.com</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <MapPin className="mt-1 opacity-80" />
              <div>
                <p className="font-medium">Location</p>
                <p className="text-emerald-100 text-sm">123 Green Valley Road,<br/>Portland, OR 97205</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Phone className="mt-1 opacity-80" />
              <div>
                <p className="font-medium">Phone</p>
                <p className="text-emerald-100 text-sm">+1 (555) 123-4567</p>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <p className="text-sm mb-4 opacity-80">Follow us on social media</p>
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 cursor-pointer transition">
                <Twitter size={18} />
              </div>
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 cursor-pointer transition">
                <Instagram size={18} />
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white p-10 rounded-3xl shadow-sm col-span-1 md:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                <input 
                  type="text" 
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Jane"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                <input 
                  type="text" 
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Doe"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-gray-50"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="jane@example.com"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-gray-50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
              <select 
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-gray-50"
              >
                <option>General Inquiry</option>
                <option>Collaboration</option>
                <option>Feedback</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
              <textarea 
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message here..."
                rows="4"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-gray-50"
              ></textarea>
            </div>

            <button type="submit" className="w-full py-4 bg-[#1a1a2e] text-white rounded-lg font-bold hover:bg-[#2a2a4e] transition-colors shadow-lg">
              Send Message
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Contact;