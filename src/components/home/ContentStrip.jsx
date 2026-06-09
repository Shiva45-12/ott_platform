import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ThumbnailCard from './ThumbnailCard';

const ContentStrip = ({ title, items = [] }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth + 100 : scrollLeft + clientWidth - 100;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  // Mock items if none provided
  const displayItems = items.length > 0 ? items : Array.from({ length: 10 }).map((_, i) => ({
    id: i,
    title: `Amazing Movie ${i + 1}`,
    image: `https://images.unsplash.com/photo-${1536440136628 + i}?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80`,
    match: `${Math.floor(Math.random() * 20) + 80}% Match`,
  }));

  return (
    <div className="mb-8 md:mb-12 relative group z-10 hover:z-50 transition-all duration-300">
      <h2 className="text-xl md:text-2xl font-extrabold text-white mb-4 px-6 md:px-14 lg:px-16 flex items-center gap-2">
        {title}
        <span className="text-sm font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer hover:underline">
          Explore All
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
          className="flex gap-4 overflow-x-auto scrollbar-hide py-16 -mt-8 scroll-smooth w-full"
        >
          {/* Spacer for Sidebar */}
          <div className="flex-none w-6 md:w-14 lg:w-16"></div>
          
          {displayItems.map((item, index) => (
            <ThumbnailCard key={index} item={item} />
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

export default ContentStrip;
