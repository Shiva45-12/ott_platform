import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bookmark,
  Play,
  Trash2,
  Filter,
  SortAsc,
  SortDesc,
  Grid3X3,
  List,
  Search,
  Clock,
  Calendar,
  Star,
  ChevronDown,
  X,
  BookmarkX,
  Heart,
  Tv,
  Film,
} from 'lucide-react';

// --- Default mock data seeded into localStorage if empty ---
const DEFAULT_LIST = [
  {
    id: 101,
    title: 'Animal',
    image: '/latest/animal.png',
    age: 'A 18+',
    duration: '3h 21m',
    year: '2023',
    genre: 'Action',
    type: 'Movie',
    rating: 8.4,
    addedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    description: "A son's obsessive love for his father leads him down a dark and violent path.",
  },
  {
    id: 102,
    title: 'Fighter',
    image: '/latest/fighter.png',
    age: 'U/A 16+',
    duration: '2h 46m',
    year: '2024',
    genre: 'Action',
    type: 'Movie',
    rating: 7.9,
    addedAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    description: 'Top IAF aviators come together to form Air Dragons, facing imminent danger.',
  },
  {
    id: 201,
    title: 'Game of Thrones',
    image: '/webseries/GOT.png',
    age: 'A',
    duration: '8 Seasons',
    year: '2011',
    genre: 'Fantasy',
    type: 'Series',
    rating: 9.2,
    addedAt: new Date(Date.now() - 86400000 * 1).toISOString(),
    description: 'Noble families vie for control of the Iron Throne of Westeros.',
  },
  {
    id: 202,
    title: 'Squid Game',
    image: '/webseries/Squad.png',
    age: 'A',
    duration: '1 Season',
    year: '2021',
    genre: 'Thriller',
    type: 'Series',
    rating: 8.0,
    addedAt: new Date(Date.now() - 86400000 * 10).toISOString(),
    description: 'Hundreds of cash-strapped players accept a strange invitation to compete in children\'s games.',
  },
  {
    id: 204,
    title: 'The Family Man',
    image: '/webseries/family_man.png',
    age: 'U/A 16+',
    duration: '2 Seasons',
    year: '2019',
    genre: 'Thriller',
    type: 'Series',
    rating: 8.7,
    addedAt: new Date(Date.now() - 86400000 * 7).toISOString(),
    description: 'A working man from the National Investigation Agency tries to protect the nation.',
  },
  {
    id: 207,
    title: 'Money Heist',
    image: '/webseries/money.png',
    age: 'A',
    duration: '5 Parts',
    year: '2017',
    genre: 'Thriller',
    type: 'Series',
    rating: 8.2,
    addedAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    description: 'Eight thieves take hostages and lock themselves in the Royal Mint of Spain.',
  },
  {
    id: 103,
    title: 'Ramayana',
    image: '/latest/ramayana.png',
    age: 'U',
    duration: '3h 10m',
    year: '2025',
    genre: 'Drama',
    type: 'Movie',
    rating: 8.5,
    addedAt: new Date(Date.now() - 86400000 * 14).toISOString(),
    description: 'An epic retelling of the ancient Indian mythological tale.',
  },
  {
    id: 211,
    title: 'Wednesday',
    image: '/webseries/wednesday.png',
    age: 'U/A 16+',
    duration: '1 Season',
    year: '2022',
    genre: 'Comedy',
    type: 'Series',
    rating: 8.1,
    addedAt: new Date(Date.now() - 86400000 * 20).toISOString(),
    description: 'Wednesday Addams investigates a murder spree while making new friends at Nevermore Academy.',
  },
];

const STORAGE_KEY = 'streamx_mylist';

const getMyList = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed.length > 0) return parsed;
    }
    // Seed default data on first visit or if list is empty
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_LIST));
    return DEFAULT_LIST;
  } catch {
    return DEFAULT_LIST;
  }
};

const saveMyList = (list) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
};

// ─── Sub-Components ────────────────────────────────────────────────────────────

const StatCard = ({ icon: Icon, label, value, color }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 backdrop-blur-sm"
  >
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
      <Icon className="w-6 h-6 text-white" />
    </div>
    <div>
      <p className="text-2xl font-bold text-white">{value}</p>
      <p className="text-sm text-gray-400">{label}</p>
    </div>
  </motion.div>
);

