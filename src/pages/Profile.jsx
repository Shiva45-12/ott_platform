import React, { useState } from 'react';
import { 
  User, Lock, Zap, Tv, Settings, Headphones, 
  Percent, MessageCircle, LogOut, CheckCircle, 
  Plus, Pencil, Info, Crown 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const Profile = () => {
  const [toastMessage, setToastMessage] = useState('');

  const handleCardClick = (id, title) => {
    if (id === 'signout') {
      // Redirect to login
      window.location.href = '/login';
    } else {
      setToastMessage(`${title} configuration coming soon!`);
      setTimeout(() => setToastMessage(''), 2500);
    }
  };

  const settingsCards = [
    {
      id: 'parental',
      title: 'Parental Control',
      desc: 'View, change or reset pin',
      icon: <Lock className="w-6 h-6 text-white" />
    },
    {
      id: 'account',
      title: 'My Account',
      desc: 'Personal details, subscription & parental controls',
      icon: <User className="w-6 h-6 text-white" />
    },
    {
      id: 'supercoins',
      title: 'Flipkart Supercoins',
      desc: 'Use SuperCoins to subscribe StreamX',
      icon: <Zap className="w-6 h-6 text-white" />
    },
    {
      id: 'tv',
      title: 'Activate TV',
      desc: 'Connect and manage TV settings',
      icon: <Tv className="w-6 h-6 text-white" />
    },
    {
      id: 'settings',
      title: 'Settings',
      desc: 'Video quality, streaming, & subtitles',
      icon: <Settings className="w-6 h-6 text-white" />
    },
    {
      id: 'contact',
      title: 'Contact Us',
      desc: 'Report an issue with us',
      icon: <Headphones className="w-6 h-6 text-white" />
    },
    {
      id: 'offer',
      title: 'Activate Offer',
      desc: 'Redeem and active your coupon codes',
      icon: <Percent className="w-6 h-6 text-white" />
    },
    {
      id: 'chat',
      title: 'Chat with us',
      desc: 'Chat via WhatsApp to report an issue',
      icon: <MessageCircle className="w-6 h-6 text-white" />
    },
    {
      id: 'signout',
      title: 'Sign Out',
      desc: 'Version: 3.6.66',
      icon: <LogOut className="w-6 h-6 text-white" />
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white pb-20 pl-4 md:pl-24 pr-4 md:pr-12 pt-6 select-none">
      
      {/* ── HEADER SECTION ─────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10 mt-2">
        <div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white flex items-center gap-3">
            Profile & Settings
          </h1>
        </div>
        <div className="flex flex-col items-start sm:items-end gap-1.5">
          <span className="border border-red-500/30 bg-red-500/10 text-red-500 rounded-full px-3.5 py-1 text-[11px] font-bold tracking-wide">
            No active subscription
          </span>
          <span className="text-gray-400 text-xs sm:text-sm font-semibold tracking-wider">
            +91 798xxxx930
          </span>
        </div>
      </div>

      {/* ── TWO COLUMN GRID ─────────────────────────────────── */}
      <div className="flex flex-col xl:flex-row gap-12 items-start w-full">
        
        {/* LEFT COLUMN: Manage Profile */}
        <div className="w-full xl:w-[38%] flex-shrink-0">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-white tracking-wide">
              Manage Profile
            </h2>
            <button 
              onClick={() => {
                setToastMessage('Edit profile mode activated');
                setTimeout(() => setToastMessage(''), 2500);
              }}
              className="text-gray-400 hover:text-white text-sm font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Pencil className="w-4 h-4" /> Edit Profile
            </button>
          </div>

          {/* Profile Circle Grid */}
          <div className="grid grid-cols-4 gap-y-6 gap-x-4 mb-8">
            
            {/* Active Profile Shiva */}
            <div className="flex flex-col items-center group cursor-pointer">
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-white/20 group-hover:border-white transition-all mb-2 shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80" 
                  alt="Shiva" 
                  className="w-full h-full object-cover"
                />
                {/* Active Check Circle Badge */}
                <div className="absolute bottom-0 right-0 w-5 h-5 bg-white rounded-full flex items-center justify-center border border-black shadow-md">
                  <CheckCircle className="w-4 h-4 text-emerald-600 fill-emerald-600/10" />
                </div>
              </div>
              <span className="text-white text-xs font-bold tracking-wide mt-1 group-hover:text-primary transition-colors">
                Shiva
              </span>
            </div>

            {/* Dash slots */}
            {Array.from({ length: 4 }).map((_, i) => (
              <div 
                key={i} 
                onClick={() => {
                  setToastMessage('Create new profile module opened');
                  setTimeout(() => setToastMessage(''), 2500);
                }}
                className="flex flex-col items-center group cursor-pointer"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-dashed border-zinc-700 bg-zinc-900/50 hover:bg-zinc-800/50 flex items-center justify-center transition-all mb-2">
                  <Plus className="w-6 h-6 text-zinc-500 group-hover:text-white transition-colors" />
                </div>
                <span className="text-zinc-500 text-[11px] font-semibold tracking-wide text-center mt-1 group-hover:text-zinc-300 transition-colors">
                  Add Profile
                </span>
              </div>
            ))}

          </div>

          {/* Subscription Banner */}
          <div className="bg-zinc-900/70 border border-zinc-800 rounded-2xl p-5 flex items-center justify-between gap-4 mt-10">
            <div className="flex items-center gap-3">
              <Info className="w-5 h-5 text-zinc-400 flex-shrink-0" />
              <span className="text-white text-sm font-bold">No active subscription</span>
            </div>
            <Link 
              to="/plans"
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black text-xs font-black px-4 py-2.5 rounded-xl flex items-center gap-1.5 shadow-lg shadow-amber-500/10 transition-all active:scale-95"
            >
              <Crown className="w-3.5 h-3.5 fill-black/10" /> Subscribe now
            </Link>
          </div>
        </div>

        {/* VERTICAL DIVIDER LINE */}
        <div className="hidden xl:block w-[1px] bg-zinc-900 self-stretch min-h-[480px]" />

        {/* RIGHT COLUMN: Settings Options Grid */}
        <div className="flex-1 w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {settingsCards.map((card) => (
              <div 
                key={card.id}
                onClick={() => handleCardClick(card.id, card.title)}
                className="bg-transparent border border-zinc-900 hover:border-zinc-800 hover:bg-white/[0.015] rounded-2xl p-6 flex flex-col items-center justify-center text-center transition-all duration-200 cursor-pointer group min-h-[140px]"
              >
                <div className="mb-3 group-hover:scale-105 transition-transform duration-200">
                  {card.icon}
                </div>
                <h3 className="text-white font-bold text-sm mb-1.5 group-hover:text-primary transition-colors">
                  {card.title}
                </h3>
                <p className="text-zinc-500 text-[11px] font-medium leading-relaxed px-2">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* TOAST SYSTEM */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed bottom-10 right-10 z-50 bg-zinc-900 border border-white/10 text-white text-xs font-semibold px-5 py-3 rounded-xl shadow-2xl flex items-center gap-2.5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Profile;
