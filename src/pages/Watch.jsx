import React, { useState, useRef, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  Play, Pause, RotateCcw, RotateCw, Volume1, Volume2, VolumeX,
  Settings, MessageSquare, Maximize, Minimize, ChevronRight,
  Crown, Plus, Share2, ThumbsUp, ThumbsDown, Bell, Star,
  AlertTriangle, ArrowLeft
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Mock Data ───────────────────────────────────────────────────────────────
const RELATED_VIDEOS = [
  { id: 'r1', title: 'Animal — Making of the Film', duration: '12:45', thumbnail: '/latest/animal.png', views: '2.3M', isPremium: false },
  { id: 'r2', title: 'Fighter — Official Trailer', duration: '3:22', thumbnail: '/latest/fighter.png', views: '8.7M', isPremium: false },
  { id: 'r3', title: 'Dhurandhar — Full Movie', duration: '2:14:08', thumbnail: '/latest/dhurandhar.png', views: '5.1M', isPremium: true },
  { id: 'r4', title: 'Ramayana — Episode 1', duration: '45:00', thumbnail: '/latest/ramayana.png', views: '12M', isPremium: true },
  { id: 'r5', title: 'Witcher S3 — Episode 5', duration: '55:21', thumbnail: '/latest/witcher.png', views: '4.9M', isPremium: true },
  { id: 'r6', title: 'Game of Thrones — S8 Finale', duration: '1:20:02', thumbnail: '/latest/GOT.png', views: '20M', isPremium: false },
  { id: 'r7', title: 'Mirai — Animated Film', duration: '1:38:00', thumbnail: '/latest/mirai.png', views: '1.8M', isPremium: false },
  { id: 'r8', title: 'India\'s Best Dancer S4 Ep12', duration: '42:30', thumbnail: '/tvshows/best_dancer.png', views: '3.4M', isPremium: false },
  { id: 'r9', title: 'Indian Idol — Finale Night', duration: '2:00:00', thumbnail: '/tvshows/indian_idol.png', views: '9.2M', isPremium: false },
  { id: 'r10', title: 'Shrimad Ramayan — Full Episode', duration: '48:14', thumbnail: '/tvshows/shrimad_ramayan.png', views: '11M', isPremium: true },
];

// ─── Utility ─────────────────────────────────────────────────────────────────
const fmt = (s) => {
  if (!s || isNaN(s) || !isFinite(s)) return '00:00';
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60).toString().padStart(2, '0');
  const sec = Math.floor(s % 60).toString().padStart(2, '0');
  return h > 0 ? `${h}:${m}:${sec}` : `${m}:${sec}`;
};

