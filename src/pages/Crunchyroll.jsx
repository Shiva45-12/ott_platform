import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Plus, ChevronLeft, ChevronRight, Star, Check } from 'lucide-react';

// ─── Crunchyroll C Badge ───────────────────────────────────────────────────────
const CRBadge = () => (
  <div className="absolute top-2 left-2 z-20 w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/40">
    <span className="text-white font-black text-[11px] leading-none">C</span>
  </div>
);

// ─── Hero Slides (use slider images) ─────────────────────────────────────────
const HERO_SLIDES = [
  {
    id: 'h1', image: '/anime/slider1.png',
    title: 'SOLO LEVELING', subtitle: '—ARISE FROM THE SHADOW— S2',
    badge: 'ALL EPISODES OUT NOW', languages: '5 Languages',
    genres: ['Fantasy', 'Action', 'Isekai'], year: '2024',
    accentColor: '#818cf8',
    description: 'Sung Jin-Woo awakens the power of the Shadow Monarch and begins his true rise to become the strongest hunter in the world.',
  },
  {
    id: 'h2', image: '/anime/slider2.png',
    title: 'JUJUTSU KAISEN', subtitle: 'Season 3 — Culling Game Arc',
    badge: 'NEW EPISODES EVERY WEEK', languages: '4 Languages',
    genres: ['Action', 'Supernatural', 'Dark Fantasy'], year: '2024',
    accentColor: '#f87171',
    description: 'Yuji Itadori enters the deadly Culling Game where sorcerers battle for survival inside barrier colonies across Japan.',
  },
  {
    id: 'h3', image: '/anime/slider3.png',
    title: 'DEMON SLAYER', subtitle: 'Infinity Castle Arc — Movie',
    badge: 'STREAMING NOW', languages: '6 Languages',
    genres: ['Action', 'Supernatural', 'Adventure'], year: '2025',
    accentColor: '#fb923c',
    description: 'Tanjiro faces the ultimate battle inside the Infinity Castle against Muzan in the most epic Demon Slayer chapter yet.',
  },
  {
    id: 'h4', image: '/anime/slider4.png',
    title: 'SPY × FAMILY', subtitle: 'Season 3 — New Mission',
    badge: 'LATEST EPISODE', languages: '5 Languages',
    genres: ['Comedy', 'Action', 'Slice of Life'], year: '2025',
    accentColor: '#f472b6',
    description: 'The Forger family is back with a brand new mission that puts their fake bonds and real feelings to the ultimate test.',
  },
  {
    id: 'h5', image: '/anime/slider5.png',
    title: 'MY HERO ACADEMIA', subtitle: 'Final Season — Final War',
    badge: 'ALL EPISODES AVAILABLE', languages: '4 Languages',
    genres: ['Superhero', 'Action', 'Shounen'], year: '2024',
    accentColor: '#34d399',
    description: 'The final battle between Heroes and Villains begins. Deku must unleash the full power of One For All to save the world.',
  },
  {
    id: 'h6', image: '/anime/slider6.png',
    title: 'ONE PIECE', subtitle: 'Egghead Island Arc',
    badge: 'NEW EPISODES WEEKLY', languages: '5 Languages',
    genres: ['Adventure', 'Action', 'Comedy'], year: '2024',
    accentColor: '#fbbf24',
    description: 'Luffy and the Straw Hats arrive at the futuristic Egghead Island, home of the genius scientist Dr. Vegapunk.',
  },
  {
    id: 'h7', image: '/anime/slider7.png',
    title: 'BLUE LOCK', subtitle: 'Season 2 — U-20 Match',
    badge: 'STREAMING NOW', languages: '4 Languages',
    genres: ['Sports', 'Action', 'Psychological'], year: '2024',
    accentColor: '#38bdf8',
    description: 'The Blue Lock players face the Japan U-20 national team in a match that will determine the future of Japanese football.',
  },
];

// ─── Anime Show Cards (14 poster images: 1.png to 14.png) ────────────────────
const makeAnime = (id, img, title, genre, rating, seasons, accent) => ({ id, image: img, title, genre, rating, seasons, accent });

