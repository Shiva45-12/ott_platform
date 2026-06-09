import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play, Plus, ChevronLeft, ChevronRight,
  Trophy, Radio, Zap, Clock, Star
} from 'lucide-react';

// ─── DATA ──────────────────────────────────────────────────────────────────────

const HERO_SLIDES = [
  {
    id: 2001,
    title: 'Perricard vs Djokovic',
    subtitle: 'Roland Garros — Round 1',
    badge: 'TONIGHT | 11:45 PM',
    sport: 'Tennis',
    language: 'English',
    year: '2026',
    description: 'Watch the electrifying clash at Roland Garros as young sensation Perricard faces the legendary Novak Djokovic on the iconic red clay.',
    thumbnail: '/sports/ufc.png',
    isLive: false,
    tag: 'UPCOMING',
  },
  {
    id: 2002,
    title: 'PSG vs Arsenal',
    subtitle: 'UEFA Champions League — Final',
    badge: '30TH MAY | 8:00 PM',
    sport: 'Football',
    language: 'English, Hindi',
    year: '2026',
    description: 'The biggest match in European football — Paris Saint-Germain take on Arsenal FC in the UEFA Champions League Final.',
    thumbnail: '/sports/football.png',
    isLive: false,
    tag: 'UPCOMING',
  },
  {
    id: 2003,
    title: 'ENG vs IND — 3 T20Is',
    subtitle: 'India Tour of England 2026',
    badge: 'STARTS 28TH MAY | 11:00 PM',
    sport: 'Cricket',
    language: 'Hindi, English',
    year: '2026',
    description: "India's tour of England begins with a thrilling 3-match T20I series. Don't miss a single delivery.",
    thumbnail: '/latest/skyF.png',
    isLive: false,
    tag: 'UPCOMING',
  },
  {
    id: 2004,
    title: 'Roland Garros 2026',
    subtitle: 'Live Coverage — All Courts',
    badge: 'EVERYDAY 1:30 PM ONWARDS',
    sport: 'Tennis',
    language: 'English',
    year: '2026',
    description: 'Complete live coverage of Roland Garros 2026 — every match, every court, every moment of the French Open.',
    thumbnail: '/sports/ufc.png',
    isLive: true,
    tag: 'LIVE',
  },
];

const LIVE_MATCHES = [
  { id: 2011, title: 'Kostyuk vs Selekhmeteva', subtitle: 'Roland Garros Round 1', image: '/sports/ufc.png', sport: 'Tennis', isLive: true },
  { id: 2012, title: 'Perricard vs Djokovic', subtitle: 'Roland Garros Round 1', image: '/sports/football.png', sport: 'Tennis', isLive: true },
  { id: 2013, title: 'PSG vs Arsenal', subtitle: 'UCL Final', image: '/sports/football.png', sport: 'Football', isLive: true },
  { id: 2014, title: 'ENG W vs NZ W', subtitle: '2nd T20I Highlights', image: '/latest/skyF.png', sport: 'Cricket', isLive: false },
  { id: 2015, title: 'UFC Main Event', subtitle: 'Saturday Night Replay', image: '/sports/ufc.png', sport: 'UFC', isLive: false },
];

const TRENDING = [
  { id: 2021, title: 'Perricard vs Djokovic', subtitle: 'Round 1 · Roland Garros', image: '/sports/ufc.png', tag: 'LIVE', sport: 'Tennis' },
  { id: 2022, title: 'PSG Road to Final', subtitle: 'UCL Journey', image: '/sports/football.png', tag: 'NEW', sport: 'Football' },
  { id: 2023, title: 'Arsenal Road to Final', subtitle: 'UCL Journey', image: '/sports/football.png', tag: 'NEW', sport: 'Football' },
  { id: 2024, title: 'UFC Main Event Replay', subtitle: 'Saturday Night', image: '/sports/ufc.png', tag: 'REPLAY', sport: 'UFC' },
  { id: 2025, title: 'ENG vs IND 1st T20I', subtitle: 'Highlights', image: '/latest/skyF.png', tag: 'HIGHLIGHTS', sport: 'Cricket' },
  { id: 2026, title: 'ENG W vs IND W', subtitle: 'Glamour Series', image: '/latest/mirai.png', tag: 'UPCOMING', sport: 'Cricket' },
];

