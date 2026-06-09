import React, { useState } from 'react';
import { Play, Plus, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const ThumbnailCard = ({ item, isGrid = false }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Fallback for missing item data
  const {
    id = Math.random(),
    title = "Movie Title",
    image = "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&q=80",
    age = "U/A 16+",
    duration = "2h 33m",
    year = "2015",
    description = "After the 26/11 Mumbai attacks, a special intelligence task force will stop at nothing to foil another such assault on Indian soil.",
  } = item || {};

  return (
    <div 
      className={`relative aspect-[2/3] group cursor-pointer z-10 hover:z-50 ${isGrid ? 'w-full h-full' : 'flex-none w-32 sm:w-40 md:w-48 lg:w-52'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Base Poster */}
      <div className="relative w-full h-full rounded-md overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover" />
        
        {/* Premium Tag (Top Left) */}
        {item.isPremium && (
          <div className="absolute top-2 left-2 text-primary drop-shadow-md z-20">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="none">
              <path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14v1z"/>
            </svg>
          </div>
        )}

        {/* Bottom Ribbon (e.g. NEW SEASON, NEW MOVIE) */}
        {item.badge && (
          <div className="absolute bottom-0 left-0 w-full bg-[#5a0032] py-1">
            <p className="text-white text-[10px] md:text-xs font-bold text-center tracking-wider uppercase">
              {item.badge}
            </p>
          </div>
        )}
      </div>
      
      {/* Hover Card Overlay */}
      <AnimatePresence>
        {isHovered && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1.08 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[108%] bg-background-secondary rounded-lg shadow-2xl flex flex-col overflow-hidden border border-white/10"
          >
            {/* Top Image Section */}
            <div className="relative h-28 md:h-36 lg:h-40 w-full bg-black">
              <img src={image} alt={title} className="w-full h-full object-cover object-top" />
              
              {/* Language Tag */}
              <div className="absolute top-2 left-2 bg-black/60 px-2 py-0.5 rounded text-white text-[11px] font-bold tracking-wide flex items-center gap-1 backdrop-blur-sm">
                हिंदी <ChevronDown className="w-3 h-3" strokeWidth={3} />
              </div>

              {/* Title Overlay for visual balance if needed */}
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-background-secondary to-transparent h-12"></div>
            </div>
            
            {/* Bottom Details Section */}
            <div className="p-3 flex flex-col gap-2 bg-background-secondary">
              {/* Action Buttons */}
              <div className="flex items-center gap-2 w-full">
                <Link to={`/watch/${id}`} className="flex-1 bg-white hover:bg-gray-200 text-black py-1.5 rounded-md font-bold text-sm flex items-center justify-center gap-1.5 transition-colors shadow-sm">
                  <Play className="w-4 h-4" fill="currentColor" /> Watch Now
                </Link>
                <button className="w-8 h-8 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-md flex items-center justify-center transition-colors">
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Meta Data */}
              <div className="flex items-center gap-1.5 text-gray-300 text-[11px] font-bold tracking-wide mt-1">
                <span>{year}</span>
                <span className="text-gray-500 text-[9px]">•</span>
                <span className="bg-white/10 px-1 py-0.5 rounded border border-white/10">{age}</span>
                <span className="text-gray-500 text-[9px]">•</span>
                <span>{duration}</span>
              </div>

              {/* Description */}
              <p className="text-gray-400 text-[11px] leading-snug line-clamp-2 font-medium">
                {description}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ThumbnailCard;
