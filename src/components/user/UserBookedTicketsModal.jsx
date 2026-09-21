import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Ticket,
  Calendar,
  MapPin,
  QrCode,
  X,
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { useEvent } from '../../context/EventContext';
import { DigitalTicketModal } from './DigitalTicketModal';

export const UserBookedTicketsModal = ({ isOpen, onClose }) => {
  const { userBookings } = useEvent();
  const [selectedPass, setSelectedPass] = useState(null);

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-2xl glass-panel-glow rounded-3xl border border-cyan-500/40 my-8 shadow-2xl p-6 sm:p-8"
        >
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-xl bg-slate-900 border border-white/10 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="mb-6">
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider">
              <Ticket className="w-4 h-4" /> My Digital Wallet
            </div>
            <h2 className="text-2xl font-black text-white mt-1">
              Your Booked Concert Passes
            </h2>
            <p className="text-xs text-slate-400">
              Scannable holographic tickets and venue gate directions.
            </p>
          </div>

          {userBookings.length === 0 ? (
            <div className="text-center py-12 text-slate-500 text-xs">
              You don't have any booked concert tickets yet. Browse upcoming shows and reserve your spot!
            </div>
          ) : (
            <div className="space-y-4 max-h-[460px] overflow-y-auto pr-1">
              {userBookings.map((pass) => (
                <div
                  key={pass.id}
                  className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-purple-950/30 border border-white/10 hover:border-cyan-500/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-purple-500/20 text-purple-300 border border-purple-500/30">
                        {pass.tierName}
                      </span>
                      <span className="text-xs font-mono text-cyan-400 font-bold">
                        #{pass.id}
                      </span>
                    </div>

                    <h3 className="text-base font-black text-white group-hover:text-cyan-300 transition-colors">
                      {pass.concertTitle}
                    </h3>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 font-mono">
                      <span className="flex items-center gap-1 text-slate-300">
                        <Calendar className="w-3.5 h-3.5 text-purple-400" />
                        {pass.date}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1 text-slate-300 truncate max-w-xs">
                        <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                        {pass.venue}
                      </span>
                    </div>

                    <div className="text-[11px] text-slate-400">
                      Holder: <strong className="text-white">{pass.attendeeName}</strong> ({pass.quantity}x Tickets • ${pass.totalPaid} Paid)
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedPass(pass)}
                    className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-xs font-bold font-mono tracking-wider shadow-lg shadow-cyan-600/30 transition-all active:scale-95 shrink-0"
                  >
                    <QrCode className="w-4 h-4" />
                    OPEN QR PASS
                  </button>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      <DigitalTicketModal
        booking={selectedPass}
        isOpen={Boolean(selectedPass)}
        onClose={() => setSelectedPass(null)}
      />
    </>
  );
};

