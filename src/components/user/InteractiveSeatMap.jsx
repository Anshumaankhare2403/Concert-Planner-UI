import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  X,
  CheckCircle2,
  Zap,
  User,
  Mail,
  CreditCard
} from 'lucide-react';
import { useEvent } from '../../context/EventContext';

export const InteractiveSeatMap = ({ concert, isOpen, onClose }) => {
  const { openPaymentGateway, currentUser } = useEvent();

  // Selected tier & zone
  const [selectedTierId, setSelectedTierId] = useState(
    concert?.tiers[0]?.id || ''
  );
  const [quantity, setQuantity] = useState(1);
  const [attendeeName, setAttendeeName] = useState(currentUser?.name || '');
  const [attendeeEmail, setAttendeeEmail] = useState(currentUser?.email || '');

  if (!isOpen || !concert) return null;

  const currentTier = concert.tiers.find((t) => t.id === selectedTierId) || concert.tiers[0];

  // Map tier id to visual zone
  const getZoneForTier = (tier) => {
    if (tier.name.toLowerCase().includes('pit') || tier.name.toLowerCase().includes('circle')) {
      return 'Front Golden Circle Barricade';
    }
    if (tier.name.toLowerCase().includes('vip') || tier.name.toLowerCase().includes('deck')) {
      return 'VIP SkyDeck Terrace & Lounge';
    }
    if (tier.name.toLowerCase().includes('plat') || tier.name.toLowerCase().includes('backstage')) {
      return 'Platinum On-Stage Platform';
    }
    return 'Main General Admission Floor';
  };

  const handleProceedToPayment = (e) => {
    e.preventDefault();
    if (currentTier.available < quantity) return;

    openPaymentGateway({
      concert,
      tier: currentTier,
      quantity,
      attendeeName: attendeeName.trim() || currentUser?.name || 'Alex Mercer',
      email: attendeeEmail.trim() || currentUser?.email || 'fan@futurebeats.io',
      zoneName: getZoneForTier(currentTier)
    });
    onClose();
  };

  const subtotal = currentTier.price * quantity;
  const serviceFee = Math.round(subtotal * 0.08);
  const totalAmount = subtotal + serviceFee;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-xl overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-5xl glass-panel-glow rounded-3xl border border-purple-500/40 my-6 shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-white/10 bg-slate-950/60">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-purple-500/20 text-purple-300 border border-purple-500/30">
                Interactive Stage & Seating Matrix
              </span>
              <span className="text-xs text-slate-400 font-mono hidden sm:inline">
                {concert.venue} ({concert.city})
              </span>
            </div>
            <h2 className="text-lg sm:text-2xl font-black text-white mt-1">
              {concert.title}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-900 border border-white/10 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Left 7 Cols: Interactive 2D Venue Arena */}
          <div className="lg:col-span-7 p-4 sm:p-6 bg-slate-950/80 flex flex-col items-center justify-between space-y-4 select-none">
            <div className="text-center">
              <span className="text-xs font-mono uppercase tracking-widest text-slate-400 font-bold">
                Select Your Preferred Arena Zone
              </span>
              <p className="text-[11px] text-slate-500">
                Click any zone below to select tier and view perks
              </p>
            </div>

            {/* 2D Stadium Map */}
            <div className="w-full max-w-md h-80 sm:h-96 rounded-2xl bg-[#090e1c] border border-white/10 p-3 sm:p-4 flex flex-col items-center justify-between relative shadow-inner">
              {/* 1. Main Stage */}
              <div className="w-4/5 py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-900 border border-purple-400/50 shadow-lg shadow-purple-500/20 text-center relative">
                <span className="text-[10px] sm:text-[11px] font-mono font-black text-purple-200 tracking-widest uppercase flex items-center justify-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-yellow-400" />
                  PERFORMANCE STAGE & LED WALL
                </span>
                <span className="text-[8px] sm:text-[9px] text-purple-300 font-mono block">
                  High Production Pyro & Sound Origin
                </span>
              </div>

              {/* 2. Front Golden Circle Pit */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  const pitTier = concert.tiers.find(
                    (t) => t.name.toLowerCase().includes('pit') || t.name.toLowerCase().includes('circle')
                  ) || concert.tiers[0];
                  setSelectedTierId(pitTier.id);
                }}
                className={`w-3/4 py-2.5 sm:py-3 px-4 rounded-xl border text-center transition-all cursor-pointer ${
                  currentTier.name.toLowerCase().includes('pit') || currentTier.name.toLowerCase().includes('circle')
                    ? 'border-yellow-400 bg-yellow-500/20 shadow-lg shadow-yellow-500/30'
                    : 'border-yellow-500/30 bg-yellow-500/5 hover:border-yellow-500/60'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-bold font-mono text-yellow-300">
                  <span>⚡ GOLDEN CIRCLE PIT</span>
                  <span>$189</span>
                </div>
                <span className="text-[10px] text-yellow-200/70 font-mono block">
                  Barricade Access • Closest to Artists
                </span>
              </motion.button>

              {/* 3. Main General Admission Field */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  const gaTier = concert.tiers.find(
                    (t) => t.name.toLowerCase().includes('ga') || t.name.toLowerCase().includes('general')
                  ) || concert.tiers[0];
                  setSelectedTierId(gaTier.id);
                }}
                className={`w-full py-4 sm:py-6 px-4 rounded-xl border text-center transition-all cursor-pointer ${
                  currentTier.name.toLowerCase().includes('ga') || currentTier.name.toLowerCase().includes('general')
                    ? 'border-cyan-400 bg-cyan-500/20 shadow-lg shadow-cyan-500/30'
                    : 'border-cyan-500/30 bg-cyan-500/5 hover:border-cyan-500/60'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-bold font-mono text-cyan-300">
                  <span>GENERAL ADMISSION (GA) FLOOR</span>
                  <span>$89</span>
                </div>
                <span className="text-[10px] text-cyan-200/70 font-mono block">
                  Full Festival Field • Open Standing & Dancing
                </span>
              </motion.button>

              {/* 4. VIP SkyDeck Terrace */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  const vipTier = concert.tiers.find(
                    (t) => t.name.toLowerCase().includes('vip') || t.name.toLowerCase().includes('deck')
                  ) || concert.tiers[0];
                  setSelectedTierId(vipTier.id);
                }}
                className={`w-full py-2.5 sm:py-3 px-4 rounded-xl border text-center transition-all cursor-pointer ${
                  currentTier.name.toLowerCase().includes('vip') || currentTier.name.toLowerCase().includes('deck')
                    ? 'border-purple-400 bg-purple-500/20 shadow-lg shadow-purple-500/30'
                    : 'border-purple-500/30 bg-purple-500/5 hover:border-purple-500/60'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-bold font-mono text-purple-300">
                  <span>🍸 VIP SKYDECK LOUNGE</span>
                  <span>$349</span>
                </div>
                <span className="text-[10px] text-purple-200/70 font-mono block">
                  Elevated Viewing Platform • Private Bar & Restrooms
                </span>
              </motion.button>
            </div>

            {/* Color legend */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-[10px] font-mono text-slate-400">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" /> Golden Pit
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" /> General Floor
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-400" /> VIP SkyDeck
              </span>
            </div>
          </div>

          {/* Right 5 Cols: Tier Details & Checkout Form */}
          <div className="lg:col-span-5 p-4 sm:p-6 bg-slate-900/90 border-t lg:border-t-0 lg:border-l border-white/10 flex flex-col justify-between space-y-6">
            <form onSubmit={handleProceedToPayment} className="space-y-4 sm:space-y-5 text-xs">
              {/* Tier Selector Pills */}
              <div>
                <label className="block text-slate-400 font-mono font-bold uppercase mb-2 text-[10px]">
                  Choose Pass Tier
                </label>
                <div className="space-y-2">
                  {concert.tiers.map((tier) => (
                    <button
                      type="button"
                      key={tier.id}
                      onClick={() => setSelectedTierId(tier.id)}
                      className={`w-full p-2.5 sm:p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                        selectedTierId === tier.id
                          ? 'border-purple-400 bg-purple-600/20 text-white shadow-md'
                          : 'border-white/5 bg-slate-950/60 text-slate-300 hover:border-white/20'
                      }`}
                    >
                      <div>
                        <div className="font-bold">{tier.name}</div>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {tier.available > 0 ? `${tier.available} passes remaining` : 'Sold out'}
                        </span>
                      </div>
                      <span className="text-sm font-mono font-black text-purple-300">
                        ${tier.price}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Included Perks */}
              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-white/5 space-y-1.5">
                <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">
                  Pass Inclusions & Benefits:
                </span>
                {currentTier.perks?.map((perk, i) => (
                  <div key={i} className="flex items-center gap-2 text-[11px] text-slate-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{perk}</span>
                  </div>
                ))}
              </div>

              {/* Attendee Details */}
              <div className="space-y-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-purple-400" /> Full Name on Digital Pass
                  </label>
                  <input
                    type="text"
                    required
                    value={attendeeName}
                    onChange={(e) => setAttendeeName(e.target.value)}
                    placeholder="e.g. Alex Mercer"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-cyan-400" /> Email for Mobile QR Pass
                  </label>
                  <input
                    type="email"
                    required
                    value={attendeeEmail}
                    onChange={(e) => setAttendeeEmail(e.target.value)}
                    placeholder="e.g. alex@futurebeats.io"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              {/* Quantity Counter */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-white/5">
                <span className="font-mono text-slate-300">Quantity</span>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-7 h-7 rounded-lg bg-slate-800 text-slate-200 font-bold hover:bg-slate-700 flex items-center justify-center"
                  >
                    -
                  </button>
                  <span className="font-mono font-bold text-sm text-white w-4 text-center">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.min(6, quantity + 1))}
                    className="w-7 h-7 rounded-lg bg-slate-800 text-slate-200 font-bold hover:bg-slate-700 flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Total breakdown */}
              <div className="space-y-1 pt-2 border-t border-white/10 text-xs font-mono">
                <div className="flex justify-between text-slate-400">
                  <span>Pass Subtotal:</span>
                  <span>${subtotal}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Venue Processing & RFID Wristband:</span>
                  <span>+${serviceFee}</span>
                </div>
                <div className="flex justify-between text-white font-bold text-sm pt-1 border-t border-white/5">
                  <span>Total Due:</span>
                  <span className="text-emerald-400 font-black">${totalAmount}</span>
                </div>
              </div>

              {/* Submit to Payment Gateway Button */}
              <button
                type="submit"
                disabled={currentTier.available === 0}
                className={`w-full py-3.5 rounded-xl text-xs font-bold font-mono tracking-wider transition-all flex items-center justify-center gap-2 ${
                  currentTier.available > 0
                    ? 'bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white shadow-xl shadow-purple-600/30 active:scale-95'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                }`}
              >
                <CreditCard className="w-4 h-4" />
                {currentTier.available > 0
                  ? `PROCEED TO SECURE PAYMENT ($${totalAmount})`
                  : 'THIS TIER IS CURRENTLY SOLD OUT'}
              </button>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
