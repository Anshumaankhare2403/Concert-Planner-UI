import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Calendar,
  Sliders,
  Users,
  Clock,
  DollarSign
} from 'lucide-react';
import { AdminOverview } from './AdminOverview';
import { EventManager } from './EventManager';
import { StageVisualizer } from './StageVisualizer';
import { ArtistLineupManager } from './ArtistLineupManager';
import { RunOfShowCues } from './RunOfShowCues';
import { TicketRevenueAnalytics } from './TicketRevenueAnalytics';

export const AdminDashboard = ({ onOpenCreateModal }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview Hub', icon: LayoutDashboard },
    { id: 'events', label: 'Concerts & Tours', icon: Calendar },
    { id: 'stages', label: 'Stage & Audio Desk', icon: Sliders },
    { id: 'lineup', label: 'Artist Roster', icon: Users },
    { id: 'ros', label: 'Run of Show (ROS)', icon: Clock },
    { id: 'tickets', label: 'Yield & Ticketing', icon: DollarSign }
  ];

  return (
    <div className="space-y-6">
      {/* Admin Tab Navigation with Framer Motion Pill */}
      <div className="flex items-center justify-between border-b border-white/10 pb-2 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-900/90 border border-white/10 backdrop-blur-xl">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative z-10 flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-xl whitespace-nowrap transition-colors ${
                  isActive ? 'text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-purple-400' : 'text-slate-400'}`} />
                <span>{tab.label}</span>

                {isActive && (
                  <motion.div
                    layoutId="adminActiveTabPill"
                    className="absolute inset-0 bg-gradient-to-r from-purple-600/30 to-indigo-600/30 border border-purple-500/50 rounded-xl -z-10 shadow-lg shadow-purple-500/20"
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Quick Help Status */}
        <div className="hidden xl:flex items-center gap-2 text-xs font-mono text-slate-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>AES67 / Dante Audio Network Synced</span>
        </div>
      </div>

      {/* Tab Content with Smooth Transitions */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === 'overview' && (
            <AdminOverview
              onNavigateTab={(tab) => setActiveTab(tab)}
              onOpenCreateModal={onOpenCreateModal}
            />
          )}

          {activeTab === 'events' && (
            <EventManager
              onOpenCreateModal={onOpenCreateModal}
              onInspectStage={() => setActiveTab('stages')}
            />
          )}

          {activeTab === 'stages' && <StageVisualizer />}

          {activeTab === 'lineup' && <ArtistLineupManager />}

          {activeTab === 'ros' && <RunOfShowCues />}

          {activeTab === 'tickets' && <TicketRevenueAnalytics />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
