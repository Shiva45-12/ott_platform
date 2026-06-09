import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Search, 
  Home, 
  Plus, 
  CheckCircle, 
  Tv, 
  Trophy, 
  Clapperboard, 
  Aperture, 
  Grid, 
  Percent, 
  Settings, 
  User,
  Download,
  Bell,
  Crown
} from 'lucide-react';

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Search', icon: <Search className="w-5 h-5" />, path: '/discovery' },
    { name: 'Home', icon: <Home className="w-5 h-5" />, path: '/' },
    { name: 'My List', icon: <Plus className="w-5 h-5" />, path: '/my-list' },
    { name: 'Originals', icon: <CheckCircle className="w-5 h-5" />, path: '/originals' },
    { name: 'TV Shows', icon: <Tv className="w-5 h-5" />, path: '/tv-shows' },
    { name: 'Sports', icon: <Trophy className="w-5 h-5" />, path: '/sports' },
    { name: 'Movies', icon: <Clapperboard className="w-5 h-5" />, path: '/movies' },
    { name: 'Crunchyroll', icon: <Aperture className="w-5 h-5" />, path: '/crunchyroll' },
    { name: 'Categories', icon: <Grid className="w-5 h-5" />, path: '/categories' },
    { name: 'Notifications', icon: <Bell className="w-5 h-5" />, path: '/notifications' },
    { name: 'Downloads', icon: <Download className="w-5 h-5" />, path: '/downloads' },
  ];

  return (
    <>
      {/* Overlay when sidebar is expanded on mobile/tablet */}
      {isExpanded && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={() => setIsExpanded(false)}
        ></div>
      )}

      {/* Sidebar Container */}
      <div 
        className={`fixed top-0 left-0 h-full bg-[#080808]/95 backdrop-blur-md border-r border-white/5 z-[100] transition-all duration-300 ease-in-out flex flex-col py-6 overflow-y-auto overflow-x-hidden scrollbar-hide hidden md:flex shadow-[4px_0_24px_rgba(0,0,0,0.8)] ${isExpanded ? 'w-64' : 'w-20'}`}
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        {/* Logo and Subscribe */}
        <div className="flex flex-col px-5 mb-8 whitespace-nowrap">
          <Link to="/" className="flex items-center gap-2 mb-6 transition-transform hover:scale-105">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#ffae00] to-[#e65c00] flex items-center justify-center shadow-lg shadow-[#ffae00]/20 flex-shrink-0">
              <svg className="w-4 h-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
            </div>
            <span className={`text-2xl font-black tracking-tighter italic text-white transition-all duration-300 ${isExpanded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}`}>
              Stream<span className="text-[#ffae00]">X</span>
            </span>
          </Link>
          
          <Link 
            to="/plans" 
            className={`bg-gradient-to-r from-[#ffae00] to-[#e65c00] text-black text-xs font-black uppercase tracking-wider py-2.5 px-4 rounded-full transition-all duration-300 w-max flex items-center gap-1.5 shadow-md shadow-[#ffae00]/10 hover:shadow-[#ffae00]/25 hover:scale-105 ${isExpanded ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none h-0 p-0 overflow-hidden mt-0'}`}
          >
            <Crown className="w-3.5 h-3.5" fill="currentColor" /> Subscribe
          </Link>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 flex flex-col gap-1.5 pr-3 pl-0 mt-4">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || (location.pathname === '/' && item.path === '/');
            return (
              <Link 
                key={item.name} 
                to={item.path}
                className={`relative flex items-center gap-5 pl-5 pr-3 py-3 rounded-r-xl transition-all duration-300 whitespace-nowrap ${isActive ? 'text-[#ffae00] font-bold bg-gradient-to-r from-[#ffae00]/10 to-transparent' : 'text-gray-300 hover:text-white font-medium hover:bg-white/5'}`}
              >
                {/* Left Gold Active Indicator line */}
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3.5px] h-6 bg-gradient-to-b from-[#ffae00] to-[#e65c00] rounded-r-full shadow-[0_0_12px_#ffae00] z-20"></div>
                )}
                
                <div className={`flex-shrink-0 transition-all duration-300 ${isActive ? 'opacity-100 text-[#ffae00] scale-110' : 'opacity-70 group-hover:opacity-100 text-gray-300 group-hover:text-white'}`}>{item.icon}</div>
                
                <span className={`text-[15px] transition-all duration-300 ${isExpanded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}`}>
                  {item.name}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Profile / Login (Bottom) */}
        <div className="px-3 mt-auto pt-6 border-t border-white/5">
          <Link 
            to="/login"
            className="flex items-center gap-4 px-2.5 py-2.5 rounded-xl transition-all duration-300 whitespace-nowrap text-gray-300 hover:text-white font-medium hover:bg-white/5 group"
          >
            <div className="flex-shrink-0 w-9 h-9 rounded-full bg-white/10 group-hover:bg-[#ffae00] flex items-center justify-center transition-all duration-300 border border-white/20">
              <User className="w-5 h-5 group-hover:text-black transition-colors" />
            </div>
            <div className={`flex flex-col min-w-0 transition-all duration-300 ${isExpanded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2 w-0 overflow-hidden'}`}>
              <span className="text-[15px] font-bold text-white leading-tight">
                Login / Register
              </span>
              <span className="text-[11px] text-gray-400 font-medium mt-0.5">
                OTP Verification
              </span>
            </div>
          </Link>
        </div>

      </div>
    </>
  );
};

export default Sidebar;