const TOP_PICKS = [
  makeAnime('a1', '/anime/1.png', 'Solo Leveling', 'Fantasy, Action', 9.0, '2 Seasons', '#818cf8'),
  makeAnime('a2', '/anime/2.png', 'Jujutsu Kaisen', 'Action, Supernatural', 9.1, '3 Seasons', '#f87171'),
  makeAnime('a3', '/anime/3.png', 'Demon Slayer', 'Action, Dark Fantasy', 9.2, '4 Seasons', '#fb923c'),
  makeAnime('a4', '/anime/4.png', 'Spy × Family', 'Comedy, Action', 8.9, '3 Seasons', '#f472b6'),
  makeAnime('a5', '/anime/5.png', 'My Hero Academia', 'Superhero, Shounen', 8.8, '7 Seasons', '#34d399'),
  makeAnime('a6', '/anime/6.png', 'One Piece', 'Adventure, Action', 9.1, '20+ Seasons', '#fbbf24'),
  makeAnime('a7', '/anime/7.png', 'Blue Lock', 'Sports, Psychological', 9.0, '2 Seasons', '#38bdf8'),
  makeAnime('a8', '/anime/8.png', 'Frieren', 'Fantasy, Drama', 9.3, '1 Season', '#2dd4bf'),
];

const SAMPLE_BINGE = [
  makeAnime('b1', '/anime/9.png', 'Chainsaw Man', 'Action, Horror', 8.9, '2 Seasons', '#ef4444'),
  makeAnime('b2', '/anime/10.png', 'Vinland Saga', 'Historical, Action', 9.0, '2 Seasons', '#d97706'),
  makeAnime('b3', '/anime/11.png', 'Fullmetal Alchemist', 'Action, Drama', 9.2, '1 Season', '#f59e0b'),
  makeAnime('b4', '/anime/12.png', 'Psycho-Pass', 'Sci-Fi, Thriller', 8.9, '3 Seasons', '#818cf8'),
  makeAnime('b5', '/anime/13.png', 'Death Note', 'Psychological, Thriller', 9.0, '1 Season', '#6b7280'),
  makeAnime('b6', '/anime/14.png', 'Steins;Gate', 'Sci-Fi, Mystery', 9.1, '1 Season', '#fb923c'),
];

const HINDI_DUBBED = [
  makeAnime('c1', '/anime/1.png', 'Dragon Ball Super', 'Action, Shounen', 8.8, '1 Season', '#fb923c'),
  makeAnime('c2', '/anime/3.png', 'Demon Slayer', 'Action, Dark', 9.2, '4 Seasons', '#fb923c'),
  makeAnime('c3', '/anime/2.png', 'Jujutsu Kaisen', 'Action, Fantasy', 9.1, '3 Seasons', '#a855f7'),
  makeAnime('c4', '/anime/5.png', 'My Hero Academia', 'Superhero', 8.8, '7 Seasons', '#34d399'),
  makeAnime('c5', '/anime/7.png', 'Blue Lock', 'Sports, Action', 9.0, '2 Seasons', '#38bdf8'),
  makeAnime('c6', '/anime/4.png', 'Spy × Family', 'Comedy', 8.9, '3 Seasons', '#f472b6'),
  makeAnime('c7', '/anime/9.png', 'Chainsaw Man', 'Action, Horror', 8.9, '2 Seasons', '#ef4444'),
];

const NEW_TRENDING = [
  makeAnime('d1', '/anime/7.png', 'Blue Lock S2', 'Sports', 9.0, 'Season 2', '#38bdf8'),
  makeAnime('d2', '/anime/4.png', 'Spy × Family S3', 'Comedy', 8.9, 'Season 3', '#f472b6'),
  makeAnime('d3', '/anime/2.png', 'Jujutsu Kaisen S3', 'Action', 9.1, 'Season 3', '#a855f7'),
  makeAnime('d4', '/anime/8.png', 'Frieren', 'Fantasy', 9.3, 'Season 1', '#6ee7b7'),
  makeAnime('d5', '/anime/9.png', 'Chainsaw Man S2', 'Action, Horror', 8.9, 'Season 2', '#ef4444'),
  makeAnime('d6', '/anime/6.png', 'One Piece', 'Adventure', 9.1, 'Ongoing', '#fbbf24'),
  makeAnime('d7', '/anime/1.png', 'Solo Leveling S2', 'Fantasy', 9.0, 'Season 2', '#818cf8'),
];

