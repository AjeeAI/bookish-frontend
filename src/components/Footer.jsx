import React from 'react';
import { Leaf, Twitter, Facebook, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#1a1a2e] text-slate-300 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4 text-white">
              <Leaf className="text-emerald-400" size={24} />
              <span className="text-xl font-bold">Bookish</span>
            </div>
            <p className="text-sm leading-relaxed text-slate-400">
              Exploring the intersection of nature, mindfulness, and creativity. Join us on a journey through the greenest parts of the world.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Explore</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="/" className="hover:text-emerald-400 transition-colors">Home</a></li>
              <li><a href="/blog" className="hover:text-emerald-400 transition-colors">Articles</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Photography</a></li>
              <li><a href="/about" className="hover:text-emerald-400 transition-colors">About Us</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Cookie Policy</a></li>
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h3 className="text-white font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a href="#" className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center hover:bg-emerald-600 transition-colors">
                <Twitter size={16} />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center hover:bg-emerald-600 transition-colors">
                <Facebook size={16} />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center hover:bg-emerald-600 transition-colors">
                <Instagram size={16} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} Bookish. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;