const UPCOMING_EVENTS = [
  { id: 2031, title: 'PSG vs Arsenal — UCL Final', subtitle: '30th May | 9:00 PM', image: '/sports/football.png' },
  { id: 2032, title: 'Perricard vs Djokovic', subtitle: 'Tonight | 11:45 PM', image: '/sports/ufc.png' },
  { id: 2033, title: 'ENG vs IND 3 T20Is', subtitle: 'Starts 28th May', image: '/latest/skyF.png' },
  { id: 2034, title: 'Shi Ming vs Puja Tomar — UFC', subtitle: '29 May | 3:30 PM', image: '/sports/ufc.png' },
  { id: 2035, title: 'Roland Garros Day 6', subtitle: 'Everyday | 1:30 PM', image: '/sports/football.png' },
];

const POPULAR_SPORTS = [
  { id: 'cricket', name: 'Cricket', icon: '🏏', color: 'from-blue-700 to-blue-900', count: '120+ Events' },
  { id: 'football', name: 'Football', icon: '⚽', color: 'from-green-700 to-green-900', count: '80+ Events' },
  { id: 'tennis', name: 'Tennis', icon: '🎾', color: 'from-yellow-600 to-orange-800', count: '60+ Events' },
  { id: 'ufc', name: 'UFC', icon: '🥊', color: 'from-red-700 to-red-900', count: '40+ Events' },
  { id: 'kabaddi', name: 'Kabaddi', icon: '🤼', color: 'from-purple-700 to-purple-900', count: '30+ Events' },
  { id: 'f1', name: 'Formula 1', icon: '🏎️', color: 'from-gray-700 to-gray-900', count: '20+ Events' },
];

const BEST_CRICKET = [
  { id: 2041, title: 'ENG vs IND 1st T20I', subtitle: 'Highlights', image: '/latest/skyF.png', tag: 'HIGHLIGHTS', rating: 8.4 },
  { id: 2042, title: 'India Women\'s Tour', subtitle: 'England 2026', image: '/latest/mirai.png', tag: 'UPCOMING', rating: 8.6 },
  { id: 2043, title: 'IPL 2026 Final', subtitle: 'CSK vs MI Highlights', image: '/latest/fighter.png', tag: 'REPLAY', rating: 9.1 },
  { id: 2044, title: 'ICC World Cup 2025', subtitle: 'India vs Pakistan', image: '/latest/animal.png', tag: 'ARCHIVE', rating: 9.3 },
  { id: 2045, title: 'Down Underdogs', subtitle: 'India Tour of Australia', image: '/latest/bhootB.png', tag: 'SERIES', rating: 8.5 },
];

const BEST_FOOTBALL = [
  { id: 2051, title: 'PSG vs Arsenal', subtitle: 'UCL Final Preview', image: '/sports/football.png', tag: 'UPCOMING', rating: 8.9 },
  { id: 2052, title: 'Champions League Highlights', subtitle: 'Quarter Finals', image: '/sports/football.png', tag: 'HIGHLIGHTS', rating: 8.7 },
  { id: 2053, title: 'La Liga Best Goals', subtitle: '2025-26 Season', image: '/sports/ufc.png', tag: 'COMPILED', rating: 8.3 },
  { id: 2054, title: 'Premier League Classics', subtitle: 'Best Matches', image: '/sports/football.png', tag: 'ARCHIVE', rating: 8.1 },
  { id: 2055, title: 'Europa League Final', subtitle: 'FRE vs AVL Highlights', image: '/sports/ufc.png', tag: 'HIGHLIGHTS', rating: 8.0 },
];

