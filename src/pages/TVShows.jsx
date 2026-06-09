import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Plus, ChevronLeft, ChevronRight, Tv, Star, Clock, Calendar } from 'lucide-react';

// ─── DATA ──────────────────────────────────────────────────────────────────────

const HERO_SLIDES = [
  {
    id: 1001,
    title: 'Hui Gumm Yaadein',
    subtitle: 'Ek Doctor, Do Zindagiyaan...',
    badge: 'NEW EPISODES EVERY DAY',
    languages: 'Hindi',
    genres: ['Drama', 'Romance', 'Medical'],
    year: '2026',
    description: 'A doctor torn between two lives rediscovers love, duty and forgotten memories in this heartfelt daily drama.',
    thumbnail: '/tvshows/hero_yaadein.png',
    network: 'SONY SET',
  },
  {
    id: 1002,
    title: 'Jai Hanuman',
    subtitle: 'The Eternal Devotion',
    badge: 'STREAMING NOW',
    languages: 'Hindi',
    genres: ['Mythology', 'Devotional', 'Epic'],
    year: '2025',
    description: 'The divine saga of Lord Hanuman — his unwavering devotion, extraordinary courage and celestial powers that shook the cosmos.',
    thumbnail: '/tvshows/jai_hanuman.png',
    network: 'SONY SET',
  },
  {
    id: 1003,
    title: 'Hastinapur Ke Veer',
    subtitle: 'The Warriors of Hastinapur',
    badge: 'PREMIERING 2ND JUN | 9:00 PM',
    languages: 'Hindi',
    genres: ['Historical', 'Epic', 'Action'],
    year: '2026',
    description: 'An epic retelling of the legendary warriors of Hastinapur — their sacrifices, honor and unbreakable spirit.',
    thumbnail: '/tvshows/hastinapur.png',
    network: 'SONY SAB',
  },
  {
    id: 1004,
    title: "India's Best Dancer",
    subtitle: 'Season 5 — Find the Best',
    badge: "6TH JUN | 9:30 PM",
    languages: 'Hindi',
    genres: ['Reality', 'Dance', 'Entertainment'],
    year: '2026',
    description: 'India\'s most prestigious dance reality show returns for Season 5 with bigger stages, bigger dreams and extraordinary talent.',
    thumbnail: '/tvshows/best_dancer.png',
    network: 'SONY SET',
  },
];

const LATEST_EPISODES = [
  { id: 1011, title: 'Gullak 5', image: '/tvshows/gullak.png', episode: 'Ep 3 · Naye Hisse', network: 'TVF', rating: 9.0 },
  { id: 1012, title: 'Vashikaranam', image: '/tvshows/vashikaranam.png', episode: 'Ep 112 · Twist', network: 'SONY SET', rating: 7.8 },
  { id: 1013, title: 'Indian Idol', image: '/tvshows/indian_idol.png', episode: 'Ep 22 · Grand Stage', network: 'SONY SET', rating: 8.2 },
  { id: 1014, title: 'Hui Gumm Yaadein', image: '/tvshows/hero_yaadein.png', episode: 'Ep 45 · Raaz', network: 'SONY SET', rating: 7.9 },
  { id: 1015, title: 'Jai Hanuman', image: '/tvshows/jai_hanuman.png', episode: 'Ep 88 · Shakti', network: 'SONY SET', rating: 8.5 },
  { id: 1016, title: 'Shrimad Ramayan', image: '/tvshows/shrimad_ramayan.png', episode: 'Ep 210 · Setu', network: 'SONY SET', rating: 8.7 },
  { id: 1017, title: "India's Best Dancer", image: '/tvshows/best_dancer.png', episode: 'Ep 8 · Top 12', network: 'SONY SET', rating: 8.0 },
];

const UPCOMING = [
  { id: 1021, title: 'Hastinapur Ke Veer', image: '/tvshows/hastinapur.png', date: '2ND JUN | 9:00 PM' },
  { id: 1022, title: "India's Best Dancer S5", image: '/tvshows/best_dancer.png', date: '6TH JUN | 9:30 PM' },
  { id: 1023, title: 'Gullak 5', image: '/tvshows/gullak.png', date: '5TH JUN | STREAMING' },
];

