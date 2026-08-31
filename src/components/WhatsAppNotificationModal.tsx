import React, { useState } from 'react';
import { X, MessageCircle, Bell, Check, Zap, Flame, Shield, ArrowRight } from 'lucide-react';
import { UserRankProfile } from '../types';

interface WhatsAppNotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile: UserRankProfile;
  onUpdatePreferences: (optIn: boolean, phone: string, frequency: 'instant' | 'daily' | 'weekly') => void;
}

export const WhatsAppNotificationModal: React.FC<WhatsAppNotificationModalProps> = ({
  isOpen,
  onClose,
  userProfile,
  onUpdatePreferences,
}) => {
  const [optIn, setOptIn] = useState(userProfile.notificationOptIn);
  const [phone, setPhone] = useState(userProfile.notificationPhone || '+91 98765 43210');
  const [frequency, setFrequency] = useState<'instant' | 'daily' | 'weekly'>(
    userProfile.notificationFrequency || 'instant'
  );
  const [saved, setSaved] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdatePreferences(optIn, phone, frequency);
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-3xl bg-[#111111] border border-neutral-800 p-6 sm:p-8 shadow-2xl space-y-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold">
            <MessageCircle className="w-3.5 h-3.5" />
            WHATSAPP RANK RADAR
          </div>
          <h3 className="text-2xl sm:text-3xl font-heading font-black uppercase text-white tracking-wide">
            Never Miss When You&apos;re Overtaken
          </h3>
          <p className="text-xs sm:text-sm text-neutral-400">
            Get instant alerts directly in WhatsApp so you can hustle and claim your spot back.
          </p>
        </div>

        {/* Preview of Real WhatsApp Alert */}
        <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 space-y-2">
          <div className="flex items-center justify-between text-[11px] font-mono text-emerald-400">
            <span className="flex items-center gap-1 font-bold">
              <MessageCircle className="w-3.5 h-3.5" /> EYFI Bot on WhatsApp
            </span>
            <span>Just now</span>
          </div>

          <div className="p-3 rounded-xl bg-[#161616] border border-neutral-800 text-xs text-neutral-200 font-mono space-y-1">
            <div className="text-amber-300 font-bold">👀 Someone just overtook you!</div>
            <div>Rahul Kumar moved ahead with ₹13,300.</div>
            <div className="text-[#BEFF00] font-bold">You are now #28.</div>
            <div className="text-neutral-400 pt-1">
              👉 Earn ₹450 to take your spot back: <span className="text-[#BEFF00] underline">eyfi.in/climb</span>
            </div>
          </div>
        </div>

        {/* Preference Form */}
        <form onSubmit={handleSave} className="space-y-4">
          
          {/* Phone Input */}
          <div className="space-y-1.5">
            <label className="block text-xs font-mono uppercase font-bold text-neutral-300">
              WhatsApp Number
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91 98765 43210"
              className="w-full px-4 py-2.5 bg-[#161616] border border-neutral-800 rounded-xl text-sm text-white font-mono placeholder-neutral-500 focus:outline-none focus:border-[#BEFF00]"
              required
            />
          </div>

          {/* Trigger Frequency */}
          <div className="space-y-2">
            <label className="block text-xs font-mono uppercase font-bold text-neutral-300">
              Alert Trigger Preference
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setFrequency('instant')}
                className={`p-2.5 rounded-xl border text-left text-xs font-mono transition-all ${
                  frequency === 'instant'
                    ? 'bg-[#BEFF00]/10 border-[#BEFF00] text-white font-bold'
                    : 'bg-[#161616] border-neutral-800 text-neutral-400'
                }`}
              >
                <div className="text-white font-bold">Instant</div>
                <div className="text-[10px] text-neutral-500">When overtaken</div>
              </button>

              <button
                type="button"
                onClick={() => setFrequency('daily')}
                className={`p-2.5 rounded-xl border text-left text-xs font-mono transition-all ${
                  frequency === 'daily'
                    ? 'bg-[#BEFF00]/10 border-[#BEFF00] text-white font-bold'
                    : 'bg-[#161616] border-neutral-800 text-neutral-400'
                }`}
              >
                <div className="text-white font-bold">Daily 9 PM</div>
                <div className="text-[10px] text-neutral-500">Standings digest</div>
              </button>

              <button
                type="button"
                onClick={() => setFrequency('weekly')}
                className={`p-2.5 rounded-xl border text-left text-xs font-mono transition-all ${
                  frequency === 'weekly'
                    ? 'bg-[#BEFF00]/10 border-[#BEFF00] text-white font-bold'
                    : 'bg-[#161616] border-neutral-800 text-neutral-400'
                }`}
              >
                <div className="text-white font-bold">Weekly</div>
                <div className="text-[10px] text-neutral-500">Sunday wrap</div>
              </button>
            </div>
          </div>

          {/* Master Opt-in Checkbox */}
          <label className="flex items-center gap-2.5 cursor-pointer pt-1">
            <input
              type="checkbox"
              checked={optIn}
              onChange={(e) => setOptIn(e.target.checked)}
              className="w-4 h-4 rounded border-neutral-800 text-[#BEFF00] focus:ring-[#BEFF00] bg-[#161616] accent-[#BEFF00]"
            />
            <span className="text-xs text-neutral-300">
              Send me live challenge notifications and rank alerts on WhatsApp
            </span>
          </label>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-[#BEFF00] hover:bg-[#a6e000] text-black font-extrabold text-sm tracking-tight transition-all flex items-center justify-center gap-2"
          >
            {saved ? (
              <>
                <Check className="w-4 h-4" />
                <span>Preferences Saved!</span>
              </>
            ) : (
              <>
                <Bell className="w-4 h-4" />
                <span>Save Alert Preferences</span>
              </>
            )}
          </button>

        </form>

      </div>
    </div>
  );
};
