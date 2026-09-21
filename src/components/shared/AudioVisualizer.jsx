import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';

export const AudioVisualizer = ({ isLive = true, barCount = 12 }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [frequencies, setFrequencies] = useState(
    Array.from({ length: barCount }, () => Math.floor(Math.random() * 26) + 6)
  );

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setFrequencies(
        Array.from({ length: barCount }, (_, i) => {
          // Mid-range frequencies have slightly higher amplitudes
          const factor = Math.sin((i / barCount) * Math.PI);
          return Math.floor(Math.random() * 24 * factor) + 8;
        })
      );
    }, 140);
    return () => clearInterval(interval);
  }, [isPlaying, barCount]);

  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-purple-500/20 backdrop-blur-md">
      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className="text-purple-400 hover:text-purple-300 transition-colors"
        title={isPlaying ? 'Mute Visualizer' : 'Start Audio Waves'}
      >
        {isPlaying ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5 text-slate-500" />}
      </button>

      <div className="flex items-end gap-1 h-5 w-auto">
        {frequencies.map((height, i) => (
          <motion.span
            key={i}
            animate={{ height: isPlaying ? `${height}px` : '4px' }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            className={`w-1 rounded-full ${
              i % 3 === 0
                ? 'bg-gradient-to-t from-purple-500 to-pink-500'
                : i % 2 === 0
                ? 'bg-gradient-to-t from-cyan-500 to-blue-500'
                : 'bg-gradient-to-t from-amber-400 to-pink-500'
            }`}
          />
        ))}
      </div>

      <span className="text-[11px] font-mono tracking-wider font-semibold text-slate-300 ml-1 uppercase">
        {isPlaying ? '104.8 dB' : 'MUTED'}
      </span>
    </div>
  );
};

