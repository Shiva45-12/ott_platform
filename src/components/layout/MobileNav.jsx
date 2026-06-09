import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Home as HomeIcon, 
  Plus, 
  Tv, 
  Trophy, 
  Clapperboard, 
  Aperture, 
  Grid, 
  Bell, 
  Download, 
  User,
  X,
  Menu,
  Crown,
  Headphones,
  Settings,
  LogOut,
  Percent
} from 'lucide-react';

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleDrawer = () => setIsOpen(!isOpen);

  // Bottom Navigation tabs (5 items)
  const bottomTabs = [
    { name: 'Home', icon: <HomeIcon className="w-5 h-5" />, path: '/' },
    { name: 'Search', icon: <Search className="w-5 h-5" />, path: '/discovery' },
    { name: 'Sports', icon: <Trophy className="w-5 h-5" />, path: '/sports' },
    { name: 'My List', icon: <Plus className="w-5 h-5" />, path: '/my-list' },
    { name: 'More', icon: <Menu className="w-5 h-5" />, action: toggleDrawer, isButton: true },
  ];

  // Drawer menu items (divided into sections for clean look)
  const drawerLinks = [
    { name: 'Originals', icon: <Crown className="w-5 h-5 text-amber-400" />, path: '/originals' },
    { name: 'TV Shows', icon: <Tv className="w-5 h-5 text-blue-400" />, path: '/tv-shows' },
    { name: 'Movies', icon: <Clapperboard className="w-5 h-5 text-purple-400" />, path: '/movies' },
    { name: 'Crunchyroll', icon: <Aperture className="w-5 h-5 text-[#f47521]" />, path: '/crunchyroll' },
    { name: 'Categories', icon: <Grid className="w-5 h-5 text-emerald-400" />, path: '/categories' },
    { name: 'Downloads', icon: <Download className="w-5 h-5 text-teal-400" />, path: '/downloads' },
    { name: 'Notifications', icon: <Bell className="w-5 h-5 text-yellow-400" />, path: '/notifications' },
  ];

  const helperLinks = [
    { name: 'Help & Support', icon: <Headphones className="w-5 h-5" />, path: '/help' },
    { name: 'Settings', icon: <Settings className="w-5 h-5" />, path: '/profile' },
  ];

  return (
    <div className="md:hidden">
      {/* ── MOBILE TOP BAR ────────────────────────────────── */}
      <header className="fixed top-0 left-0 right-0 h-14 bg-black/90 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-4 z-[90] shadow-md">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-1.5 active:scale-95 transition-transform">
          <div className="w-6.5 h-6.5 rounded-md bg-gradient-to-br from-[#ffae00] to-[#e65c00] flex items-center justify-center shadow shadow-[#ffae00]/20 flex-shrink-0">
            <svg className="w-3.5 h-3.5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
          </div>
          <span className="text-xl font-black tracking-tighter italic text-white leading-none">
            Stream<span className="text-[#ffae00]">X</span>
          </span>
        </Link>

        {/* Action Items */}
        <div className="flex items-center gap-3">
          <Link 
            to="/plans" 
            className="bg-gradient-to-r from-amber-500 to-amber-600 active:scale-95 text-black text-xs font-black px-3.5 py-1.5 rounded-lg flex items-center gap-1 shadow-lg shadow-amber-500/10 transition-all"
          >
            <Crown className="w-3 h-3 fill-black/10" /> Subscribe
          </Link>
          
          <Link 
            to="/profile" 
            className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center border border-white/20 active:scale-95 transition-transform"
          >
            <User className="w-4 h-4 text-white" />
          </Link>
        </div>
      </header>

      {/* ── MOBILE BOTTOM NAVIGATION ────────────────────────── */}
      <nav className="fixed bottom-0 left-0 right-0 h-16 bg-black/95 backdrop-blur-lg border-t border-white/5 flex items-center justify-around pb-safe z-[90] shadow-lg">
        {bottomTabs.map((tab) => {
          if (tab.isButton) {
            return (
              <button
                key={tab.name}
                onClick={tab.action}
                className={`flex flex-col items-center justify-center flex-1 h-full py-1 text-gray-400 active:text-white transition-colors`}
              >
                <div className={`transition-transform duration-200 ${isOpen ? 'rotate-90 text-primary' : ''}`}>
                  {isOpen ? <X className="w-5 h-5 text-amber-500" /> : tab.icon}
                </div>
                <span className={`text-[10px] font-bold mt-1 tracking-wider ${isOpen ? 'text-amber-500' : ''}`}>
                  {tab.name}
                </span>
              </button>
            );
          }

          const isActive = location.pathname === tab.path || (tab.path !== '/' && location.pathname.startsWith(tab.path));
          return (
            <Link
              key={tab.name}
              to={tab.path}
              className={`flex flex-col items-center justify-center flex-1 h-full py-1 transition-colors ${isActive ? 'text-[#ffae00]' : 'text-gray-400'}`}
            >
              {tab.icon}
              <span className="text-[10px] font-bold mt-1 tracking-wider">
                {tab.name}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* ── MOBILE DRAWER OVERLAY ─────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop Glow overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/85 backdrop-blur-md z-[80]"
              onClick={toggleDrawer}
            />

            {/* Sliding Content Container */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="fixed inset-y-0 left-0 w-[82%] max-w-sm bg-gradient-to-b from-[#0a0a0f] via-black to-black border-r border-white/5 z-[85] flex flex-col pt-16 pb-20 overflow-y-auto"
            >
              {/* User Session Info Card */}
              <div className="px-5 mb-6">
                <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-4 flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden border border-white/20 shadow-md">
                    <img 
                      src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80" 
                      alt="Shiva" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-white text-sm font-black truncate leading-tight">Shiva</span>
                    <span className="text-gray-400 text-[10px] font-bold mt-0.5 leading-none">+91 798xxxx930</span>
                  </div>
                  <Link 
                    to="/plans" 
                    onClick={toggleDrawer}
                    className="ml-auto bg-gradient-to-r from-[#ffae00] to-[#e65c00] text-white text-[10px] font-black px-2.5 py-1.5 rounded-lg flex items-center shadow shadow-[#ffae00]/20"
                  >
                    Go Pro
                  </Link>
                </div>
              </div>

              {/* Navigation Grid Section */}
              <div className="px-5">
                <span className="text-[10px] font-bold text-gray-500 tracking-widest uppercase block mb-3 pl-1">Navigation</span>
                <nav className="grid grid-cols-2 gap-2.5">
                  {drawerLinks.map((link) => {
                    const isActive = location.pathname === link.path;
                    return (
                      <Link
                        key={link.name}
                        to={link.path}
                        onClick={toggleDrawer}
                        className={`flex items-center gap-3 px-3.5 py-3 rounded-xl border transition-all ${isActive ? 'bg-white/[0.04] border-white/10 text-white font-bold' : 'bg-white/[0.01] border-white/5 text-gray-300 hover:text-white'}`}
                      >
                        {link.icon}
                        <span className="text-[13px] font-semibold">{link.name}</span>
                      </Link>
                    );
                  })}
                </nav>
              </div>

              {/* Extras & Settings */}
              <div className="px-5 mt-6">
                <span className="text-[10px] font-bold text-gray-500 tracking-widest uppercase block mb-3 pl-1">Extras</span>
                <div className="flex flex-col gap-2">
                  {helperLinks.map((link) => {
                    const isActive = location.pathname === link.path;
                    return (
                      <Link
                        key={link.name}
                        to={link.path}
                        onClick={toggleDrawer}
                        className={`flex items-center gap-4 px-4 py-3 rounded-xl border transition-all ${isActive ? 'bg-white/[0.04] border-white/10 text-white' : 'bg-transparent border-transparent text-gray-400 hover:text-white'}`}
                      >
                        <div className="text-gray-400">{link.icon}</div>
                        <span className="text-sm font-semibold">{link.name}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Logout Button */}
              <div className="px-5 mt-auto pt-6 border-t border-white/5">
                <Link
                  to="/login"
                  onClick={toggleDrawer}
                  className="flex items-center gap-3 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-all"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="text-sm font-bold">Sign Out</span>
                </Link>
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileNav;
