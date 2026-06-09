import React, { useRef, useState } from 'react';
import { Play, Volume2, VolumeX } from 'lucide-react';

const PromoVideo = () => {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="w-full mb-12 md:mb-16 relative z-10 hover:z-50 transition-all duration-300">
      <div className="px-6 md:px-14 lg:px-16 w-full h-[250px] md:h-[400px]">
        
        {/* Banner Container */}
        <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10 bg-black group shadow-2xl">
          
          {/* Background Video */}
          <div className="absolute inset-0 w-full h-full flex justify-end">
            <div className="w-[80%] md:w-[60%] h-full relative">
              {/* Using a placeholder video or the avengers video we have */}
              <video 
                ref={videoRef}
                className="w-full h-full object-cover"
                autoPlay 
                muted={isMuted} 
                loop 
                playsInline
              >
                <source src="/video/spiderman.mp4" type="video/mp4" />
              </video>
              
              {/* Gradient overlay to blend video with the black background on the left */}
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent w-[60%]"></div>
            </div>
          </div>

          {/* Left Side Content */}
          <div className="absolute inset-y-0 left-0 w-full md:w-1/2 flex flex-col justify-center px-8 md:px-16 z-10">
            {/* Promo Logo / Title Image */}
            <div className="mb-8">
              <h3 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 italic tracking-tighter transform -rotate-2" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)'}}>
                BLOCKBUSTER <br/> SATURDAY
              </h3>
            </div>

            {/* Watch Promo Button */}
            <button className="flex items-center justify-center gap-2 px-6 py-2.5 bg-white hover:bg-gray-200 text-black rounded-md font-bold transition-all text-sm md:text-[15px] w-max shadow-lg">
              <Play className="w-5 h-5" fill="currentColor" />
              Watch Promo
            </button>
          </div>

          {/* Mute/Unmute Toggle */}
          <button 
            onClick={toggleMute}
            className="absolute bottom-4 right-4 w-10 h-10 bg-black/50 hover:bg-black/80 rounded-full flex items-center justify-center text-white border border-white/20 transition-all z-20 opacity-0 group-hover:opacity-100"
          >
            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </button>

        </div>
      </div>
    </div>
  );
};

export default PromoVideo;
