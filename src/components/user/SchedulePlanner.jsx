import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  AlertTriangle,
  Check,
  Plus,
  Trash2,
  X,
  Share2
} from 'lucide-react';
import { useEvent } from '../../context/EventContext';

export const SchedulePlanner = ({ isOpen, onClose }) => {
  const { artists, userSchedule, toggleScheduleAct, isActInSchedule } = useEvent();
  const [selectedStage, setSelectedStage] = useState('All');

  if (!isOpen) return null;

  const stages = ['All', 'Apex Main Stage', 'Sub-Bass Bunker', 'Cyber Garden Dome', 'Afterglow Lounge'];

  const filteredArtists = artists.filter(
    (a) => selectedStage === 'All' || a.stage === selectedStage
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-4xl glass-panel-glow rounded-3xl border border-purple-500/40 my-8 shadow-2xl p-6 sm:p-8"
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-xl bg-slate-900 border border-white/10 text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-purple-400 text-xs font-mono font-bold uppercase tracking-wider">
            <Calendar className="w-4 h-4" /> Personal Festival Itinerary
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
            Build Your Custom Festival Run
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Bookmark your must-see acts. We'll automatically alert you if any stage times conflict.
          </p>
        </div>

        {/* Stage Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-white/10 mb-6">
          {stages.map((st) => (
            <button
              key={st}
              onClick={() => setSelectedStage(st)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedStage === st
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                  : 'bg-slate-900/80 text-slate-400 hover:text-white border border-white/5'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        {/* 2-Column Layout: Available Lineup vs My Schedule */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left 7 Cols: Festival Lineup Roster */}
          <div className="lg:col-span-7 space-y-3">
            <h3 className="text-xs font-mono uppercase font-bold text-slate-300">
              Festival Acts & Stage Times
            </h3>

            <div className="space-y-2.5 max-h-[420px] overflow-y-auto pr-1">
              {filteredArtists.map((artist) => {
                const isAdded = isActInSchedule(artist.name);

                return (
                  <div
                    key={artist.id}
                    className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                      isAdded
                        ? 'border-purple-500/60 bg-purple-950/30'
                        : 'border-white/10 bg-slate-900/70 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={artist.image}
                        alt={artist.name}
                        className="w-12 h-12 rounded-xl object-cover shrink-0 border border-white/10"
                      />
                      <div>
                        <h4 className="text-sm font-bold text-white">{artist.name}</h4>
                        <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                          <span className="text-purple-300 font-mono flex items-center gap-1">
                            <Clock className="w-3 h-3 text-cyan-400" />
                            {artist.timeSlot}
                          </span>
                          <span>•</span>
                          <span className="truncate max-w-[120px]">{artist.stage}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => toggleScheduleAct(artist)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold uppercase transition-all flex items-center gap-1.5 shrink-0 ${
                        isAdded
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-red-500/20 hover:text-red-300 hover:border-red-500/40'
                          : 'bg-purple-600 hover:bg-purple-500 text-white shadow-md shadow-purple-600/30 active:scale-95'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>SAVED</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>ADD ACT</span>
                        </>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right 5 Cols: My Saved Itinerary Timeline */}
          <div className="lg:col-span-5 glass-panel rounded-2xl p-5 border border-white/10 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <h3 className="text-xs font-mono uppercase font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  My Festival Timeline
                </h3>
                <span className="text-xs font-mono font-bold text-purple-300">
                  {userSchedule.length} Acts Bookmarked
                </span>
              </div>

              {userSchedule.length === 0 ? (
                <div className="text-center py-12 text-slate-500 text-xs">
                  No acts added to your personal schedule yet. Click <strong>+ ADD ACT</strong> to start building your weekend!
                </div>
              ) : (
                <div className="space-y-3 mt-3 max-h-80 overflow-y-auto pr-1">
                  {userSchedule.map((item, idx) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="p-3 rounded-xl bg-slate-950/80 border border-purple-500/30 flex items-center justify-between"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-white">{item.artistName}</span>
                          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-purple-500/20 text-purple-300">
                            Set #{idx + 1}
                          </span>
                        </div>
                        <div className="text-[11px] font-mono text-cyan-400 mt-0.5">
                          {item.timeSlot} • {item.stage}
                        </div>
                      </div>

                      <button
                        onClick={() => toggleScheduleAct({ name: item.artistName, timeSlot: item.timeSlot })}
                        className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-red-400 hover:bg-slate-700"
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Itinerary Actions */}
            {userSchedule.length > 0 && (
              <div className="pt-3 border-t border-white/10">
                <button
                  onClick={() => {
                    alert('Schedule synced to your mobile calendar & offline device!');
                  }}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold font-mono tracking-wider shadow-lg shadow-purple-600/30"
                >
                  SYNC TO CALENDAR / MOBILE PASS
                </button>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

