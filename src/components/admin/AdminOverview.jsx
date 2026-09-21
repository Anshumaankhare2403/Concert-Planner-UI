import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  DollarSign,
  Ticket,
  Flame,
  Volume2,
  Clock,
  ChevronRight,
  Radio,
  Zap
} from 'lucide-react';
import { useEvent } from '../../context/EventContext';

export const AdminOverview = ({ onNavigateTab }) => {
  const { concerts, stages, runOfShow, triggerCue, selectedConcert, setSelectedConcertId } = useEvent();

  // Next cue countdown simulation
  const [secondsLeft, setSecondsLeft] = useState(864); // ~14m 24s

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 900));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatCountdown = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}m ${s.toString().padStart(2, '0')}s`;
  };

  const totalRevenue = concerts.reduce((acc, c) => acc + c.grossRevenue, 0);
  const totalSold = concerts.reduce((acc, c) => acc + c.ticketsSold, 0);
  const totalCap = concerts.reduce((acc, c) => acc + c.totalCapacity, 0);
  const percentSold = ((totalSold / totalCap) * 100).toFixed(1);

  const activeCues = runOfShow.filter((c) => c.status === 'Active / Current');
  const nextCue = runOfShow.find((c) => c.status === 'Queued') || runOfShow[0];

  return (
    <div className="space-y-6">
      {/* Top Banner: Real-time Live Concert Status */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl border border-purple-500/30 bg-gradient-to-r from-slate-900 via-purple-950/40 to-slate-900 p-6 shadow-2xl backdrop-blur-xl"
      >
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 rounded-full bg-purple-600/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-10 w-48 h-48 rounded-full bg-cyan-600/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-xs font-mono font-bold tracking-widest text-emerald-400 uppercase">
                Active Production Console • High-Voltage Mode
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {selectedConcert.title}
            </h1>
            <p className="text-sm text-slate-300 flex items-center gap-3">
              <span>📍 {selectedConcert.venue}, {selectedConcert.city}</span>
              <span className="text-slate-500">•</span>
              <span>📅 {selectedConcert.date}</span>
              <span className="text-slate-500">•</span>
              <span className="font-mono text-purple-400 font-semibold">{selectedConcert.genre}</span>
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {/* Quick concert switcher */}
            <div className="bg-slate-900/90 border border-white/10 rounded-xl p-1.5 flex items-center gap-2">
              <span className="text-xs text-slate-400 pl-2 font-mono">Select Show:</span>
              <select
                value={selectedConcert.id}
                onChange={(e) => setSelectedConcertId(e.target.value)}
                className="bg-slate-800 text-white text-xs font-semibold rounded-lg px-2.5 py-1.5 border border-white/10 focus:outline-none focus:border-purple-500"
              >
                {concerts.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.title.slice(0, 30)}... ({c.status})
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={() => onNavigateTab('stages')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600/30 hover:bg-purple-600/50 border border-purple-400/40 text-purple-200 text-xs font-semibold transition-all shadow-lg shadow-purple-600/20"
            >
              <Zap className="w-4 h-4 text-purple-400" />
              <span>Launch FOH Stage Desk</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* 4 Glowing KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Revenue */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-panel p-5 rounded-2xl border border-white/10 hover:border-purple-500/40 transition-all group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400">
              Total Production Gross
            </span>
            <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-black text-white font-mono">
              ${totalRevenue.toLocaleString()}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs font-semibold text-emerald-400">+18.4%</span>
              <span className="text-xs text-slate-400">vs last tour stop</span>
            </div>
          </div>
        </motion.div>

        {/* Metric 2: Tickets & Capacity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="glass-panel p-5 rounded-2xl border border-white/10 hover:border-cyan-500/40 transition-all group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400">
              Capacity Utilization
            </span>
            <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
              <Ticket className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-baseline justify-between">
              <h3 className="text-2xl font-black text-white font-mono">{percentSold}%</h3>
              <span className="text-xs font-mono text-slate-400">
                {totalSold.toLocaleString()} / {totalCap.toLocaleString()}
              </span>
            </div>
            {/* Progress Bar */}
            <div className="w-full h-2 rounded-full bg-slate-800 mt-2.5 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${percentSold}%` }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
              />
            </div>
          </div>
        </motion.div>

        {/* Metric 3: Audio Rig Peak dB */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-panel p-5 rounded-2xl border border-white/10 hover:border-amber-500/40 transition-all group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400">
              FOH Peak SPL Level
            </span>
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
              <Volume2 className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-baseline justify-between">
              <h3 className="text-2xl font-black text-white font-mono">104.8 dB</h3>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30">
                High Impact
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1.5 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              d&b KSL Arrays calibrated within OSHA limits
            </p>
          </div>
        </motion.div>

        {/* Metric 4: Stage Production Rigs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="glass-panel p-5 rounded-2xl border border-white/10 hover:border-pink-500/40 transition-all group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400">
              Stages & Pyro Status
            </span>
            <div className="w-9 h-9 rounded-xl bg-pink-500/10 border border-pink-500/30 flex items-center justify-center text-pink-400 group-hover:scale-110 transition-transform">
              <Flame className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-baseline justify-between">
              <h3 className="text-2xl font-black text-white font-mono">
                {stages.length} Stages
              </h3>
              <span className="text-xs font-mono text-emerald-400 font-semibold">
                ALL ONLINE
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1.5">
              {stages.filter((s) => s.pyroArmed).length} Stages Armed with Flame/Cryo FX
            </p>
          </div>
        </motion.div>
      </div>

      {/* Middle Section: Live Run of Show Countdown + Stage Rig Mini Monitor */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Live Production Cue Clock & Active Cues */}
        <div className="lg:col-span-2 glass-panel rounded-2xl border border-white/10 p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <Clock className="w-5 h-5 text-purple-400" />
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                  Live Run of Show (ROS) Cue Sync
                </h3>
                <p className="text-xs text-slate-400">Synchronized stage automation and technician timeline</p>
              </div>
            </div>

            {/* Countdown Clock */}
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-purple-500/20 border border-purple-500/40 text-purple-300">
              <span className="text-[11px] font-mono uppercase text-slate-400">Next Cue:</span>
              <span className="text-sm font-mono font-black text-white tracking-widest animate-pulse">
                {formatCountdown(secondsLeft)}
              </span>
            </div>
          </div>

          {/* Active / Current Cue Card */}
          {activeCues.map((cue) => (
            <motion.div
              key={cue.id}
              initial={{ scale: 0.98 }}
              animate={{ scale: 1 }}
              className="p-4 rounded-xl bg-gradient-to-r from-purple-950/40 via-slate-900 to-cyan-950/40 border border-purple-500/40 relative overflow-hidden"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 uppercase">
                      ACTIVE CUE
                    </span>
                    <span className="text-xs font-mono text-slate-400 font-semibold">
                      {cue.stage} • {cue.time}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-white mt-1">{cue.cue}</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Crew: {cue.crew} — {cue.notes}</p>
                </div>

                <button
                  onClick={() => triggerCue(cue.id)}
                  className="px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold font-mono tracking-wider transition-all shadow-lg shadow-emerald-600/30 shrink-0"
                >
                  COMPLETE CUE ✓
                </button>
              </div>
            </motion.div>
          ))}

          {/* Next Up Cue Preview */}
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/60 border border-white/5">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <div>
                <span className="text-[11px] font-mono text-amber-400 uppercase font-semibold">
                  Up Next • {nextCue.time} ({nextCue.stage})
                </span>
                <p className="text-xs font-semibold text-slate-200 mt-0.5">{nextCue.cue}</p>
              </div>
            </div>
            <button
              onClick={() => onNavigateTab('ros')}
              className="text-xs font-semibold text-purple-400 hover:text-purple-300 flex items-center gap-1"
            >
              View Full ROS <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right Col: Live Stages Monitor */}
        <div className="glass-panel rounded-2xl border border-white/10 p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
              <Radio className="w-4 h-4 text-cyan-400" />
              Stage Status
            </h3>
            <button
              onClick={() => onNavigateTab('stages')}
              className="text-xs text-cyan-400 hover:underline font-medium"
            >
              Console View
            </button>
          </div>

          <div className="space-y-2.5">
            {stages.map((stage) => (
              <div
                key={stage.id}
                className="p-3 rounded-xl bg-slate-900/80 border border-white/5 hover:border-white/15 transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">{stage.name}</span>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                      stage.status === 'Active'
                        ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                        : 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40'
                    }`}
                  >
                    {stage.status}
                  </span>
                </div>
                <div className="flex items-center justify-between mt-2 text-xs text-slate-400">
                  <span className="truncate max-w-[140px] text-slate-300">
                    🎵 {stage.currentAct}
                  </span>
                  <span className="font-mono text-purple-400 font-bold">
                    {stage.currentDecibels} dB
                  </span>
                </div>
                {/* Audio SPL level meter */}
                <div className="w-full h-1.5 rounded-full bg-slate-800 mt-2 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      stage.currentDecibels > 105
                        ? 'bg-red-500'
                        : stage.currentDecibels > 100
                        ? 'bg-amber-400'
                        : 'bg-emerald-400'
                    }`}
                    style={{ width: `${(stage.currentDecibels / stage.maxDecibels) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Ticket Tiers Sales Quick View */}
      <div className="glass-panel rounded-2xl border border-white/10 p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-white/10">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Ticket Tier Real-Time Inventory & Velocity
            </h3>
            <p className="text-xs text-slate-400">Inventory status for active show: {selectedConcert.title}</p>
          </div>
          <button
            onClick={() => onNavigateTab('tickets')}
            className="text-xs font-semibold text-purple-400 hover:text-purple-300 flex items-center gap-1"
          >
            Detailed Tier Analytics <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
          {selectedConcert.tiers.map((tier) => {
            const soldCount = tier.total - tier.available;
            const soldPct = Math.round((soldCount / tier.total) * 100);
            return (
              <div
                key={tier.id}
                className="p-4 rounded-xl bg-slate-900/60 border border-white/5 hover:border-purple-500/30 transition-all"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-white truncate max-w-[150px]">{tier.name}</h4>
                  <span className="text-xs font-mono font-bold text-purple-300">${tier.price}</span>
                </div>
                <div className="mt-3 flex items-baseline justify-between">
                  <span className="text-lg font-black font-mono text-slate-100">
                    {soldCount.toLocaleString()}{' '}
                    <span className="text-xs font-normal text-slate-400">/ {tier.total.toLocaleString()}</span>
                  </span>
                  <span
                    className={`text-xs font-mono font-bold ${
                      tier.available === 0
                        ? 'text-red-400'
                        : tier.available < 100
                        ? 'text-amber-400'
                        : 'text-emerald-400'
                    }`}
                  >
                    {tier.available === 0 ? 'SOLD OUT' : `${tier.available} Left`}
                  </span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full mt-2 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full"
                    style={{ width: `${soldPct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
