import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Plus, ChevronLeft, ChevronRight, Crown, Star, Check, Info } from 'lucide-react';

// ─── DATA ──────────────────────────────────────────────────────────────────────

const HERO_FEATURED = {
  id: 501,
  title: 'The Family Man',
  subtitle: 'A StreamX Original Series',
  badge: 'ALL EPISODES OUT NOW',
  description: 'A middle-class man who is secretly a world-class spy tries to protect his country while simultaneously saving his marriage, managing his kids, and paying his EMIs.',
  meta: '7 Languages  •  Crime, Drama, Thriller  •  2019',
  image: '/webseries/family_man.png',
  age: 'U/A 16+',
};

const HERO_SLIDES = [
  {
    id: 501,
    title: 'The Family Man',
    badge: 'ALL EPISODES OUT NOW',
    languages: '7 Languages',
    genres: ['Crime', 'Drama', 'Thriller'],
    year: '2019',
    description: 'A middle-class man who is secretly a world-class spy tries to protect his country while simultaneously saving his marriage, managing his kids, and paying his EMIs.',
    thumbnail: '/webseries/family_man.png',
    premium: true,
  },
  {
    id: 502,
    title: 'Game of Thrones',
    badge: 'ALL SEASONS AVAILABLE',
    languages: '5 Languages',
    genres: ['Fantasy', 'Drama', 'Action'],
    year: '2011',
    description: 'Nine noble families fight for control over the lands of Westeros, while an ancient enemy returns after being dormant for millennia.',
    thumbnail: '/webseries/GOT.png',
    premium: true,
  },
  {
    id: 503,
    title: 'Ramayana',
    badge: 'STREAMING NOW',
    languages: '8 Languages',
    genres: ['Epic', 'Drama', 'Mythology'],
    year: '2025',
    description: 'An epic retelling of the ancient Indian mythological saga of Lord Rama, blending timeless values with stunning cinematic visuals.',
    thumbnail: '/latest/ramayana.png',
    premium: true,
  },
  {
    id: 504,
    title: 'Money Heist',
    badge: 'ALL PARTS OUT NOW',
    languages: '4 Languages',
    genres: ['Crime', 'Thriller', 'Drama'],
    year: '2017',
    description: 'Eight thieves take hostages and lock themselves in the Royal Mint of Spain as a criminal mastermind manipulates the police.',
    thumbnail: '/webseries/money.png',
    premium: true,
  },
  {
    id: 505,
    title: 'Lucifer',
    badge: 'ALL SEASONS AVAILABLE',
    languages: '3 Languages',
    genres: ['Fantasy', 'Crime', 'Comedy'],
    year: '2016',
    description: 'Lucifer Morningstar, the Devil himself, abandons Hell and moves to Los Angeles, where he runs a nightclub and assists the LAPD.',
    thumbnail: '/webseries/lucifer.png',
    premium: true,
  },
];

const BEST_SELLERS = [
  { id: 601, title: 'Maharani', image: '/webseries/GOT.png', genre: 'Power & Politics', seasons: '3 Seasons', rating: 8.6 },
  { id: 602, title: 'Scam 2003', image: '/latest/ramayana.png', genre: 'Drama', seasons: '1 Season', rating: 8.8 },
  { id: 603, title: 'Avrodh', image: '/webseries/money.png', genre: 'Action, Thriller', seasons: '2 Seasons', rating: 8.1 },
  { id: 604, title: 'Freedom at Midnight', image: '/latest/fighter.png', genre: 'Historical', seasons: '1 Season', rating: 8.9 },
  { id: 605, title: 'Tabbar', image: '/webseries/squad.png', genre: 'Crime, Family', seasons: '1 Season', rating: 8.4 },
  { id: 606, title: 'Gullak', image: '/latest/animal.png', genre: 'Comedy, Family', seasons: '4 Seasons', rating: 9.0 },
  { id: 607, title: 'Your Honor', image: '/webseries/wednesday.png', genre: 'Legal, Thriller', seasons: '2 Seasons', rating: 8.3 },
  { id: 608, title: 'The Family Man', image: '/webseries/family_man.png', genre: 'Action, Drama', seasons: '2 Seasons', rating: 8.7 },
];

