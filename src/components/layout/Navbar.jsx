import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingBag, User } from 'lucide-react';
import { FaCrown } from 'react-icons/fa';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Originals', path: '/movies' }, // Reusing routes for demo
    { name: 'Sports', path: '/series' },
    { name: 'Movies', path: '/categories' },
    { name: 'Premium', path: '/live' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-4' : 'bg-gradient-to-b from-black/60 to-transparent py-6'}`}>
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
        
        {/* Left Section: Logo & Links */}
        <div className="flex items-center gap-8">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className={`text-3xl font-black tracking-tighter italic ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
              Stream<span className="text-primary">X</span>
            </span>
          </Link>

          {/* Subscribe Button */}
          <Link to="/plans" className={`hidden md:flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold transition-all ${isScrolled ? 'bg-primary/10 text-primary hover:bg-primary/20' : 'bg-primary text-white hover:bg-primary-hover shadow-lg'}`}>
            <FaCrown className="w-4 h-4" />
            Subscribe
          </Link>

          {/* Navigation Links */}
          <div className="hidden lg:flex items-center gap-6 border-l border-gray-300/30 pl-6 ml-2">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path || (link.path !== '/' && location.pathname.startsWith(link.path));
              return (
                <Link 
                  key={link.name} 
                  to={link.path}
                  className={`text-sm font-bold tracking-wide transition-colors ${isActive ? 'text-primary' : isScrolled ? 'text-gray-600 hover:text-primary' : 'text-gray-200 hover:text-white'}`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Right Section: Icons & Login */}
        <div className="flex items-center gap-6">
          <Link to="/search" className={`transition-colors ${isScrolled ? 'text-gray-700 hover:text-primary' : 'text-white hover:text-primary'}`}>
            <Search className="w-5 h-5" />
          </Link>

          <Link to="/login" className={`flex items-center gap-2 transition-colors ${isScrolled ? 'text-gray-700 hover:text-primary' : 'text-white hover:text-primary'}`}>
            <User className="w-5 h-5" />
            <span className="hidden sm:inline font-semibold text-sm">Sign In</span>
          </Link>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
