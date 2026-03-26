import React from 'react';
import { Leaf, Twitter, Instagram, Linkedin } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const Footer = () => {
  // Helper function to handle the active state styling cleanly
  const getLinkClass = ({ isActive }) => 
    `transition-colors duration-200 hover:text-emerald-400 ${
      isActive ? 'text-emerald-400 font-semibold' : 'text-slate-400'
    }`;

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
              A platform for thoughtful, readable, and engaging stories.
            </p>
          </div>

          {/* Explore Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Explore</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <NavLink to="/" className={getLinkClass}>Home</NavLink>
              </li>
              <li>
                <NavLink to="/blog" className={getLinkClass}>Articles</NavLink>
              </li>
              <li>
                <NavLink to="/photography" className={getLinkClass}>Photography</NavLink>
              </li>
              <li>
                <NavLink to="/about" className={getLinkClass}>About Us</NavLink>
              </li>
            </ul>
          </div>

          {/* Legal Links (Now with Active State) */}
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <NavLink to="/privacy-policy" className={getLinkClass}>Privacy</NavLink>
              </li>
              <li>
                <NavLink to="/terms" className={getLinkClass}>Terms</NavLink>
              </li>
              <li>
                <NavLink to="/cookies" className={getLinkClass}>Cookies</NavLink>
              </li>
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h3 className="text-white font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a href="https://x.com/AdesojiOkiki" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center hover:bg-emerald-600 transition-colors">
                <Twitter size={16} />
              </a>
              <a href="https://www.linkedin.com/in/okikiade-adesoji-b731971ab/" target='_blank' rel="noreferrer" className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center hover:bg-emerald-600 transition-colors">
                <Linkedin size={16} />
              </a>
              <a href="https://www.instagram.com/okikiadeadesoji/" target='_blank' rel="noreferrer" className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center hover:bg-emerald-600 transition-colors">
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