const FEEL_GOOD = [
  { id: 701, title: 'Real Kashmir FC', image: '/webseries/hotel.png', genre: 'Sports Drama', seasons: '1 Season', rating: 8.2 },
  { id: 702, title: 'Gullak', image: '/latest/animal.png', genre: 'Comedy, Family', seasons: '4 Seasons', rating: 9.0 },
  { id: 703, title: 'Cubicles', image: '/latest/Great.png', genre: 'Comedy, Drama', seasons: '3 Seasons', rating: 8.5 },
  { id: 704, title: 'College Romance', image: '/webseries/queen.png', genre: 'Romantic Comedy', seasons: '4 Seasons', rating: 8.8 },
  { id: 705, title: 'Raat Jawaan Hai', image: '/webseries/sweet.png', genre: 'Comedy', seasons: '1 Season', rating: 7.9 },
  { id: 706, title: 'Shantit Kranti', image: '/webseries/Squad.png', genre: 'Political Comedy', seasons: '2 Seasons', rating: 8.1 },
];

const POWER_POLITICS = [
  { id: 801, title: 'Maharani', image: '/webseries/GOT.png', genre: 'Political Drama', seasons: '3 Seasons', rating: 8.6 },
  { id: 802, title: 'Rocket Boys', image: '/latest/fighter.png', genre: 'Biographical', seasons: '2 Seasons', rating: 9.1 },
  { id: 803, title: 'Freedom at Midnight', image: '/latest/ramayana.png', genre: 'Historical', seasons: '1 Season', rating: 8.9 },
  { id: 804, title: 'Kathmandu Connection', image: '/webseries/train.png', genre: 'Crime Thriller', seasons: '2 Seasons', rating: 8.3 },
  { id: 805, title: 'JL50', image: '/webseries/lucifer.png', genre: 'Mystery, Thriller', seasons: '1 Season', rating: 8.0 },
  { id: 806, title: 'Your Honor', image: '/webseries/wednesday.png', genre: 'Legal, Thriller', seasons: '2 Seasons', rating: 8.3 },
];

const CRIME_THRILLERS = [
  { id: 901, title: 'Tabbar', image: '/webseries/Squad.png', genre: 'Crime, Family', seasons: '1 Season', rating: 8.4 },
  { id: 902, title: 'Undekhi', image: '/latest/dhurandhar.png', genre: 'Crime Thriller', seasons: '3 Seasons', rating: 8.5 },
  { id: 903, title: 'Avrodh', image: '/webseries/money.png', genre: 'Action, Thriller', seasons: '2 Seasons', rating: 8.1 },
  { id: 904, title: 'Tanaav', image: '/latest/bhootB.png', genre: 'Drama, Thriller', seasons: '2 Seasons', rating: 8.0 },
  { id: 905, title: 'Kathmandu Connection', image: '/webseries/train.png', genre: 'Crime Thriller', seasons: '2 Seasons', rating: 8.3 },
  { id: 906, title: 'JL50', image: '/webseries/lucifer.png', genre: 'Mystery', seasons: '1 Season', rating: 8.0 },
];

const PROMO_BANNER = {
  id: 999,
  label: 'NEW SERIES',
  title: 'Rocket Boys',
  subtitle: 'The untold story of India\'s greatest scientific minds',
  image: '/latest/skyF.png',
};

// ─── Components ────────────────────────────────────────────────────────────────

const CrownBadge = () => (
  <div className="absolute top-2 left-2 z-10">
    <Crown className="w-4 h-4 text-yellow-400 drop-shadow-md" fill="currentColor" />
  </div>
);

