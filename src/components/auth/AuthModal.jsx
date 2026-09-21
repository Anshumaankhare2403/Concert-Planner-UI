import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  X,
  Lock,
  Mail,
  User,
  Shield,
  Sparkles,
  CheckCircle2,
  KeyRound,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { useEvent } from '../../context/EventContext';

export const AuthModal = ({ isOpen, onClose }) => {
  const { loginUser, loginAsDemo } = useEvent();
  const [authMode, setAuthMode] = useState('signin'); // 'signin' | 'signup'

  // Form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('fan'); // 'fan' | 'admin'
  const [rememberMe, setRememberMe] = useState(true);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser({
      name: name.trim() || (role === 'admin' ? 'Stage Production Lead' : 'Festival Fan'),
      email: email.trim() || 'user@pulsestage.io',
      role
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-md glass-panel-glow rounded-3xl border border-purple-500/40 my-8 shadow-2xl p-6 sm:p-8 overflow-hidden"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-xl bg-slate-900 border border-white/10 text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-purple-400 text-xs font-mono font-bold uppercase tracking-wider">
            <Lock className="w-4 h-4" /> PulseStage Identity Pass
          </div>
          <h2 className="text-2xl font-black text-white mt-1">
            {authMode === 'signin' ? 'Sign in to PulseStage' : 'Create Festival Account'}
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Access concert tickets, stage production controls, and festival itineraries.
          </p>
        </div>

        {/* 1-Click Demo Profiles Box */}
        <div className="mb-6 p-3.5 rounded-2xl bg-gradient-to-r from-purple-950/40 via-slate-900 to-cyan-950/40 border border-purple-500/30 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase font-bold text-slate-400 tracking-wider">
              ⚡ Quick 1-Click Demo Login
            </span>
            <span className="text-[10px] font-mono text-purple-300">Instant Access</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => {
                loginAsDemo('admin');
                onClose();
              }}
              className="p-2.5 rounded-xl bg-purple-600/30 hover:bg-purple-600/50 border border-purple-500/50 text-left transition-all group"
            >
              <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                <Shield className="w-3.5 h-3.5 text-purple-400" />
                <span>Admin Console</span>
              </div>
              <span className="text-[10px] text-purple-300 font-mono block mt-0.5">
                Marcus Vance (FOH)
              </span>
            </button>

            <button
              type="button"
              onClick={() => {
                loginAsDemo('fan');
                onClose();
              }}
              className="p-2.5 rounded-xl bg-cyan-600/30 hover:bg-cyan-600/50 border border-cyan-500/50 text-left transition-all group"
            >
              <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>Festival Fan</span>
              </div>
              <span className="text-[10px] text-cyan-300 font-mono block mt-0.5">
                Alex Mercer (VIP)
              </span>
            </button>
          </div>
        </div>

        {/* Tab switch: Sign In vs Sign Up */}
        <div className="grid grid-cols-2 gap-1 p-1 rounded-xl bg-slate-900 border border-white/10 mb-5">
          <button
            type="button"
            onClick={() => setAuthMode('signin')}
            className={`py-2 text-xs font-semibold rounded-lg transition-all ${
              authMode === 'signin'
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setAuthMode('signup')}
            className={`py-2 text-xs font-semibold rounded-lg transition-all ${
              authMode === 'signup'
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            New Account
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {authMode === 'signup' && (
            <div>
              <label className="block text-slate-300 font-semibold mb-1 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-purple-400" /> Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Elena Rostova"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
              />
            </div>
          )}

          <div>
            <label className="block text-slate-300 font-semibold mb-1 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-cyan-400" /> Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@futurebeats.io"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-slate-300 font-semibold flex items-center gap-1.5">
                <KeyRound className="w-3.5 h-3.5 text-purple-400" /> Password
              </label>
              {authMode === 'signin' && (
                <button
                  type="button"
                  onClick={() => alert('Password reset instructions sent to your email!')}
                  className="text-[11px] text-purple-400 hover:text-purple-300"
                >
                  Forgot?
                </button>
              )}
            </div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
            />
          </div>

          {/* Role selection on sign up */}
          {authMode === 'signup' && (
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Account Role</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setRole('fan')}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    role === 'fan'
                      ? 'border-cyan-400 bg-cyan-600/20 text-white font-bold'
                      : 'border-white/5 bg-slate-900 text-slate-400'
                  }`}
                >
                  Festival Fan
                </button>
                <button
                  type="button"
                  onClick={() => setRole('admin')}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    role === 'admin'
                      ? 'border-purple-400 bg-purple-600/20 text-white font-bold'
                      : 'border-white/5 bg-slate-900 text-slate-400'
                  }`}
                >
                  Stage Admin
                </button>
              </div>
            </div>
          )}

          {/* Remember me */}
          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="accent-purple-500 rounded"
              />
              <span>Remember session</span>
            </label>
            <span className="flex items-center gap-1 text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" /> 2FA Ready
            </span>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white text-xs font-bold font-mono tracking-wider shadow-xl shadow-purple-600/30 active:scale-95 transition-all"
          >
            {authMode === 'signin' ? 'LOG IN & ENTER PORTAL' : 'CREATE ACCOUNT & ENTER'}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