const GridCard = ({ item, onRemove, index }) => {
  const [imgError, setImgError] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.85, y: -10 }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      className="relative group rounded-2xl overflow-hidden cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Thumbnail */}
      <div className="aspect-[2/3] relative overflow-hidden bg-white/5">
        {!imgError ? (
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20">
            <Film className="w-12 h-12 text-white/30" />
          </div>
        )}

        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Age badge */}
        <span className="absolute top-2 left-2 bg-black/70 text-white text-[10px] font-bold px-2 py-0.5 rounded-full border border-white/20">
          {item.age}
        </span>

        {/* Type badge */}
        <span className={`absolute top-2 right-2 text-[10px] font-bold px-2 py-0.5 rounded-full ${item.type === 'Series' ? 'bg-blue-600/80 text-white' : 'bg-primary/80 text-white'}`}>
          {item.type}
        </span>

        {/* Hover actions */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute bottom-0 left-0 right-0 p-3 flex gap-2"
            >
              <Link
                to={`/watch/${item.id}`}
                className="flex-1 flex items-center justify-center gap-2 bg-white text-black text-sm font-bold py-2 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <Play className="w-4 h-4" fill="currentColor" />
                Play
              </Link>
              <button
                onClick={(e) => { e.preventDefault(); onRemove(item.id); }}
                className="w-10 h-10 flex items-center justify-center bg-red-500/80 hover:bg-red-500 text-white rounded-xl transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Info */}
      <div className="p-3">
        <h3 className="text-white font-semibold text-sm truncate">{item.title}</h3>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-yellow-400 text-xs flex items-center gap-0.5">
            <Star className="w-3 h-3" fill="currentColor" />
            {item.rating}
          </span>
          <span className="text-gray-500 text-xs">•</span>
          <span className="text-gray-400 text-xs">{item.year}</span>
          <span className="text-gray-500 text-xs">•</span>
          <span className="text-gray-400 text-xs truncate">{item.duration}</span>
        </div>
      </div>
    </motion.div>
  );
};

