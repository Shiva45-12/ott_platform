import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, Crown } from 'lucide-react';

const WatchInLanguage = [
  { id: 1, title: 'Tamil', text: 'தமிழ்', bg: 'from-teal-600 to-teal-900', img: '/images/tamil.png' },
  { id: 2, title: 'Telugu', text: 'తెలుగు', bg: 'from-amber-600 to-amber-900', img: '/images/telugu.png' },
  { id: 3, title: 'Malayalam', text: 'മലയാളം', bg: 'from-gray-600 to-gray-900', img: null },
  { id: 4, title: 'Marathi', text: 'मराठी', bg: 'from-cyan-600 to-cyan-900', img: '/images/marathi.png' },
  { id: 5, title: 'Hindi', text: 'हिन्दी', bg: 'from-blue-600 to-blue-900', img: null },
  { id: 6, title: 'English', text: 'English', bg: 'from-red-600 to-red-900', img: null },
  { id: 7, title: 'Bengali', text: 'বাংলা', bg: 'from-emerald-600 to-emerald-900', img: null },
];

const PopularSports = [
  { id: 1, title: 'CRICKET', icon: '🏏', bg: 'from-[#0B1560] to-[#0A1045]' },
  { id: 2, title: 'FOOTBALL', icon: '⚽', bg: 'from-[#0B1560] to-[#0A1045]', img: '/sports/football.png' },
  { id: 3, title: 'TENNIS', icon: '🎾', bg: 'from-[#0B1560] to-[#0A1045]' },
  { id: 4, title: 'UFC', icon: '🥊', bg: 'from-[#0B1560] to-[#0A1045]', logo: 'UFC', img: '/sports/ufc.png' },
];

const BrowseByGenre = [
  { id: 1, title: 'Romance', img: '/images/game_of_thrones.png', color: 'from-green-900/80 to-black' },
  { id: 2, title: 'Action', img: '/latest/fighter.png', color: 'from-gray-700/80 to-black' },
  { id: 3, title: 'Thriller', img: '/latest/animal.png', color: 'from-red-900/80 to-black' },
  { id: 4, title: 'Drama', img: '/images/aquaman.png', color: 'from-orange-800/80 to-black' },
  { id: 5, title: 'Comedy', img: '/tvshows/gullak.png', color: 'from-red-600/80 to-black' },
  { id: 6, title: 'Historic & Mythology', img: '/tvshows/shrimad_ramayan.png', color: 'from-teal-800/80 to-black' },
  { id: 7, title: 'Reality', img: '/tvshows/indian_idol.png', color: 'from-blue-900/80 to-black' },
];

const ShowsByChannel = [
  { id: 1, title: 'SONY SET', logo: 'ENTERTAINMENT TELEVISION', bg: 'from-amber-600 to-amber-900', wrapper: 'from-amber-900 to-black' },
  { id: 2, title: 'SONY SAB', logo: 'SAB', bg: 'from-orange-500 to-red-600', wrapper: 'from-purple-900 to-black' },
  { id: 3, title: 'SONY MARATHI', logo: 'मराठी', bg: 'from-pink-500 to-rose-600', wrapper: 'from-pink-900 to-black' },
  { id: 4, title: 'SONY SPORTS', logo: 'SPORTS NETWORK', bg: 'from-blue-500 to-blue-700', wrapper: 'from-blue-900 to-black' },
  { id: 5, title: 'SONY AATH', logo: 'আট', bg: 'from-red-600 to-red-800', wrapper: 'from-red-900 to-black' },
  { id: 6, title: 'SONY YAY', logo: 'YAY!', bg: 'from-green-400 to-blue-500', wrapper: 'from-slate-800 to-black' },
  { id: 7, title: 'SONY BBC EARTH', logo: 'BBC EARTH', bg: 'from-green-600 to-green-800', wrapper: 'from-green-900 to-black' },
];

const CategorySection = ({ title, children, link }) => (
  <div className="mb-10">
    <Link to={link || "#"} className="flex items-center gap-2 mb-4 group w-max">
      <h2 className="text-xl font-bold text-white group-hover:text-gray-300 transition-colors">{title}</h2>
      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
    </Link>
    <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
      {children}
    </div>
  </div>
);

