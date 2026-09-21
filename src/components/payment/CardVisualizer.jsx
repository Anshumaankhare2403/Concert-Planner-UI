import React from 'react';
import { motion } from 'framer-motion';
import { Wifi, ShieldCheck, Sparkles } from 'lucide-react';

export const CardVisualizer = ({
  cardNumber = '',
  cardHolder = '',
  expiry = '',
  cvv = '',
  isFlipped = false
}) => {
  // Format card number with spaces
  const rawNum = cardNumber.replace(/\s?/g, '');
  let formattedNumber = '';
  for (let i = 0; i < 16; i++) {
    if (i > 0 && i % 4 === 0) formattedNumber += ' ';
    formattedNumber += rawNum[i] || '•';
  }

  // Detect card type
  const getCardBrand = (num) => {
    if (num.startsWith('4')) return 'VISA';
    if (num.startsWith('5')) return 'MASTERCARD';
    if (num.startsWith('3')) return 'AMEX';
    return 'PULSE VIP';
  };

  const brand = getCardBrand(rawNum);

  return (
    <div className="w-full max-w-sm mx-auto h-52 [perspective:1000px] select-none">
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 260, damping: 20 }}
        className="w-full h-full relative [transform-style:preserve-3d] rounded-2xl shadow-2xl"
      >
        {/* FRONT OF CARD */}
        <div className="absolute inset-0 [backface-visibility:hidden] rounded-2xl p-5 flex flex-col justify-between overflow-hidden border border-purple-400/40 bg-gradient-to-tr from-slate-950 via-purple-950/80 to-slate-900 shadow-xl shadow-purple-950/40">
          {/* Holographic background sheen */}
          <div className="absolute -right-16 -top-16 w-48 h-48 rounded-full bg-cyan-500/20 blur-2xl pointer-events-none" />
          <div className="absolute -left-16 -bottom-16 w-48 h-48 rounded-full bg-purple-500/20 blur-2xl pointer-events-none" />

          {/* Top Row: Chip & Contactless */}
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {/* EMV Chip */}
              <div className="w-10 h-7 rounded-md bg-gradient-to-tr from-amber-300 via-yellow-200 to-amber-400 border border-yellow-500/60 shadow-sm relative overflow-hidden flex items-center justify-center">
                <div className="w-full h-0.5 bg-yellow-700/40 absolute" />
                <div className="h-full w-0.5 bg-yellow-700/40 absolute" />
              </div>
              <Wifi className="w-4 h-4 text-slate-400 rotate-90" />
            </div>

            <span className="font-mono font-black text-xs tracking-wider text-purple-300 uppercase px-2 py-0.5 rounded bg-purple-900/60 border border-purple-400/30">
              {brand}
            </span>
          </div>

          {/* Center: Card Number */}
          <div className="relative z-10 my-auto">
            <div className="font-mono text-lg sm:text-xl font-black tracking-widest text-white drop-shadow">
              {formattedNumber}
            </div>
          </div>

          {/* Bottom Row: Holder & Expiry */}
          <div className="relative z-10 flex items-end justify-between text-xs">
            <div>
              <span className="text-[9px] font-mono uppercase text-slate-400 block tracking-wider">
                CARDHOLDER NAME
              </span>
              <span className="font-bold text-white tracking-wide truncate max-w-[170px] block mt-0.5">
                {cardHolder.trim() || 'ALEX MERCER'}
              </span>
            </div>

            <div className="text-right">
              <span className="text-[9px] font-mono uppercase text-slate-400 block tracking-wider">
                EXPIRES
              </span>
              <span className="font-mono font-bold text-white block mt-0.5">
                {expiry || '12/28'}
              </span>
            </div>
          </div>
        </div>

        {/* BACK OF CARD */}
        <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-2xl py-5 flex flex-col justify-between overflow-hidden border border-purple-400/40 bg-gradient-to-tr from-slate-950 via-slate-900 to-purple-950 shadow-xl shadow-purple-950/40">
          {/* Magnetic Stripe */}
          <div className="w-full h-10 bg-slate-950 mt-1 border-y border-white/5" />

          {/* CVV Panel */}
          <div className="px-6 space-y-1">
            <div className="flex items-center justify-between text-[9px] font-mono text-slate-400 uppercase">
              <span>AUTHORIZED SIGNATURE</span>
              <span>SECURITY CODE (CVV)</span>
            </div>
            <div className="w-full h-9 bg-white/90 rounded-md flex items-center justify-end px-3">
              <span className="font-mono font-black text-sm text-slate-950 tracking-widest">
                {cvv || '•••'}
              </span>
            </div>
          </div>

          {/* Security details */}
          <div className="px-6 flex items-center justify-between text-[9px] font-mono text-slate-400">
            <span className="flex items-center gap-1 text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" /> 256-Bit SSL Encrypted
            </span>
            <span>PULSE GLOBAL GATEWAY</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

