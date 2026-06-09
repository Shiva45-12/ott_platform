import React, { useRef } from 'react';
import { Play, Crown, ChevronRight, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const episodes = [
  { id: 'e1', season: 'S1', ep: 'E1', title: 'E1. Tehri',           show: 'Gullak', isPremium: false },
  { id: 'e2', season: 'S1', ep: 'E2', title: 'E2. Hum Do Humare Do', show: 'Gullak', isPremium: false },
  { id: 'e3', season: 'S1', ep: 'E3', title: 'E3. Itwaar',           show: 'Gullak', isPremium: true  },
  { id: 'e4', season: 'S1', ep: 'E4', title: 'E4. Batti Aa Gayi',    show: 'Gullak', isPremium: true  },
  { id: 'e5', season: 'S1', ep: 'E5', title: 'E5. Tyohaar',          show: 'Gullak', isPremium: true  },
  { id: 'e6', season: 'S2', ep: 'E1', title: 'E1. Bijlee',           show: 'Gullak', isPremium: true  },
];

const CatchUpSection = () => {
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const target = dir === 'left' ? scrollLeft - clientWidth + 100 : scrollLeft + clientWidth - 100;
      scrollRef.current.scrollTo({ left: target, behavior: 'smooth' });
    }
  };

  return (
    <div className="mb-12 relative z-10">
      {/* ── Hero Banner ── */}
      <div className="relative px-6 md:px-14 lg:px-16 overflow-hidden rounded-2xl shadow-2xl">
        <div className="relative w-full aspect-[21/7] md:aspect-[21/6] min-h-[160px] md:min-h-[220px] overflow-hidden rounded-2xl">
          <img
            src="/catchup/banner.png"
            alt="Gullak 5 - Mishra Parivar is Back"
            className="w-full h-full object-cover object-center"
          />
          {/* subtle dark vignette on sides */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/20 pointer-events-none rounded-2xl" />
        </div>
      </div>

      {/* ── Strip Header ── */}
      <div className="mt-5 mb-3 px-6 md:px-14 lg:px-16 flex items-center gap-2 group cursor-pointer">
        <h2 className="text-lg md:text-xl font-extrabold text-white">
          Catch Up Before The New Season Drops
        </h2>
        <ChevronRight className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
      </div>

      {/* ── Episode Scroll Strip ── */}
      <div className="relative group/strip">
        {/* Left scroll btn */}
        <button
          onClick={() => scroll('left')}
          className="absolute left-6 md:left-14 lg:left-16 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/60 hover:bg-black/90 text-white flex items-center justify-center rounded-full z-20 opacity-0 group-hover/strip:opacity-100 transition-all border border-white/20 hidden md:flex"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto scrollbar-hide py-2 scroll-smooth"
          style={{ scrollbarWidth: 'none' }}
        >
          {/* sidebar spacer */}
          <div className="flex-none w-6 md:w-14 lg:w-16" />

          {episodes.map((ep) => (
            <Link
              key={ep.id}
              to={`/watch/${ep.id}`}
              className="relative flex-none w-48 sm:w-56 md:w-64 group/card cursor-pointer rounded-xl overflow-hidden border border-white/10 shadow-lg"
            >
              {/* Thumbnail — sliced from episodes.png grid using object-position */}
              <div className="relative aspect-video bg-black overflow-hidden">
                <img
                  src="/catchup/episodes.png"
                  alt={ep.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-110"
                />

                {/* Episode label badge */}
                <div className="absolute bottom-2 left-2 flex items-center gap-1 z-10">
                  <div className="bg-black/70 backdrop-blur-sm px-2 py-0.5 rounded flex items-center gap-1.5">
                    <Play className="w-3 h-3 text-white" fill="white" />
                    <span className="text-white text-[11px] font-bold tracking-wide">
                      {ep.season} {ep.ep}
                    </span>
                  </div>
                </div>

                {/* Premium Crown */}
                {ep.isPremium && (
                  <div className="absolute top-2 right-2 w-6 h-6 bg-[#ffae00] rounded-full flex items-center justify-center shadow z-10">
                    <Crown className="w-3 h-3 text-black" fill="currentColor" />
                  </div>
                )}

                {/* Hover play overlay */}
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                    <Play className="w-5 h-5 text-black ml-0.5" fill="currentColor" />
                  </div>
                </div>
              </div>

              {/* Episode info below thumbnail */}
              <div className="bg-[#111] px-3 py-2">
                <p className="text-white text-xs font-bold truncate">{ep.title}</p>
                <p className="text-gray-400 text-[11px] mt-0.5">{ep.show}</p>
              </div>
            </Link>
          ))}

          {/* end spacer */}
          <div className="flex-none w-6 md:w-14 lg:w-16" />
        </div>

        {/* Right scroll btn */}
        <button
          onClick={() => scroll('right')}
          className="absolute right-6 md:right-14 lg:right-16 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/60 hover:bg-black/90 text-white flex items-center justify-center rounded-full z-20 opacity-0 group-hover/strip:opacity-100 transition-all border border-white/20 hidden md:flex"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default CatchUpSection;
