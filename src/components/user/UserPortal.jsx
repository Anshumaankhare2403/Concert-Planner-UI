import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Calendar,
  MapPin,
  Ticket,
  Sparkles,
  Search,
  Zap,
  Volume2,
  Flame
} from 'lucide-react';
import { useEvent } from '../../context/EventContext';
import { InteractiveSeatMap } from './InteractiveSeatMap';

export const UserPortal = ({ onOpenSchedule, onOpenMyTickets }) => {
  const { concerts } = useEvent();
  const [search, setSearch] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [activeBookingConcert, setActiveBookingConcert] = useState(null);

  const genres = ['All', 'Electronic / Synthwave', 'Melodic Bass', 'Bass Music', 'Indie Folk'];

  const filteredConcerts = concerts.filter((c) => {
    const matchesGenre =
      selectedGenre === 'All' || c.genre.toLowerCase().includes(selectedGenre.toLowerCase());
    const matchesSearch =
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.venue.toLowerCase().includes(search.toLowerCase()) ||
      c.city.toLowerCase().includes(search.toLowerCase()) ||
      c.headliners.some((h) => h.toLowerCase().includes(search.toLowerCase()));
    return matchesGenre && matchesSearch;
  });

  const featuredConcert = concerts[0];

  return (
    <div className="space-y-12 pb-16">
      {/* HERO SECTION: Glowing Cyber Concert Showcase */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative rounded-3xl overflow-hidden border border-purple-500/30 bg-gradient-to-b from-slate-900 via-[#0a0f1d] to-[#080c14] shadow-2xl p-6 sm:p-12"
      >
        {/* Ambient Glows */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-600/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left 7 Cols: Hero Pitch */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>EXPERIENCE THE NEXT WAVE OF LIVE SOUND</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
              FEEL THE PULSE OF <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">
                IMMERSIVE ARENAS
              </span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base max-w-xl leading-relaxed">
              Discover headline festival tours, interactive 2D arena seat selection, holographic digital wallet passes, and personalized clash-free stage schedules.
            </p>

            {/* Quick Action CTA Bar */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => setActiveBookingConcert(featuredConcert)}
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-mono font-black text-xs tracking-wider shadow-xl shadow-purple-600/30 transition-all active:scale-95"
              >
                <Ticket className="w-4 h-4" />
                GET FESTIVAL PASSES
              </button>

              <button
                onClick={onOpenSchedule}
                className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-white/10 hover:border-purple-500/40 font-mono text-xs font-bold transition-all"
              >
                <Calendar className="w-4 h-4 text-purple-400" />
                BUILD STAGE SCHEDULE
              </button>

              <button
                onClick={onOpenMyTickets}
                className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-cyan-600/20 hover:bg-cyan-600/30 text-cyan-300 border border-cyan-500/30 font-mono text-xs font-bold transition-all"
              >
                <Ticket className="w-4 h-4 text-cyan-400" />
                MY PASSES
              </button>
            </div>
          </div>

          {/* Right 5 Cols: Featured Concert Card */}
          <div className="lg:col-span-5">
            <motion.div
              whileHover={{ y: -5 }}
              className="glass-panel-glow rounded-3xl p-5 border border-purple-500/40 relative overflow-hidden"
            >
              <div className="relative h-56 rounded-2xl overflow-hidden">
                <img
                  src={featuredConcert.banner}
                  alt={featuredConcert.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  🔥 {featuredConcert.status}
                </span>
                <span className="absolute bottom-3 left-3 text-xs font-mono text-white font-bold bg-black/60 px-2.5 py-1 rounded-lg backdrop-blur-md">
                  📍 {featuredConcert.city}
                </span>
              </div>

              <div className="mt-4 space-y-2">
                <h3 className="text-lg font-black text-white">{featuredConcert.title}</h3>
                <p className="text-xs text-slate-400 line-clamp-1">{featuredConcert.subtitle}</p>

                <div className="pt-2 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-slate-400 block">Passes From</span>
                    <span className="text-lg font-black font-mono text-cyan-400">$89</span>
                  </div>

                  <button
                    onClick={() => setActiveBookingConcert(featuredConcert)}
                    className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-mono font-bold tracking-wider shadow-lg shadow-cyan-600/30 transition-all"
                  >
                    SELECT SEATS ➜
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* SEARCH & GENRE FILTER */}
      <div className="glass-panel p-4 rounded-2xl border border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by festival name, headliner, city..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          {genres.map((g) => (
            <button
              key={g}
              onClick={() => setSelectedGenre(g)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedGenre === g
                  ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-white/5'
              }`}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      {/* CONCERT CARDS DISCOVERY GRID */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Upcoming World Tours & Festivals
          </h2>
          <span className="text-xs font-mono text-slate-400">
            {filteredConcerts.length} Events Available
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {filteredConcerts.map((concert) => {
            const minPrice = Math.min(...concert.tiers.map((t) => t.price));
            const isSoldOut = concert.status === 'Sold Out';

            return (
              <motion.div
                key={concert.id}
                whileHover={{ y: -4 }}
                className="glass-panel rounded-3xl border border-white/10 overflow-hidden flex flex-col justify-between hover:border-purple-500/40 transition-all duration-300 group"
              >
                <div>
                  {/* Banner */}
                  <div className="relative h-56 bg-slate-950 overflow-hidden">
                    <img
                      src={concert.banner}
                      alt={concert.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                    <div className="absolute top-4 left-4 flex items-center gap-2">
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-mono font-bold uppercase border backdrop-blur-md ${concert.badgeColor}`}
                      >
                        {concert.status}
                      </span>
                      <span className="px-2 py-1 rounded-md text-[11px] font-mono bg-black/60 text-purple-300 border border-purple-500/30">
                        {concert.genre}
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-slate-300">
                      <span className="flex items-center gap-1.5 font-mono text-purple-300 font-semibold">
                        <Calendar className="w-3.5 h-3.5" />
                        {concert.date}
                      </span>
                      <span className="flex items-center gap-1.5 text-slate-300">
                        <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                        {concert.city}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="text-xl font-black text-white group-hover:text-purple-300 transition-colors">
                        {concert.title}
                      </h3>
                      <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                        {concert.subtitle}
                      </p>
                    </div>

                    {/* Headliners pills */}
                    <div>
                      <span className="text-[10px] font-mono uppercase text-slate-500 font-bold block mb-1.5">
                        Featured Artists & Lineup:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {concert.headliners.map((artist, idx) => (
                          <span
                            key={idx}
                            className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-slate-900 border border-white/10 text-slate-200"
                          >
                            ⚡ {artist}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Venue & Stage Specs */}
                    <div className="p-3 rounded-xl bg-slate-950/60 border border-white/5 flex items-center justify-between text-xs text-slate-300 font-mono">
                      <span>Venue: {concert.venue}</span>
                      <span className="text-cyan-400">{concert.stages.length} Stages</span>
                    </div>
                  </div>
                </div>

                {/* Footer CTA & Pricing */}
                <div className="p-6 bg-slate-950/40 border-t border-white/10 flex items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-slate-400 block">Passes Starting At</span>
                    <span className="text-xl font-black font-mono text-white">
                      ${minPrice} <span className="text-xs text-slate-400 font-normal">/ pass</span>
                    </span>
                  </div>

                  <button
                    onClick={() => setActiveBookingConcert(concert)}
                    disabled={isSoldOut}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-mono font-bold tracking-wider transition-all shadow-lg ${
                      isSoldOut
                        ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                        : 'bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white shadow-purple-600/30 active:scale-95'
                    }`}
                  >
                    <Ticket className="w-3.5 h-3.5" />
                    <span>{isSoldOut ? 'JOIN WAITLIST' : 'SELECT SEATS & BUY'}</span>
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* FESTIVAL PRODUCTION HIGHLIGHTS */}
      <div className="glass-panel p-8 rounded-3xl border border-white/10 space-y-6">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-mono uppercase tracking-widest text-purple-400 font-bold">
            Cutting-Edge Production Standard
          </span>
          <h3 className="text-2xl font-black text-white mt-1">
            Engineered for Pure Sonic Euphoria
          </h3>
          <p className="text-xs text-slate-400 mt-1.5">
            Every PulseStage event is backed by stadium-grade d&b line arrays, synchronized 40W laser meshes, and carbon-offset power grids.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4">
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/5 text-center space-y-2">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 mx-auto">
              <Volume2 className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-bold text-white uppercase font-mono">105 dB d&b KSL Arrays</h4>
            <p className="text-[11px] text-slate-400">Crystal clear sub-bass frequencies and vocal articulation.</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/5 text-center space-y-2">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mx-auto">
              <Zap className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-bold text-white uppercase font-mono">360° Laser Mesh</h4>
            <p className="text-[11px] text-slate-400">Volumetric RGB beam architectures synchronized to track BPM.</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/5 text-center space-y-2">
            <div className="w-10 h-10 rounded-xl bg-pink-500/10 border border-pink-500/30 flex items-center justify-center text-pink-400 mx-auto">
              <Flame className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-bold text-white uppercase font-mono">Cold-Spark & Cryo</h4>
            <p className="text-[11px] text-slate-400">Safe, eco-friendly liquid CO2 jets and non-pyrotechnic fountains.</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/5 text-center space-y-2">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mx-auto">
              <Sparkles className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-bold text-white uppercase font-mono">VIP SkyDeck Access</h4>
            <p className="text-[11px] text-slate-400">Private elevated views, mixology bars, and air-conditioned lounges.</p>
          </div>
        </div>
      </div>

      {/* Interactive Seating & Booking Modal */}
      <InteractiveSeatMap
        concert={activeBookingConcert}
        isOpen={Boolean(activeBookingConcert)}
        onClose={() => setActiveBookingConcert(null)}
      />
    </div>
  );
};
