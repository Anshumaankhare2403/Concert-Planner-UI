import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Calendar,
  MapPin,
  DollarSign,
  Plus,
  Trash2,
  Sliders,
  Search
} from 'lucide-react';
import { useEvent } from '../../context/EventContext';

export const EventManager = ({ onOpenCreateModal, onInspectStage }) => {
  const { concerts, selectedConcertId, setSelectedConcertId, deleteConcert, addNotification } = useEvent();
  const [filterStatus, setFilterStatus] = useState('All');
  const [search, setSearch] = useState('');

  const statuses = ['All', 'Live Now', 'On Sale', 'Sold Out', 'Scheduled'];

  const filteredConcerts = concerts.filter((c) => {
    const matchesStatus = filterStatus === 'All' || c.status === filterStatus;
    const matchesSearch =
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.venue.toLowerCase().includes(search.toLowerCase()) ||
      c.city.toLowerCase().includes(search.toLowerCase()) ||
      c.genre.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Concerts & Global Tour Production
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Manage stage specs, ticket quotas, venues, and festival run-rates.
          </p>
        </div>

        <button
          onClick={onOpenCreateModal}
          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold font-mono tracking-wider shadow-lg shadow-purple-600/25 border border-purple-400/40 transition-all active:scale-95 shrink-0"
        >
          <Plus className="w-4 h-4" />
          CREATE NEW CONCERT
        </button>
      </div>

      {/* Filter Bar & Search */}
      <div className="glass-panel p-4 rounded-2xl border border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search title, artist, city, venue..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900/80 border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-purple-500 transition-colors"
          />
        </div>

        {/* Status Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          {statuses.map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                filterStatus === status
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                  : 'bg-slate-900/80 text-slate-400 hover:text-white border border-white/5'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Concert Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredConcerts.map((concert) => {
          const isSelected = concert.id === selectedConcertId;
          const soldPct = ((concert.ticketsSold / concert.totalCapacity) * 100).toFixed(1);

          return (
            <motion.div
              key={concert.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className={`group relative rounded-2xl overflow-hidden border transition-all duration-300 ${
                isSelected
                  ? 'border-purple-500/70 bg-slate-900/90 shadow-2xl shadow-purple-900/20 ring-1 ring-purple-500/40'
                  : 'border-white/10 bg-slate-900/60 hover:border-white/20'
              }`}
            >
              {/* Banner Image with overlay */}
              <div className="relative h-44 w-full overflow-hidden bg-slate-950">
                <img
                  src={concert.banner}
                  alt={concert.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-70"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />

                {/* Status Badge */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-mono font-bold uppercase border backdrop-blur-md ${concert.badgeColor}`}
                  >
                    {concert.status}
                  </span>
                  <span className="px-2 py-0.5 rounded-md text-[11px] font-mono bg-black/60 text-slate-300 border border-white/10">
                    {concert.genre}
                  </span>
                </div>

                {/* Active Indicator */}
                {isSelected && (
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-purple-500 text-white text-[11px] font-bold font-mono uppercase shadow-lg shadow-purple-500/50 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                    FOH Focused
                  </div>
                )}

                {/* Date & Venue Banner */}
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-slate-300">
                  <span className="flex items-center gap-1.5 font-mono font-semibold text-purple-300">
                    <Calendar className="w-3.5 h-3.5" />
                    {concert.date}
                  </span>
                  <span className="flex items-center gap-1.5 text-slate-300">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                    {concert.venue} ({concert.city})
                  </span>
                </div>
              </div>

              {/* Body Content */}
              <div className="p-5 space-y-4">
                <div>
                  <h3 className="text-lg font-black text-white group-hover:text-purple-300 transition-colors">
                    {concert.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-1">{concert.subtitle}</p>
                </div>

                {/* Headliners pills */}
                <div className="flex flex-wrap gap-1.5">
                  {concert.headliners.map((artist, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-slate-300"
                    >
                      ⚡ {artist}
                    </span>
                  ))}
                </div>

                {/* Sales & Capacity Bar */}
                <div className="p-3 rounded-xl bg-slate-950/60 border border-white/5 space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-400">Tickets Sold:</span>
                    <span className="font-bold text-white">
                      {concert.ticketsSold.toLocaleString()} / {concert.totalCapacity.toLocaleString()} ({soldPct}%)
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-400 rounded-full"
                      style={{ width: `${soldPct}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-xs pt-1 border-t border-white/5">
                    <span className="text-slate-400 flex items-center gap-1">
                      <DollarSign className="w-3.5 h-3.5 text-emerald-400" /> Gross Revenue:
                    </span>
                    <span className="font-mono font-bold text-emerald-400">
                      ${concert.grossRevenue.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Audio Rig & Tech Specs snippet */}
                {concert.techSpecs && (
                  <div className="text-[11px] font-mono text-slate-400 space-y-1 bg-slate-950/40 p-2.5 rounded-lg border border-white/5">
                    <div className="flex justify-between">
                      <span>Audio Rig:</span>
                      <span className="text-slate-200 truncate max-w-[200px]">{concert.techSpecs.audioSystem}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Pyro Status:</span>
                      <span className="text-purple-300">{concert.techSpecs.pyroState}</span>
                    </div>
                  </div>
                )}

                {/* Action Toolbar */}
                <div className="pt-2 flex items-center justify-between gap-2 border-t border-white/10">
                  <button
                    onClick={() => {
                      setSelectedConcertId(concert.id);
                      addNotification('Show Selected', `Active FOH desk switched to ${concert.title}`, 'info');
                    }}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold font-mono tracking-wider transition-all ${
                      isSelected
                        ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-white/10'
                    }`}
                  >
                    {isSelected ? 'CURRENTLY ACTIVE SHOW' : 'SET AS ACTIVE SHOW'}
                  </button>

                  <button
                    onClick={() => {
                      setSelectedConcertId(concert.id);
                      onInspectStage();
                    }}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-purple-600/30 hover:border-purple-500/40 border border-white/10 text-slate-300 hover:text-white transition-all"
                    title="Open Stage Visualizer & Sound Desk"
                  >
                    <Sliders className="w-4 h-4 text-cyan-400" />
                  </button>

                  <button
                    onClick={() => deleteConcert(concert.id)}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-red-500/20 hover:border-red-500/40 border border-white/10 text-slate-400 hover:text-red-400 transition-all"
                    title="Archive / Remove Concert"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