const SHOUNEN_CLASSICS = [
  makeAnime('e1', '/anime/5.png', 'Naruto Shippuden', 'Ninja, Action', 9.0, '21 Seasons', '#fb923c'),
  makeAnime('e2', '/anime/6.png', 'Dragon Ball Z', 'Action, Shounen', 9.1, '9 Seasons', '#fbbf24'),
  makeAnime('e3', '/anime/5.png', 'My Hero Academia', 'Superhero', 8.8, '7 Seasons', '#34d399'),
  makeAnime('e4', '/anime/11.png', 'Bleach', 'Action, Supernatural', 8.9, '17 Seasons', '#94a3b8'),
  makeAnime('e5', '/anime/11.png', 'Fullmetal Alchemist: Brotherhood', 'Action, Drama', 9.2, '1 Season', '#d97706'),
  makeAnime('e6', '/anime/6.png', 'One Piece', 'Adventure', 9.1, '20+ Seasons', '#38bdf8'),
  makeAnime('e7', '/anime/2.png', 'Jujutsu Kaisen', 'Action', 9.1, '3 Seasons', '#a855f7'),
];

const BATTLE_BORN = [
  makeAnime('f1', '/anime/2.png', 'Jujutsu Kaisen', 'Action', 9.1, '3 Seasons', '#a855f7'),
  makeAnime('f2', '/anime/10.png', 'Vinland Saga S2', 'Historical', 9.0, 'Season 2', '#78716c'),
  makeAnime('f3', '/anime/9.png', 'Chainsaw Man', 'Action, Horror', 8.9, '2 Seasons', '#ef4444'),
  makeAnime('f4', '/anime/8.png', 'Frieren', 'Fantasy', 9.3, '1 Season', '#2dd4bf'),
  makeAnime('f5', '/anime/13.png', 'Death Note', 'Psychological', 9.0, '1 Season', '#6b7280'),
  makeAnime('f6', '/anime/12.png', 'Psycho-Pass', 'Sci-Fi Thriller', 8.9, '3 Seasons', '#818cf8'),
  makeAnime('f7', '/anime/3.png', 'Demon Slayer', 'Action', 9.2, '4 Seasons', '#fb923c'),
];

const ANIME_MOVIES = [
  makeAnime('g1', '/anime/3.png', 'Demon Slayer: Infinity Castle', 'Action, Dark', 9.4, 'Movie', '#ef4444'),
  makeAnime('g2', '/anime/8.png', 'Spirited Away', 'Fantasy, Family', 9.2, 'Movie', '#38bdf8'),
  makeAnime('g3', '/anime/4.png', 'Your Name', 'Romance, Drama', 9.1, 'Movie', '#818cf8'),
  makeAnime('g4', '/anime/14.png', 'A Silent Voice', 'Drama, Romance', 9.0, 'Movie', '#fb923c'),
  makeAnime('g5', '/anime/2.png', 'Jujutsu Kaisen 0', 'Action, Dark', 8.9, 'Movie', '#a855f7'),
  makeAnime('g6', '/anime/4.png', 'Belle', 'Sci-Fi, Romance', 8.7, 'Movie', '#f472b6'),
];

const LOVE_LAUGHS = [
  makeAnime('h1', '/anime/4.png', 'Spy × Family', 'Romance, Comedy', 8.9, '3 Seasons', '#f472b6'),
  makeAnime('h2', '/anime/8.png', 'Laid Back Camp S3', 'Slice of Life', 8.7, '3 Seasons', '#2dd4bf'),
  makeAnime('h3', '/anime/14.png', 'My Dress-Up Darling', 'Romance, Comedy', 8.8, '1 Season', '#c084fc'),
  makeAnime('h4', '/anime/13.png', 'Kimi ni Todoke', 'Romance, Drama', 8.6, '2 Seasons', '#60a5fa'),
  makeAnime('h5', '/anime/6.png', 'One Piece (Comedy Arcs)', 'Comedy, Adventure', 9.1, 'Selected Eps', '#fbbf24'),
];

