import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Trash2, Play, CheckCircle2, AlertCircle, HardDrive, Smartphone } from 'lucide-react';

const DOWNLOAD_DATA = [
  {
    id: 'd1',
    title: 'The Family Man',
    subtitle: 'S2 E1 - The Exile',
    image: '/latest/the_family_man.png',
    size: '450 MB',
    status: 'completed', // completed, downloading, paused
    progress: 100,
  },
  {
    id: 'd2',
    title: 'Animal',
    subtitle: 'Full Movie',
    image: '/latest/animal.png',
    size: '2.1 GB',
    status: 'completed',
    progress: 100,
  },
  {
    id: 'd3',
    title: 'Jujutsu Kaisen',
    subtitle: 'S2 E14 - Fluctuations',
    image: '/anime/2.png',
    size: '320 MB',
    status: 'downloading',
    progress: 68,
    speed: '4.2 MB/s',
    timeRemaining: '2 mins left'
  },
  {
    id: 'd4',
    title: 'Spiderman: No Way Home',
    subtitle: 'Full Movie',
    image: '/images/spideman.png',
    size: '1.8 GB',
    status: 'paused',
    progress: 35,
  }
];

const Downloads = () => {
  const [downloads, setDownloads] = useState(DOWNLOAD_DATA);
  const [activeTab, setActiveTab] = useState('all'); // all, movies, shows

  const removeDownload = (id) => {
    setDownloads(downloads.filter(item => item.id !== id));
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'completed': return 'text-green-500';
      case 'downloading': return 'text-blue-500';
      case 'paused': return 'text-orange-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20 pl-0 md:pl-20 pt-8">
      <div className="max-w-[1200px] mx-auto px-6">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                <Download className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-white">Downloads</h1>
            </div>
            <p className="text-gray-400">Watch your favorite movies and shows offline.</p>
          </div>

          {/* Storage Info Widget */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center gap-6 w-full md:w-auto">
            <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
              <Smartphone className="w-6 h-6 text-blue-400" />
            </div>
            <div className="flex-1 md:w-48">
              <div className="flex justify-between text-sm mb-1.5">
                <span className="text-white font-medium">Internal Storage</span>
                <span className="text-gray-400">45 GB free</span>
              </div>
              <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full w-[65%]" />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          {['all', 'movies', 'shows'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold capitalize transition-all duration-300 ${
                activeTab === tab 
                  ? 'bg-white text-black shadow-lg shadow-white/20' 
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Downloads List */}
        {downloads.length > 0 ? (
          <div className="flex flex-col gap-4">
            <AnimatePresence>
              {downloads.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                  className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center gap-4 hover:bg-white/10 transition-colors group relative overflow-hidden"
                >
                  {/* Progress background line for active downloads */}
                  {item.status === 'downloading' && (
                    <div 
                      className="absolute bottom-0 left-0 h-1 bg-blue-500 transition-all duration-300"
                      style={{ width: `${item.progress}%` }}
                    />
                  )}

                  {/* Thumbnail */}
                  <div className="relative w-32 aspect-video rounded-lg overflow-hidden bg-gray-900 flex-shrink-0">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    {item.status === 'completed' && (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                          <Play className="w-5 h-5 text-black ml-1" fill="currentColor" />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0 py-1">
                    <h3 className="text-lg font-bold text-white truncate">{item.title}</h3>
                    <p className="text-gray-400 text-sm truncate mb-2">{item.subtitle}</p>
                    
                    <div className="flex items-center gap-4 text-xs font-medium">
                      <span className="text-gray-500 bg-black/40 px-2 py-1 rounded-md">{item.size}</span>
                      
                      <div className={`flex items-center gap-1.5 ${getStatusColor(item.status)}`}>
                        {item.status === 'completed' && <><CheckCircle2 className="w-4 h-4" /> Downloaded</>}
                        {item.status === 'downloading' && (
                          <>
                            <div className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
                            Downloading {item.progress}% • {item.speed} • {item.timeRemaining}
                          </>
                        )}
                        {item.status === 'paused' && <><AlertCircle className="w-4 h-4" /> Paused ({item.progress}%)</>}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3 pl-4">
                    {item.status === 'paused' && (
                      <button className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors">
                        <Download className="w-5 h-5" />
                      </button>
                    )}
                    <button 
                      onClick={() => removeDownload(item.id)}
                      className="w-10 h-10 rounded-full bg-red-500/10 hover:bg-red-500 hover:text-white flex items-center justify-center text-red-500 transition-colors"
                      title="Delete Download"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-32 text-center"
          >
            <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mb-6">
              <Download className="w-10 h-10 text-gray-500" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">No Downloads Yet</h2>
            <p className="text-gray-400 max-w-sm mb-8">Movies and TV shows that you download will appear here so you can watch them offline.</p>
            <button className="px-8 py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors">
              Find Something to Download
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Downloads;
