import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const animeList = [
  { id: 'an1',  title: 'One Punch Man',                    image: '/anime/1.png',  episodes: '24 Eps',  rating: 8.8 },
  { id: 'an2',  title: 'Dragon Ball Super',                image: '/anime/2.png',  episodes: '131 Eps', rating: 8.1 },
  { id: 'an3',  title: 'Bleach',                           image: '/anime/3.png',  episodes: '366 Eps', rating: 8.2 },
  { id: 'an4',  title: 'Fullmetal Alchemist: Brotherhood', image: '/anime/4.png',  episodes: '64 Eps',  rating: 9.1 },
  { id: 'an5',  title: 'Hunter x Hunter',                  image: '/anime/5.png',  episodes: '148 Eps', rating: 9.0 },
  { id: 'an6',  title: 'Chainsaw Man',                     image: '/anime/6.png',  episodes: '12 Eps',  rating: 8.5 },
  { id: 'an7',  title: 'Naruto Shippuden',                 image: '/anime/7.png',  episodes: '500 Eps', rating: 8.7 },
  { id: 'an8',  title: 'Attack on Titan',                  image: '/anime/8.png',  episodes: '87 Eps',  rating: 9.0 },
  { id: 'an9',  title: 'Demon Slayer',                     image: '/anime/9.png',  episodes: '55 Eps',  rating: 8.6 },
  { id: 'an10', title: 'Jujutsu Kaisen',                   image: '/anime/10.png', episodes: '48 Eps',  rating: 8.6 },
  { id: 'an11', title: 'My Hero Academia',                  image: '/anime/11.png', episodes: '138 Eps', rating: 8.4 },
  { id: 'an12', title: 'Tokyo Ghoul',                      image: '/anime/12.png', episodes: '48 Eps',  rating: 7.9 },
  { id: 'an13', title: 'Vinland Saga',                     image: '/anime/13.png', episodes: '48 Eps',  rating: 8.8 },
  { id: 'an14', title: 'Black Clover',                     image: '/anime/14.png', episodes: '170 Eps', rating: 8.0 },
];

const AnimeJourneyStrip = () => {
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const target = dir === 'left'
        ? scrollLeft - clientWidth + 100
        : scrollLeft + clientWidth - 100;
      scrollRef.current.scrollTo({ left: target, behavior: 'smooth' });
    }
  };

  return (
    <div className="mb-8 md:mb-12 relative group z-10 hover:z-50 transition-all duration-300">
      {/* Header */}
      <h2 className="text-xl md:text-2xl font-extrabold text-white mb-4 px-6 md:px-14 lg:px-16 flex items-center gap-2 cursor-pointer">
        Kickstart Your Anime Journey
        <span className="text-xl md:text-2xl text-gray-400 group-hover:text-white transition-colors">›</span>
      </h2>

      <div className="relative">
        {/* Left Button */}
        <button
          onClick={() => scroll('left')}
          className="absolute left-6 md:left-14 lg:left-16 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/60 hover:bg-black/90 text-white flex items-center justify-center rounded-full z-10 opacity-0 group-hover:opacity-100 transition-all border border-white/20 hidden md:flex"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Scroll Container */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide py-3 scroll-smooth w-full"
          style={{ scrollbarWidth: 'none' }}
        >
          {/* Sidebar spacer */}
          <div className="flex-none w-6 md:w-14 lg:w-16" />

          {animeList.map((anime) => (
            <Link
              key={anime.id}
              to="/crunchyroll"
              className="relative flex-none w-32 sm:w-40 md:w-48 lg:w-52 aspect-[2/3] rounded-xl overflow-hidden group/card cursor-pointer shadow-lg border border-white/10"
            >
              {/* Poster */}
              <img
                src={anime.image}
                alt={anime.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-110"
              />

              {/* Crunchyroll badge top-left */}
              <div className="absolute top-2 left-2 w-7 h-7 rounded-full bg-[#f47521] flex items-center justify-center shadow-md z-10">
                <svg viewBox="0 0 24 24" fill="white" className="w-4 h-4">
                  <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 3a7 7 0 110 14A7 7 0 0112 5zm0 2a5 5 0 100 10A5 5 0 0012 7z" />
                </svg>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                <p className="text-white font-bold text-sm leading-tight line-clamp-2">{anime.title}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[#f47521] text-xs font-bold">{anime.episodes}</span>
                  <span className="text-gray-400 text-xs">•</span>
                  <span className="text-yellow-400 text-xs font-bold">★ {anime.rating}</span>
                </div>
              </div>
            </Link>
          ))}

          {/* End spacer */}
          <div className="flex-none w-6 md:w-14 lg:w-16" />
        </div>

        {/* Right Button */}
        <button
          onClick={() => scroll('right')}
          className="absolute right-6 md:right-14 lg:right-16 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/60 hover:bg-black/90 text-white flex items-center justify-center rounded-full z-10 opacity-0 group-hover:opacity-100 transition-all border border-white/20 hidden md:flex"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default AnimeJourneyStrip;