const PSYCH_THRILLERS = [
  makeAnime('i1', '/anime/12.png', 'Psycho-Pass', 'Sci-Fi, Thriller', 8.9, '3 Seasons', '#818cf8'),
  makeAnime('i2', '/anime/13.png', 'Death Note', 'Psychological, Thriller', 9.0, '1 Season', '#6b7280'),
  makeAnime('i3', '/anime/14.png', 'Steins;Gate', 'Sci-Fi, Mystery', 9.1, '1 Season', '#fb923c'),
  makeAnime('i4', '/anime/11.png', 'Promised Neverland', 'Psychological', 8.9, '2 Seasons', '#34d399'),
  makeAnime('i5', '/anime/9.png', 'Devilman Crybaby', 'Horror, Psychological', 8.4, '1 Season', '#ef4444'),
  makeAnime('i6', '/anime/10.png', 'Vinland Saga', 'Historical, Dark', 9.0, '2 Seasons', '#d97706'),
];

// ─── AnimeCard Component ───────────────────────────────────────────────────────
const AnimeCard = ({ item, index }) => {
  const [added, setAdded] = useState(false);
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.05, 0.35), duration: 0.3 }}
      className="flex-shrink-0 w-36 md:w-44 group cursor-pointer"
    >
      <div className="aspect-[2/3] rounded-xl overflow-hidden relative bg-gray-900">
        {!imgError ? (
          <img
            src={item.image}
            alt={item.title}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-3 bg-gradient-to-b from-gray-800 to-gray-900">
            <div className="w-14 h-14 rounded-full mb-2 flex items-center justify-center border-2" style={{ borderColor: item.accent + '88', background: item.accent + '22' }}>
              <span className="text-2xl font-black" style={{ color: item.accent }}>{item.title.charAt(0)}</span>
            </div>
            <p className="text-white text-xs font-black text-center leading-tight">{item.title}</p>
          </div>
        )}

        {/* Bottom vignette */}
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />

        {/* CR Badge */}
        <CRBadge />

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2 p-3">
          <Link
            to={`/watch/${item.id}`}
            className="flex items-center gap-1.5 bg-orange-500 hover:bg-orange-400 text-white text-xs font-bold px-4 py-2 rounded-lg w-full justify-center transition-colors"
          >
            <Play className="w-3.5 h-3.5" fill="currentColor" />
            Watch Now
          </Link>
          <button
            onClick={(e) => { e.preventDefault(); setAdded(!added); }}
            className={`flex items-center gap-1.5 w-full justify-center text-xs font-semibold py-1.5 rounded-lg border transition-all ${added ? 'bg-green-600/30 border-green-500/50 text-green-400' : 'bg-white/10 border-white/30 text-white'}`}
          >
            {added ? <Check className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
            {added ? 'Added' : 'My List'}
          </button>
        </div>
      </div>

      <div className="mt-2 px-0.5">
        <h3 className="text-white text-sm font-bold truncate">{item.title}</h3>
        <div className="flex items-center gap-1.5 mt-0.5">
          <Star className="w-3 h-3 text-yellow-400" fill="currentColor" />
          <span className="text-yellow-400 text-xs">{item.rating}</span>
          <span className="text-gray-500 text-xs">•</span>
          <span className="text-gray-400 text-xs truncate">{item.seasons}</span>
        </div>
        <p className="text-xs mt-0.5 truncate font-medium" style={{ color: item.accent }}>{item.genre}</p>
      </div>
    </motion.div>
  );
};

// ─── Scroll Strip ──────────────────────────────────────────────────────────────
const ScrollStrip = ({ title, items }) => {
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
        {items.map((item, i) => <AnimeCard key={`${item.id}-${i}`} item={item} index={i} />)}
      </div>
    </div>
  );
};

