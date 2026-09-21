import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Sparkles } from 'lucide-react';
import { useEvent } from '../../context/EventContext';

export const EventCreateModal = ({ isOpen, onClose }) => {
  const { addConcert } = useEvent();

  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    venue: '',
    city: '',
    date: 'DEC 18, 2026',
    time: '18:00 CST',
    genre: 'Electronic / Bass',
    totalCapacity: 15000,
    headliners: 'Zeds Dead, Liquid Stranger, CloZee',
    banner: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1600&q=80',
    gaPrice: 79,
    vipPrice: 249,
    audioSystem: 'L-Acoustics K1 System',
    pyroState: 'ARMED (Cryo + Flame)'
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.venue) return;

    const headlinerList = formData.headliners.split(',').map((h) => h.trim());

    addConcert({
      title: formData.title,
      subtitle: formData.subtitle || 'Live Arena Production',
      tagline: 'High Voltage Live Sound & Visuals',
      date: formData.date,
      time: formData.time,
      venue: formData.venue,
      city: formData.city,
      genre: formData.genre,
      status: 'On Sale',
      banner: formData.banner,
      totalCapacity: Number(formData.totalCapacity),
      headliners: headlinerList,
      stages: ['Apex Main Stage', 'Bass Bunker'],
      tiers: [
        {
          id: 't-ga-' + Date.now(),
          name: 'General Admission (GA)',
          price: Number(formData.gaPrice),
          available: Math.floor(Number(formData.totalCapacity) * 0.75),
          total: Math.floor(Number(formData.totalCapacity) * 0.75),
          perks: ['Full Arena Access', 'Mainstage View']
        },
        {
          id: 't-vip-' + Date.now(),
          name: 'VIP SkyDeck Pass',
          price: Number(formData.vipPrice),
          available: Math.floor(Number(formData.totalCapacity) * 0.25),
          total: Math.floor(Number(formData.totalCapacity) * 0.25),
          perks: ['Express Entry Lane', 'Elevated Lounge Bar', 'Lanyard']
        }
      ],
      techSpecs: {
        audioSystem: formData.audioSystem,
        peakDecibels: 104.0,
        lasers: '12x 30W High Power RGB',
        pyroState: formData.pyroState,
        powerGrid: '400 kVA Synchronized',
        stageDimensions: '80ft x 40ft'
      }
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-2xl glass-panel-glow rounded-3xl p-6 sm:p-8 border border-purple-500/40 my-8 shadow-2xl relative"
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-slate-400 hover:text-white p-1 rounded-lg bg-slate-800 border border-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <div className="flex items-center gap-2 text-purple-400 text-xs font-mono font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4" /> Production Creator
          </div>
          <h2 className="text-2xl font-black text-white mt-1">
            Program New Concert / Festival Tour
          </h2>
          <p className="text-xs text-slate-400">
            Define venue specs, artist roster, ticket quotas, and stage infrastructure.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Title & Subtitle */}
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Concert / Tour Title</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. Neon Horizon Festival 2026"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 text-sm"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Venue Name</label>
              <input
                type="text"
                required
                value={formData.venue}
                onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                placeholder="e.g. Red Rocks Amphitheatre"
                className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-purple-500"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">City, State / Country</label>
              <input
                type="text"
                required
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                placeholder="e.g. Denver, CO"
                className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Date</label>
              <input
                type="text"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                placeholder="NOV 22, 2026"
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white font-mono focus:outline-none focus:border-purple-500"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Gate Time</label>
              <input
                type="text"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                placeholder="19:00 CST"
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white font-mono focus:outline-none focus:border-purple-500"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Music Genre</label>
              <input
                type="text"
                value={formData.genre}
                onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
                placeholder="Electronic / Synth"
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          {/* Lineup Headliners */}
          <div>
            <label className="block text-slate-300 font-semibold mb-1">
              Headliners (Comma separated)
            </label>
            <input
              type="text"
              value={formData.headliners}
              onChange={(e) => setFormData({ ...formData, headliners: e.target.value })}
              placeholder="Neon Pulse, Skrillex, deadmau5"
              className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-purple-500"
            />
          </div>

          {/* Capacity & Ticket Pricing */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-2xl bg-slate-950/60 border border-white/5">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Total Capacity</label>
              <input
                type="number"
                value={formData.totalCapacity}
                onChange={(e) => setFormData({ ...formData, totalCapacity: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white font-mono focus:outline-none focus:border-purple-500"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">GA Pass Price ($)</label>
              <input
                type="number"
                value={formData.gaPrice}
                onChange={(e) => setFormData({ ...formData, gaPrice: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white font-mono focus:outline-none focus:border-purple-500"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">VIP SkyDeck ($)</label>
              <input
                type="number"
                value={formData.vipPrice}
                onChange={(e) => setFormData({ ...formData, vipPrice: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white font-mono focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          {/* Banner URL */}
          <div>
            <label className="block text-slate-300 font-semibold mb-1">High-Res Poster / Banner Image URL</label>
            <input
              type="url"
              value={formData.banner}
              onChange={(e) => setFormData({ ...formData, banner: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-white/10 text-slate-300 font-mono text-[11px] focus:outline-none focus:border-purple-500"
            />
          </div>

          {/* Submit Action */}
          <div className="pt-4 flex items-center justify-end gap-3 border-t border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-bold font-mono tracking-wider shadow-lg shadow-purple-600/30 active:scale-95 transition-all"
            >
              LAUNCH CONCERT 🚀
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

