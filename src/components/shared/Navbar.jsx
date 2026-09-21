import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Ticket,
  Calendar,
  Sparkles,
  Shield,
  Music,
  Plus,
  Menu
} from 'lucide-react';
import { useEvent } from '../../context/EventContext';
import { AudioVisualizer } from './AudioVisualizer';
import { UserProfileDropdown } from '../auth/UserProfileDropdown';
import { MobileDrawer } from './MobileDrawer';

export const Navbar = ({ onOpenCreateModal, onOpenMyTickets, onOpenSchedule }) => {
  const { activeView, setActiveView, userBookings, userSchedule, concerts } = useEvent();
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  const liveConcertsCount = concerts.filter((c) => c.status === 'Live Now').length;

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#080c14]/90 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
          {/* Brand Identity */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="relative flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-cyan-500 shadow-lg shadow-purple-500/20">
              <Music className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              <motion.span
                animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute -top-1 -right-1 w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-emerald-400 border-2 border-[#080c14]"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="text-base sm:text-lg font-black tracking-wider text-white font-mono">
                  PULSE<span className="text-purple-400 font-extralight">::</span>STAGE
                </span>
                <span className="hidden sm:inline-block text-[10px] px-1.5 py-0.5 rounded-md font-mono font-semibold uppercase bg-purple-500/10 text-purple-300 border border-purple-500/30">
                  v2.6
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium hidden lg:block">
                Next-Gen Concert Event & Production Planner
              </p>
            </div>
          </div>

          {/* Center: Audio Monitor Wave (hidden on small screens) */}
          <div className="hidden lg:flex items-center gap-3">
            {liveConcertsCount > 0 && (
              <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                {liveConcertsCount} SHOW LIVE
              </div>
            )}
            <AudioVisualizer isLive={true} />
          </div>

          {/* Right Side: Mode Switcher, User Profile & Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Dual Mode Switcher (Visible on md+) */}
            <div className="hidden md:flex items-center p-1 rounded-xl bg-slate-900 border border-white/10 relative">
              <button
                onClick={() => setActiveView('admin')}
                className={`relative z-10 flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                  activeView === 'admin'
                    ? 'text-white'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Shield className="w-3.5 h-3.5 text-purple-400" />
                <span>Admin Console</span>
                {activeView === 'admin' && (
                  <motion.div
                    layoutId="activeNavPill"
                    className="absolute inset-0 bg-gradient-to-r from-purple-600/40 to-indigo-600/40 border border-purple-500/50 rounded-lg -z-10 shadow-lg shadow-purple-500/20"
                    transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                  />
                )}
              </button>

              <button
                onClick={() => setActiveView('user')}
                className={`relative z-10 flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                  activeView === 'user'
                    ? 'text-white'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>Fan Portal</span>
                {activeView === 'user' && (
                  <motion.div
                    layoutId="activeNavPill"
                    className="absolute inset-0 bg-gradient-to-r from-cyan-600/40 to-blue-600/40 border border-cyan-500/50 rounded-lg -z-10 shadow-lg shadow-cyan-500/20"
                    transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                  />
                )}
              </button>
            </div>

            {/* Desktop Actions */}
            <div className="hidden sm:flex items-center gap-2">
              {activeView === 'admin' ? (
                <button
                  onClick={onOpenCreateModal}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-md shadow-purple-600/25 transition-all border border-purple-400/30 active:scale-95"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>New Concert</span>
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    onClick={onOpenSchedule}
                    className="relative flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-medium text-slate-300 hover:text-white bg-slate-900 border border-white/10 hover:border-purple-500/40 transition-all"
                    title="Personal Festival Itinerary"
                  >
                    <Calendar className="w-3.5 h-3.5 text-purple-400" />
                    <span className="hidden md:inline">My Schedule</span>
                    {userSchedule.length > 0 && (
                      <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-purple-500 text-white">
                        {userSchedule.length}
                      </span>
                    )}
                  </button>

                  <button
                    onClick={onOpenMyTickets}
                    className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-md shadow-cyan-600/25 transition-all border border-cyan-400/30 active:scale-95"
                  >
                    <Ticket className="w-3.5 h-3.5" />
                    <span>My Passes</span>
                    {userBookings.length > 0 && (
                      <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-white text-slate-950">
                        {userBookings.length}
                      </span>
                    )}
                  </button>
                </div>
              )}
            </div>

            {/* User Profile Dropdown */}
            <UserProfileDropdown
              onOpenMyTickets={onOpenMyTickets}
              onOpenSchedule={onOpenSchedule}
            />

            {/* Mobile Hamburger Toggle (Visible < md) */}
            <button
              onClick={() => setIsMobileDrawerOpen(true)}
              className="md:hidden p-2 rounded-xl bg-slate-900 border border-white/10 text-slate-300 hover:text-white"
              aria-label="Open Mobile Menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Slide-out Mobile Navigation Drawer */}
      <MobileDrawer
        isOpen={isMobileDrawerOpen}
        onClose={() => setIsMobileDrawerOpen(false)}
        onOpenCreateModal={onOpenCreateModal}
        onOpenSchedule={onOpenSchedule}
        onOpenMyTickets={onOpenMyTickets}
      />
    </>
  );
};
