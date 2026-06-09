import React, { useState, useEffect, useRef } from 'react';
import { Play, Plus, ChevronRight, ChevronLeft, Crown } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroBanner = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const movies = [
    {
      id: 1,
      titleImage: "Shark Tank India",
      isTextTitle: true,
      languages: "Hindi",
      genres: ["Reality", "Business", "Entertainment"],
      year: "2024",
      thumbnail: "/images/game_of_thrones.png",
      videoUrl: "/video/game_of_throne.mp4",
      premium: true
    },
    {
      id: 2,
      titleImage: "Spider-Man",
      isTextTitle: true,
      languages: "3 Languages",
      genres: ["Action", "Sci-Fi", "Superhero"],
      year: "2021",
      thumbnail: "/images/spideman.png",
      videoUrl: "/video/spiderman.mp4",
      premium: false
    },
    {
      id: 3,
      titleImage: "Avengers",
      isTextTitle: true,
      languages: "4 Languages",
      genres: ["Action", "Sci-Fi", "Adventure"],
      year: "2012",
      thumbnail: "/images/avengerse.png",
      videoUrl: "/video/avengerse.mp4",
      premium: true
    },
    {
      id: 4,
      titleImage: "Aquaman",
      isTextTitle: true,
      languages: "English, Hindi",
      genres: ["Action", "Adventure", "Fantasy"],
      year: "2018",
      thumbnail: "/images/aquaman.png",
      videoUrl: "/video/aquaman.mp4",
      premium: false
    }
  ];

  const activeMovie = movies[activeIndex];

  useEffect(() => {
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      videoRef.current.load();
    }

    const timer = setTimeout(() => {
      if (videoRef.current) {
        setIsPlaying(true);
        videoRef.current.play().catch(error => console.log("Autoplay prevented:", error));
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [activeIndex]);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % movies.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev === 0 ? movies.length - 1 : prev - 1));
  };

  return (
    <div className="relative w-full h-[85vh] md:h-[95vh] overflow-hidden bg-black group">
      {/* Background Media */}
      <div className="absolute inset-0">
        {/* High Res Thumbnail Image */}
        <img 
          src={activeMovie.thumbnail} 
          alt={activeMovie.titleImage}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${isPlaying ? 'opacity-0' : 'opacity-100'}`}
        />
        
        {/* HD Video */}
        <video 
          ref={videoRef}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${isPlaying ? 'opacity-100' : 'opacity-0'}`}
          muted 
          loop 
          playsInline
        >
          <source src={activeMovie.videoUrl} type="video/mp4" />
        </video>

        {/* Gradients for text readability and blending */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-[#000000]/60 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#000000] via-[#000000]/80 to-transparent w-full md:w-2/3"></div>
      </div>

      {/* Main Content */}
      <div className="absolute bottom-10 md:bottom-20 left-0 w-full z-10 pointer-events-none">
        <div className="px-6 md:px-14 lg:px-16 flex flex-col justify-end h-full pointer-events-auto">
          
          {/* Left Side: Movie Details & Buttons */}
          <div className="max-w-2xl mb-12">
            {/* New Movie Badge */}
            <div className="mb-4">
              <span className="bg-purple-600 text-white text-[11px] font-bold px-3 py-1 rounded-full tracking-wider uppercase">
                New Movie
              </span>
            </div>

            {/* Title / Logo */}
            {activeMovie.isTextTitle ? (
              <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight leading-tight">
                {activeMovie.titleImage}
              </h1>
            ) : (
              <img src={activeMovie.titleImage} alt="Movie Title" className="h-24 md:h-32 object-contain mb-6" />
            )}

            {/* Metadata String */}
            <div className="flex flex-wrap items-center gap-2 text-white font-bold text-[14px] md:text-[16px] mb-8">
              {activeMovie.premium && (
                <Crown className="w-5 h-5 text-primary fill-primary" />
              )}
              <span>{activeMovie.languages}</span>
              <span className="text-gray-400 text-xs">•</span>
              <span>{activeMovie.genres.join(", ")}</span>
              <span className="text-gray-400 text-xs">•</span>
              <span>{activeMovie.year}</span>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <Link to={`/watch/${activeMovie.id}`} className="flex items-center justify-center gap-2 px-8 py-3 bg-white hover:bg-gray-200 text-black rounded font-bold transition-all text-[16px] min-w-[200px]">
                <Play className="w-6 h-6" fill="currentColor" />
                Watch Now
              </Link>
              <button className="flex items-center justify-center w-12 h-12 bg-black/50 hover:bg-white/10 text-white rounded border border-white/30 transition-all">
                <Plus className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Right Side Bottom: Carousel */}
          <div className="absolute right-0 bottom-10 md:bottom-16 max-w-[50%] hidden md:flex items-center">
            <button onClick={prevSlide} className="w-8 h-8 text-white hover:text-primary flex items-center justify-center transition-colors z-20">
              <ChevronLeft className="w-8 h-8" />
            </button>

            <div className="flex gap-3 overflow-hidden px-2">
              {movies.map((thumb, index) => (
                <div 
                  key={thumb.id}
                  onClick={() => setActiveIndex(index)}
                  className={`relative w-36 h-20 rounded-md overflow-hidden cursor-pointer transition-all duration-300 transform border-2 ${activeIndex === index ? 'border-white scale-105 z-10' : 'border-transparent opacity-60 hover:opacity-100 hover:border-white/50'}`}
                >
                  <img src={thumb.thumbnail} alt={thumb.titleImage} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/20 flex items-end justify-start p-2">
                    <Play className="w-4 h-4 text-white" fill="currentColor" />
                  </div>
                </div>
              ))}
            </div>

            <button onClick={nextSlide} className="w-8 h-8 text-white hover:text-primary flex items-center justify-center transition-colors z-20">
              <ChevronRight className="w-8 h-8" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