const OriginalCard = ({ item, index, size = 'normal' }) => {
  const [imgError, setImgError] = useState(false);
  const [added, setAdded] = useState(false);

  const isLarge = size === 'large';

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      className={`relative flex-shrink-0 group cursor-pointer rounded-xl overflow-hidden ${isLarge ? 'w-44 md:w-52' : 'w-36 md:w-44'}`}
    >
      {/* Poster */}
      <div className={`relative overflow-hidden rounded-xl ${isLarge ? 'aspect-[2/3]' : 'aspect-[2/3]'} bg-white/5`}>
        <CrownBadge />

        {/* Sony StreamX Originals watermark */}
        <div className="absolute top-2 right-0 z-10 bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded-l-md">
          <span className="text-[9px] font-bold text-yellow-400 tracking-wider">StreamX ORIGINALS</span>
        </div>

        {!imgError ? (
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-yellow-900/40 to-black">
            <Crown className="w-10 h-10 text-yellow-400/40" />
          </div>
        )}

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />

        {/* Hover actions */}
        <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <Link
            to={`/watch/${item.id}`}
            className="flex items-center justify-center gap-1.5 bg-white text-black font-bold text-xs py-2 rounded-lg mb-2 hover:bg-gray-100 transition-colors"
          >
            <Play className="w-3 h-3" fill="currentColor" />
            Watch Now
          </Link>
          <button
            onClick={() => setAdded(!added)}
            className={`flex items-center justify-center gap-1.5 w-full font-semibold text-xs py-1.5 rounded-lg border transition-all ${added ? 'bg-green-600/30 border-green-500/50 text-green-400' : 'bg-white/10 border-white/30 text-white'}`}
          >
            {added ? <Check className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
            {added ? 'Added' : 'My List'}
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="pt-2 pb-1 px-0.5">
        <h3 className="text-white text-sm font-semibold truncate">{item.title}</h3>
        <div className="flex items-center gap-1.5 mt-0.5">
          <Star className="w-3 h-3 text-yellow-400" fill="currentColor" />
          <span className="text-yellow-400 text-xs font-medium">{item.rating}</span>
          <span className="text-gray-500 text-xs">•</span>
          <span className="text-gray-400 text-xs truncate">{item.seasons}</span>
        </div>
        <p className="text-gray-500 text-xs truncate mt-0.5">{item.genre}</p>
      </div>
    </motion.div>
  );
};