const POPULAR_SHOWS = [
  { id: 2061, title: 'Lords of England', subtitle: 'Cricket Documentary', image: '/latest/dhurandhar.png', rating: 8.5 },
  { id: 2062, title: 'Bharat Chale Chalo', subtitle: '2021-22 Season', image: '/latest/Great.png', rating: 8.2 },
  { id: 2063, title: 'Ultimate Guide to UFC', subtitle: 'Best of 2023', image: '/sports/ufc.png', rating: 8.6 },
  { id: 2064, title: 'Down Underdogs', subtitle: 'India\'s Big Comeback', image: '/latest/animal.png', rating: 8.8 },
  { id: 2065, title: 'Road to Wimbledon', subtitle: 'Documentary Series', image: '/sports/football.png', rating: 8.3 },
];

// ─── Components ────────────────────────────────────────────────────────────────

const LiveBadge = () => (
  <span className="flex items-center gap-1 bg-red-600 text-white text-[10px] font-black px-2 py-0.5 rounded">
    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
    LIVE
  </span>
);

const TagBadge = ({ tag }) => {
  const colors = {
    LIVE: 'bg-red-600 text-white',
    NEW: 'bg-green-600 text-white',
    REPLAY: 'bg-blue-600 text-white',
    HIGHLIGHTS: 'bg-yellow-600 text-black',
    UPCOMING: 'bg-purple-600 text-white',
    ARCHIVE: 'bg-gray-600 text-white',
    SERIES: 'bg-orange-600 text-white',
    COMPILED: 'bg-teal-600 text-white',
  };
  return (
    <span className={`text-[9px] font-black px-1.5 py-0.5 rounded ${colors[tag] || 'bg-gray-600 text-white'}`}>
      {tag}
    </span>
  );
};

const LiveMatchCard = ({ item, index }) => {
  const [imgError, setImgError] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
      className="flex-shrink-0 w-44 md:w-52 group cursor-pointer"
    >
      <div className="aspect-video rounded-xl overflow-hidden relative bg-gradient-to-br from-orange-900 to-red-900">
        {!imgError ? (
          <img src={item.image} alt={item.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-500" onError={() => setImgError(true)} />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        {/* Live/tag badge */}
        <div className="absolute top-2 left-2">
          {item.isLive ? <LiveBadge /> : <span className="bg-black/70 text-yellow-400 text-[10px] font-bold px-2 py-0.5 rounded border border-yellow-500/30">{item.sport}</span>}
        </div>
        {/* Play button */}
        <Link to={`/watch/${item.id}`} className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/40 flex items-center justify-center group-hover:bg-white/30 transition-colors">
            <Play className="w-5 h-5 text-white ml-0.5" fill="currentColor" />
          </div>
        </Link>
        {/* Title overlay */}
        <div className="absolute bottom-2 left-2 right-2">
          <p className="text-white text-xs font-bold leading-tight truncate">{item.title}</p>
          <p className="text-gray-300 text-[10px] truncate">{item.subtitle}</p>
        </div>
      </div>
    </motion.div>
  );
};

const TrendingCard = ({ item, index }) => {
  const [imgError, setImgError] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="flex-shrink-0 w-44 md:w-52 group cursor-pointer"
    >
      <div className="aspect-video rounded-xl overflow-hidden relative bg-gray-900">
        {!imgError ? (
          <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" onError={() => setImgError(true)} />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute top-2 left-2"><TagBadge tag={item.tag} /></div>
        <Link to={`/watch/${item.id}`} className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="w-11 h-11 rounded-full bg-white/20 backdrop-blur-sm border border-white/40 flex items-center justify-center">
            <Play className="w-4 h-4 text-white ml-0.5" fill="currentColor" />
          </div>
        </Link>
        <div className="absolute bottom-2 left-2 right-2">
          <p className="text-white text-xs font-bold truncate">{item.title}</p>
          <p className="text-gray-300 text-[10px] truncate">{item.subtitle}</p>
        </div>
      </div>
    </motion.div>
  );
};

const UpcomingCard = ({ item, index }) => {
  const [imgError, setImgError] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.07 }}
      className="flex-shrink-0 w-48 md:w-56 group cursor-pointer"
    >
      <div className="aspect-video rounded-xl overflow-hidden relative bg-gray-900">
        {!imgError ? (
          <img src={item.image} alt={item.title} className="w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500" onError={() => setImgError(true)} />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-10 h-10 rounded-full border-2 border-white/50 bg-black/30 flex items-center justify-center">
            <Play className="w-4 h-4 text-white ml-0.5" fill="currentColor" />
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-2">
          <p className="text-white text-xs font-bold truncate">{item.title}</p>
          <p className="text-yellow-400 text-[10px] font-semibold">{item.subtitle}</p>
        </div>
      </div>
    </motion.div>
  );
};

const SportCard = ({ item, index }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: index * 0.07 }}
    className={`flex-shrink-0 w-36 md:w-44 h-28 md:h-32 rounded-2xl bg-gradient-to-br ${item.color} flex flex-col items-center justify-center cursor-pointer hover:scale-105 transition-transform duration-300 border border-white/10 relative overflow-hidden`}
  >
    <div className="absolute inset-0 bg-black/20" />
    <span className="text-4xl mb-2 relative z-10">{item.icon}</span>
    <p className="text-white font-black text-sm tracking-wider relative z-10">{item.name}</p>
    <p className="text-white/60 text-[10px] relative z-10">{item.count}</p>
  </motion.div>
);

