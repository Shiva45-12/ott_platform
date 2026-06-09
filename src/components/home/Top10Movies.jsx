import React, { useState } from 'react';
import { Crown, Play, Plus, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const Top10Movies = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const topMovies = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    rank: i + 1,
    image: `/Top_movie/image${i + 1}.png`,
    isPremium: [1, 2, 4, 5].includes(i + 1),
    title: `Top Movie ${i + 1}`,
    description: "Experience the thrill and adventure of this top-rated blockbuster movie, loved by audiences worldwide.",
    year: "2023",
    age: "U/A 16+",
    duration: "2h 15m"
  }));

  return (
    <div className="w-full mb-12 relative z-10 hover:z-50 transition-all duration-300">
      <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-6 px-6 md:px-14 lg:px-16">Top 10 in India Today</h2>
      
      {/* Horizontal scroll container */}
      <div className="flex gap-6 md:gap-8 overflow-x-auto pb-24 pt-16 -mt-12 scrollbar-hide snap-x relative z-10 w-full" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {/* Spacer for Sidebar */}
        <div className="flex-none w-6 md:w-14 lg:w-16"></div>
          
          {topMovies.map((movie, index) => (
            <div 
              key={movie.id} 
              className="relative flex-none w-36 md:w-48 lg:w-[210px] snap-start group cursor-pointer z-10 hover:z-50"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Base Poster Image Container */}
              <div className="relative aspect-[2/3] w-full rounded-lg overflow-hidden border border-white/10 shadow-lg bg-black">
                <img 
                  src={movie.image} 
                  alt={`Top ${movie.rank}`} 
                  className="w-full h-full object-cover"
                />
                
                {/* Premium Yellow Tag (Top Right) */}
                {movie.isPremium && (
                  <div className="absolute top-2 right-2 w-7 h-7 bg-primary rounded-full flex items-center justify-center shadow-md z-20">
                    <Crown className="w-3.5 h-3.5 text-black" fill="currentColor" />
                  </div>
                )}
                
                {/* Dark Gradient Overlay to pop the number */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80"></div>
              </div>

              {/* Huge Ranking Number */}
              <div 
                className="absolute -bottom-2 -right-3 md:-bottom-3 md:-right-4 text-[70px] md:text-[90px] lg:text-[100px] font-black leading-none select-none z-10 tracking-tighter pointer-events-none"
                style={{
                  color: '#000000',
                  WebkitTextStroke: '2px #666',
                  textShadow: '2px 4px 8px rgba(0,0,0,0.8)'
                }}
              >
                {movie.rank}
              </div>

              {/* Hover Zoom Card */}
              <AnimatePresence>
                {hoveredIndex === index && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1.08 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[108%] bg-background-secondary rounded-lg shadow-2xl flex flex-col overflow-hidden border border-white/10 z-50"
                  >
                    {/* Top Image Section */}
                    <div className="relative h-28 md:h-36 lg:h-44 w-full bg-black">
                      <img src={movie.image} alt={movie.title} className="w-full h-full object-cover object-top" />
                      
                      {/* Premium Tag on Hover Card */}
                      {movie.isPremium && (
                        <div className="absolute top-2 right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center shadow-lg">
                          <Crown className="w-3 h-3 text-black" fill="currentColor" />
                        </div>
                      )}

                      {/* Language Tag */}
                      <div className="absolute top-2 left-2 bg-black/60 px-2 py-0.5 rounded text-white text-[11px] font-bold tracking-wide flex items-center gap-1 backdrop-blur-sm">
                        हिंदी <ChevronDown className="w-3 h-3" strokeWidth={3} />
                      </div>

                      <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-background-secondary to-transparent h-12"></div>
                    </div>
                    
                    {/* Bottom Details Section */}
                    <div className="p-3 flex flex-col gap-2 bg-background-secondary">
                      {/* Action Buttons */}
                      <div className="flex items-center gap-2 w-full">
                        <Link to={`/watch/${movie.id}`} className="flex-1 bg-white hover:bg-gray-200 text-black py-1.5 rounded-md font-bold text-sm flex items-center justify-center gap-1.5 transition-colors shadow-sm">
                          <Play className="w-4 h-4" fill="currentColor" /> Watch Now
                        </Link>
                        <button className="w-8 h-8 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-md flex items-center justify-center transition-colors">
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Meta Data */}
                      <div className="flex items-center gap-1.5 text-gray-300 text-[11px] font-bold tracking-wide mt-1">
                        <span>{movie.year}</span>
                        <span className="text-gray-500 text-[9px]">•</span>
                        <span className="bg-white/10 px-1 py-0.5 rounded border border-white/10">{movie.age}</span>
                        <span className="text-gray-500 text-[9px]">•</span>
                        <span>{movie.duration}</span>
                      </div>

                      {/* Description */}
                      <p className="text-gray-400 text-[11px] leading-snug line-clamp-2 font-medium">
                        {movie.description}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          ))}
          
          <div className="flex-none w-6 md:w-14 lg:w-16"></div>
        </div>

      <style dangerouslySetInnerHTML={{__html: `
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}} />
    </div>
  );
};

export default Top10Movies;
