import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  CreditCard,
  Lock,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Ticket,
  Percent,
  Cpu,
  Smartphone,
  Coins,
  ArrowRight,
  RefreshCw,
  AlertCircle
} from 'lucide-react';
import { useEvent } from '../../context/EventContext';
import { CardVisualizer } from './CardVisualizer';

export const PaymentGatewayModal = ({ isOpen, onClose, onPaymentSuccess }) => {
  const { paymentCheckoutData, completePayment, currentUser, addNotification } = useEvent();

  const [paymentMethod, setPaymentMethod] = useState('card'); // 'card' | 'wallet' | 'crypto'

  // Card form state
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState(currentUser?.name || 'Alex Mercer');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [isCvvFocused, setIsCvvFocused] = useState(false);

  // Promo code state
  const [promoInput, setPromoInput] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [promoMessage, setPromoMessage] = useState(null);

  // Processing state
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState('');

  if (!isOpen || !paymentCheckoutData) return null;

  const { concert, tier, quantity, attendeeName, email, zoneName } = paymentCheckoutData;

  const subtotal = tier.price * quantity;
  const venueFee = Math.round(subtotal * 0.08);
  const discountAmount = Math.round((subtotal * appliedDiscount) / 100);
  const grandTotal = Math.max(0, subtotal + venueFee - discountAmount);

  // Quick fill demo card
  const handleFillDemoCard = () => {
    setCardNumber('4532 8921 4482 9104');
    setCardHolder(currentUser?.name || 'Alex Mercer');
    setExpiry('11/28');
    setCvv('842');
    addNotification('Demo Card Loaded', 'Loaded verified test card credentials.', 'info');
  };

  // Promo code handler
  const handleApplyPromo = (e) => {
    e.preventDefault();
    const code = promoInput.trim().toUpperCase();
    if (code === 'FESTIVAL2026' || code === 'VIP15') {
      setAppliedDiscount(15);
      setPromoMessage({ type: 'success', text: '15% Festival VIP Discount Applied!' });
      addNotification('Promo Applied', '15% discount has been applied to your pass.', 'success');
    } else if (code === 'CYBER20') {
      setAppliedDiscount(20);
      setPromoMessage({ type: 'success', text: '20% Cyber Stage Discount Applied!' });
      addNotification('Promo Applied', '20% discount applied!', 'success');
    } else {
      setAppliedDiscount(0);
      setPromoMessage({ type: 'error', text: 'Invalid promo code. Try "FESTIVAL2026"' });
    }
  };

  // Submit payment
  const handleAuthorizePayment = (e) => {
    if (e) e.preventDefault();

    setIsProcessing(true);
    setProcessingStep('Connecting to PulseStage 256-Bit Gateway...');

    setTimeout(() => {
      setProcessingStep('Tokenizing card with PCI-DSS Level 1 Vault...');
    }, 800);

    setTimeout(() => {
      setProcessingStep('Reserving stadium turnstile seat allocation...');
    }, 1500);

    setTimeout(() => {
      setIsProcessing(false);
      const booking = completePayment({
        paymentMethod:
          paymentMethod === 'card'
            ? 'Visa / Mastercard (•••• 9104)'
            : paymentMethod === 'wallet'
            ? 'Apple Pay / Touch ID'
            : 'Web3 USDC / Solana Smart Contract',
        discountAmount,
        promoCode: promoInput
      });
      if (onPaymentSuccess && booking) {
        onPaymentSuccess(booking);
      }
    }, 2200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-xl overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-4xl glass-panel-glow rounded-3xl border border-purple-500/40 my-6 shadow-2xl overflow-hidden"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-white/10 bg-slate-950/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-purple-600/30">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-black text-white">
                  PulseStage Secure Payment Gateway
                </h2>
                <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono uppercase bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/40">
                  <ShieldCheck className="w-3 h-3" /> PCI Level 1
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Encrypted transaction for <strong className="text-slate-200">{concert.title}</strong>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            disabled={isProcessing}
            className="p-2 rounded-xl bg-slate-900 border border-white/10 text-slate-400 hover:text-white disabled:opacity-50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Two Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Left 7 Cols: Payment Methods & Input Forms */}
          <div className="lg:col-span-7 p-5 sm:p-6 space-y-6 bg-slate-950/70 border-b lg:border-b-0 lg:border-r border-white/10">
            {/* Payment Method Selector Tabs */}
            <div className="grid grid-cols-3 gap-2 p-1 rounded-xl bg-slate-900 border border-white/10">
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold transition-all ${
                  paymentMethod === 'card'
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <CreditCard className="w-3.5 h-3.5" />
                <span>Card</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('wallet')}
                className={`flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold transition-all ${
                  paymentMethod === 'wallet'
                    ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Apple/Google Pay</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('crypto')}
                className={`flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold transition-all ${
                  paymentMethod === 'crypto'
                    ? 'bg-amber-600 text-white shadow-md shadow-amber-600/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Coins className="w-3.5 h-3.5" />
                <span>Web3 Wallet</span>
              </button>
            </div>

            {/* TAB 1: Credit / Debit Card */}
            {paymentMethod === 'card' && (
              <div className="space-y-5">
                {/* 3D Animated Card Preview */}
                <CardVisualizer
                  cardNumber={cardNumber}
                  cardHolder={cardHolder}
                  expiry={expiry}
                  cvv={cvv}
                  isFlipped={isCvvFocused}
                />

                <div className="flex items-center justify-between pt-1">
                  <span className="text-[11px] font-mono text-slate-400">Card Credentials:</span>
                  <button
                    type="button"
                    onClick={handleFillDemoCard}
                    className="text-xs font-mono font-bold text-purple-400 hover:text-purple-300 underline flex items-center gap-1"
                  >
                    ⚡ Auto-Fill Test Card
                  </button>
                </div>

                <form onSubmit={handleAuthorizePayment} className="space-y-3.5 text-xs">
                  {/* Card Number */}
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Card Number</label>
                    <div className="relative">
                      <input
                        type="text"
                        maxLength="19"
                        required
                        value={cardNumber}
                        onChange={(e) => {
                          const val = e.target.value
                            .replace(/\D/g, '')
                            .replace(/(\d{4})/g, '$1 ')
                            .trim();
                          setCardNumber(val);
                        }}
                        placeholder="4532 8921 4482 9104"
                        className="w-full pl-3.5 pr-10 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white font-mono text-sm focus:outline-none focus:border-purple-500"
                      />
                      <CreditCard className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    </div>
                  </div>

                  {/* Cardholder Name */}
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Cardholder Name</label>
                    <input
                      type="text"
                      required
                      value={cardHolder}
                      onChange={(e) => setCardHolder(e.target.value)}
                      placeholder="Alex Mercer"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  {/* Expiry & CVV */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Expiry (MM/YY)</label>
                      <input
                        type="text"
                        maxLength="5"
                        required
                        value={expiry}
                        onChange={(e) => {
                          let val = e.target.value.replace(/\D/g, '');
                          if (val.length >= 2) {
                            val = val.substring(0, 2) + '/' + val.substring(2, 4);
                          }
                          setExpiry(val);
                        }}
                        placeholder="12/28"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white font-mono focus:outline-none focus:border-purple-500"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">CVV / CVC</label>
                      <input
                        type="password"
                        maxLength="4"
                        required
                        value={cvv}
                        onFocus={() => setIsCvvFocused(true)}
                        onBlur={() => setIsCvvFocused(false)}
                        onChange={(e) => setCvv(e.target.value.replace(/\D/g, ''))}
                        placeholder="•••"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white font-mono focus:outline-none focus:border-purple-500"
                      />
                    </div>
                  </div>

                  {/* Submit Card Button */}
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white text-xs font-bold font-mono tracking-wider shadow-xl shadow-purple-600/30 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    <Lock className="w-4 h-4" />
                    AUTHORIZE & PAY ${grandTotal}
                  </button>
                </form>
              </div>
            )}

            {/* TAB 2: Apple Pay / Google Pay */}
            {paymentMethod === 'wallet' && (
              <div className="space-y-6 py-6 text-center">
                <div className="w-16 h-16 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mx-auto">
                  <Smartphone className="w-8 h-8" />
                </div>

                <div className="space-y-1">
                  <h3 className="text-base font-bold text-white">
                    One-Touch Instant Device Authorization
                  </h3>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto">
                    Authenticate via Face ID, Touch ID, or Google Wallet linked to your current device.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/90 border border-white/5 max-w-sm mx-auto text-xs space-y-2 font-mono text-slate-300">
                  <div className="flex justify-between">
                    <span>Device Token:</span>
                    <span className="text-cyan-400">APPLE-PAY-ENCLAVE-882</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Default Payment:</span>
                    <span className="text-white font-bold">Apple Card (•••• 4012)</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleAuthorizePayment()}
                  disabled={isProcessing}
                  className="w-full max-w-sm mx-auto py-3.5 rounded-2xl bg-white hover:bg-slate-100 text-slate-950 font-black text-sm tracking-wider shadow-xl flex items-center justify-center gap-2 active:scale-95 transition-all"
                >
                  <span>Pay with</span>
                  <span className="font-mono text-base font-black">Pay</span>
                  <span>(${grandTotal})</span>
                </button>
              </div>
            )}

            {/* TAB 3: Web3 / Crypto Wallet */}
            {paymentMethod === 'crypto' && (
              <div className="space-y-6 py-4 text-center">
                <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mx-auto">
                  <Coins className="w-8 h-8" />
                </div>

                <div className="space-y-1">
                  <h3 className="text-base font-bold text-white">
                    Mint On-Chain NFT Festival Ticket
                  </h3>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto">
                    Pay with USDC, Ethereum, or Solana for a soulbound dynamic QR pass with verified resale protection.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/90 border border-white/5 max-w-sm mx-auto text-xs space-y-2.5 font-mono text-slate-300 text-left">
                  <div className="flex justify-between">
                    <span>Connected Network:</span>
                    <span className="text-amber-400 font-bold">Ethereum Mainnet / Base L2</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pass Token Amount:</span>
                    <span className="text-white font-black">{grandTotal} USDC (≈ 0.076 ETH)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated Gas:</span>
                    <span className="text-emerald-400 font-bold">$0.42 (Base L2)</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleAuthorizePayment()}
                  disabled={isProcessing}
                  className="w-full max-w-sm mx-auto py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-xs tracking-wider shadow-xl flex items-center justify-center gap-2 active:scale-95 transition-all"
                >
                  <Coins className="w-4 h-4" />
                  CONNECT WALLET & MINT PASS (${grandTotal})
                </button>
              </div>
            )}
          </div>

          {/* Right 5 Cols: Order Summary & Promo Code */}
          <div className="lg:col-span-5 p-5 sm:p-6 bg-slate-900/90 flex flex-col justify-between space-y-6">
            <div className="space-y-5">
              <div className="border-b border-white/10 pb-3">
                <h3 className="text-xs font-mono uppercase font-bold tracking-wider text-slate-400">
                  Order Summary
                </h3>
              </div>

              {/* Concert & Tier Overview */}
              <div className="space-y-2 bg-slate-950/60 p-4 rounded-2xl border border-white/5 text-xs">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  {tier.name}
                </span>
                <h4 className="text-sm font-black text-white mt-1">{concert.title}</h4>
                <p className="text-[11px] text-slate-400 font-mono">
                  📍 {concert.venue}, {concert.city}
                </p>
                <div className="pt-2 border-t border-white/5 flex items-center justify-between text-slate-300 font-mono">
                  <span>Zone: {zoneName}</span>
                  <span className="text-white font-bold">{quantity}x Pass(es)</span>
                </div>
              </div>

              {/* Promo Code Input */}
              <form onSubmit={handleApplyPromo} className="space-y-2">
                <label className="block text-[11px] font-mono text-slate-400 uppercase font-semibold">
                  Promo / VIP Code
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    placeholder="e.g. FESTIVAL2026"
                    className="flex-1 px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-white font-mono text-xs uppercase focus:outline-none focus:border-purple-500"
                  />
                  <button
                    type="submit"
                    className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-purple-300 text-xs font-mono font-bold border border-white/10"
                  >
                    Apply
                  </button>
                </div>
                {promoMessage && (
                  <p
                    className={`text-[11px] font-mono ${
                      promoMessage.type === 'success' ? 'text-emerald-400' : 'text-red-400'
                    }`}
                  >
                    {promoMessage.text}
                  </p>
                )}
              </form>

              {/* Detailed Breakdown */}
              <div className="space-y-2 text-xs font-mono border-t border-white/10 pt-4">
                <div className="flex justify-between text-slate-400">
                  <span>Pass Subtotal ({quantity}x @ ${tier.price}):</span>
                  <span>${subtotal}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Venue Facility & RFID Fee (8%):</span>
                  <span>+${venueFee}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400 font-bold">
                    <span>VIP Promo Discount ({appliedDiscount}%):</span>
                    <span>-${discountAmount}</span>
                  </div>
                )}
                <div className="flex justify-between text-white font-black text-base pt-2 border-t border-white/10">
                  <span>Grand Total:</span>
                  <span className="text-emerald-400 font-mono text-lg">${grandTotal}</span>
                </div>
              </div>
            </div>

            {/* Security Guarantee */}
            <div className="p-3 rounded-xl bg-slate-950/40 border border-white/5 text-[11px] text-slate-400 space-y-1">
              <div className="flex items-center gap-1.5 text-slate-300 font-semibold">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>100% Buyer Protection Guarantee</span>
              </div>
              <p>Instant scannable QR ticket delivered to your digital wallet with turnstile verification.</p>
            </div>
          </div>
        </div>

        {/* Processing Overlay Screen */}
        <AnimatePresence>
          {isProcessing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center space-y-4"
            >
              <div className="relative flex items-center justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
                  className="w-16 h-16 rounded-full border-4 border-purple-500/20 border-t-purple-500"
                />
                <Sparkles className="w-6 h-6 text-cyan-400 absolute animate-pulse" />
              </div>

              <div className="space-y-1">
                <h3 className="text-base font-black text-white">Authorizing Transaction</h3>
                <p className="text-xs text-purple-300 font-mono animate-pulse">
                  {processingStep}
                </p>
              </div>

              <span className="text-[10px] font-mono text-slate-500">
                Please do not refresh or close this window...
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

