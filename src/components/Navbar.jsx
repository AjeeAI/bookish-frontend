import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, Leaf } from 'lucide-react'; // Removed 'Search' import

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinkClass = ({ isActive }) => 
    `text-sm font-medium transition-colors hover:text-emerald-600 ${isActive ? 'text-emerald-600' : 'text-gray-600'}`;

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600">
              <Leaf size={20} />
            </div>
            <span className="text-xl font-bold text-slate-800">Bookish</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink to="/" className={navLinkClass}>Home</NavLink>
            <NavLink to="/blog" className={navLinkClass}>Blog</NavLink>
            {/* 👇 Added Photography Link */}
            <NavLink to="/photography" className={navLinkClass}>Photography</NavLink>
            <NavLink to="/about" className={navLinkClass}>About</NavLink>
            
            <Link to="/contact">
              <button className="px-5 py-2.5 rounded-lg border-2 border-emerald-600 text-emerald-600 font-medium hover:bg-emerald-600 hover:text-white transition-all">
                Contact
              </button>
            </Link>
            
            {/* 🗑️ REMOVED Search Button here */}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 py-4 px-4 flex flex-col space-y-4">
          <NavLink to="/" onClick={() => setIsOpen(false)} className={navLinkClass}>Home</NavLink>
          <NavLink to="/blog" onClick={() => setIsOpen(false)} className={navLinkClass}>Blog</NavLink>
          {/* 👇 Added Photography Link for Mobile */}
          <NavLink to="/photography" onClick={() => setIsOpen(false)} className={navLinkClass}>Photography</NavLink>
          <NavLink to="/about" onClick={() => setIsOpen(false)} className={navLinkClass}>About</NavLink>
          <Link to="/contact" onClick={() => setIsOpen(false)} className="text-emerald-600 font-medium">Contact Us</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;