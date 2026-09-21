import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Music,
  Shield,
  Sparkles,
  Ticket,
  Calendar,
  Plus,
  LogOut,
  User
} from 'lucide-react';
import { useEvent } from '../../context/EventContext';
import { AudioVisualizer } from './AudioVisualizer';

export const MobileDrawer = ({
  isOpen,
  onClose,
  onOpenCreateModal,
  onOpenSchedule,
  onOpenMyTickets
}) => {
  const {
    activeView,
    setActiveView,
    currentUser,
    logoutUser,
    setIsAuthModalOpen,
    userBookings,
    userSchedule
  } = useEvent();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden flex justify-end">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm"
      />

      {/* Slide-out Menu Panel */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 28, stiffness: 300 }}
        className="relative z-10 w-4/5 max-w-sm h-full bg-[#080c14] border-l border-white/10 p-6 flex flex-col justify-between overflow-y-auto"
      >
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600 to-cyan-500 flex items-center justify-center text-white">
                <Music className="w-4 h-4" />
              </div>
              <span className="font-mono font-black text-white text-base">
                PULSE<span className="text-purple-400">::</span>STAGE
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-900 border border-white/10 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* User Profile / Sign In Box */}
          {currentUser ? (
            <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-9 h-9 rounded-xl object-cover border border-white/10"
                />
                <div>
                  <h4 className="text-xs font-bold text-white leading-snug">{currentUser.name}</h4>
                  <span
                    className={`text-[9px] font-mono font-bold uppercase tracking-wider ${
                      currentUser.role === 'admin' ? 'text-purple-400' : 'text-cyan-400'
                    }`}
                  >
                    {currentUser.role.toUpperCase()}
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  logoutUser();
                  onClose();
                }}
                className="text-slate-500 hover:text-red-400 p-1.5"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                setIsAuthModalOpen(true);
                onClose();
              }}
              className="w-full py-2.5 rounded-xl bg-purple-600 text-white font-mono text-xs font-bold shadow-lg flex items-center justify-center gap-2"
            >
              <User className="w-4 h-4" />
              SIGN IN / REGISTER
            </button>
          )}

          {/* Dual Mode Switcher */}
          <div className="space-y-2">
            <span className="text-[10px] font-mono uppercase text-slate-500 font-bold block">
              Experience Mode:
            </span>
            <div className="grid grid-cols-2 gap-1.5 p-1 rounded-xl bg-slate-900 border border-white/10">
              <button
                onClick={() => {
                  setActiveView('admin');
                  onClose();
                }}
                className={`py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                  activeView === 'admin'
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'text-slate-400'
                }`}
              >
                <Shield className="w-3.5 h-3.5" />
                <span>Admin</span>
              </button>

              <button
                onClick={() => {
                  setActiveView('user');
                  onClose();
                }}
                className={`py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                  activeView === 'user'
                    ? 'bg-cyan-600 text-white shadow-md'
                    : 'text-slate-400'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Fan Portal</span>
              </button>
            </div>
          </div>

          {/* Quick Actions List */}
          <div className="space-y-2 pt-2">
            <span className="text-[10px] font-mono uppercase text-slate-500 font-bold block">
              Quick Navigation:
            </span>

            {activeView === 'admin' ? (
              <div className="space-y-1.5 text-xs font-medium text-slate-300">
                <button
                  onClick={() => {
                    onOpenCreateModal();
                    onClose();
                  }}
                  className="w-full flex items-center gap-2 p-2.5 rounded-xl bg-purple-600/30 border border-purple-500/40 text-purple-200"
                >
                  <Plus className="w-4 h-4 text-purple-400" />
                  <span>Program New Concert</span>
                </button>
              </div>
            ) : (
              <div className="space-y-1.5 text-xs font-medium text-slate-300">
                <button
                  onClick={() => {
                    onOpenMyTickets();
                    onClose();
                  }}
                  className="w-full flex items-center justify-between p-2.5 rounded-xl bg-slate-900 border border-white/10 hover:border-cyan-500/40"
                >
                  <div className="flex items-center gap-2">
                    <Ticket className="w-4 h-4 text-cyan-400" />
                    <span>My Booked Passes</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-300">
                    {userBookings.length}
                  </span>
                </button>

                <button
                  onClick={() => {
                    onOpenSchedule();
                    onClose();
                  }}
                  className="w-full flex items-center justify-between p-2.5 rounded-xl bg-slate-900 border border-white/10 hover:border-purple-500/40"
                >
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-purple-400" />
                    <span>My Festival Schedule</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-purple-500/20 text-purple-300">
                    {userSchedule.length}
                  </span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Drawer Footer */}
        <div className="pt-6 border-t border-white/10 space-y-3">
          <div className="flex justify-center">
            <AudioVisualizer isLive={true} barCount={8} />
          </div>
          <p className="text-[10px] font-mono text-center text-slate-500">
            PULSE::STAGE Mobile Suite • v2.6
          </p>
        </div>
      </motion.div>
    </div>
  );
};