const SAB_SHOWS = [
  { id: 1031, title: 'Taarak Mehta Ka Ooltah Chashmah', image: '/tvshows/hero_yaadein.png', seasons: '17 Seasons', rating: 8.1 },
  { id: 1032, title: 'Pushpa Impossible', image: '/tvshows/vashikaranam.png', seasons: '3 Seasons', rating: 7.9 },
  { id: 1033, title: 'Wagle Ki Duniya', image: '/tvshows/gullak.png', seasons: '4 Seasons', rating: 7.7 },
  { id: 1034, title: 'Maddam Sir', image: '/tvshows/shrimad_ramayan.png', seasons: '3 Seasons', rating: 7.5 },
  { id: 1035, title: 'Alibek aur 40 Chor', image: '/tvshows/jai_hanuman.png', seasons: '2 Seasons', rating: 7.8 },
  { id: 1036, title: 'Hero - Gayab Mode On', image: '/tvshows/indian_idol.png', seasons: '1 Season', rating: 7.3 },
];

const SET_SHOWS = [
  { id: 1041, title: 'Indian Idol', image: '/tvshows/indian_idol.png', seasons: '14 Seasons', rating: 8.2 },
  { id: 1042, title: 'Vashikaranam', image: '/tvshows/vashikaranam.png', seasons: '2 Seasons', rating: 7.8 },
  { id: 1043, title: 'Tum Ho Naa', image: '/tvshows/hero_yaadein.png', seasons: '1 Season', rating: 7.6 },
  { id: 1044, title: 'Wheel of Fortune', image: '/tvshows/gullak.png', seasons: '1 Season', rating: 7.4 },
  { id: 1045, title: 'Kaun Banega Crorepati', image: '/tvshows/hastinapur.png', seasons: '15 Seasons', rating: 8.8 },
  { id: 1046, title: 'Shark Tank India', image: '/tvshows/best_dancer.png', seasons: '4 Seasons', rating: 8.6 },
];

const MYTHOLOGY_SHOWS = [
  { id: 1051, title: 'Ganesha Kartik Chandra', image: '/tvshows/shrimad_ramayan.png', seasons: '2 Seasons', rating: 8.4 },
  { id: 1052, title: 'Jai Hanuman', image: '/tvshows/jai_hanuman.png', seasons: '1 Season', rating: 8.5 },
  { id: 1053, title: 'Shrimad Ramayan', image: '/tvshows/shrimad_ramayan.png', seasons: '2 Seasons', rating: 8.7 },
  { id: 1054, title: 'Sai Baba', image: '/tvshows/hero_yaadein.png', seasons: '3 Seasons', rating: 8.2 },
  { id: 1055, title: 'Mahashakti Hanuman', image: '/tvshows/jai_hanuman.png', seasons: '1 Season', rating: 8.0 },
  { id: 1056, title: 'Jai Shiv Shankar', image: '/tvshows/shrimad_ramayan.png', seasons: '1 Season', rating: 7.9 },
];

const StreamX_EXCLUSIVES = [
  { id: 1061, title: 'Undekhi - The Final Battle', image: '/tvshows/vashikaranam.png', seasons: '3 Seasons', rating: 8.5 },
  { id: 1062, title: 'Baalveer', image: '/tvshows/jai_hanuman.png', seasons: '4 Seasons', rating: 8.0 },
  { id: 1063, title: 'Raisinghani vs Raisinghani', image: '/tvshows/hero_yaadein.png', seasons: '1 Season', rating: 8.1 },
  { id: 1064, title: 'Adrishyam', image: '/tvshows/vashikaranam.png', seasons: '1 Season', rating: 8.3 },
  { id: 1065, title: 'MasterChef India', image: '/tvshows/gullak.png', seasons: '8 Seasons', rating: 8.4 },
  { id: 1066, title: 'College Romance', image: '/tvshows/best_dancer.png', seasons: '4 Seasons', rating: 8.8 },
];

const PROMO = {
  id: 1099,
  label: 'ALL EPISODES OUT NOW',
  title: 'Gullak 5',
  subtitle: 'Naye Hisse...Naye Kisse',
  detail: 'Streaming from 5th Jun',
  image: '/tvshows/gullak.png',
};

// ─── Shared Components ─────────────────────────────────────────────────────────