const TopCategories = () => {
  return (
    <div className="min-h-screen bg-[#000000] bg-gradient-to-br from-[#0f0f15] via-black to-[#1a0b12] pb-20 pl-0 md:pl-20 pt-8">
      <div className="max-w-[1400px] mx-auto px-6">
        
        <h1 className="text-2xl font-bold text-white mb-6">Top Categories</h1>

        {/* Quick Links */}
        <div className="flex gap-4 mb-10">
          <Link to="/sports" className="px-6 py-3 bg-[#1e2029] hover:bg-[#2a2d39] text-white font-medium rounded-lg transition-colors">
            Roland Garros
          </Link>
          <Link to="/crunchyroll" className="px-6 py-3 bg-[#1e2029] hover:bg-[#2a2d39] text-white font-medium rounded-lg transition-colors">
            Crunchyroll
          </Link>
          <Link to="/plans" className="px-6 py-3 bg-[#1e2029] hover:bg-[#2a2d39] text-white font-medium rounded-lg transition-colors flex items-center gap-2">
            Premium <Crown className="w-4 h-4 text-yellow-500" fill="currentColor" />
          </Link>
        </div>

        {/* Watch In Your Language */}
        <CategorySection title="Watch In Your Language">
          {WatchInLanguage.map((lang, idx) => (
            <motion.div
              key={lang.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ scale: 1.05 }}
              className="flex-shrink-0 w-40 h-56 rounded-xl overflow-hidden relative cursor-pointer group"
            >
              <div className={`absolute inset-0 bg-gradient-to-b ${lang.bg} opacity-80 group-hover:opacity-100 transition-opacity`} />
              {lang.img ? (
                <img src={lang.img} alt={lang.title} className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-50 group-hover:scale-110 transition-transform duration-500" />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center opacity-20">
                  <span className="text-6xl font-bold">{lang.title[0]}</span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              <div className="absolute inset-0 flex flex-col items-center justify-end pb-6">
                <span className="text-white text-2xl font-black mb-1">{lang.text}</span>
                <span className="text-gray-300 text-sm font-medium">{lang.title}</span>
              </div>
            </motion.div>
          ))}
        </CategorySection>

        {/* Popular Sports */}
        <CategorySection title="Popular Sports" link="/sports">
          {PopularSports.map((sport, idx) => (
            <motion.div
              key={sport.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ scale: 1.05 }}
              className={`flex-shrink-0 w-48 h-48 rounded-xl overflow-hidden relative cursor-pointer group bg-gradient-to-br ${sport.bg}`}
            >
              {/* Background Image if available */}
              {sport.img && (
                <>
                  <img src={sport.img} alt={sport.title} className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-110 group-hover:opacity-80 transition-all duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1045] via-[#0B1560]/50 to-transparent" />
                </>
              )}

              {/* Texture for items without images */}
              {!sport.img && (
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '16px 16px' }} />
              )}
              
              <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                {sport.logo ? (
                  <span className="text-5xl font-black text-white italic tracking-tighter mb-4 drop-shadow-lg">{sport.logo}</span>
                ) : (
                  <span className="text-6xl mb-4 group-hover:scale-110 transition-transform drop-shadow-lg">{sport.icon}</span>
                )}
                <span className="text-white font-bold tracking-widest drop-shadow-md">{sport.title}</span>
              </div>
            </motion.div>
          ))}
        </CategorySection>

        {/* Browse by Genre */}
        <CategorySection title="Browse by Genre">
          {BrowseByGenre.map((genre, idx) => (
            <motion.div
              key={genre.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ scale: 1.05 }}
              className="flex-shrink-0 w-44 h-44 rounded-xl overflow-hidden relative cursor-pointer group"
            >
              <img src={genre.img} alt={genre.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className={`absolute inset-0 bg-gradient-to-t ${genre.color}`} />
              <div className="absolute inset-0 flex items-end justify-center pb-4">
                <span className="text-white font-bold text-lg">{genre.title}</span>
              </div>
            </motion.div>
          ))}
        </CategorySection>

        {/* Shows By Channel */}
        <CategorySection title="Shows By Channel">
          {ShowsByChannel.map((channel, idx) => (
            <motion.div
              key={channel.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ scale: 1.05 }}
              className={`flex-shrink-0 w-44 h-44 rounded-xl overflow-hidden relative cursor-pointer group bg-gradient-to-br ${channel.wrapper}`}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 bg-black rounded-xl overflow-hidden border border-white/10 shadow-xl group-hover:scale-110 transition-transform duration-300 relative flex flex-col">
                  <div className="h-1/2 flex items-center justify-center border-b border-white/5">
                    <span className="text-white font-bold tracking-widest text-xs">SONY</span>
                  </div>
                  <div className={`h-1/2 flex items-center justify-center bg-gradient-to-b ${channel.bg}`}>
                    <span className="text-white font-bold text-[10px] text-center leading-tight px-1">{channel.logo}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </CategorySection>

      </div>
    </div>
  );
};

export default TopCategories;