const ListCard = ({ item, onRemove, index }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      className="group flex items-center gap-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-2xl p-4 transition-all duration-300 cursor-pointer"
    >
      {/* Thumbnail */}
      <div className="flex-shrink-0 w-20 h-28 rounded-xl overflow-hidden bg-white/5 relative">
        {!imgError ? (
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Film className="w-6 h-6 text-white/30" />
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start gap-2 flex-wrap mb-1">
          <h3 className="text-white font-bold text-base">{item.title}</h3>
          <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${item.type === 'Series' ? 'bg-blue-600/70 text-white' : 'bg-primary/70 text-white'}`}>
            {item.type}
          </span>
        </div>

        <div className="flex items-center flex-wrap gap-x-3 gap-y-1 mb-2">
          <span className="text-yellow-400 text-sm flex items-center gap-1">
            <Star className="w-3.5 h-3.5" fill="currentColor" />
            {item.rating}
          </span>
          <span className="text-gray-400 text-sm">{item.year}</span>
          <span className="text-gray-400 text-sm flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {item.duration}
          </span>
          <span className="text-gray-400 text-sm">{item.genre}</span>
          <span className="text-gray-500 text-xs border border-white/20 px-1.5 py-0.5 rounded-full">{item.age}</span>
        </div>

        <p className="text-gray-400 text-sm line-clamp-2">{item.description}</p>

        <p className="text-gray-600 text-xs mt-2 flex items-center gap-1">
          <Calendar className="w-3 h-3" />
          Added {new Date(item.addedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
        </p>
      </div>

      {/* Actions */}
      <div className="flex-shrink-0 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <Link
          to={`/watch/${item.id}`}
          className="w-10 h-10 flex items-center justify-center bg-white text-black rounded-xl hover:bg-gray-100 transition-colors"
        >
          <Play className="w-4 h-4" fill="currentColor" />
        </Link>
        <button
          onClick={() => onRemove(item.id)}
          className="w-10 h-10 flex items-center justify-center bg-red-500/20 hover:bg-red-500 text-red-400 hover:text-white rounded-xl transition-all"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
};

// ─── Empty State ───────────────────────────────────────────────────────────────
const EmptyState = ({ isFiltered, onClear }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex flex-col items-center justify-center py-32 text-center"
  >
    <div className="w-28 h-28 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6">
      <BookmarkX className="w-14 h-14 text-gray-600" />
    </div>
    <h3 className="text-2xl font-bold text-white mb-3">
      {isFiltered ? 'No results found' : 'Your list is empty'}
    </h3>
    <p className="text-gray-400 max-w-md mb-6">
      {isFiltered
        ? 'Try adjusting your filters to find what you\'re looking for.'
        : 'Start adding movies and shows you want to watch later. Tap the + icon on any title.'}
    </p>
    {isFiltered ? (
      <button
        onClick={onClear}
        className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
      >
        <X className="w-4 h-4" />
        Clear Filters
      </button>
    ) : (
      <Link
        to="/"
        className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
      >
        <Play className="w-4 h-4" fill="currentColor" />
        Browse Content
      </Link>
    )}
  </motion.div>
);

// ─── Main Page ─────────────────────────────────────────────────────────────────
const MyList = () => {
  const [items, setItems] = useState([]);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('All'); // 'All' | 'Movie' | 'Series'
  const [filterGenre, setFilterGenre] = useState('All');
  const [sortBy, setSortBy] = useState('addedAt'); // 'addedAt' | 'title' | 'rating' | 'year'
  const [sortOrder, setSortOrder] = useState('desc'); // 'asc' | 'desc'
  const [showFilters, setShowFilters] = useState(false);
  const [removingId, setRemovingId] = useState(null);

  useEffect(() => {
    setItems(getMyList());
  }, []);

  const handleRemove = (id) => {
    setRemovingId(id);
    setTimeout(() => {
      const updated = items.filter((i) => i.id !== id);
      setItems(updated);
      saveMyList(updated);
      setRemovingId(null);
    }, 300);
  };

  const handleClearAll = () => {
    if (window.confirm('Clear your entire list? This cannot be undone.')) {
      setItems([]);
      saveMyList([]);
    }
  };

  // Unique genres
  const genres = ['All', ...new Set(items.map((i) => i.genre))];

  // Filter + Search + Sort
  const filtered = items
    .filter((i) => {
      if (filterType !== 'All' && i.type !== filterType) return false;
      if (filterGenre !== 'All' && i.genre !== filterGenre) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        return i.title.toLowerCase().includes(q) || i.genre.toLowerCase().includes(q) || i.description.toLowerCase().includes(q);
      }
      return true;
    })
    .sort((a, b) => {
      let valA = a[sortBy];
      let valB = b[sortBy];
      if (sortBy === 'addedAt') {
        valA = new Date(valA);
        valB = new Date(valB);
      }
      if (sortBy === 'title') {
        valA = valA.toLowerCase();
        valB = valB.toLowerCase();
        return sortOrder === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
      }
      return sortOrder === 'asc' ? valA - valB : valB - valA;
    });

  const movies = items.filter((i) => i.type === 'Movie').length;
  const series = items.filter((i) => i.type === 'Series').length;
  const avgRating = items.length ? (items.reduce((s, i) => s + i.rating, 0) / items.length).toFixed(1) : '—';

  const isFiltered = filterType !== 'All' || filterGenre !== 'All' || searchQuery !== '';

  return (
    <div className="min-h-screen bg-background pt-16 pb-20 pl-0 md:pl-20">
      {/* ── Hero Header ── */}
      <div className="relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-6 md:px-8 py-8">
          {/* Title */}
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/30">
              <Bookmark className="w-7 h-7 text-white" fill="currentColor" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">My List</h1>
              <p className="text-gray-400 mt-1">Your personal watchlist · {items.length} title{items.length !== 1 ? 's' : ''}</p>
            </div>
          </div>


        </div>
      </div>

      {/* ── Controls ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-4">
        <div className="flex flex-wrap items-center gap-3">

          {/* Search */}
          <div className="flex-1 min-w-[200px] relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search your list…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/8 border border-white/15 rounded-xl pl-11 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary/60 focus:bg-white/10 transition-all text-sm"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-3 rounded-xl border font-medium text-sm transition-all ${showFilters ? 'bg-primary/20 border-primary/60 text-primary' : 'bg-white/8 border-white/15 text-gray-300 hover:text-white hover:border-white/30'}`}
          >
            <Filter className="w-4 h-4" />
            Filters
            {isFiltered && <span className="w-2 h-2 bg-primary rounded-full" />}
          </button>

          {/* Sort */}
          <div className="flex items-center gap-1 bg-white/8 border border-white/15 rounded-xl overflow-hidden">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent text-gray-300 text-sm px-3 py-3 focus:outline-none cursor-pointer"
            >
              <option value="addedAt" className="bg-gray-900">Date Added</option>
              <option value="title" className="bg-gray-900">Title</option>
              <option value="rating" className="bg-gray-900">Rating</option>
              <option value="year" className="bg-gray-900">Year</option>
            </select>
            <button
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="px-3 py-3 text-gray-400 hover:text-white transition-colors border-l border-white/15"
            >
              {sortOrder === 'asc' ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />}
            </button>
          </div>

          {/* View Mode */}
          <div className="flex items-center bg-white/8 border border-white/15 rounded-xl overflow-hidden">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-3 transition-colors ${viewMode === 'grid' ? 'bg-primary/30 text-primary' : 'text-gray-400 hover:text-white'}`}
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-3 transition-colors border-l border-white/15 ${viewMode === 'list' ? 'bg-primary/30 text-primary' : 'text-gray-400 hover:text-white'}`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          {/* Clear All */}
          {items.length > 0 && (
            <button
              onClick={handleClearAll}
              className="flex items-center gap-2 px-4 py-3 rounded-xl border border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:border-red-500/50 font-medium text-sm transition-all"
            >
              <Trash2 className="w-4 h-4" />
              Clear All
            </button>
          )}
        </div>

        {/* Expandable Filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="flex flex-wrap items-center gap-4 pt-4 pb-2">
                {/* Type Filter */}
                <div>
                  <p className="text-gray-500 text-xs mb-2 uppercase tracking-widest">Type</p>
                  <div className="flex gap-2">
                    {['All', 'Movie', 'Series'].map((t) => (
                      <button
                        key={t}
                        onClick={() => setFilterType(t)}
                        className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${filterType === t ? 'bg-primary text-white' : 'bg-white/8 text-gray-400 hover:text-white border border-white/15'}`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="w-px h-10 bg-white/10 hidden md:block" />

                {/* Genre Filter */}
                <div>
                  <p className="text-gray-500 text-xs mb-2 uppercase tracking-widest">Genre</p>
                  <div className="flex flex-wrap gap-2">
                    {genres.map((g) => (
                      <button
                        key={g}
                        onClick={() => setFilterGenre(g)}
                        className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${filterGenre === g ? 'bg-secondary text-white' : 'bg-white/8 text-gray-400 hover:text-white border border-white/15'}`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Reset */}
                {isFiltered && (
                  <button
                    onClick={() => { setFilterType('All'); setFilterGenre('All'); setSearchQuery(''); }}
                    className="ml-auto flex items-center gap-1 text-gray-500 hover:text-white text-sm transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                    Reset
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Result count */}
        {(isFiltered || searchQuery) && filtered.length > 0 && (
          <p className="text-gray-500 text-sm mt-3">
            Showing <span className="text-white font-medium">{filtered.length}</span> of {items.length} titles
          </p>
        )}
      </div>

      {/* ── Content ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 pb-16">
        {filtered.length === 0 ? (
          <EmptyState
            isFiltered={isFiltered}
            onClear={() => { setFilterType('All'); setFilterGenre('All'); setSearchQuery(''); }}
          />
        ) : viewMode === 'grid' ? (
          <motion.div
            layout
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((item, index) => (
                <GridCard key={item.id} item={item} onRemove={handleRemove} index={index} />
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div layout className="flex flex-col gap-3">
            <AnimatePresence mode="popLayout">
              {filtered.map((item, index) => (
                <ListCard key={item.id} item={item} onRemove={handleRemove} index={index} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default MyList;