const ContentCard = ({ item, index }) => {
  const [imgError, setImgError] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="flex-shrink-0 w-36 md:w-44 group cursor-pointer"
    >
      <div className="aspect-[2/3] rounded-xl overflow-hidden relative bg-gray-900">
        {!imgError ? (
          <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" onError={() => setImgError(true)} />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-black">
            <Trophy className="w-10 h-10 text-white/20" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        {item.tag && <div className="absolute top-2 left-2"><TagBadge tag={item.tag} /></div>}
        <Link to={`/watch/${item.id}`} className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="w-11 h-11 rounded-full bg-white/20 backdrop-blur-sm border border-white/40 flex items-center justify-center">
            <Play className="w-4 h-4 text-white ml-0.5" fill="currentColor" />
          </div>
        </Link>
      </div>
      <div className="mt-2 px-0.5">
        <h3 className="text-white text-sm font-semibold truncate">{item.title}</h3>
        <p className="text-gray-400 text-xs truncate">{item.subtitle}</p>
        {item.rating && (
          <div className="flex items-center gap-1 mt-0.5">
            <Star className="w-3 h-3 text-yellow-400" fill="currentColor" />
            <span className="text-yellow-400 text-xs">{item.rating}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

const ScrollStrip = ({ title, items, CardComponent, isLive }) => {
  const ref = useRef(null);
  const scroll = (dir) => ref.current?.scrollBy({ left: dir * 320, behavior: 'smooth' });

  return (
    <div className="mb-10">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          {isLive && <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />}
          <h2 className="text-white text-xl font-bold">{title}</h2>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </div>
        <div className="flex gap-2">
          <button onClick={() => scroll(-1)} className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button onClick={() => scroll(1)} className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div ref={ref} className="flex gap-3 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {items.map((item, i) => <CardComponent key={item.id} item={item} index={i} />)}
      </div>
    </div>
  );
};

// ─── Promo Wide Banner ─────────────────────────────────────────────────────────

const PromoBanner = () => {
  const [imgError, setImgError] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative rounded-2xl overflow-hidden mb-10 h-52 md:h-64 bg-gradient-to-r from-blue-950 via-purple-950 to-black"
    >
      {!imgError && (
        <img src="/sports/football.png" alt="promo" className="absolute right-0 top-0 h-full object-cover opacity-40" onError={() => setImgError(true)} />
      )}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
      <div className="relative h-full flex flex-col justify-center px-8 md:px-12 gap-3">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-white text-xs font-black bg-white/10 border border-white/20 px-3 py-1 rounded-full">THE WORLD'S FINEST — THIS MAY</span>
        </div>
        <div className="flex flex-wrap gap-6 items-end">
          {/* Event 1 */}
          <div>
            <p className="text-yellow-400 text-xs font-bold mb-0.5">🎾 ROLAND GARROS</p>
            <p className="text-white text-lg font-black">Everyday 1:30 PM</p>
          </div>
          <div className="w-px h-12 bg-white/20 hidden md:block" />
          {/* Event 2 */}
          <div>
            <p className="text-blue-400 text-xs font-bold mb-0.5">⚽ PSG vs ARSENAL — UCL FINAL</p>
            <p className="text-white text-lg font-black">30th May | 8:00 PM</p>
          </div>
          <div className="w-px h-12 bg-white/20 hidden md:block" />
          {/* Event 3 */}
          <div>
            <p className="text-green-400 text-xs font-bold mb-0.5">🏏 ENG vs IND — 1st T20I</p>
            <p className="text-white text-lg font-black">28th May | 11:00 PM</p>
          </div>
        </div>
        <Link
          to="/watch/2001"
          className="flex items-center gap-2 bg-white text-black font-bold text-sm px-6 py-2.5 rounded-lg hover:bg-gray-100 transition-colors w-max mt-2"
        >
          <Play className="w-4 h-4" fill="currentColor" />
          Watch Promo
        </Link>
      </div>
    </motion.div>
  );
};

// ─── Hero Section ──────────────────────────────────────────────────────────────

const HeroSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef(null);
  const slides = HERO_SLIDES;
  const active = slides[activeIndex];

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(intervalRef.current);
  }, [slides.length]);

  const goTo = (i) => {
    setActiveIndex(i);
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
  };

  return (
    <div className="relative w-full h-[85vh] md:h-[90vh] overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        <motion.img
          key={active.thumbnail}
          src={active.thumbnail}
          alt={active.title}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-[#000000]/60 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#000000] via-[#000000]/80 to-transparent w-full md:w-2/3" />

      <div className="absolute bottom-10 md:bottom-20 left-0 w-full z-10">
        <div className="px-4 md:px-8 pl-6 md:pl-10 flex flex-col h-full">
          <div className="max-w-2xl mb-12">
            {/* Badges */}
            <div className="flex items-center gap-2 mb-4">
              {active.isLive ? (
                <LiveBadge />
              ) : (
                <span className="bg-white text-black text-[11px] font-black px-3 py-1 rounded-full tracking-wider uppercase">{active.badge}</span>
              )}
              <span className="bg-green-600/80 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1 rounded-full border border-green-500/30">
                {active.sport}
              </span>
            </div>

            {/* Title */}
            <AnimatePresence mode="wait">
              <motion.h1
                key={`t-${activeIndex}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="text-5xl md:text-7xl font-extrabold text-white mb-2 tracking-tight leading-tight"
              >
                {active.title}
              </motion.h1>
            </AnimatePresence>

            <p className="text-yellow-400 font-bold text-base mb-3">{active.subtitle}</p>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-2 text-white font-semibold text-sm mb-6">
              <span>{active.language}</span>
              <span className="text-gray-400">•</span>
              <span>{active.sport}</span>
              <span className="text-gray-400">•</span>
              <span>{active.year}</span>
            </div>

            {/* Description */}
            <AnimatePresence mode="wait">
              <motion.p
                key={`d-${activeIndex}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="text-gray-300 text-sm max-w-lg mb-8 line-clamp-2 hidden md:block"
              >
                {active.description}
              </motion.p>
            </AnimatePresence>

            {/* Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <Link to={`/watch/${active.id}`} className="flex items-center gap-2 px-8 py-3 bg-white hover:bg-gray-200 text-black rounded font-bold transition-all text-base min-w-[160px]">
                <Play className="w-5 h-5" fill="currentColor" />
                Watch Now
              </Link>
              <button className="flex items-center gap-2 px-5 py-3 bg-black/50 hover:bg-white/10 text-white rounded border border-white/30 transition-all font-semibold text-sm">
                <Plus className="w-5 h-5" />
                Remind Me
              </button>
            </div>
          </div>

          {/* Right thumbnail carousel */}
          <div className="absolute right-0 bottom-10 md:bottom-16 max-w-[50%] hidden md:flex items-center">
            <button onClick={() => goTo(activeIndex === 0 ? slides.length - 1 : activeIndex - 1)} className="w-8 h-8 text-white hover:text-green-400 flex items-center justify-center transition-colors z-20">
              <ChevronLeft className="w-8 h-8" />
            </button>
            <div className="flex gap-3 overflow-hidden px-2">
              {slides.map((s, i) => (
                <div
                  key={s.id}
                  onClick={() => goTo(i)}
                  className={`relative w-36 h-20 rounded-md overflow-hidden cursor-pointer transition-all duration-300 border-2 transform ${
                    activeIndex === i ? 'border-white scale-105 z-10' : 'border-transparent opacity-60 hover:opacity-100 hover:border-white/50'
                  }`}
                >
                  <img src={s.thumbnail} alt={s.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/20 flex items-end p-1.5">
                    {s.isLive ? <LiveBadge /> : <Play className="w-4 h-4 text-white" fill="currentColor" />}
                  </div>
                </div>
              ))}
            </div>
            <button onClick={() => goTo((activeIndex + 1) % slides.length)} className="w-8 h-8 text-white hover:text-green-400 flex items-center justify-center transition-colors z-20">
              <ChevronRight className="w-8 h-8" />
            </button>
          </div>

          {/* Mobile dots */}
          <div className="flex items-center gap-2 mb-2 md:hidden">
            {slides.map((_, i) => (
              <button key={i} onClick={() => goTo(i)} className={`h-1 rounded-full transition-all duration-300 ${i === activeIndex ? 'w-6 bg-white' : 'w-2 bg-white/40'}`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Main Page ─────────────────────────────────────────────────────────────────

const Sports = () => (
  <div className="min-h-screen bg-background pb-20 pl-0 md:pl-20">

    <HeroSection />

    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">

      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-700 flex items-center justify-center shadow-lg shadow-green-500/30">
          <Trophy className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">Sports</h1>
          <p className="text-gray-400 text-sm">Live matches, highlights & sports shows</p>
        </div>
      </div>

      {/* Live Matches */}
      <ScrollStrip title="Live & Latest Matches" items={LIVE_MATCHES} CardComponent={LiveMatchCard} isLive />

      {/* Trending */}
      <ScrollStrip title="Trending In Sports" items={TRENDING} CardComponent={TrendingCard} />

      {/* Upcoming Events */}
      <ScrollStrip title="New & Upcoming" items={UPCOMING_EVENTS} CardComponent={UpcomingCard} />

      {/* Popular Sports Grid */}
      <div className="mb-10">
        <h2 className="text-white text-xl font-bold mb-4">Popular Sports</h2>
        <div className="flex gap-3 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
          {POPULAR_SPORTS.map((s, i) => <SportCard key={s.id} item={s} index={i} />)}
        </div>
      </div>

      {/* Wide Promo Banner */}
      <PromoBanner />

      {/* Best in Cricket */}
      <ScrollStrip title="Best in Cricket" items={BEST_CRICKET} CardComponent={ContentCard} />

      {/* Best in Football */}
      <ScrollStrip title="Best in Football" items={BEST_FOOTBALL} CardComponent={ContentCard} />

      {/* Popular Shows */}
      <ScrollStrip title="Popular Sports Shows" items={POPULAR_SHOWS} CardComponent={ContentCard} />

    </div>
  </div>
);

export default Sports;
