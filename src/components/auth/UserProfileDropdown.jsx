import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User,
  Shield,
  Ticket,
  Calendar,
  LogOut,
  ChevronDown,
  Sparkles,
  Zap,
  Repeat
} from 'lucide-react';
import { useEvent } from '../../context/EventContext';

export const UserProfileDropdown = ({ onOpenMyTickets, onOpenSchedule }) => {
  const { currentUser, logoutUser, activeView, setActiveView, userBookings, userSchedule, setIsAuthModalOpen } = useEvent();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!currentUser) {
    return (
      <button
        onClick={() => setIsAuthModalOpen(true)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-white/10 hover:border-purple-500/40 text-xs font-semibold font-mono transition-all"
      >
        <User className="w-3.5 h-3.5 text-purple-400" />
        <span>Sign In</span>
      </button>
    );
  }

  const isAdmin = currentUser.role === 'admin';

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-1.5 rounded-xl bg-slate-900 border border-white/10 hover:border-purple-500/40 transition-all text-xs"
      >
        <img
          src={currentUser.avatar}
          alt={currentUser.name}
          className="w-7 h-7 rounded-lg object-cover border border-white/10"
        />
        <div className="text-left hidden sm:block">
          <span className="font-bold text-white block leading-tight max-w-[100px] truncate">
            {currentUser.name}
          </span>
          <span
            className={`text-[9px] font-mono font-bold uppercase tracking-wider ${
              isAdmin ? 'text-purple-400' : 'text-cyan-400'
            }`}
          >
            {isAdmin ? 'ADMIN' : 'FAN'}
          </span>
        </div>
        <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
      </button>

      {/* Floating Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            transition={{ type: 'spring', damping: 25, stiffness: 400 }}
            className="absolute right-0 mt-2 w-64 glass-panel-glow rounded-2xl border border-purple-500/30 p-3 shadow-2xl z-50 space-y-2 text-xs"
          >
            {/* Header info */}
            <div className="p-2.5 rounded-xl bg-slate-950/60 border border-white/5 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-black text-white">{currentUser.name}</span>
                <span
                  className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase border ${
                    isAdmin
                      ? 'bg-purple-500/20 text-purple-300 border-purple-500/40'
                      : 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                  }`}
                >
                  {currentUser.vipStatus || (isAdmin ? 'Stage Director' : 'VIP Pass')}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono truncate">{currentUser.email}</p>
            </div>

            {/* Quick Mode Toggle */}
            <button
              onClick={() => {
                setActiveView(activeView === 'admin' ? 'user' : 'admin');
                setIsOpen(false);
              }}
              className="w-full flex items-center justify-between p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white transition-all border border-white/5"
            >
              <div className="flex items-center gap-2">
                <Repeat className="w-3.5 h-3.5 text-purple-400" />
                <span>Switch to {activeView === 'admin' ? 'Fan Experience' : 'Admin Console'}</span>
              </div>
              <span className="text-[10px] font-mono text-slate-500">Mode</span>
            </button>

            {/* My Passes */}
            <button
              onClick={() => {
                onOpenMyTickets();
                setIsOpen(false);
              }}
              className="w-full flex items-center justify-between p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white transition-all border border-white/5"
            >
              <div className="flex items-center gap-2">
                <Ticket className="w-3.5 h-3.5 text-cyan-400" />
                <span>My Booked Passes</span>
              </div>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-cyan-500/20 text-cyan-300 font-mono">
                {userBookings.length}
              </span>
            </button>

            {/* Personal Schedule */}
            <button
              onClick={() => {
                onOpenSchedule();
                setIsOpen(false);
              }}
              className="w-full flex items-center justify-between p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white transition-all border border-white/5"
            >
              <div className="flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 text-purple-400" />
                <span>Festival Schedule</span>
              </div>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-purple-500/20 text-purple-300 font-mono">
                {userSchedule.length}
              </span>
            </button>

            {/* Logout */}
            <div className="pt-1 border-t border-white/10">
              <button
                onClick={() => {
                  logoutUser();
                  setIsOpen(false);
                }}
                className="w-full flex items-center gap-2 p-2 rounded-xl hover:bg-red-500/20 text-slate-400 hover:text-red-400 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

