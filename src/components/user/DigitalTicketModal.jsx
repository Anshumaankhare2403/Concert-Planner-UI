import React from 'react';
import { motion } from 'framer-motion';
import {
  X,
  QrCode,
  Ticket,
  Calendar,
  MapPin,
  Download,
  Share2,
  CheckCircle2
} from 'lucide-react';

export const DigitalTicketModal = ({ booking, isOpen, onClose }) => {
  if (!isOpen || !booking) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ type: 'spring', damping: 25, stiffness: 350 }}
        className="relative w-full max-w-md my-8"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 z-30 p-2 rounded-full bg-slate-900 border border-white/20 text-slate-300 hover:text-white shadow-xl"
        >
          <X className="w-4 h-4" />
        </button>

        {/* The Holographic Pass Container */}
        <div className="relative rounded-3xl overflow-hidden border border-purple-500/40 bg-gradient-to-b from-slate-900 via-[#0d1326] to-slate-950 p-6 shadow-2xl shadow-purple-950/50">
          {/* Holographic Sheen Animated Background */}
          <motion.div
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
            }}
            transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
            className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cyan-400 via-purple-500 to-pink-500"
          />

          {/* Top Header: Festival Branding & Verified Pass */}
          <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-purple-600 flex items-center justify-center text-white shadow-lg shadow-purple-600/30">
                <Ticket className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-purple-400 font-bold block">
                  Official Digital Pass
                </span>
                <span className="text-xs font-black tracking-wider text-white font-mono">
                  PULSE FESTIVAL PASS
                </span>
              </div>
            </div>

            <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
              VERIFIED
            </span>
          </div>

          {/* Body: Concert & Attendee Info */}
          <div className="relative z-10 py-5 space-y-4">
            <div>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-purple-500/20 text-purple-300 border border-purple-500/30 uppercase font-bold">
                {booking.tierName}
              </span>
              <h3 className="text-lg font-black text-white mt-1.5 leading-snug">
                {booking.concertTitle}
              </h3>
            </div>

            <div className="space-y-2 text-xs text-slate-300 bg-slate-950/60 p-3.5 rounded-2xl border border-white/5 font-mono">
              <div className="flex items-center gap-2 text-purple-300">
                <Calendar className="w-4 h-4 shrink-0 text-purple-400" />
                <span>{booking.date}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <MapPin className="w-4 h-4 shrink-0 text-cyan-400" />
                <span className="truncate">{booking.venue}</span>
              </div>
            </div>

            {/* Ticket Tier & Allocation Matrix */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-900/90 border border-white/5">
                <span className="text-[10px] font-mono uppercase text-slate-500 block">Pass Holder</span>
                <span className="font-bold text-white truncate block mt-0.5">{booking.attendeeName}</span>
                <span className="text-[10px] text-slate-400 truncate block">{booking.email}</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/90 border border-white/5">
                <span className="text-[10px] font-mono uppercase text-slate-500 block">Fast Track Gate</span>
                <span className="font-bold text-cyan-300 font-mono block mt-0.5">{booking.gate}</span>
                <span className="text-[10px] text-purple-400 font-mono block">{booking.zone}</span>
              </div>
            </div>

            {/* Perforated Divider Ticket Notch */}
            <div className="relative flex items-center justify-between my-2">
              <div className="w-5 h-5 rounded-full bg-black -ml-8.5 border-r border-white/10" />
              <div className="w-full border-t border-dashed border-white/20 mx-2" />
              <div className="w-5 h-5 rounded-full bg-black -mr-8.5 border-l border-white/10" />
            </div>

            {/* QR Code & Barcode Display */}
            <div className="p-4 rounded-2xl bg-white text-slate-950 flex flex-col items-center justify-center space-y-3 shadow-inner">
              <div className="relative p-2 rounded-xl bg-slate-100 border border-slate-300 flex items-center justify-center">
                {/* Visual SVG QR Representation */}
                <div className="w-36 h-36 flex flex-col items-center justify-center bg-white p-2">
                  <QrCode className="w-28 h-28 text-slate-950" />
                </div>
                {/* Laser scan line animation */}
                <motion.div
                  animate={{ y: [-50, 50, -50] }}
                  transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
                  className="absolute w-32 h-0.5 bg-gradient-to-r from-transparent via-cyan-500 to-transparent shadow-[0_0_8px_#06b6d4]"
                />
              </div>

              {/* Scannable Pass Code */}
              <div className="text-center">
                <span className="text-[11px] font-mono font-black tracking-widest text-slate-800 uppercase">
                  {booking.id}
                </span>
                <p className="text-[9px] font-mono text-slate-500">
                  SCAN AT TURNSTILE GATE • {booking.quantity} PASS(ES)
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons: Save & Add to Wallet */}
          <div className="relative z-10 pt-2 flex items-center gap-2">
            <button
              onClick={() => {
                alert(`Pass #${booking.id} downloaded to offline device cache!`);
              }}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold font-mono tracking-wider transition-all shadow-lg shadow-purple-600/30 active:scale-95"
            >
              <Download className="w-3.5 h-3.5" />
              SAVE DIGITAL PASS
            </button>

            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: booking.concertTitle,
                    text: `I'm going to ${booking.concertTitle}!`,
                    url: window.location.href
                  }).catch(() => {});
                } else {
                  alert('Pass Link copied to clipboard!');
                }
              }}
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-white/10"
              title="Share Pass"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