const TVCard = ({ item, index }) => {
  const [imgError, setImgError] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      className="flex-shrink-0 w-36 md:w-44 group cursor-pointer"
    >
      <div className="aspect-[2/3] rounded-xl overflow-hidden relative bg-white/5">
        {!imgError ? (
          <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" onError={() => setImgError(true)} />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-900/40 to-black">
            <Tv className="w-10 h-10 text-white/20" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <Link to={`/watch/${item.id}`} className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
            <Play className="w-5 h-5 text-white ml-0.5" fill="currentColor" />
          </div>
        </Link>
      </div>
      <div className="mt-2 px-0.5">
        <h3 className="text-white text-sm font-semibold truncate">{item.title}</h3>
        <div className="flex items-center gap-1.5 mt-0.5">
          <Star className="w-3 h-3 text-yellow-400" fill="currentColor" />
          <span className="text-yellow-400 text-xs">{item.rating}</span>
          <span className="text-gray-500 text-xs">•</span>
          <span className="text-gray-400 text-xs truncate">{item.seasons}</span>
        </div>
      </div>
    </motion.div>
  );
};

const EpisodeCard = ({ item, index }) => {
  const [imgError, setImgError] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="flex-shrink-0 w-40 md:w-48 group cursor-pointer"
    >
      <div className="aspect-[2/3] rounded-xl overflow-hidden relative bg-white/5">
        {!imgError ? (
          <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" onError={() => setImgError(true)} />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-900/40 to-black"><Tv className="w-10 h-10 text-white/20" /></div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
        <div className="absolute bottom-2 left-2 right-2">
          <span className="text-[10px] text-blue-300 font-semibold bg-blue-900/60 px-1.5 py-0.5 rounded">{item.network}</span>
        </div>
        <Link to={`/watch/${item.id}`} className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-11 h-11 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
            <Play className="w-4 h-4 text-white ml-0.5" fill="currentColor" />
          </div>
        </Link>
      </div>
      <div className="mt-2 px-0.5">
        <h3 className="text-white text-sm font-semibold truncate">{item.title}</h3>
        <p className="text-gray-400 text-xs truncate">{item.episode}</p>
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
      transition={{ delay: index * 0.08 }}
      className="flex-shrink-0 w-40 md:w-48 group cursor-pointer relative"
    >
      <div className="aspect-[2/3] rounded-xl overflow-hidden relative bg-white/5">
        {!imgError ? (
          <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" onError={() => setImgError(true)} />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-800 to-black flex items-center justify-center"><Tv className="w-10 h-10 text-white/20" /></div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
        {/* Overlay play button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-11 h-11 rounded-full border-2 border-white/60 flex items-center justify-center bg-black/30">
            <Play className="w-4 h-4 text-white ml-0.5" fill="currentColor" />
          </div>
        </div>
        {/* Date badge */}
        <div className="absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur-sm px-3 py-2">
          <p className="text-white text-[11px] font-bold truncate">{item.title}</p>
          <p className="text-yellow-400 text-[10px] font-semibold">{item.date}</p>
        </div>
      </div>
    </motion.div>
  );
};

const ScrollStrip = ({ title, items, CardComponent = TVCard }) => {
  const ref = useRef(null);
  const scroll = (dir) => ref.current?.scrollBy({ left: dir * 320, behavior: 'smooth' });

  return (
    <div className="mb-10">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
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

const PromoBanner = ({ data }) => {
  const [imgError, setImgError] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative rounded-2xl overflow-hidden mb-10 h-48 md:h-56 group cursor-pointer"
    >
      {!imgError && <img src={data.image} alt={data.title} className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-60 transition-opacity" onError={() => setImgError(true)} />}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/20" />
      <div className="relative h-full flex flex-col justify-center px-8 md:px-12">
        <span className="inline-block border border-white text-white text-xs font-black px-3 py-1 rounded-sm mb-3 w-max tracking-wider">{data.label}</span>
        <p className="text-gray-300 text-xs mb-1 uppercase tracking-widest">StreamX Originals</p>
        <h2 className="text-white text-3xl md:text-4xl font-black mb-1">{data.title}</h2>
        <p className="text-gray-300 text-sm mb-1 italic">{data.subtitle}</p>
        <p className="text-yellow-400 text-sm font-bold mb-4">{data.detail}</p>
        <Link to={`/watch/${data.id}`} className="flex items-center gap-2 bg-white text-black font-bold text-sm px-5 py-2.5 rounded-lg hover:bg-gray-100 transition-colors w-max">
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

  const prevSlide = () => goTo(activeIndex === 0 ? slides.length - 1 : activeIndex - 1);
  const nextSlide = () => goTo((activeIndex + 1) % slides.length);

  return (
    <div className="relative w-full h-[85vh] md:h-[90vh] overflow-hidden bg-black">
      {/* Background with crossfade */}
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

      {/* Gradients — same as HeroBanner */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-[#000000]/60 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#000000] via-[#000000]/80 to-transparent w-full md:w-2/3" />

      {/* Content */}
      <div className="absolute bottom-10 md:bottom-20 left-0 w-full z-10">
        <div className="px-4 md:px-8 pl-6 md:pl-10 flex flex-col justify-end h-full">
          <div className="max-w-2xl mb-12">
            {/* Badge + Network */}
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-white text-black text-[11px] font-black px-3 py-1 rounded-full tracking-wider uppercase">
                {active.badge}
              </span>
              <span className="bg-blue-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                {active.network}
              </span>
            </div>

            {/* Title */}
            <AnimatePresence mode="wait">
              <motion.h1
                key={`title-${activeIndex}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="text-5xl md:text-7xl font-extrabold text-white mb-2 tracking-tight leading-tight"
              >
                {active.title}
              </motion.h1>
            </AnimatePresence>

            {/* Subtitle */}
            <AnimatePresence mode="wait">
              <motion.p
                key={`sub-${activeIndex}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="text-gray-300 text-lg italic mb-3"
              >
                {active.subtitle}
              </motion.p>
            </AnimatePresence>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-2 text-white font-bold text-[14px] mb-6">
              <span>{active.languages}</span>
              <span className="text-gray-400 text-xs">•</span>
              <span>{active.genres.join(', ')}</span>
              <span className="text-gray-400 text-xs">•</span>
              <span>{active.year}</span>
            </div>

            {/* Description */}
            <AnimatePresence mode="wait">
              <motion.p
                key={`desc-${activeIndex}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, delay: 0.15 }}
                className="text-gray-300 text-sm max-w-lg mb-8 line-clamp-2 hidden md:block"
              >
                {active.description}
              </motion.p>
            </AnimatePresence>

            {/* Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <Link
                to={`/watch/${active.id}`}
                className="flex items-center justify-center gap-2 px-8 py-3 bg-white hover:bg-gray-200 text-black rounded font-bold transition-all text-[16px] min-w-[180px]"
              >
                <Play className="w-6 h-6" fill="currentColor" />
                Watch Now
              </Link>
              <button className="flex items-center gap-2 px-5 py-3 bg-black/50 hover:bg-white/10 text-white rounded border border-white/30 transition-all font-semibold text-sm">
                <Plus className="w-5 h-5" />
                My List
              </button>
            </div>
          </div>

          {/* Right thumbnail carousel — same as HeroBanner */}
          <div className="absolute right-0 bottom-10 md:bottom-16 max-w-[50%] hidden md:flex items-center">
            <button onClick={prevSlide} className="w-8 h-8 text-white hover:text-blue-400 flex items-center justify-center transition-colors z-20">
              <ChevronLeft className="w-8 h-8" />
            </button>
            <div className="flex gap-3 overflow-hidden px-2">
              {slides.map((slide, i) => (
                <div
                  key={slide.id}
                  onClick={() => goTo(i)}
                  className={`relative w-36 h-20 rounded-md overflow-hidden cursor-pointer transition-all duration-300 transform border-2 ${
                    activeIndex === i ? 'border-white scale-105 z-10' : 'border-transparent opacity-60 hover:opacity-100 hover:border-white/50'
                  }`}
                >
                  <img src={slide.thumbnail} alt={slide.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/20 flex items-end justify-start p-2">
                    <Play className="w-4 h-4 text-white" fill="currentColor" />
                  </div>
                </div>
              ))}
            </div>
            <button onClick={nextSlide} className="w-8 h-8 text-white hover:text-blue-400 flex items-center justify-center transition-colors z-20">
              <ChevronRight className="w-8 h-8" />
            </button>
          </div>

          {/* Mobile dots */}
          <div className="flex items-center gap-2 mb-2 md:hidden">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`h-1 rounded-full transition-all duration-300 ${i === activeIndex ? 'w-6 bg-white' : 'w-2 bg-white/40'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Main Page ─────────────────────────────────────────────────────────────────

const TVShows = () => {
  return (
    <div className="min-h-screen bg-background pb-20 pl-0 md:pl-20">

      {/* Hero */}
      <HeroSection />

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">

        {/* Page header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
            <Tv className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">TV Shows</h1>
            <p className="text-gray-400 text-sm">Latest episodes, daily soaps & reality shows</p>
          </div>
        </div>

        {/* Latest Episodes */}
        <ScrollStrip title="Latest Episodes" items={LATEST_EPISODES} CardComponent={EpisodeCard} />

        {/* Upcoming TV Shows */}
        <ScrollStrip title="Upcoming TV Shows" items={UPCOMING} CardComponent={UpcomingCard} />

        {/* Promo Banner */}
        <PromoBanner data={PROMO} />

        {/* Sony SAB Shows */}
        <ScrollStrip title="Sony SAB TV Shows" items={SAB_SHOWS} />

        {/* SET Shows */}
        <ScrollStrip title="SET Shows" items={SET_SHOWS} />

        {/* Popular Mythology */}
        <ScrollStrip title="Popular Mythology Shows" items={MYTHOLOGY_SHOWS} />

        {/* StreamX Exclusives */}
        <ScrollStrip title="StreamX Exclusives" items={StreamX_EXCLUSIVES} />

      </div>
    </div>
  );
};

export default TVShows;
