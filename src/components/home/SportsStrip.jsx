import React from 'react';
import { Link } from 'react-router-dom';

const SportCard = ({ sport }) => {
  return (
    <Link 
      to="/sports"
      className="relative flex-none w-36 h-36 md:w-44 md:h-44 rounded-xl overflow-hidden group cursor-pointer border border-white/5 shadow-lg flex flex-col justify-between p-4"
    >
      {/* Background with diagonal split style */}
      <div className="absolute inset-0 bg-[#0c132c] z-0">
        <div className="absolute top-0 left-0 w-[150%] h-full bg-[#182550] -skew-x-12 -ml-10 transition-transform duration-500 group-hover:-translate-x-10"></div>
        <div className="absolute bottom-0 left-0 w-full h-[3px] bg-red-600/80"></div>
        <div className="absolute bottom-4 left-0 w-full h-[1px] bg-white/10"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full gap-3 mt-2">
        <div className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center">
          <img src={sport.icon} alt={sport.name} className="w-full h-full object-contain filter drop-shadow-md group-hover:scale-110 transition-transform duration-300" />
        </div>
        <span className="text-white text-xs md:text-sm font-black tracking-widest uppercase mt-auto pb-1">
          {sport.name}
        </span>
      </div>
    </Link>
  );
};

export const SportsStrip = ({ title, items = [] }) => {
  return (
    <div className="mb-8 md:mb-12 relative z-10">
      <h2 className="text-xl md:text-2xl font-extrabold text-white mb-4 px-6 md:px-14 lg:px-16 flex items-center gap-2 group cursor-pointer">
        {title}
        <span className="text-xl md:text-2xl opacity-70 group-hover:opacity-100 transition-opacity">›</span>
      </h2>
      
      <div className="flex gap-4 overflow-x-auto scrollbar-hide py-2">
        <div className="flex-none w-6 md:w-14 lg:w-16"></div>
        
        {items.map((item, index) => (
          <SportCard key={index} sport={item} />
        ))}
        
        <div className="flex-none w-6 md:w-14 lg:w-16"></div>
      </div>
    </div>
  );
};

export default SportsStrip;
