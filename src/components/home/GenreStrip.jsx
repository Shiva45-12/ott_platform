import React, { useRef } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';

const GenreStrip = ({ title, items }) => {
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
      <h2 className="text-xl md:text-2xl font-extrabold text-white mb-4 px-6 md:px-14 lg:px-16 flex items-center gap-4 cursor-pointer w-max">
        {title} 
        <span className="text-sm md:text-[15px] font-bold text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1">
          Explore All <ChevronRight className="w-4 h-4" strokeWidth={3} />
        </span>
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
          className="flex gap-3 md:gap-4 overflow-x-auto scrollbar-hide py-4 scroll-smooth w-full snap-x"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {/* Spacer for Sidebar */}
          <div className="flex-none w-6 md:w-14 lg:w-16"></div>
          
          {items.map((item, index) => (
            <div 
              key={index} 
              className="relative flex-none w-32 md:w-40 lg:w-[170px] aspect-[4/5] snap-start cursor-pointer rounded-xl overflow-hidden hover:scale-105 transition-transform duration-300 shadow-lg"
            >
              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              
              {/* Colored Gradient Overlay */}
              <div className={`absolute bottom-0 left-0 w-full h-[80%] bg-gradient-to-t ${item.color} to-transparent opacity-90`}></div>
              
              {/* Darkening base to ensure text is always readable */}
              <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black/60 to-transparent"></div>

              {/* Genre Name */}
              <div className="absolute bottom-4 left-0 w-full px-2 text-center">
                <h3 className="text-white font-bold text-[15px] md:text-[17px] tracking-wide" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.8)' }}>
                  {item.name}
                </h3>
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

export default GenreStrip;
