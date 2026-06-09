import React from 'react';
import { Monitor, Smartphone, Laptop } from 'lucide-react';

const DeviceShowcase = () => {
  const devices = [
    {
      icon: <Monitor className="w-16 h-16 text-white mb-6 group-hover:text-primary transition-colors" strokeWidth={1.5} />,
      title: "Watch on TV",
      desc: "Smart TVs, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray players and more."
    },
    {
      icon: <Laptop className="w-16 h-16 text-white mb-6 group-hover:text-primary transition-colors" strokeWidth={1.5} />,
      title: "Watch on PC",
      desc: "Stream unlimited movies and TV shows on your desktop and laptop."
    },
    {
      icon: <Smartphone className="w-16 h-16 text-white mb-6 group-hover:text-primary transition-colors" strokeWidth={1.5} />,
      title: "Watch on Mobile",
      desc: "Save your favorites easily and always have something to watch on the go."
    }
  ];

  return (
    <div className="py-20 md:py-28 px-4 md:px-8 max-w-7xl mx-auto border-t border-white/10 mt-10">
      <div className="text-center mb-16 md:mb-20">
        <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
          Available on your devices
        </h2>
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
          Experience premium entertainment seamlessly across your TV, computer, and mobile phone.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8">
        {devices.map((device, idx) => (
          <div 
            key={idx} 
            className="text-center flex flex-col items-center group cursor-pointer"
          >
            <div className="group-hover:-translate-y-3 transition-transform duration-300 ease-out bg-background-secondary p-6 rounded-2xl shadow-lg border border-white/10">
              {device.icon}
            </div>
            <h3 className="text-2xl font-bold text-white mb-4 tracking-wide group-hover:text-primary transition-colors duration-300 mt-6">
              {device.title}
            </h3>
            <p className="text-gray-400 text-base leading-relaxed max-w-[280px]">
              {device.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeviceShowcase;