// ─── Promo Banner ──────────────────────────────────────────────────────────────
const PromoBanner = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="relative rounded-2xl overflow-hidden mb-10 h-44 md:h-52 border border-white/10"
  >
    <img src="/anime/slider1.png" alt="Solo Leveling" className="absolute inset-0 w-full h-full object-cover opacity-50" />
    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
    <div className="absolute inset-0"
      style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.04) 1px,transparent 1px)', backgroundSize: '40px 40px' }}
    />
    <div className="relative h-full flex flex-col justify-center px-8 md:px-14">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center">
          <span className="text-white text-[9px] font-black">C</span>
        </div>
        <p className="text-orange-400 text-xs font-bold tracking-widest uppercase">Crunchyroll Exclusive</p>
      </div>
      <h2 className="text-white text-3xl md:text-5xl font-black mb-1 tracking-widest" style={{ textShadow: '0 0 40px #818cf855' }}>
        SOLO LEVELING
      </h2>
      <p className="text-indigo-300 text-sm italic mb-5">—ARISE FROM THE SHADOW— S2</p>
      <Link
        to="/watch/h1"
        className="flex items-center gap-2 bg-orange-500 hover:bg-orange-400 text-white font-bold text-sm px-7 py-3 rounded-xl transition-colors w-max shadow-lg shadow-orange-500/30"
      >
        <Play className="w-4 h-4" fill="currentColor" />
        Watch Now
      </Link>
    </div>
  </motion.div>
);

