import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EventProvider, useEvent } from './context/EventContext';
import { Navbar } from './components/shared/Navbar';
import { ToastNotifications } from './components/shared/ToastNotifications';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { UserPortal } from './components/user/UserPortal';
import { EventCreateModal } from './components/admin/EventCreateModal';
import { SchedulePlanner } from './components/user/SchedulePlanner';
import { UserBookedTicketsModal } from './components/user/UserBookedTicketsModal';
import { AuthModal } from './components/auth/AuthModal';
import { PaymentGatewayModal } from './components/payment/PaymentGatewayModal';
import { DigitalTicketModal } from './components/user/DigitalTicketModal';
import { Shield, Ticket } from 'lucide-react';

const MainApp = () => {
  const {
    activeView,
    isAuthModalOpen,
    setIsAuthModalOpen,
    isPaymentModalOpen,
    setIsPaymentModalOpen
  } = useEvent();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [isMyTicketsOpen, setIsMyTicketsOpen] = useState(false);
  const [newlyPurchasedPass, setNewlyPurchasedPass] = useState(null);

  return (
    <div className="min-h-screen bg-[#080c14] text-slate-100 flex flex-col selection:bg-purple-500 selection:text-white">
      {/* Dynamic Ambient Background Glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 left-1/4 w-[650px] h-[650px] bg-purple-900/15 rounded-full blur-[140px]" />
        <div className="absolute top-1/3 -right-40 w-[600px] h-[600px] bg-cyan-900/15 rounded-full blur-[140px]" />
        <div className="absolute -bottom-40 left-1/3 w-[600px] h-[600px] bg-pink-900/10 rounded-full blur-[140px]" />
      </div>

      {/* Persistent Global Navigation */}
      <Navbar
        onOpenCreateModal={() => setIsCreateModalOpen(true)}
        onOpenSchedule={() => setIsScheduleOpen(true)}
        onOpenMyTickets={() => setIsMyTicketsOpen(true)}
      />

      {/* Main View Area with Framer Motion Transition */}
      <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8">
        <AnimatePresence mode="wait">
          {activeView === 'admin' ? (
            <motion.div
              key="admin-view"
              initial={{ opacity: 0, scale: 0.99, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.99, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <AdminDashboard onOpenCreateModal={() => setIsCreateModalOpen(true)} />
            </motion.div>
          ) : (
            <motion.div
              key="user-view"
              initial={{ opacity: 0, scale: 0.99, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.99, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <UserPortal
                onOpenSchedule={() => setIsScheduleOpen(true)}
                onOpenMyTickets={() => setIsMyTicketsOpen(true)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Global Footer */}
      <footer className="relative z-10 border-t border-white/10 bg-[#060910] text-slate-400 text-xs py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-mono">
            <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
            <span className="text-slate-200 font-bold">PULSE CONCERT OS</span>
            <span>•</span>
            <span>AES67 Broadcast Protocol Active</span>
          </div>

          <div className="flex items-center gap-6 font-medium">
            <span className="flex items-center gap-1 text-slate-300">
              <Shield className="w-3.5 h-3.5 text-purple-400" /> Dark Production Console
            </span>
            <span className="flex items-center gap-1 text-slate-300">
              <Ticket className="w-3.5 h-3.5 text-cyan-400" /> Holographic QR Pass
            </span>
          </div>

          <div className="text-slate-500 text-[11px] font-mono">
            © 2026 PulseStage Live Productions Inc.
          </div>
        </div>
      </footer>

      {/* Global Modals */}
      <EventCreateModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />

      <SchedulePlanner
        isOpen={isScheduleOpen}
        onClose={() => setIsScheduleOpen(false)}
      />

      <UserBookedTicketsModal
        isOpen={isMyTicketsOpen}
        onClose={() => setIsMyTicketsOpen(false)}
      />

      {/* Authentication Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />

      {/* Secure Multi-Method Payment Gateway Modal */}
      <PaymentGatewayModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        onPaymentSuccess={(pass) => setNewlyPurchasedPass(pass)}
      />

      {/* Digital Holographic Ticket Modal when newly purchased pass is ready */}
      <DigitalTicketModal
        booking={newlyPurchasedPass}
        isOpen={Boolean(newlyPurchasedPass)}
        onClose={() => setNewlyPurchasedPass(null)}
      />

      {/* Live Toast Stack */}
      <ToastNotifications />
    </div>
  );
};

function App() {
  return (
    <EventProvider>
      <MainApp />
    </EventProvider>
  );
}

export default App;
