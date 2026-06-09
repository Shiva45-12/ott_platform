import React from 'react';

const AppDownload = () => {
  return (
    <div className="px-4 md:px-8 md:pl-[100px] py-16 md:py-24 max-w-7xl mx-auto">
      <div className="bg-background-secondary border border-white/10 rounded-3xl p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-10 relative overflow-hidden shadow-xl">
        
        {/* Subtle Glow Effects */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="relative z-10 text-center md:text-left max-w-2xl">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
            Take entertainment wherever you go
          </h2>
          <p className="text-gray-400 text-lg md:text-xl font-medium">
            Download our app to stream your favorite movies and shows on your phone or tablet. Watch offline, anywhere, anytime.
          </p>
        </div>

        <div className="relative z-10 flex flex-col sm:flex-row gap-4">
          {/* App Store Button */}
          <button className="flex items-center justify-center gap-3 bg-black hover:bg-white/10 border border-white/20 text-white rounded-xl px-6 py-3 transition-transform duration-300 hover:scale-105 min-w-[210px] group shadow-md">
            <svg className="w-8 h-8 text-white" viewBox="0 0 384 512" fill="currentColor">
              <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
            </svg>
            <div className="text-left">
              <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest leading-none mb-1">Download on the</div>
              <div className="text-xl font-bold leading-none tracking-tight">App Store</div>
            </div>
          </button>

          {/* Google Play Button */}
          <button className="flex items-center justify-center gap-3 bg-black hover:bg-white/10 border border-white/20 text-white rounded-xl px-6 py-3 transition-transform duration-300 hover:scale-105 min-w-[210px] group shadow-md">
            <svg className="w-8 h-8 text-white" viewBox="0 0 512 512" fill="currentColor">
              <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z"/>
            </svg>
            <div className="text-left">
              <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest leading-none mb-1">GET IT ON</div>
              <div className="text-xl font-bold leading-none tracking-tight">Google Play</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppDownload;
