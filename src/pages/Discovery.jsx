import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import ThumbnailCard from '../components/home/ThumbnailCard';

const Discovery = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  const genresList = ['Comedy', 'Thriller', 'Reality', 'Drama', 'Action', 'Mythology'];
  const languagesList = ['Hindi', 'Marathi', 'English', 'Tamil'];
  const yearsList = ['2024', '2023', '2022', '2021', '2020'];

  const popularSearches = [
    { id: 401, title: "Taarak Mehta Ka Ooltah Chashmah", image: "/webseries/family_man.png", genre: 'Comedy', language: 'Hindi', year: '2023' },
    { id: 402, title: "Undekhi", image: "/latest/bhootB.png", isPremium: true, badge: "NEW SEASON", genre: 'Thriller', language: 'Hindi', year: '2024' },
    { id: 403, title: "Indian Idol", image: "/webseries/lucifer.png", genre: 'Reality', language: 'Hindi', year: '2024' },
    { id: 404, title: "Madhuvidhu", image: "/latest/animal.png", badge: "NEW MOVIE", genre: 'Drama', language: 'Marathi', year: '2023' },
    { id: 405, title: "Pushpa Impossible", image: "/webseries/hotel.png", genre: 'Drama', language: 'Hindi', year: '2022' },
    { id: 406, title: "Gullak", image: "/latest/dhurandhar.png", isPremium: true, genre: 'Comedy', language: 'Hindi', year: '2024' },
    { id: 407, title: "Hui Gumm Yaadein", image: "/webseries/queen.png", genre: 'Drama', language: 'Hindi', year: '2023' },
    { id: 408, title: "India's Best Dancer", image: "/latest/fighter.png", genre: 'Reality', language: 'Hindi', year: '2024' },
    { id: 409, title: "Shrimad Ramayana", image: "/latest/ramayana.png", genre: 'Mythology', language: 'Hindi', year: '2024' },
    { id: 410, title: "Tenali Rama", image: "/latest/jatadhara.png", genre: 'Mythology', language: 'Hindi', year: '2020' },
    { id: 411, title: "Yeh Un Dinon Ki Baat Hai", image: "/webseries/sweet.png", genre: 'Romance', language: 'Hindi', year: '2021' },
    { id: 412, title: "Mere Sai", image: "/latest/mirai.png", genre: 'Mythology', language: 'Hindi', year: '2022' },
    { id: 413, title: "Maharashtrachi Hasyajatra", image: "/webseries/money.png", genre: 'Comedy', language: 'Marathi', year: '2024' },
    { id: 414, title: "CID", image: "/latest/skyF.png", isPremium: true, genre: 'Thriller', language: 'Hindi', year: '2020' },
  ];

  const filteredContent = useMemo(() => {
    return popularSearches.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesGenre = selectedGenre ? item.genre === selectedGenre : true;
      const matchesLanguage = selectedLanguage ? item.language === selectedLanguage : true;
      const matchesYear = selectedYear ? item.year === selectedYear : true;
      return matchesSearch && matchesGenre && matchesLanguage && matchesYear;
    });
  }, [searchQuery, selectedGenre, selectedLanguage, selectedYear]);

  const clearFilters = () => {
    setSelectedGenre('');
    setSelectedLanguage('');
    setSelectedYear('');
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-background pb-20 relative overflow-hidden">
      
      {/* Background Gradient matching the image */}
      <div className="absolute top-0 left-0 w-full h-80 bg-gradient-to-b from-[#3a1820] via-[#200e13] to-background pointer-events-none z-0"></div>

      <div className="relative z-10 px-4 md:px-8 pl-4 md:pl-[100px] pt-12 md:pt-16 max-w-[1600px] mx-auto">
        
        {/* Search Bar Container */}
        <div className="w-full mb-8">
          <div className="relative w-full flex items-center gap-4">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-4 md:pl-6 flex items-center pointer-events-none">
                <Search className="w-5 h-5 md:w-6 md:h-6 text-gray-400" />
              </div>
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for movies, shows, sports etc."
                className="w-full bg-[#3a2026]/40 backdrop-blur-md border border-white/5 rounded-full py-4 md:py-5 pl-12 md:pl-16 pr-8 text-white text-base md:text-lg focus:border-white/20 focus:bg-[#4a2a32]/50 outline-none transition-all placeholder-gray-400 shadow-lg"
              />
            </div>
            
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className={`flex-none p-4 md:px-6 md:py-5 rounded-full flex items-center justify-center gap-2 border transition-all ${showFilters || selectedGenre || selectedLanguage || selectedYear ? 'bg-primary border-primary text-black shadow-lg shadow-primary/20' : 'bg-[#3a2026]/40 border-white/5 text-gray-300 hover:bg-[#4a2a32]/50'}`}
            >
              <SlidersHorizontal className="w-5 h-5 md:w-6 md:h-6" />
              <span className="hidden md:inline font-bold">Filters</span>
            </button>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="bg-[#1a0c10]/80 backdrop-blur-xl border border-white/5 rounded-2xl p-6 mb-12 animate-fade-in shadow-2xl">
            <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
              <h3 className="text-xl font-bold text-white">Filter Content</h3>
              <button onClick={clearFilters} className="text-sm font-bold text-primary hover:text-white transition-colors">Clear All</button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Genre */}
              <div>
                <label className="block text-gray-400 text-xs font-bold uppercase tracking-wider mb-3">Genre</label>
                <div className="flex flex-wrap gap-2">
                  {genresList.map(genre => (
                    <button 
                      key={genre} 
                      onClick={() => setSelectedGenre(selectedGenre === genre ? '' : genre)}
                      className={`px-4 py-2 rounded-lg text-sm font-bold transition-all border ${selectedGenre === genre ? 'bg-primary text-black border-primary' : 'bg-black/40 text-gray-300 border-white/10 hover:border-white/30'}`}
                    >
                      {genre}
                    </button>
                  ))}
                </div>
              </div>

              {/* Language */}
              <div>
                <label className="block text-gray-400 text-xs font-bold uppercase tracking-wider mb-3">Language</label>
                <div className="flex flex-wrap gap-2">
                  {languagesList.map(lang => (
                    <button 
                      key={lang} 
                      onClick={() => setSelectedLanguage(selectedLanguage === lang ? '' : lang)}
                      className={`px-4 py-2 rounded-lg text-sm font-bold transition-all border ${selectedLanguage === lang ? 'bg-primary text-black border-primary' : 'bg-black/40 text-gray-300 border-white/10 hover:border-white/30'}`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </div>

              {/* Year */}
              <div>
                <label className="block text-gray-400 text-xs font-bold uppercase tracking-wider mb-3">Release Year</label>
                <div className="flex flex-wrap gap-2">
                  {yearsList.map(year => (
                    <button 
                      key={year} 
                      onClick={() => setSelectedYear(selectedYear === year ? '' : year)}
                      className={`px-4 py-2 rounded-lg text-sm font-bold transition-all border ${selectedYear === year ? 'bg-primary text-black border-primary' : 'bg-black/40 text-gray-300 border-white/10 hover:border-white/30'}`}
                    >
                      {year}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Popular Searches / Results Title */}
        <h2 className="text-xl md:text-2xl font-extrabold text-white mb-6 flex items-center justify-between">
          <span>{searchQuery || selectedGenre || selectedLanguage || selectedYear ? 'Search Results' : 'Popular Searches'}</span>
          {(searchQuery || selectedGenre || selectedLanguage || selectedYear) && (
            <span className="text-sm text-gray-400 font-medium">{filteredContent.length} results</span>
          )}
        </h2>

        {/* Grid of Posters */}
        {filteredContent.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4 md:gap-5">
            {filteredContent.map((item) => (
              <ThumbnailCard key={item.id} item={item} isGrid={true} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <Search className="w-16 h-16 text-white/20 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">No results found</h3>
            <p className="text-gray-400">Try adjusting your filters or search query.</p>
            <button onClick={clearFilters} className="mt-6 px-6 py-2 bg-primary text-black font-bold rounded-lg hover:bg-white transition-colors">
              Clear Filters
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default Discovery;
