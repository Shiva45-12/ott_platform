import React from 'react';
import { Play } from 'lucide-react';

const FreePreview = () => {
  return (
    <div className="px-4 md:px-8 md:pl-[100px] max-w-7xl mx-auto py-16 md:py-20 border-t border-white/10">
      <div className="flex flex-col md:flex-row items-end justify-between mb-8 md:mb-10 gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-2">Free Episodes</h2>
          <p className="text-gray-400 text-base md:text-lg">Watch the first episode of our top shows for free.</p>
        </div>
        <button className="text-primary font-bold hover:underline text-sm uppercase tracking-wider hidden md:block">
          Explore More
        </button>
      </div>

      <div className="relative w-full aspect-video md:aspect-[21/9] rounded-2xl overflow-hidden group cursor-pointer bg-black shadow-xl border border-white/10">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105 opacity-80"
          style={{ backgroundImage: "url('/webseries/family_man.png')" }}
        ></div>
        
        {/* Soft Gradient Overlay (Dark) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/20 to-transparent"></div>

        {/* Center Minimal Play Button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 md:w-20 md:h-20 bg-black/60 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 group-hover:bg-primary group-hover:border-primary transition-all duration-300 shadow-lg">
            <Play className="w-6 h-6 md:w-8 md:h-8 text-white ml-1 transition-colors group-hover:text-black" fill="currentColor" />
          </div>
        </div>

        {/* Minimal Details (Bottom Left) */}
        <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full flex justify-between items-end">
          <div className="relative z-10">
            <div className="text-xs font-bold text-green-400 uppercase tracking-widest mb-2 bg-green-500/10 inline-block px-2 py-1 rounded border border-green-500/20">
              Free to watch
            </div>
            <h3 className="text-2xl md:text-4xl font-black text-white drop-shadow-lg">The Family Man</h3>
          </div>
          <div className="hidden md:block text-gray-300 text-sm font-bold bg-black/80 backdrop-blur px-3 py-1.5 rounded-md shadow-sm border border-white/10">
            S1:E1 • 45m
          </div>
        </div>
      </div>
      
      {/* Mobile only Explore More */}
      <div className="mt-6 text-center md:hidden">
        <button className="text-primary font-bold hover:underline text-sm uppercase tracking-wider">
          Explore More Free Episodes
        </button>
      </div>
    </div>
  );
};

export default FreePreview;
