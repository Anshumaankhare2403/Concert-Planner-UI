import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Clock,
  Plus,
  Users,
  Filter
} from 'lucide-react';
import { useEvent } from '../../context/EventContext';

export const RunOfShowCues = () => {
  const { runOfShow, triggerCue, addRunOfShowCue } = useEvent();
  const [stageFilter, setStageFilter] = useState('All');
  const [showAddCueModal, setShowAddCueModal] = useState(false);

  const [newCue, setNewCue] = useState({
    time: '23:30:00',
    stage: 'Apex Main Stage',
    cue: '',
    crew: 'Lighting Lead, Stage Hands',
    notes: ''
  });

  const stages = ['All', 'Apex Main Stage', 'Sub-Bass Bunker', 'Cyber Garden Dome'];

  const filteredCues = runOfShow.filter(
    (c) => stageFilter === 'All' || c.stage === stageFilter
  );

  const handleAddCue = (e) => {
    e.preventDefault();
    if (!newCue.cue) return;
    addRunOfShowCue(newCue);
    setShowAddCueModal(false);
    setNewCue({
      time: '23:30:00',
      stage: 'Apex Main Stage',
      cue: '',
      crew: 'Lighting Lead, Stage Hands',
      notes: ''
    });
  };

  return (
    <div className="space-y-6">
      {/* Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Live Run of Show (ROS) & Cue Sheet
            </h2>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 uppercase">
              Timecode Locked
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Master cue sheet for stage managers, lighting operators, audio chiefs, and pyrotechnicians.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowAddCueModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold font-mono tracking-wider shadow-lg shadow-purple-600/25 border border-purple-400/40 transition-all active:scale-95 shrink-0"
          >
            <Plus className="w-4 h-4" />
            QUEUE NEW CUE
          </button>
        </div>
      </div>

      {/* Stage Filter */}
      <div className="glass-panel p-4 rounded-2xl border border-white/10 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <span className="text-xs font-mono text-slate-300 font-semibold">Filter by Stage:</span>
          <div className="flex items-center gap-1.5 overflow-x-auto">
            {stages.map((stage) => (
              <button
                key={stage}
                onClick={() => setStageFilter(stage)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  stageFilter === stage
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-600/20'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-white/5'
                }`}
              >
                {stage}
              </button>
            ))}
          </div>
        </div>

        <span className="text-xs font-mono text-slate-400 hidden sm:block">
          {filteredCues.length} Cues Programmed
        </span>
      </div>

      {/* Cue Table / List */}
      <div className="glass-panel rounded-2xl border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/90 text-slate-400 uppercase font-mono text-[10px] border-b border-white/10">
              <tr>
                <th className="py-3.5 px-4">Timecode</th>
                <th className="py-3.5 px-4">Stage</th>
                <th className="py-3.5 px-4">Cue Description</th>
                <th className="py-3.5 px-4">Crew Assigned</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredCues.map((cue) => {
                const isActive = cue.status === 'Active / Current';
                const isCompleted = cue.status === 'Completed';

                return (
                  <motion.tr
                    key={cue.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={`transition-colors ${
                      isActive
                        ? 'bg-purple-950/40 hover:bg-purple-950/60'
                        : 'hover:bg-white/[0.02]'
                    }`}
                  >
                    {/* Time */}
                    <td className="py-3.5 px-4 font-mono font-bold text-white whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-slate-500" />
                        <span className={isActive ? 'text-purple-300' : 'text-slate-300'}>
                          {cue.time}
                        </span>
                      </div>
                    </td>

                    {/* Stage */}
                    <td className="py-3.5 px-4 font-mono text-slate-300 whitespace-nowrap">
                      {cue.stage}
                    </td>

                    {/* Cue & Notes */}
                    <td className="py-3.5 px-4 max-w-sm">
                      <div className="font-bold text-white">{cue.cue}</div>
                      {cue.notes && (
                        <div className="text-[11px] text-slate-400 mt-0.5">{cue.notes}</div>
                      )}
                    </td>

                    {/* Crew */}
                    <td className="py-3.5 px-4 text-slate-300 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span className="text-[11px] text-slate-300">{cue.crew}</span>
                      </div>
                    </td>

                    {/* Status Badge */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase border ${
                          isActive
                            ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40 animate-pulse'
                            : isCompleted
                            ? 'bg-slate-800 text-slate-400 border-slate-700'
                            : 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                        }`}
                      >
                        {isActive && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />}
                        {cue.status}
                      </span>
                    </td>

                    {/* Trigger Action */}
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <button
                        onClick={() => triggerCue(cue.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold uppercase transition-all ${
                          isActive
                            ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/30'
                            : isCompleted
                            ? 'bg-slate-800 text-slate-400 hover:text-white'
                            : 'bg-purple-600 hover:bg-purple-500 text-white shadow-md shadow-purple-600/30'
                        }`}
                      >
                        {isActive ? 'FINISH CUE ✓' : isCompleted ? 'RE-ARM' : 'FIRE / TRIGGER ▶'}
                      </button>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Cue Modal */}
      <AnimatePresence>
        {showAddCueModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg glass-panel-glow rounded-2xl p-6 border border-purple-500/40 space-y-4 shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h3 className="text-lg font-black text-white">Queue New Production Cue</h3>
                <button
                  onClick={() => setShowAddCueModal(false)}
                  className="text-slate-400 hover:text-white text-xs font-mono"
                >
                  ✕ CLOSE
                </button>
              </div>

              <form onSubmit={handleAddCue} className="space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Timecode (HH:MM:SS)</label>
                    <input
                      type="text"
                      required
                      value={newCue.time}
                      onChange={(e) => setNewCue({ ...newCue, time: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white font-mono focus:outline-none focus:border-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Target Stage</label>
                    <select
                      value={newCue.stage}
                      onChange={(e) => setNewCue({ ...newCue, stage: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-purple-500"
                    >
                      <option value="Apex Main Stage">Apex Main Stage</option>
                      <option value="Sub-Bass Bunker">Sub-Bass Bunker</option>
                      <option value="Cyber Garden Dome">Cyber Garden Dome</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Cue Action Description</label>
                  <input
                    type="text"
                    required
                    value={newCue.cue}
                    onChange={(e) => setNewCue({ ...newCue, cue: e.target.value })}
                    placeholder="e.g. 4-Corner Cryo Blast on drop 2"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Assigned Crew</label>
                  <input
                    type="text"
                    value={newCue.crew}
                    onChange={(e) => setNewCue({ ...newCue, crew: e.target.value })}
                    placeholder="e.g. Pyro Tech, FOH Sound, LD"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Notes & Safety Criteria</label>
                  <textarea
                    rows={2}
                    value={newCue.notes}
                    onChange={(e) => setNewCue({ ...newCue, notes: e.target.value })}
                    placeholder="Safety perimeter check, clearance radius..."
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowAddCueModal(false)}
                    className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold"
                  >
                    Confirm & Queue Cue
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