// ─── Hero Section ──────────────────────────────────────────────────────────────
const HeroSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef(null);
  const slides = HERO_SLIDES;
  const active = slides[activeIndex];

  const startInterval = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => setActiveIndex(p => (p + 1) % slides.length), 5500);
  };

  useEffect(() => { startInterval(); return () => clearInterval(intervalRef.current); }, []);

  const goTo = (i) => { setActiveIndex(i); startInterval(); };

  return (
    <div className="relative w-full h-[85vh] md:h-[90vh] overflow-hidden bg-black">

      {/* Background image with crossfade */}
      <AnimatePresence mode="wait">
        <motion.img
          key={active.id}
          src={active.image}
          alt={active.title}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: 'easeInOut' }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>

      {/* Gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/10" />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-transparent" />

      {/* Content — bottom left */}
      <div className="absolute bottom-8 md:bottom-20 left-0 w-full z-10 px-4 md:px-10">
        <div className="max-w-2xl mb-14">

          {/* Badges */}
          <div className="flex items-center flex-wrap gap-2 mb-4">
            <span className="bg-orange-500 text-white text-[11px] font-black px-3 py-1 rounded-full tracking-widest uppercase">
              {active.badge}
            </span>
            <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-full border border-orange-500/40">
              <div className="w-3 h-3 rounded-full bg-orange-500 flex items-center justify-center">
                <span className="text-white text-[7px] font-black">C</span>
              </div>
              <span className="text-orange-400 text-[10px] font-bold tracking-wider">CRUNCHYROLL</span>
            </div>
          </div>

          {/* Title */}
          <AnimatePresence mode="wait">
            <motion.h1
              key={`title-${activeIndex}`}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.45 }}
              className="text-5xl md:text-7xl font-extrabold text-white mb-2 tracking-[0.08em] leading-tight"
              style={{ textShadow: `0 0 50px ${active.accentColor}55` }}
            >
              {active.title}
            </motion.h1>
          </AnimatePresence>

          {/* Subtitle */}
          <AnimatePresence mode="wait">
            <motion.p
              key={`sub-${activeIndex}`}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.35, delay: 0.08 }}
              className="font-semibold text-base mb-3"
              style={{ color: active.accentColor }}
            >
              {active.subtitle}
            </motion.p>
          </AnimatePresence>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-2 text-white font-semibold text-sm mb-5">
            <span>{active.languages}</span>
            <span className="text-gray-400">•</span>
            <span>{active.genres.join(', ')}</span>
            <span className="text-gray-400">•</span>
            <span>{active.year}</span>
          </div>

          {/* Description */}
          <AnimatePresence mode="wait">
            <motion.p
              key={`desc-${activeIndex}`}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.12 }}
              className="text-gray-300 text-sm max-w-lg mb-8 line-clamp-2 hidden md:block"
            >
              {active.description}
            </motion.p>
          </AnimatePresence>

          {/* Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            <Link
              to={`/watch/${active.id}`}
              className="flex items-center gap-2 px-8 py-3 bg-white hover:bg-gray-100 text-black rounded-xl font-bold transition-all text-base shadow-lg"
            >
              <Play className="w-5 h-5" fill="currentColor" />
              Watch Now
            </Link>
            <button className="flex items-center gap-2 px-5 py-3 bg-black/50 hover:bg-white/10 text-white rounded-xl border border-white/30 transition-all font-semibold text-sm">
              <Plus className="w-5 h-5" />
              My List
            </button>
          </div>
        </div>

        {/* Slider thumbnail row — right side */}
        <div className="absolute right-4 bottom-8 md:bottom-16 hidden md:flex items-center gap-2">
          <button
            onClick={() => goTo(activeIndex === 0 ? slides.length - 1 : activeIndex - 1)}
            className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm text-white hover:text-orange-400 hover:bg-black/60 flex items-center justify-center transition-all z-20 flex-shrink-0 border border-white/10"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div className="flex gap-3 overflow-hidden max-w-[580px]">
            {slides.slice(0, 5).map((s, i) => (
              <motion.div
                key={s.id}
                onClick={() => goTo(i)}
                whileHover={{ scale: 1.06 }}
                className={`relative w-[104px] h-[60px] rounded-lg overflow-hidden cursor-pointer transition-all duration-300 flex-shrink-0 ${
                  activeIndex === i
                    ? 'ring-2 ring-orange-400 ring-offset-1 ring-offset-black shadow-lg shadow-orange-400/25 scale-105'
                    : 'opacity-50 hover:opacity-90 border border-white/10'
                }`}
              >
                <img src={s.image} alt={s.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-1.5">
                  <Play className="w-3.5 h-3.5 text-white drop-shadow-lg" fill="currentColor" />
                </div>
              </motion.div>
            ))}
          </div>

          <button
            onClick={() => goTo((activeIndex + 1) % slides.length)}
            className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm text-white hover:text-orange-400 hover:bg-black/60 flex items-center justify-center transition-all z-20 flex-shrink-0 border border-white/10"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile progress dots */}
        <div className="flex items-center gap-2 mt-3 md:hidden">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`h-1 rounded-full transition-all duration-300 ${i === activeIndex ? 'w-7 bg-orange-500' : 'w-2 bg-white/35'}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// ─── Main Page ─────────────────────────────────────────────────────────────────
const Crunchyroll = () => (
  <div className="min-h-screen bg-background pb-20 pl-0 md:pl-20">
    <HeroSection />

    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">

      {/* Page header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-11 h-11 rounded-2xl bg-orange-500 flex items-center justify-center shadow-xl shadow-orange-500/40">
          <span className="text-white font-black text-xl">C</span>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">Crunchyroll</h1>
          <p className="text-gray-400 text-sm">The world's largest anime streaming library</p>
        </div>
      </div>

      {/* Strips */}
      <ScrollStrip title="Top Picks In Anime" items={TOP_PICKS} />
      <ScrollStrip title="Sample Before You Binge" items={SAMPLE_BINGE} />
      <ScrollStrip title="Anime Dubbed in Hindi" items={HINDI_DUBBED} />
      <ScrollStrip title="New & Trending" items={NEW_TRENDING} />
      <ScrollStrip title="Shounen Classics" items={SHOUNEN_CLASSICS} />

      {/* Promo */}
      <PromoBanner />

      <ScrollStrip title="Battle-Born" items={BATTLE_BORN} />
      <ScrollStrip title="Anime Movies" items={ANIME_MOVIES} />
      <ScrollStrip title="Love, Laughs & Life" items={LOVE_LAUGHS} />
      <ScrollStrip title="Psychological Thrillers" items={PSYCH_THRILLERS} />
    </div>
  </div>
);

export default Crunchyroll;
