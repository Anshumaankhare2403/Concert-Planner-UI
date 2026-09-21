import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Clock,
  MapPin,
  Plus,
  Search,
  Coffee,
  Phone
} from 'lucide-react';
import { useEvent } from '../../context/EventContext';

export const ArtistLineupManager = () => {
  const { artists, setArtists, updateArtistStatus, updateArtistRider, addNotification } = useEvent();
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  // New artist state
  const [newArtist, setNewArtist] = useState({
    name: '',
    genre: '',
    stage: 'Apex Main Stage',
    timeSlot: '21:00 - 22:30',
    status: 'Confirmed',
    dressingRoom: 'Suite Foxtrot',
    listeners: '1.5M monthly',
    riderStatus: 'Approved',
    contact: '+1 (555) 345-6789',
    notes: 'Standard 4-channel wireless monitor setup.'
  });

  const filteredArtists = artists.filter(
    (a) =>
      a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.genre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.stage.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddArtist = (e) => {
    e.preventDefault();
    if (!newArtist.name) return;

    const artistObj = {
      ...newArtist,
      id: 'art-' + Date.now(),
      statusColor: 'bg-amber-500/20 text-amber-400 border-amber-500/40',
      image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=500&q=80',
      soundcheck: 'Scheduled (16:00)'
    };

    setArtists((prev) => [...prev, artistObj]);
    addNotification('Artist Added', `"${artistObj.name}" added to festival schedule.`, 'success');
    setShowAddModal(false);
    setNewArtist({
      name: '',
      genre: '',
      stage: 'Apex Main Stage',
      timeSlot: '21:00 - 22:30',
      status: 'Confirmed',
      dressingRoom: 'Suite Foxtrot',
      listeners: '1.5M monthly',
      riderStatus: 'Approved',
      contact: '+1 (555) 345-6789',
      notes: ''
    });
  };

  const riderStatuses = ['Approved', 'Pending Catering', 'Special FX Requested'];
  const artistStatuses = ['Confirmed', 'Soundchecking', 'Backstage Ready', 'On Stage'];

  return (
    <div className="space-y-6">
      {/* Header & Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Artist Booking, Lineup & Hospitality
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Manage stage slots, hospitality riders, dressing rooms, and soundcheck clearance.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold font-mono tracking-wider shadow-lg shadow-purple-600/25 border border-purple-400/40 transition-all active:scale-95 shrink-0"
        >
          <Plus className="w-4 h-4" />
          ADD ARTIST TO ROSTER
        </button>
      </div>

      {/* Search Bar */}
      <div className="glass-panel p-4 rounded-2xl border border-white/10 flex items-center justify-between">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search artists by name, genre, or stage..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900/80 border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-purple-500"
          />
        </div>
        <span className="text-xs font-mono text-slate-400 hidden sm:block">
          {filteredArtists.length} Artists Booked
        </span>
      </div>

      {/* Artist Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArtists.map((artist) => (
          <motion.div
            key={artist.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-panel rounded-2xl border border-white/10 overflow-hidden flex flex-col justify-between hover:border-purple-500/40 transition-all group"
          >
            <div>
              {/* Card Banner with Avatar */}
              <div className="relative h-28 bg-slate-950 overflow-hidden">
                <img
                  src={artist.image}
                  alt={artist.name}
                  className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />

                {/* Stage badge */}
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-white text-[11px] font-mono border border-white/10 flex items-center gap-1.5">
                  <MapPin className="w-3 h-3 text-purple-400" />
                  {artist.stage}
                </div>

                {/* Time badge */}
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-purple-900/80 backdrop-blur-md text-purple-200 text-[11px] font-mono border border-purple-400/30 flex items-center gap-1.5">
                  <Clock className="w-3 h-3 text-cyan-400" />
                  {artist.timeSlot}
                </div>
              </div>

              {/* Artist Details */}
              <div className="p-5 space-y-4">
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-black text-white">{artist.name}</h3>
                    <span className="text-[11px] font-mono text-slate-400">{artist.listeners}</span>
                  </div>
                  <p className="text-xs text-purple-400 font-medium mt-0.5">{artist.genre}</p>
                </div>

                {/* Status Toggles */}
                <div className="space-y-2 bg-slate-950/60 p-3 rounded-xl border border-white/5 text-xs">
                  {/* Performance Status */}
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 font-mono">Performance:</span>
                    <select
                      value={artist.status}
                      onChange={(e) => updateArtistStatus(artist.id, e.target.value)}
                      className="bg-slate-900 text-slate-200 text-[11px] font-mono font-bold rounded-lg px-2 py-1 border border-white/10 focus:outline-none focus:border-purple-500"
                    >
                      {artistStatuses.map((st) => (
                        <option key={st} value={st}>
                          {st}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Rider Status */}
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 font-mono flex items-center gap-1">
                      <Coffee className="w-3 h-3 text-amber-400" /> Rider:
                    </span>
                    <select
                      value={artist.riderStatus}
                      onChange={(e) => updateArtistRider(artist.id, e.target.value)}
                      className="bg-slate-900 text-slate-200 text-[11px] font-mono rounded-lg px-2 py-1 border border-white/10 focus:outline-none focus:border-purple-500"
                    >
                      {riderStatuses.map((rs) => (
                        <option key={rs} value={rs}>
                          {rs}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Backstage Information */}
                <div className="text-[11px] text-slate-400 space-y-1">
                  <div className="flex justify-between">
                    <span>Dressing Room:</span>
                    <span className="text-white font-medium">{artist.dressingRoom}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Soundcheck:</span>
                    <span className="text-cyan-300 font-mono">{artist.soundcheck}</span>
                  </div>
                  {artist.notes && (
                    <div className="pt-2 border-t border-white/5 text-slate-400 italic">
                      "{artist.notes}"
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Footer contact button */}
            <div className="p-4 bg-slate-950/40 border-t border-white/5 flex items-center justify-between text-xs">
              <span className="text-slate-400 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-purple-400" />
                {artist.contact}
              </span>
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase border ${artist.statusColor}`}
              >
                {artist.status}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add Artist Modal Dialog */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg glass-panel-glow rounded-2xl p-6 border border-purple-500/40 space-y-4 shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h3 className="text-lg font-black text-white">Add Performer to Festival Roster</h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="text-slate-400 hover:text-white text-xs font-mono"
                >
                  ✕ CLOSE
                </button>
              </div>

              <form onSubmit={handleAddArtist} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Artist / Band Name</label>
                  <input
                    type="text"
                    required
                    value={newArtist.name}
                    onChange={(e) => setNewArtist({ ...newArtist, name: e.target.value })}
                    placeholder="e.g. Tycho, Boris Brejcha"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Genre</label>
                    <input
                      type="text"
                      required
                      value={newArtist.genre}
                      onChange={(e) => setNewArtist({ ...newArtist, genre: e.target.value })}
                      placeholder="e.g. Melodic Techno"
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Stage</label>
                    <select
                      value={newArtist.stage}
                      onChange={(e) => setNewArtist({ ...newArtist, stage: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-purple-500"
                    >
                      <option value="Apex Main Stage">Apex Main Stage</option>
                      <option value="Sub-Bass Bunker">Sub-Bass Bunker</option>
                      <option value="Cyber Garden Dome">Cyber Garden Dome</option>
                      <option value="Afterglow Lounge">Afterglow Lounge</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Set Time Slot</label>
                    <input
                      type="text"
                      value={newArtist.timeSlot}
                      onChange={(e) => setNewArtist({ ...newArtist, timeSlot: e.target.value })}
                      placeholder="e.g. 21:00 - 22:30"
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Dressing Room Suite</label>
                    <input
                      type="text"
                      value={newArtist.dressingRoom}
                      onChange={(e) => setNewArtist({ ...newArtist, dressingRoom: e.target.value })}
                      placeholder="Suite Foxtrot"
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Technical / Rider Notes</label>
                  <textarea
                    rows={2}
                    value={newArtist.notes}
                    onChange={(e) => setNewArtist({ ...newArtist, notes: e.target.value })}
                    placeholder="Audio gear, monitor mixes, or pyro requests..."
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold"
                  >
                    Confirm & Add Artist
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