// ─── Inline Video Player ──────────────────────────────────────────────────────
const InlinePlayer = ({ videoUrl, title, contentId }) => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const seekRef = useRef(null);
  const sessionIdRef = useRef(null);
  const heartbeatIntervalRef = useRef(null);

  const [playing, setPlaying] = useState(false);

  // Live session and heartbeat logic
  const startSession = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/viewer/start', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contentId: contentId || 'movie-animal',
          userId: 'anonymous-viewer',
          title: title || 'Animal'
        })
      });
      if (response.ok) {
        const result = await response.json();
        if (result.success && result.data?.sessionId) {
          sessionIdRef.current = result.data.sessionId;
          console.log('Started live viewing session:', sessionIdRef.current);
          
          // Setup heartbeat interval (every 30 seconds)
          if (heartbeatIntervalRef.current) clearInterval(heartbeatIntervalRef.current);
          heartbeatIntervalRef.current = setInterval(sendHeartbeat, 30000);
        }
      }
    } catch (err) {
      console.error('Failed to start viewing session:', err);
    }
  };

  const sendHeartbeat = async () => {
    if (!sessionIdRef.current) return;
    try {
      const response = await fetch('http://localhost:5000/api/viewer/heartbeat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId: sessionIdRef.current,
          contentId: contentId || 'movie-animal'
        })
      });
      if (!response.ok) {
        console.log('Session expired, restarting...');
        startSession();
      }
    } catch (err) {
      console.error('Failed to send heartbeat:', err);
    }
  };

  const stopSession = async () => {
    if (!sessionIdRef.current) return;
    const sId = sessionIdRef.current;
    sessionIdRef.current = null;
    if (heartbeatIntervalRef.current) {
      clearInterval(heartbeatIntervalRef.current);
      heartbeatIntervalRef.current = null;
    }
    try {
      await fetch('http://localhost:5000/api/viewer/stop', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId: sId,
          contentId: contentId || 'movie-animal'
        })
      });
      console.log('Stopped live viewing session:', sId);
    } catch (err) {
      console.error('Failed to stop viewing session:', err);
    }
  };

  useEffect(() => {
    if (playing) {
      startSession();
    } else {
      stopSession();
    }
    return () => {
      stopSession();
    };
  }, [playing]);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [scrubbing, setScrubbing] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [hoverPct, setHoverPct] = useState(0);
  const [hoverTime, setHoverTime] = useState('');
  const [showControls, setShowControls] = useState(true);
  const [quality, setQuality] = useState('Auto');
  const [speed, setSpeed] = useState(1);
  const [showQuality, setShowQuality] = useState(false);
  const [showSpeed, setShowSpeed] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [toast, setToast] = useState('');
  const [toastKey, setToastKey] = useState(0);
  const [centerIcon, setCenterIcon] = useState(null);
  const [qualityLoading, setQualityLoading] = useState(false);
  const [skipVisible, setSkipVisible] = useState(false);

  const hideTimer = useRef(null);

  const showToast = (msg) => { setToast(msg); setToastKey(k => k + 1); };

  const resetHide = () => {
    setShowControls(true);
    clearTimeout(hideTimer.current);
    if (playing && !showQuality && !showSpeed && !scrubbing) {
      hideTimer.current = setTimeout(() => setShowControls(false), 3000);
    }
  };

  useEffect(() => { resetHide(); return () => clearTimeout(hideTimer.current); },
    [playing, showQuality, showSpeed, scrubbing]);

  useEffect(() => {
    const onFullChange = () => setFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', onFullChange);
    return () => document.removeEventListener('fullscreenchange', onFullChange);
  }, []);

  // Toast auto-clear
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(''), 2000);
    return () => clearTimeout(t);
  }, [toastKey]);

  // Center icon auto-clear
  useEffect(() => {
    if (!centerIcon) return;
    const t = setTimeout(() => setCenterIcon(null), 600);
    return () => clearTimeout(t);
  }, [centerIcon]);

  // Skip intro visibility
  useEffect(() => {
    setSkipVisible(currentTime >= 3 && currentTime <= 28);
  }, [currentTime]);

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e) => {
      const tag = document.activeElement?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      switch (e.key.toLowerCase()) {
        case ' ': case 'k': e.preventDefault(); togglePlay(); break;
        case 'm': e.preventDefault(); toggleMute(); break;
        case 'f': e.preventDefault(); toggleFS(); break;
        case 'arrowleft': case 'j': e.preventDefault(); skip(-10); break;
        case 'arrowright': case 'l': e.preventDefault(); skip(10); break;
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [playing, muted, fullscreen]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (playing) { videoRef.current.pause(); setPlaying(false); setCenterIcon('pause'); showToast('Paused'); }
    else { videoRef.current.play().catch(() => {}); setPlaying(true); setCenterIcon('play'); showToast('Playing'); }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    const next = !muted;
    videoRef.current.muted = next;
    setMuted(next);
    showToast(next ? 'Muted' : `Volume ${Math.round(volume * 100)}%`);
  };

  const skip = (sec) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = Math.max(0, Math.min(duration, videoRef.current.currentTime + sec));
    setCenterIcon(sec > 0 ? 'forward' : 'rewind');
    showToast(sec > 0 ? `+${sec}s` : `${sec}s`);
  };

  const toggleFS = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) containerRef.current.requestFullscreen().catch(() => {});
    else document.exitFullscreen();
  };

  const seek = (e) => {
    if (!seekRef.current || !duration) return;
    const rect = seekRef.current.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    setProgress(pct * 100);
    setCurrentTime(pct * duration);
    if (videoRef.current) videoRef.current.currentTime = pct * duration;
  };

  const onSeekMouseMove = (e) => {
    if (!seekRef.current || !duration) return;
    const rect = seekRef.current.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    setHoverPct(pct * 100);
    setHoverTime(fmt(pct * duration));
  };

  const onSeekMouseDown = (e) => {
    e.preventDefault();
    setScrubbing(true);
    seek(e);
    const up = () => { setScrubbing(false); window.removeEventListener('mousemove', move); window.removeEventListener('mouseup', up); };
    const move = (ev) => seek(ev);
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
  };

  const changeQuality = (q) => {
    if (q === quality) { setShowQuality(false); return; }
    setQualityLoading(true);
    setShowQuality(false);
    const wasPlaying = playing;
    videoRef.current?.pause();
    setTimeout(() => {
      setQuality(q);
      setQualityLoading(false);
      if (wasPlaying) videoRef.current?.play().catch(() => {});
      showToast(`Quality: ${q}`);
    }, 900);
  };

  const changeSpeed = (s) => {
    setSpeed(s);
    setShowSpeed(false);
    if (videoRef.current) videoRef.current.playbackRate = s;
    showToast(`Speed: ${s}x`);
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full bg-black select-none ${showControls ? 'cursor-default' : 'cursor-none'}`}
      style={{ aspectRatio: '16/9' }}
      onMouseMove={resetHide}
      onMouseLeave={() => { if (playing) setShowControls(false); }}
    >
      {/* VIDEO */}
      <video
        ref={videoRef}
        src={videoUrl}
        className="w-full h-full object-contain"
        onTimeUpdate={() => {
          if (scrubbing || !videoRef.current) return;
          setCurrentTime(videoRef.current.currentTime);
          setProgress((videoRef.current.currentTime / videoRef.current.duration) * 100 || 0);
        }}
        onLoadedMetadata={() => setDuration(videoRef.current?.duration || 0)}
        onEnded={() => { setPlaying(false); setCenterIcon(null); }}
        onClick={(e) => { if (e.target.closest('.ctrl')) return; togglePlay(); }}
        onDoubleClick={(e) => { if (e.target.closest('.ctrl')) return; toggleFS(); }}
      />

      {/* QUALITY LOADING SPINNER */}
      <AnimatePresence>
        {qualityLoading && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center z-50 pointer-events-none"
          >
            <div className="w-10 h-10 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mb-3" />
            <span className="text-white text-sm font-semibold tracking-wider">Switching to {quality}…</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TOAST */}
      <AnimatePresence>
        {toast && (
          <motion.div
            key={toastKey}
            initial={{ opacity: 0, y: -10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            className="absolute top-16 left-1/2 -translate-x-1/2 z-50 pointer-events-none bg-black/80 backdrop-blur-sm border border-white/10 text-white text-xs font-bold px-4 py-2 rounded-full flex items-center gap-2 shadow-xl"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

      {/* CENTER ICON FLASH */}
      <AnimatePresence>
        {centerIcon && (
          <motion.div
            key={centerIcon + Math.random()}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1.1 }}
            exit={{ opacity: 0, scale: 1.5 }}
            transition={{ duration: 0.35 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none z-40"
          >
            <div className="bg-black/60 backdrop-blur-md border border-white/10 rounded-full p-5">
              {centerIcon === 'play' && <Play className="w-10 h-10 text-yellow-400" fill="currentColor" />}
              {centerIcon === 'pause' && <Pause className="w-10 h-10 text-yellow-400" fill="currentColor" />}
              {centerIcon === 'forward' && <RotateCw className="w-10 h-10 text-yellow-400" />}
              {centerIcon === 'rewind' && <RotateCcw className="w-10 h-10 text-yellow-400" />}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* BIG PLAY BUTTON WHEN PAUSED */}
      {!playing && !qualityLoading && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
          onClick={togglePlay}
          className="ctrl absolute inset-0 flex items-center justify-center z-30 cursor-pointer"
        >
          <div className="bg-yellow-400 hover:bg-yellow-300 text-black rounded-full p-5 shadow-2xl transition-all hover:scale-105 active:scale-95">
            <Play className="w-10 h-10 ml-1" fill="currentColor" />
          </div>
        </motion.button>
      )}

      {/* SKIP INTRO */}
      <AnimatePresence>
        {skipVisible && (
          <motion.button
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
            onClick={() => { if (videoRef.current) { videoRef.current.currentTime = 30; showToast('Intro Skipped'); } }}
            className="ctrl absolute bottom-[72px] right-4 z-40 bg-black/70 hover:bg-yellow-400 hover:text-black text-white text-sm font-bold px-4 py-2 rounded-lg border border-white/20 backdrop-blur-md flex items-center gap-1.5 shadow-xl transition-all cursor-pointer"
          >
            Skip Intro <ChevronRight className="w-4 h-4" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── TOP BAR ─────────────────────────────────────────────── */}
      <div
        className={`ctrl absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-4 py-3 bg-gradient-to-b from-black/90 to-transparent transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      >
        <span className="text-white font-semibold text-sm tracking-wide flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
          {title}
        </span>
        <button
          onClick={() => showToast('Reported streaming issue')}
          className="text-white/70 hover:text-white transition-colors p-1"
          title="Report Issue"
        >
          <AlertTriangle className="w-5 h-5" />
        </button>
      </div>

      {/* ── SEEK BAR ─────────────────────────────────────────────── */}
      <div
        className={`ctrl absolute bottom-10 left-0 right-0 px-4 z-30 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      >
        <div
          ref={seekRef}
          className="relative w-full py-2 cursor-pointer group/seek"
          onMouseMove={onSeekMouseMove}
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
          onMouseDown={onSeekMouseDown}
        >
          {/* track bg */}
          <div className="w-full h-[3px] bg-white/25 rounded-full group-hover/seek:h-1 transition-all">
            <div className="h-full bg-yellow-400 rounded-full" style={{ width: `${progress}%` }} />
          </div>
          {/* knob */}
          <div
            className={`absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-yellow-400 border-2 border-white shadow-md pointer-events-none transition-all ${scrubbing || hovering ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}
            style={{ left: `calc(${progress}% - 7px)` }}
          />
          {/* tooltip */}
          {hovering && (
            <div
              className="absolute bottom-5 bg-gray-900 text-white text-[10px] font-bold px-2 py-1 rounded pointer-events-none -translate-x-1/2 border border-white/10"
              style={{ left: `${hoverPct}%` }}
            >
              {hoverTime}
            </div>
          )}
        </div>

        {/* TIME + REMAINING */}
        <div className="flex items-center justify-between text-[11px] text-gray-300 font-medium mt-0.5 px-0.5">
          <span>{fmt(currentTime)}</span>
          <span>-{fmt(duration - currentTime)}</span>
        </div>
      </div>

      {/* ── BOTTOM CONTROLS ──────────────────────────────────────── */}
      <div
        className={`ctrl absolute bottom-0 left-0 right-0 z-30 flex items-center justify-between px-4 py-2 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      >
        {/* LEFT */}
        <div className="flex items-center gap-1">
          {/* Play/Pause */}
          <button onClick={togglePlay} className="text-white hover:text-yellow-400 p-1.5 rounded transition-colors" title={playing ? 'Pause (K)' : 'Play (K)'}>
            {playing ? <Pause className="w-5 h-5" fill="currentColor" /> : <Play className="w-5 h-5" fill="currentColor" />}
          </button>
          {/* Rewind */}
          <button onClick={() => skip(-10)} className="text-white hover:text-yellow-400 p-1.5 rounded transition-colors relative" title="Rewind 10s (J)">
            <RotateCcw className="w-5 h-5" />
            <span className="absolute inset-0 flex items-center justify-center text-[7px] font-black mt-0.5">10</span>
          </button>
          {/* Forward */}
          <button onClick={() => skip(10)} className="text-white hover:text-yellow-400 p-1.5 rounded transition-colors relative" title="Forward 10s (L)">
            <RotateCw className="w-5 h-5" />
            <span className="absolute inset-0 flex items-center justify-center text-[7px] font-black mt-0.5">10</span>
          </button>
          {/* Volume */}
          <div className="flex items-center gap-1 group/vol">
            <button onClick={toggleMute} className="text-white hover:text-yellow-400 p-1.5 rounded transition-colors" title="Mute (M)">
              {muted ? <VolumeX className="w-5 h-5" /> : volume > 0.5 ? <Volume2 className="w-5 h-5" /> : <Volume1 className="w-5 h-5" />}
            </button>
            <input
              type="range" min="0" max="1" step="0.02"
              value={muted ? 0 : volume}
              onChange={(e) => {
                const v = parseFloat(e.target.value);
                setVolume(v);
                setMuted(v === 0);
                if (videoRef.current) { videoRef.current.volume = v; videoRef.current.muted = v === 0; }
              }}
              className="w-0 opacity-0 group-hover/vol:w-16 group-hover/vol:opacity-100 transition-all duration-300 accent-yellow-400 h-[3px] cursor-pointer"
            />
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-1">
          {/* Speed */}
          <div className="relative">
            <button
              onClick={(e) => { e.stopPropagation(); setShowSpeed(s => !s); setShowQuality(false); }}
              className={`text-[10px] font-black px-2 py-1 rounded border transition-all ${showSpeed ? 'border-yellow-400 text-yellow-400' : 'border-white/20 text-white hover:border-white'}`}
            >
              {speed === 1 ? '1×' : `${speed}×`}
            </button>
            <AnimatePresence>
              {showSpeed && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }}
                  className="absolute bottom-9 right-0 bg-[#111] border border-white/10 rounded-lg overflow-hidden min-w-[110px] shadow-2xl z-50"
                >
                  <div className="px-3 py-1.5 border-b border-white/10 bg-white/5">
                    <span className="text-gray-400 text-[9px] font-bold uppercase tracking-wider">Speed</span>
                  </div>
                  {[0.5, 0.75, 1, 1.25, 1.5, 2].map(s => (
                    <button
                      key={s}
                      onClick={(e) => { e.stopPropagation(); changeSpeed(s); }}
                      className={`w-full text-left px-3 py-1.5 text-xs font-semibold hover:bg-white/10 flex justify-between items-center ${speed === s ? 'text-yellow-400' : 'text-white'}`}
                    >
                      {s === 1 ? 'Normal' : `${s}×`}
                      {speed === s && <span>✓</span>}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Quality */}
          <div className="relative">
            <button
              onClick={(e) => { e.stopPropagation(); setShowQuality(q => !q); setShowSpeed(false); }}
              className={`text-white hover:text-yellow-400 p-1.5 rounded transition-colors ${showQuality ? 'text-yellow-400' : ''}`}
              title="Quality"
            >
              <Settings className="w-5 h-5" />
            </button>
            <AnimatePresence>
              {showQuality && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }}
                  className="absolute bottom-9 right-0 bg-[#111] border border-white/10 rounded-lg overflow-hidden min-w-[130px] shadow-2xl z-50"
                >
                  <div className="px-3 py-1.5 border-b border-white/10 bg-white/5">
                    <span className="text-gray-400 text-[9px] font-bold uppercase tracking-wider">Quality</span>
                  </div>
                  {['Auto', '1080p', '720p', '360p'].map(q => (
                    <button
                      key={q}
                      onClick={(e) => { e.stopPropagation(); changeQuality(q); }}
                      className={`w-full text-left px-3 py-1.5 text-xs font-semibold hover:bg-white/10 flex justify-between items-center ${quality === q ? 'text-yellow-400' : 'text-white'}`}
                    >
                      {q}
                      {quality === q && <span>✓</span>}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Subtitles */}
          <button
            onClick={() => showToast('Subtitles: English [CC]')}
            className="text-white hover:text-yellow-400 p-1.5 rounded transition-colors"
            title="Subtitles"
          >
            <MessageSquare className="w-5 h-5" />
          </button>

          {/* Fullscreen */}
          <button
            onClick={toggleFS}
            className="text-white hover:text-yellow-400 p-1.5 rounded transition-colors"
            title="Fullscreen (F)"
          >
            {fullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Related Video Card ───────────────────────────────────────────────────────
const RelatedCard = ({ item }) => (
  <motion.div
    whileHover={{ x: 3 }}
    className="flex gap-3 cursor-pointer group"
  >
    {/* Landscape 16:9 thumbnail */}
    <div className="relative flex-shrink-0 rounded-xl overflow-hidden bg-gray-900" style={{ width: '160px', height: '90px' }}>
      <img
        src={item.thumbnail}
        alt={item.title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />
      {/* Play overlay */}
      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
        <div className="bg-yellow-400 rounded-full p-1.5 shadow-lg">
          <Play className="w-3 h-3 text-black" fill="currentColor" />
        </div>
      </div>
      {/* Duration badge */}
      <span className="absolute bottom-1.5 right-1.5 bg-black/85 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
        {item.duration}
      </span>
      {/* Premium badge */}
      {item.isPremium && (
        <div className="absolute top-1.5 left-1.5 bg-yellow-400 rounded-md px-1.5 py-0.5 flex items-center gap-0.5">
          <Crown className="w-2.5 h-2.5 text-black" fill="currentColor" />
          <span className="text-black text-[8px] font-black">PRO</span>
        </div>
      )}
    </div>

    {/* Text info */}
    <div className="flex-1 min-w-0 flex flex-col justify-center gap-1">
      <p className="text-white text-[13px] font-semibold leading-snug line-clamp-2 group-hover:text-yellow-400 transition-colors">
        {item.title}
      </p>
      <p className="text-gray-500 text-xs">{item.views} views</p>
    </div>
  </motion.div>
);

// ─── Main Watch Page ──────────────────────────────────────────────────────────
const Watch = () => {
  const { id } = useParams();
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [myList, setMyList] = useState(false);
  const [showDesc, setShowDesc] = useState(false);

  const movie = {
    title: 'Animal',
    subtitle: 'Full Movie • 2023 • Action, Crime, Drama',
    breadcrumb: ['Home', 'Movies', 'Animal'],
    year: '2023',
    certification: 'A',
    language: 'Hindi +4',
    genre: 'Action, Crime, Drama',
    views: '14.2M',
    likes: '1.1M',
    description: 'The son of a wealthy, powerful industrialist returns home after living abroad and undergoes a remarkable transformation as he plunges into the underworld to protect his father at any cost. A raw, visceral tale of love, betrayal, and vengeance.',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pb-16 pl-0 md:pl-20">

      {/* ── VIDEO PLAYER — full width strip ─────────────────── */}
      <div className="w-full bg-black">
        <InlinePlayer videoUrl={movie.videoUrl} title={movie.title} contentId={id || 'movie-animal'} />
      </div>

      {/* ── MAIN CONTENT ─────────────────────────────────────── */}
      <div className="px-6 xl:px-10 mt-4">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1 text-xs text-gray-500 mb-4">
          {movie.breadcrumb.map((crumb, i) => (
            <React.Fragment key={crumb}>
              {i > 0 && <ChevronRight className="w-3 h-3 text-gray-600" />}
              <span className={i === movie.breadcrumb.length - 1 ? 'text-gray-300 font-medium' : 'hover:text-white cursor-pointer transition-colors'}>
                {crumb}
              </span>
            </React.Fragment>
          ))}
        </nav>

        {/* Two-column layout */}
        <div className="flex flex-col xl:flex-row gap-8 items-start">

          {/* ── LEFT COLUMN ─────────────────────────────── */}
          <div className="flex-1 min-w-0 overflow-hidden">

            {/* Tags */}
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="bg-gradient-to-r from-pink-600 to-purple-600 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">NEW MOVIE</span>
              <span className="border border-gray-600 text-gray-400 text-[10px] font-bold px-2 py-0.5 rounded uppercase">{movie.certification}</span>
              <span className="border border-gray-600 text-gray-400 text-[10px] font-bold px-2 py-0.5 rounded uppercase">ATMOS</span>
              <span className="border border-gray-600 text-gray-400 text-[10px] font-bold px-2 py-0.5 rounded uppercase">4K</span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-black text-white mb-1" style={{ fontFamily: 'serif' }}>
              {movie.title}
            </h1>
            <p className="text-gray-400 text-sm mb-4">{movie.subtitle}</p>

            {/* Stats */}
            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-400 mb-5">
              <div className="flex items-center gap-1.5">
                <Star className="w-4 h-4 text-yellow-400" fill="currentColor" />
                <span className="text-white font-bold">8.4</span>
                <span className="text-gray-500">/ 10</span>
              </div>
              <span className="text-gray-600">•</span>
              <span>{movie.views} views</span>
              <span className="text-gray-600">•</span>
              <span>{movie.language}</span>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <button
                onClick={() => { setLiked(l => !l); if (disliked) setDisliked(false); }}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm border transition-all ${
                  liked ? 'bg-yellow-400/10 border-yellow-400 text-yellow-400' : 'border-white/10 bg-white/5 text-gray-300 hover:border-white/30'
                }`}
              >
                <ThumbsUp className="w-4 h-4" fill={liked ? 'currentColor' : 'none'} />
                {liked ? 'Liked' : 'Like'}
                <span className="text-xs opacity-50">{movie.likes}</span>
              </button>

              <button
                onClick={() => { setDisliked(d => !d); if (liked) setLiked(false); }}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm border transition-all ${
                  disliked ? 'bg-red-500/10 border-red-500 text-red-400' : 'border-white/10 bg-white/5 text-gray-300 hover:border-white/30'
                }`}
              >
                <ThumbsDown className="w-4 h-4" fill={disliked ? 'currentColor' : 'none'} />
              </button>

              <button
                onClick={() => setMyList(m => !m)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm border transition-all ${
                  myList ? 'bg-green-500/10 border-green-500 text-green-400' : 'border-white/10 bg-white/5 text-gray-300 hover:border-white/30'
                }`}
              >
                <Plus className="w-4 h-4" />
                {myList ? 'In My List' : 'My List'}
              </button>

              <button className="flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm border border-white/10 bg-white/5 text-gray-300 hover:border-white/30 transition-all">
                <Share2 className="w-4 h-4" /> Share
              </button>

              <button
                onClick={() => setSubscribed(s => !s)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm transition-all ${
                  subscribed
                    ? 'bg-gray-700 text-gray-300'
                    : 'bg-gradient-to-r from-orange-500 to-yellow-500 text-black hover:from-orange-400 hover:to-yellow-400 shadow-lg shadow-orange-500/20'
                }`}
              >
                {subscribed ? <Bell className="w-4 h-4" fill="currentColor" /> : <Crown className="w-4 h-4" fill="currentColor" />}
                {subscribed ? 'Subscribed' : 'Subscribe'}
              </button>
            </div>

            {/* Description card */}
            <div className="bg-white/5 border border-white/[0.08] rounded-2xl p-4 mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">About this movie</span>
                <div className="flex gap-2 text-[10px] text-gray-500">
                  <span className="border border-gray-700 px-2 py-0.5 rounded">{movie.year}</span>
                  <span className="border border-gray-700 px-2 py-0.5 rounded">{movie.genre}</span>
                </div>
              </div>
              <p className={`text-gray-300 text-sm leading-relaxed ${!showDesc ? 'line-clamp-3' : ''}`}>
                {movie.description}
              </p>
              <button
                onClick={() => setShowDesc(d => !d)}
                className="text-yellow-400 text-xs font-bold mt-2 hover:underline"
              >
                {showDesc ? 'Show less ▲' : 'Show more ▼'}
              </button>
            </div>

            {/* More Like This — horizontal scroll of portrait cards */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-white font-bold text-base">More Like This</h3>
                <button className="text-yellow-400 text-xs font-bold flex items-center gap-1 hover:underline">
                  See all <ChevronRight className="w-3 h-3" />
                </button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {RELATED_VIDEOS.map((item) => (
                  <motion.div
                    key={item.id}
                    whileHover={{ scale: 1.04, y: -4 }}
                    className="w-full cursor-pointer group"
                  >
                    <div className="relative w-full aspect-[2/3] rounded-xl overflow-hidden mb-2 bg-gray-900">
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-3">
                        <div className="bg-yellow-400 rounded-full p-1.5">
                          <Play className="w-3 h-3 text-black" fill="currentColor" />
                        </div>
                      </div>
                      {item.isPremium && (
                        <div className="absolute top-2 left-2 bg-yellow-400 rounded-md px-1.5 py-0.5 flex items-center gap-0.5">
                          <Crown className="w-2.5 h-2.5 text-black" fill="currentColor" />
                          <span className="text-black text-[8px] font-black">PRO</span>
                        </div>
                      )}
                    </div>
                    <p className="text-white text-[11px] font-semibold leading-tight line-clamp-2 group-hover:text-yellow-400 transition-colors">
                      {item.title}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>{/* /LEFT COLUMN */}

          {/* ── RIGHT COLUMN — Related Videos ─────────────── */}
          <div className="w-full xl:w-[340px] 2xl:w-[380px] flex-shrink-0">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-white font-bold text-base">Related Videos</h3>
              <button className="text-yellow-400 text-xs font-bold flex items-center gap-1 hover:underline">
                See all <ChevronRight className="w-3 h-3" />
              </button>
            </div>

            <div className="flex flex-col gap-4">
              {RELATED_VIDEOS.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <RelatedCard item={item} />
                </motion.div>
              ))}
            </div>
          </div>

        </div>{/* /two-column */}
      </div>{/* /main content */}
    </div>
  );
};

export default Watch;