const ScrollStrip = ({ title, items, size = 'normal' }) => {
  const ref = useRef(null);

  const scroll = (dir) => {
    if (ref.current) ref.current.scrollBy({ left: dir * 300, behavior: 'smooth' });
  };

  return (
    <div className="mb-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Crown className="w-5 h-5 text-yellow-400" fill="currentColor" />
          <h2 className="text-white text-xl font-bold">{title}</h2>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => scroll(-1)}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scroll(1)}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Scroll Row */}
      <div
        ref={ref}
        className="flex gap-3 overflow-x-auto scrollbar-hide pb-2"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {items.map((item, i) => (
          <OriginalCard key={item.id} item={item} index={i} size={size} />
        ))}
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
      className="relative rounded-2xl overflow-hidden mb-10 h-44 md:h-52 bg-gradient-to-r from-yellow-900 to-black cursor-pointer group"
    >
      {/* Background image */}
      {!imgError ? (
        <img
          src={data.image}
          alt={data.title}
          className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-50 transition-opacity"
          onError={() => setImgError(true)}
        />
      ) : null}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />

      {/* Content */}
      <div className="relative h-full flex flex-col justify-center px-8 md:px-12">
        <span className="inline-block bg-yellow-500 text-black text-xs font-black px-3 py-1 rounded-full mb-3 w-max tracking-wider">
          {data.label}
        </span>
        <h2 className="text-white text-2xl md:text-3xl font-black mb-1">{data.title}</h2>
        <p className="text-gray-300 text-sm max-w-md mb-4 line-clamp-2">{data.subtitle}</p>
        <Link
          to={`/watch/${data.id}`}
          className="flex items-center gap-2 bg-white text-black font-bold text-sm px-5 py-2.5 rounded-xl hover:bg-gray-100 transition-colors w-max"
        >
          <Play className="w-4 h-4" fill="currentColor" />
          Watch Now
        </Link>
      </div>

      {/* StreamX Originals badge */}
      <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-full border border-yellow-500/30">
        <Crown className="w-3.5 h-3.5 text-yellow-400" fill="currentColor" />
        <span className="text-yellow-400 text-xs font-bold tracking-wider">StreamX ORIGINALS</span>
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

  // Auto-advance every 5 seconds
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(intervalRef.current);
  }, [slides.length]);

  const goTo = (i) => {
    setActiveIndex(i);
    // Reset timer on manual click
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
  };

  const prevSlide = () => goTo(activeIndex === 0 ? slides.length - 1 : activeIndex - 1);
  const nextSlide = () => goTo((activeIndex + 1) % slides.length);

  return (
    <div className="relative w-full h-[85vh] md:h-[90vh] overflow-hidden bg-black group">

      {/* Background Image with crossfade */}
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

      {/* Gradient layers — identical to HeroBanner */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-[#000000]/60 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#000000] via-[#000000]/80 to-transparent w-full md:w-2/3" />

      {/* ── Left Content ── */}
      <div className="absolute bottom-10 md:bottom-20 left-0 w-full z-10">
        <div className="px-4 md:px-8 pl-6 md:pl-10 flex flex-col justify-end h-full">
          <div className="max-w-2xl mb-12">

            {/* Badges */}
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-white text-black text-[11px] font-black px-3 py-1 rounded-full tracking-wider uppercase">
                {active.badge}
              </span>
              <div className="flex items-center gap-1 bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded-full border border-yellow-500/40">
                <Crown className="w-3 h-3 text-yellow-400" fill="currentColor" />
                <span className="text-yellow-400 text-[10px] font-bold tracking-wider">StreamX ORIGINALS</span>
              </div>
            </div>

            {/* Title */}
            <AnimatePresence mode="wait">
              <motion.h1
                key={`title-${activeIndex}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="text-5xl md:text-7xl font-extrabold text-white mb-4 tracking-tight leading-tight"
              >
                {active.title}
              </motion.h1>
            </AnimatePresence>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-2 text-white font-bold text-[14px] md:text-[16px] mb-6">
              {active.premium && <Crown className="w-5 h-5 text-yellow-400" fill="currentColor" />}
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
                transition={{ duration: 0.4, delay: 0.1 }}
                className="text-gray-300 text-sm max-w-lg mb-8 line-clamp-2 hidden md:block"
              >
                {active.description}
              </motion.p>
            </AnimatePresence>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <Link
                to={`/watch/${active.id}`}
                className="flex items-center justify-center gap-2 px-8 py-3 bg-white hover:bg-gray-200 text-black rounded font-bold transition-all text-[16px] min-w-[180px]"
              >
                <Play className="w-6 h-6" fill="currentColor" />
                Watch Now
              </Link>
              <button className="flex items-center justify-center gap-2 px-5 py-3 bg-black/50 hover:bg-white/10 text-white rounded border border-white/30 transition-all font-semibold text-sm">
                <Plus className="w-5 h-5" />
                My List
              </button>
            </div>
          </div>

          {/* ── Right — Thumbnail Carousel (same as HeroBanner) ── */}
          <div className="absolute right-0 bottom-10 md:bottom-16 max-w-[50%] hidden md:flex items-center">
            <button onClick={prevSlide} className="w-8 h-8 text-white hover:text-yellow-400 flex items-center justify-center transition-colors z-20">
              <ChevronLeft className="w-8 h-8" />
            </button>

            <div className="flex gap-3 overflow-hidden px-2">
              {slides.map((slide, i) => (
                <div
                  key={slide.id}
                  onClick={() => goTo(i)}
                  className={`relative w-36 h-20 rounded-md overflow-hidden cursor-pointer transition-all duration-300 transform border-2 ${
                    activeIndex === i
                      ? 'border-white scale-105 z-10'
                      : 'border-transparent opacity-60 hover:opacity-100 hover:border-white/50'
                  }`}
                >
                  <img src={slide.thumbnail} alt={slide.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/20 flex items-end justify-start p-2">
                    <Play className="w-4 h-4 text-white" fill="currentColor" />
                  </div>
                </div>
              ))}
            </div>

            <button onClick={nextSlide} className="w-8 h-8 text-white hover:text-yellow-400 flex items-center justify-center transition-colors z-20">
              <ChevronRight className="w-8 h-8" />
            </button>
          </div>

          {/* Progress dots (mobile) */}
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

const Originals = () => {
  return (
    <div className="min-h-screen bg-background pb-20 pl-0 md:pl-20">

      {/* Hero — full width, no top padding so it touches the navbar */}
      <HeroSection />

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">

        {/* Page Title */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-600 flex items-center justify-center shadow-lg shadow-yellow-500/30">
            <Crown className="w-5 h-5 text-black" fill="currentColor" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">StreamX Originals</h1>
            <p className="text-gray-400 text-sm">Exclusive premium content, only on StreamX</p>
          </div>
        </div>

        {/* Best Sellers */}
        <ScrollStrip title="Best Sellers of StreamX" items={BEST_SELLERS} size="large" />

        {/* Promo Banner */}
        <PromoBanner data={PROMO_BANNER} />

        {/* Feel Good Originals */}
        <ScrollStrip title="Feel Good Originals" items={FEEL_GOOD} />

        {/* Power & Politics */}
        <ScrollStrip title="Power & Politics" items={POWER_POLITICS} />

        {/* Crime & Suspense Thrillers */}
        <ScrollStrip title="Crime & Suspense Thrillers" items={CRIME_THRILLERS} />

      </div>
    </div>
  );
};

export default Originals;
