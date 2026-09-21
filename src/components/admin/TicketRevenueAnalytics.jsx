import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  DollarSign,
  Ticket,
  TrendingUp,
  CreditCard,
  ShieldCheck
} from 'lucide-react';
import { useEvent } from '../../context/EventContext';

export const TicketRevenueAnalytics = () => {
  const { selectedConcert, updateConcert, addNotification } = useEvent();
  const [editingTierId, setEditingTierId] = useState(null);
  const [tempPrice, setTempPrice] = useState('');

  const totalGross = selectedConcert.tiers.reduce((acc, t) => {
    const sold = t.total - t.available;
    return acc + sold * t.price;
  }, 0);

  const totalCapacity = selectedConcert.tiers.reduce((acc, t) => acc + t.total, 0);
  const totalSold = selectedConcert.tiers.reduce((acc, t) => acc + (t.total - t.available), 0);
  const totalAvailable = selectedConcert.tiers.reduce((acc, t) => acc + t.available, 0);
  const percentSold = totalCapacity > 0 ? ((totalSold / totalCapacity) * 100).toFixed(1) : 0;

  const handleUpdatePrice = (tierId) => {
    const newPriceVal = parseFloat(tempPrice);
    if (isNaN(newPriceVal) || newPriceVal <= 0) return;

    const updatedTiers = selectedConcert.tiers.map((t) =>
      t.id === tierId ? { ...t, price: newPriceVal } : t
    );
    updateConcert(selectedConcert.id, { tiers: updatedTiers });
    setEditingTierId(null);
    addNotification('Ticket Tier Pricing Updated', `Tier price updated to $${newPriceVal}.`, 'success');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Ticketing Inventory & Revenue Yield Management
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Analyzing box office conversion, tier velocity, and seating yield for: <strong className="text-purple-300">{selectedConcert.title}</strong>
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Automated Stripe & Web3 Settlement Active</span>
        </div>
      </div>

      {/* 3 Summary Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="glass-panel p-5 rounded-2xl border border-white/10">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-slate-400">Total Yield Realized</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl sm:text-3xl font-black font-mono text-white">
              ${totalGross.toLocaleString()}
            </h3>
            <span className="text-xs text-emerald-400 flex items-center gap-1 mt-1">
              <TrendingUp className="w-3.5 h-3.5" /> +14.2% higher yield than projected
            </span>
          </div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-white/10">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-slate-400">Tickets Issued / Quota</span>
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Ticket className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl sm:text-3xl font-black font-mono text-white">
              {totalSold.toLocaleString()}{' '}
              <span className="text-base text-slate-500 font-normal">/ {totalCapacity.toLocaleString()}</span>
            </h3>
            <span className="text-xs text-cyan-400 font-mono mt-1 block">
              {percentSold}% Sold Out • {totalAvailable.toLocaleString()} seats left
            </span>
          </div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-white/10">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-slate-400">Average Order Value (AOV)</span>
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <CreditCard className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl sm:text-3xl font-black font-mono text-white">
              ${totalSold > 0 ? (totalGross / totalSold).toFixed(2) : '0.00'}
            </h3>
            <span className="text-xs text-purple-400 font-mono mt-1 block">
              Heavy VIP tier conversion (34% mix)
            </span>
          </div>
        </div>
      </div>

      {/* Tier Breakdown Table & Price Control */}
      <div className="glass-panel rounded-2xl border border-white/10 p-6 space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-white">
          Active Tier Allocation & Pricing Controls
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {selectedConcert.tiers.map((tier) => {
            const soldCount = tier.total - tier.available;
            const soldPct = Math.round((soldCount / tier.total) * 100);
            const tierRevenue = soldCount * tier.price;
            const isEditing = editingTierId === tier.id;

            return (
              <motion.div
                key={tier.id}
                whileHover={{ y: -3 }}
                className="p-5 rounded-xl bg-slate-900/80 border border-white/10 flex flex-col justify-between space-y-4 hover:border-purple-500/40 transition-all"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-sm font-black text-white">{tier.name}</h4>
                      <span className="text-[11px] text-slate-400 font-mono block mt-0.5">
                        Allocation: {tier.total.toLocaleString()} Tickets
                      </span>
                    </div>

                    {/* Price with Inline Edit */}
                    {isEditing ? (
                      <div className="flex items-center gap-1">
                        <input
                          type="number"
                          value={tempPrice}
                          onChange={(e) => setTempPrice(e.target.value)}
                          className="w-16 px-1.5 py-0.5 text-xs font-mono bg-slate-800 border border-purple-400 text-white rounded"
                          placeholder={tier.price.toString()}
                        />
                        <button
                          onClick={() => handleUpdatePrice(tier.id)}
                          className="text-[10px] px-2 py-0.5 bg-purple-600 rounded text-white font-bold"
                        >
                          Save
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => {
                          setEditingTierId(tier.id);
                          setTempPrice(tier.price.toString());
                        }}
                        className="text-sm font-mono font-black text-purple-300 hover:text-white bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20"
                        title="Click to edit tier price"
                      >
                        ${tier.price}
                      </button>
                    )}
                  </div>

                  {/* Revenue Generated */}
                  <div className="mt-3 p-2.5 rounded-lg bg-slate-950/60 border border-white/5 flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-mono">Gross Yield:</span>
                    <span className="font-mono font-bold text-emerald-400">
                      ${tierRevenue.toLocaleString()}
                    </span>
                  </div>

                  {/* Sold count & progress */}
                  <div className="mt-3 space-y-1.5">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-slate-400">Sold:</span>
                      <span className="text-white font-bold">
                        {soldCount.toLocaleString()} ({soldPct}%)
                      </span>
                    </div>
                    <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-400 rounded-full"
                        style={{ width: `${soldPct}%` }}
                      />
                    </div>
                    <div className="text-right text-[10px] font-mono text-slate-400">
                      {tier.available} Available
                    </div>
                  </div>

                  {/* Perks list */}
                  <div className="mt-3 pt-3 border-t border-white/5 space-y-1">
                    <span className="text-[10px] font-mono text-slate-500 uppercase">Included Perks:</span>
                    {tier.perks?.map((perk, i) => (
                      <div key={i} className="text-[11px] text-slate-300 flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-cyan-400 shrink-0" />
                        <span className="truncate">{perk}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <span
                    className={`block text-center py-1 rounded text-[11px] font-mono font-bold uppercase border ${
                      tier.available === 0
                        ? 'bg-red-500/20 text-red-400 border-red-500/40'
                        : tier.available < 50
                        ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                        : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                    }`}
                  >
                    {tier.available === 0 ? 'SOLD OUT' : `${tier.available} AVAILABLE`}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
