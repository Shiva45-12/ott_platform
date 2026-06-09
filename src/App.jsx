import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Play } from 'lucide-react';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Watch from './pages/Watch';
import Plans from './pages/Plans';
import Auth from './pages/Auth';
import Profile from './pages/Profile';
import Discovery from './pages/Discovery';
import MyList from './pages/MyList';
import Originals from './pages/Originals';
import TVShows from './pages/TVShows';
import Sports from './pages/Sports';
import Crunchyroll from './pages/Crunchyroll';
import TopCategories from './pages/TopCategories';
import Downloads from './pages/Downloads';
import Notifications from './pages/Notifications';
import HelpSupport from './pages/HelpSupport';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import FAQ from './pages/FAQ';

const SplashScreen = () => (
  <motion.div 
    initial={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.6, ease: "easeInOut" }}
    className="fixed inset-0 bg-[#050505] z-[200] flex flex-col items-center justify-center overflow-hidden"
  >
    {/* Background Glow */}
    <motion.div 
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#0f3c96]/30 rounded-full blur-[100px] pointer-events-none"
    />
    
    <motion.div 
      initial={{ scale: 0.8, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
      className="flex flex-col items-center relative z-10"
    >
      <div className="mb-6 flex flex-col items-center justify-center p-6 bg-[#050505] rounded-3xl border border-white/5 shadow-2xl shadow-[#ffae00]/5">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#ffae00] to-[#e65c00] flex items-center justify-center shadow-lg shadow-[#ffae00]/30 mb-4">
          <svg className="w-10 h-10 text-white ml-1.5" fill="currentColor" viewBox="0 0 24 24">
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
          </svg>
        </div>
        <span className="text-4xl md:text-5xl font-black tracking-tighter italic text-white drop-shadow-md">
          Stream<span className="text-[#ffae00]">X</span>
        </span>
      </div>
      
      <motion.div 
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: 140, opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.4, ease: "easeInOut" }}
        className="h-1 bg-gradient-to-r from-transparent via-[#ffae00] to-transparent mt-8 rounded-full"
      />
    </motion.div>
  </motion.div>
);

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500); // Show splash for 2.5 seconds
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {loading && <SplashScreen />}
      </AnimatePresence>
      
      {!loading && (
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Auth />} />
              <Route path="/register" element={<Auth />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/watch/:id" element={<Watch />} />
              <Route path="/movies" element={<Home />} />
              <Route path="/series" element={<Discovery />} />
              <Route path="/search" element={<Discovery />} />
              <Route path="/discovery" element={<Discovery />} />
              <Route path="/my-list" element={<MyList />} />
              <Route path="/originals" element={<Originals />} />
              <Route path="/tv-shows" element={<TVShows />} />
              <Route path="/sports" element={<Sports />} />
              <Route path="/crunchyroll" element={<Crunchyroll />} />
              <Route path="/categories" element={<TopCategories />} />
              <Route path="/downloads" element={<Downloads />} />
              <Route path="/plans" element={<Plans />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/help" element={<HelpSupport />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/faq" element={<FAQ />} />
              {/* Catch all */}
              <Route path="*" element={<div className="p-20 text-center"><h1 className="text-4xl">404 - Not Found</h1></div>} />
            </Routes>
          </Layout>
        </Router>
      )}
    </>
  );
}
export default App;
