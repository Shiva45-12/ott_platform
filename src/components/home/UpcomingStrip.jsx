import React, { useRef } from 'react';
import { ChevronRight, ChevronLeft, Play } from 'lucide-react';

const UpcomingStrip = ({ title, items }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = direction === 'left' ? -current.offsetWidth + 100 : current.offsetWidth - 100;
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="mb-8 md:mb-12 relative group z-10 hover:z-50 transition-all duration-300">
      <h2 className="text-xl md:text-2xl font-extrabold text-white mb-4 px-6 md:px-14 lg:px-16 flex items-center gap-2 cursor-pointer hover:text-gray-300 transition-colors w-max">
        {title} <ChevronRight className="w-5 h-5 mt-1" strokeWidth={3} />
      </h2>
      
      <div className="relative">
        {/* Left Scroll Button */}
        <button 
          onClick={() => scroll('left')}
          className="absolute left-6 md:left-14 lg:left-16 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/80 text-white flex items-center justify-center rounded-full z-10 opacity-0 group-hover:opacity-100 transition-all border border-white/20 hidden md:flex"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Scrollable Container */}
        <div 
          ref={scrollRef}
          className="flex gap-4 md:gap-5 overflow-x-auto scrollbar-hide py-4 scroll-smooth w-full snap-x"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {/* Spacer for Sidebar */}
          <div className="flex-none w-6 md:w-14 lg:w-16"></div>
          
          {items.map((item, index) => (
            <div 
              key={index} 
              className="relative flex-none w-36 md:w-48 lg:w-[200px] aspect-[2/3] snap-start group/card cursor-pointer rounded-lg overflow-hidden border border-white/10 hover:scale-105 transition-transform duration-300"
            >
              <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
              
              {/* Play Button Overlay (always visible in upcoming like the screenshot) */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center group-hover/card:bg-primary transition-colors duration-300 shadow-xl">
                  <Play className="w-4 h-4 md:w-5 md:h-5 text-white group-hover/card:text-black" fill="currentColor" />
                </div>
              </div>

              {/* Bottom Gradient and Date Overlay */}
              <div className="absolute bottom-0 left-0 w-full h-2/5 bg-gradient-to-t from-black via-black/60 to-transparent flex items-end justify-center pb-3">
                <p className="text-white font-bold text-[11px] md:text-sm tracking-wide text-center px-2" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.8)' }}>
                  {item.date}
                </p>
              </div>
            </div>
          ))}
          
          {/* Spacer at the end */}
          <div className="flex-none w-6 md:w-14 lg:w-16"></div>
        </div>

        {/* Right Scroll Button */}
        <button 
          onClick={() => scroll('right')}
          className="absolute right-6 md:right-14 lg:right-16 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/80 text-white flex items-center justify-center rounded-full z-10 opacity-0 group-hover:opacity-100 transition-all border border-white/20 hidden md:flex"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default UpcomingStrip;
