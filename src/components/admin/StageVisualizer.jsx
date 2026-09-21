import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Volume2,
  Flame,
  Lightbulb,
  Wind,
  Sparkles,
  Zap,
  Sliders
} from 'lucide-react';
import { useEvent } from '../../context/EventContext';

export const StageVisualizer = () => {
  const {
    stages,
    updateStageDecibels,
    toggleStagePyro,
    setStageLighting,
    setStageHaze,
    addNotification
  } = useEvent();

  const [selectedStageId, setSelectedStageId] = useState(stages[0].id);
  const [isFiringPyro, setIsFiringPyro] = useState(false);
  const [selectedZone, setSelectedZone] = useState('Front Pit');

  const currentStage = stages.find((s) => s.id === selectedStageId) || stages[0];

  const lightingPresets = [
    'Cyber Neon Matrix',
    'Inferno Strobe Flash',
    'Laser Storm 360°',
    'Botanical Hologram Swirl',
    'Warm Amber Deep Fade'
  ];

  const handleTestFirePyro = () => {
    if (!currentStage.pyroArmed) {
      addNotification('Pyro Safety Interlock', 'Cannot test fire: Pyrotechnics system is currently DISARMED.', 'warning');
      return;
    }
    setIsFiringPyro(true);
    addNotification('PYRO BLAST FIRED 🔥', `Simulated burst executed across 4 nozzles on ${currentStage.name}.`, 'warning');
    setTimeout(() => {
      setIsFiringPyro(false);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Header & Stage Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              FOH Stage & Soundboard Production Console
            </h2>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-purple-500/20 text-purple-300 border border-purple-500/40 uppercase">
              Live Link
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Real-time audio SPL metering, lighting automation, and pyrotechnic safety interlocks.
          </p>
        </div>

        {/* Stage Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900 border border-white/10 overflow-x-auto">
          {stages.map((stage) => (
            <button
              key={stage.id}
              onClick={() => setSelectedStageId(stage.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                selectedStageId === stage.id
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {stage.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 7 Cols: Interactive 2D Venue & Stage Layout Map */}
        <div className="lg:col-span-7 glass-panel rounded-2xl border border-white/10 p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-white">
                Live Venue Floorplan: {currentStage.name}
              </h3>
            </div>
            <span className="text-xs font-mono text-slate-400">
              Capacity: {currentStage.capacity.toLocaleString()} Pax
            </span>
          </div>

          {/* Interactive Visual Arena Graphic */}
          <div className="relative w-full h-[430px] rounded-xl bg-gradient-to-b from-slate-950 via-[#0a0f1d] to-slate-950 border border-white/10 overflow-hidden flex flex-col items-center justify-between p-4 select-none">
            {/* Ambient Lighting Overlay reacting to lighting preset */}
            <motion.div
              animate={{
                opacity: [0.3, 0.6, 0.3],
                scale: [0.98, 1.02, 0.98]
              }}
              transition={{ repeat: Infinity, duration: 4 }}
              className={`absolute inset-0 pointer-events-none ${
                currentStage.lightingMode.includes('Inferno')
                  ? 'bg-gradient-to-b from-orange-600/20 via-red-900/10 to-transparent'
                  : currentStage.lightingMode.includes('Laser')
                  ? 'bg-gradient-to-b from-cyan-600/20 via-blue-900/10 to-transparent'
                  : 'bg-gradient-to-b from-purple-600/20 via-indigo-900/10 to-transparent'
              }`}
            />

            {/* Pyro Blast Visual Effect Over Mainstage */}
            <AnimatePresence>
              {isFiringPyro && (
                <motion.div
                  initial={{ opacity: 0, scaleY: 0 }}
                  animate={{ opacity: 1, scaleY: 1 }}
                  exit={{ opacity: 0, scaleY: 1.5 }}
                  className="absolute top-12 z-30 w-full flex justify-around pointer-events-none"
                >
                  {[0, 1, 2, 3].map((idx) => (
                    <motion.div
                      key={idx}
                      animate={{ y: [-10, -50, -10], scaleX: [1, 1.4, 0.8] }}
                      transition={{ duration: 0.4, repeat: 2 }}
                      className="w-10 h-36 bg-gradient-to-t from-yellow-300 via-orange-500 to-transparent rounded-full blur-sm filter drop-shadow-[0_0_20px_#f97316]"
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* SECTION 1: The Stage & LED Wall */}
            <div className="w-full flex flex-col items-center relative z-20">
              {/* Pyro nozzles top indicators */}
              <div className="w-4/5 flex justify-between px-6 mb-1">
                {[1, 2, 3, 4].map((nozzle) => (
                  <div key={nozzle} className="flex flex-col items-center">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        currentStage.pyroArmed ? 'bg-orange-500 animate-pulse' : 'bg-slate-700'
                      }`}
                    />
                    <span className="text-[9px] font-mono text-slate-500">P{nozzle}</span>
                  </div>
                ))}
              </div>

              {/* Stage Platform */}
              <div className="w-4/5 h-20 rounded-xl bg-gradient-to-r from-purple-900/90 via-indigo-950 to-purple-900/90 border border-purple-400/50 shadow-lg shadow-purple-500/20 flex flex-col items-center justify-center relative group">
                <div className="text-[11px] font-mono font-bold tracking-widest text-purple-300 uppercase flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  PERFORMANCE STAGE & LED CYCLORAMA
                </div>
                <div className="text-xs font-black text-white mt-1">
                  CURRENT ACT: {currentStage.currentAct}
                </div>
                <span className="text-[10px] text-purple-200 font-mono mt-0.5">
                  Lighting Mode: {currentStage.lightingMode}
                </span>

                {/* Left & Right Speaker Arrays */}
                <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-4 h-16 rounded bg-cyan-600/80 border border-cyan-400 flex items-center justify-center shadow-lg shadow-cyan-500/40">
                  <span className="text-[8px] font-mono text-white -rotate-90">L-ARRAY</span>
                </div>
                <div className="absolute -right-6 top-1/2 -translate-y-1/2 w-4 h-16 rounded bg-cyan-600/80 border border-cyan-400 flex items-center justify-center shadow-lg shadow-cyan-500/40">
                  <span className="text-[8px] font-mono text-white -rotate-90">R-ARRAY</span>
                </div>
              </div>
            </div>

            {/* SECTION 2: Interactive Crowd Floor Zones */}
            <div className="w-full grid grid-cols-3 gap-3 my-2 z-10">
              {/* Golden Circle Pit */}
              <button
                onClick={() => setSelectedZone('Front Golden Circle')}
                className={`p-3 rounded-xl border text-center transition-all ${
                  selectedZone === 'Front Golden Circle'
                    ? 'border-yellow-400/60 bg-yellow-500/10 shadow-lg shadow-yellow-500/10'
                    : 'border-white/10 bg-slate-900/50 hover:border-white/20'
                }`}
              >
                <div className="text-[11px] font-bold text-yellow-300 uppercase font-mono">
                  Golden Circle Pit
                </div>
                <div className="text-xs text-slate-300 mt-1">Barricade High Energy</div>
                <div className="text-[10px] font-mono text-emerald-400 mt-0.5">88% Capacity</div>
              </button>

              {/* Main General Standing Area */}
              <button
                onClick={() => setSelectedZone('General Admission Floor')}
                className={`p-3 rounded-xl border text-center transition-all ${
                  selectedZone === 'General Admission Floor'
                    ? 'border-cyan-400/60 bg-cyan-500/10 shadow-lg shadow-cyan-500/10'
                    : 'border-white/10 bg-slate-900/50 hover:border-white/20'
                }`}
              >
                <div className="text-[11px] font-bold text-cyan-300 uppercase font-mono">
                  General Admission
                </div>
                <div className="text-xs text-slate-300 mt-1">Main Arena Floor</div>
                <div className="text-[10px] font-mono text-emerald-400 mt-0.5">92% Capacity</div>
              </button>

              {/* VIP SkyDeck Lounge */}
              <button
                onClick={() => setSelectedZone('VIP SkyDeck Lounge')}
                className={`p-3 rounded-xl border text-center transition-all ${
                  selectedZone === 'VIP SkyDeck Lounge'
                    ? 'border-purple-400/60 bg-purple-500/10 shadow-lg shadow-purple-500/10'
                    : 'border-white/10 bg-slate-900/50 hover:border-white/20'
                }`}
              >
                <div className="text-[11px] font-bold text-purple-300 uppercase font-mono">
                  VIP SkyDeck
                </div>
                <div className="text-xs text-slate-300 mt-1">Elevated Terrace</div>
                <div className="text-[10px] font-mono text-amber-400 mt-0.5">98% Full</div>
              </button>
            </div>

            {/* SECTION 3: Front of House (FOH) Soundboard position */}
            <div className="w-3/5 py-2 px-4 rounded-xl bg-slate-900/90 border border-white/20 shadow-md flex items-center justify-between text-xs z-10">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-cyan-400" />
                <span className="font-mono font-bold text-slate-200">FOH SOUND DESK</span>
              </div>
              <span className="text-[11px] text-slate-400 font-mono">
                Eng: {currentStage.soundEngineer}
              </span>
              <span className="text-xs font-mono font-bold text-purple-400">
                {currentStage.currentDecibels} dB
              </span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/80 border border-white/5 flex items-center justify-between text-xs text-slate-300">
            <span>Focused Floor Zone: <strong className="text-white">{selectedZone}</strong></span>
            <span className="text-emerald-400 font-mono">Status: Audience Safe & Audio Aligned</span>
          </div>
        </div>

        {/* Right 5 Cols: Real-time Controls Desk */}
        <div className="lg:col-span-5 glass-panel rounded-2xl border border-white/10 p-5 space-y-6">
          <div className="border-b border-white/10 pb-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
              <Sliders className="w-4 h-4 text-purple-400" />
              Live Stage Rig Controls
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Live adjustments propagate directly to stage technician displays.
            </p>
          </div>

          {/* Control 1: Sound Pressure Level (SPL) Decibel Slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-mono font-bold text-slate-300 flex items-center gap-1.5">
                <Volume2 className="w-4 h-4 text-cyan-400" />
                Master SPL Gain (FOH)
              </span>
              <span
                className={`font-mono font-black text-sm px-2 py-0.5 rounded ${
                  currentStage.currentDecibels > 106
                    ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                    : currentStage.currentDecibels > 101
                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                }`}
              >
                {currentStage.currentDecibels.toFixed(1)} dB
              </span>
            </div>

            <input
              type="range"
              min="85"
              max="110"
              step="0.5"
              value={currentStage.currentDecibels}
              onChange={(e) => updateStageDecibels(currentStage.id, e.target.value)}
              className="w-full accent-cyan-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
            />
            <div className="flex justify-between text-[10px] font-mono text-slate-500">
              <span>85 dB (Ambient)</span>
              <span>102 dB (Target)</span>
              <span>110 dB (MAX LIMIT)</span>
            </div>
          </div>

          {/* Control 2: Lighting Show Preset */}
          <div className="space-y-2">
            <label className="text-xs font-mono font-bold text-slate-300 flex items-center gap-1.5">
              <Lightbulb className="w-4 h-4 text-yellow-400" />
              GrandMA3 Lighting Rig Preset
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {lightingPresets.map((preset) => (
                <button
                  key={preset}
                  onClick={() => setStageLighting(currentStage.id, preset)}
                  className={`p-2 rounded-xl text-xs font-semibold text-left transition-all border ${
                    currentStage.lightingMode === preset
                      ? 'bg-purple-600/30 border-purple-400 text-white shadow-md shadow-purple-600/20'
                      : 'bg-slate-900 border-white/5 text-slate-400 hover:text-white'
                  }`}
                >
                  {preset}
                </button>
              ))}
            </div>
          </div>

          {/* Control 3: Pyrotechnics Arm / Safe Interlock */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Flame className={`w-5 h-5 ${currentStage.pyroArmed ? 'text-orange-500 animate-pulse' : 'text-slate-500'}`} />
                <div>
                  <h4 className="text-xs font-bold text-white uppercase font-mono">
                    Pyrotechnics Flame & Cryo Cannons
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    State: {currentStage.pyroArmed ? 'ARMED & PRESSURIZED' : 'SAFE / DISARMED'}
                  </p>
                </div>
              </div>

              <button
                onClick={() => toggleStagePyro(currentStage.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold uppercase transition-all ${
                  currentStage.pyroArmed
                    ? 'bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/30'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {currentStage.pyroArmed ? 'DISARM PYRO' : 'ARM SYSTEM'}
              </button>
            </div>

            {/* Test Fire Burst Button */}
            <button
              onClick={handleTestFirePyro}
              disabled={!currentStage.pyroArmed || isFiringPyro}
              className={`w-full py-2.5 rounded-xl text-xs font-bold font-mono tracking-wider transition-all flex items-center justify-center gap-2 ${
                currentStage.pyroArmed
                  ? 'bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white shadow-lg shadow-orange-600/30 active:scale-95'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-white/5'
              }`}
            >
              <Zap className="w-4 h-4" />
              {isFiringPyro ? 'FIRING TEST BURST...' : 'TRIGGER 2-SECOND FLAME BURST'}
            </button>
          </div>

          {/* Control 4: Stage Haze Density */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-300 flex items-center gap-1.5">
                <Wind className="w-4 h-4 text-cyan-400" />
                Atmospheric Haze & Fog Density
              </span>
              <span className="font-bold text-cyan-400">{currentStage.hazePercent}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={currentStage.hazePercent}
              onChange={(e) => setStageHaze(currentStage.id, Number(e.target.value))}
              className="w-full accent-purple-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
