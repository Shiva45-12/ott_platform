import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaApple, FaGooglePlay, FaCheck } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#050505] pt-16 pb-6 mt-auto border-t border-white/5 relative overflow-hidden">
      
      {/* Subtle Background Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 lg:gap-8 mb-16">
          
          {/* Brand & Intro (Takes up 2 columns on large screens) */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-6">
               <div className="flex flex-col items-start justify-center p-2 bg-[#050505] rounded-xl shadow-lg shadow-[#ffae00]/5">
                  <span className="text-3xl font-black tracking-tighter italic text-white drop-shadow-md leading-none">
                    Stream<span className="text-[#ffae00]">X</span>
                  </span>
               </div>
            </Link>
            <p className="text-gray-400 text-sm mb-8 leading-relaxed font-medium max-w-sm">
              Your ultimate destination for premium entertainment. Stream blockbuster movies, exclusive web series, live sports, and original content across multiple languages, anywhere, anytime.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-4 mb-8">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-300 hover:bg-[#1877F2] hover:text-white transition-all shadow-sm">
                <FaFacebookF className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-300 hover:bg-[#1DA1F2] hover:text-white transition-all shadow-sm">
                <FaTwitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-300 hover:bg-[#E4405F] hover:text-white transition-all shadow-sm">
                <FaInstagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-300 hover:bg-[#FF0000] hover:text-white transition-all shadow-sm">
                <FaYoutube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links Column 1: Explore */}
          <div>
            <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest opacity-80">Explore</h4>
            <ul className="flex flex-col gap-3.5 text-gray-400 text-sm font-medium">
              <li><Link to="/movies" className="hover:text-white transition-colors flex items-center gap-2"><span className="text-primary text-xs">▪</span> Movies</Link></li>
              <li><Link to="/tv-shows" className="hover:text-white transition-colors flex items-center gap-2"><span className="text-primary text-xs">▪</span> TV Shows</Link></li>
              <li><Link to="/sports" className="hover:text-white transition-colors flex items-center gap-2"><span className="text-primary text-xs">▪</span> Live Sports</Link></li>
              <li><Link to="/crunchyroll" className="hover:text-white transition-colors flex items-center gap-2"><span className="text-primary text-xs">▪</span> Anime (Crunchyroll)</Link></li>
              <li><Link to="/originals" className="hover:text-white transition-colors flex items-center gap-2"><span className="text-primary text-xs">▪</span> StreamX Originals</Link></li>
              <li><Link to="/categories" className="hover:text-white transition-colors flex items-center gap-2"><span className="text-primary text-xs">▪</span> Categories</Link></li>
            </ul>
          </div>

          {/* Quick Links Column 2: Company */}
          <div>
            <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest opacity-80">Company</h4>
            <ul className="flex flex-col gap-3.5 text-gray-400 text-sm font-medium">
              <li><Link to="/" className="hover:text-white transition-colors flex items-center gap-2"><span className="text-[#ffae00] text-xs">▪</span> About StreamX</Link></li>
              <li><Link to="/plans" className="hover:text-white transition-colors flex items-center gap-2"><span className="text-[#ffae00] text-xs">▪</span> Plans & Pricing</Link></li>
              <li><Link to="/faq" className="hover:text-white transition-colors flex items-center gap-2"><span className="text-[#ffae00] text-xs">▪</span> FAQ & Help</Link></li>
              <li><Link to="/help" className="hover:text-white transition-colors flex items-center gap-2"><span className="text-[#ffae00] text-xs">▪</span> Help & Support</Link></li>
              <li><Link to="/terms" className="hover:text-white transition-colors flex items-center gap-2"><span className="text-[#ffae00] text-xs">▪</span> Terms of Use</Link></li>
              <li><Link to="/privacy" className="hover:text-white transition-colors flex items-center gap-2"><span className="text-[#ffae00] text-xs">▪</span> Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Quick Links Column 3: Account */}
          <div>
            <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest opacity-80">Account</h4>
            <ul className="flex flex-col gap-3.5 text-gray-400 text-sm font-medium">
              <li><Link to="/profile" className="hover:text-white transition-colors flex items-center gap-2"><span className="text-[#ffae00] text-xs">▪</span> Profile Settings</Link></li>
              <li><Link to="/my-list" className="hover:text-white transition-colors flex items-center gap-2"><span className="text-[#ffae00] text-xs">▪</span> My Watchlist</Link></li>
              <li><Link to="/downloads" className="hover:text-white transition-colors flex items-center gap-2"><span className="text-[#ffae00] text-xs">▪</span> Offline Downloads</Link></li>
              <li><Link to="/notifications" className="hover:text-white transition-colors flex items-center gap-2"><span className="text-[#ffae00] text-xs">▪</span> Notifications</Link></li>
              <li><Link to="/login" className="hover:text-white transition-colors flex items-center gap-2"><span className="text-[#ffae00] text-xs">▪</span> Login / Register</Link></li>
            </ul>
          </div>

          {/* App Download Column */}
          <div>
            <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest opacity-80">Experience App</h4>
            
            <div className="flex flex-col gap-4">
              <a href="#" className="flex items-center gap-3 bg-[#111] hover:bg-[#222] border border-white/10 rounded-lg px-4 py-2.5 transition-all w-full md:w-max min-w-[160px]">
                <FaGooglePlay className="w-6 h-6 text-gray-300" />
                <div className="flex flex-col">
                  <span className="text-[9px] text-gray-400 uppercase font-semibold leading-none mb-1">Get it on</span>
                  <span className="text-sm font-bold text-white leading-none">Google Play</span>
                </div>
              </a>
              
              <a href="#" className="flex items-center gap-3 bg-[#111] hover:bg-[#222] border border-white/10 rounded-lg px-4 py-2.5 transition-all w-full md:w-max min-w-[160px]">
                <FaApple className="w-6 h-6 text-gray-300" />
                <div className="flex flex-col">
                  <span className="text-[9px] text-gray-400 uppercase font-semibold leading-none mb-1">Download on the</span>
                  <span className="text-sm font-bold text-white leading-none">App Store</span>
                </div>
              </a>
            </div>
          </div>
          
        </div>

        {/* Support & Legal Links */}
        <div className="border-t border-white/5 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-6 gap-y-2 text-xs font-semibold text-gray-500">
            <Link to="/terms" className="hover:text-gray-300 transition-colors">Terms of Use</Link>
            <Link to="/privacy" className="hover:text-gray-300 transition-colors">Privacy Policy</Link>
            <Link to="/faq" className="hover:text-gray-300 transition-colors">FAQ</Link>
            <Link to="/help" className="hover:text-gray-300 transition-colors">Help Center</Link>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-xs font-semibold text-gray-600">Supported Devices</span>
            <div className="flex gap-2">
              <div className="w-8 h-5 bg-white/5 rounded border border-white/5 flex items-center justify-center text-[10px] font-bold text-gray-500">TV</div>
              <div className="w-8 h-5 bg-white/5 rounded border border-white/5 flex items-center justify-center text-[10px] font-bold text-gray-500">PC</div>
              <div className="w-8 h-5 bg-white/5 rounded border border-white/5 flex items-center justify-center text-[10px] font-bold text-gray-500">IOS</div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center pt-6 pb-2 border-t border-white/5 text-xs text-gray-600 font-medium">
          <p>&copy; {new Date().getFullYear()} StreamX Entertainment Network. All Rights Reserved.</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
