import React, { useState } from 'react';
import { X, Eye, EyeOff, Shield, User, Lock, Check } from 'lucide-react';
import { UserRankProfile } from '../types';

interface PrivacySettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile: UserRankProfile;
  onUpdatePrivacy: (privacySetting: 'full' | 'short' | 'anonymous', hideEarnings: boolean) => void;
}

export const PrivacySettingsModal: React.FC<PrivacySettingsModalProps> = ({
  isOpen,
  onClose,
  userProfile,
  onUpdatePrivacy,
}) => {
  const [privacySetting, setPrivacySetting] = useState<'full' | 'short' | 'anonymous'>(
    userProfile.privacySetting
  );
  const [hideEarnings, setHideEarnings] = useState(userProfile.hideEarnings);
  const [saved, setSaved] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdatePrivacy(privacySetting, hideEarnings);
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 1000);
  };

  const getPreviewName = () => {
    if (privacySetting === 'full') return 'Aarav Sharma';
    if (privacySetting === 'short') return 'Aarav S.';
    return 'A. S. (Anonymous)';
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
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#161616] border border-neutral-800 text-neutral-300 text-xs font-mono font-bold">
            <Lock className="w-3.5 h-3.5 text-[#BEFF00]" />
            LEADERBOARD PRIVACY CONTROLS
          </div>
          <h3 className="text-2xl sm:text-3xl font-heading font-black uppercase text-white tracking-wide">
            Control Your Public Visibility
          </h3>
          <p className="text-xs sm:text-sm text-neutral-400">
            Because this is a public verified income leaderboard, you choose how your name and numbers appear to recruiters and peers.
          </p>
        </div>

        {/* Name format options */}
        <div className="space-y-3">
          <label className="block text-xs font-mono uppercase font-bold text-neutral-300">
            Name Display Mode
          </label>

          <div className="space-y-2">
            {/* Full Name */}
            <div
              onClick={() => setPrivacySetting('full')}
              className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                privacySetting === 'full'
                  ? 'bg-[#BEFF00]/10 border-[#BEFF00] text-white'
                  : 'bg-[#161616] border-neutral-800 text-neutral-300 hover:border-neutral-700'
              }`}
            >
              <div>
                <div className="font-bold text-sm text-white">Full Name</div>
                <div className="text-xs text-neutral-400">Aarav Sharma (Best for portfolio and hiring exposure)</div>
              </div>
              <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                privacySetting === 'full' ? 'border-[#BEFF00] bg-[#BEFF00]' : 'border-neutral-600'
              }`}>
                {privacySetting === 'full' && <div className="w-2 h-2 rounded-full bg-black"></div>}
              </div>
            </div>

            {/* Display Name / Short */}
            <div
              onClick={() => setPrivacySetting('short')}
              className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                privacySetting === 'short'
                  ? 'bg-[#BEFF00]/10 border-[#BEFF00] text-white'
                  : 'bg-[#161616] border-neutral-800 text-neutral-300 hover:border-neutral-700'
              }`}
            >
              <div>
                <div className="font-bold text-sm text-white">Abbreviated (Default)</div>
                <div className="text-xs text-neutral-400">Aarav S. · IIT Delhi</div>
              </div>
              <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                privacySetting === 'short' ? 'border-[#BEFF00] bg-[#BEFF00]' : 'border-neutral-600'
              }`}>
                {privacySetting === 'short' && <div className="w-2 h-2 rounded-full bg-black"></div>}
              </div>
            </div>

            {/* Anonymous */}
            <div
              onClick={() => setPrivacySetting('anonymous')}
              className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                privacySetting === 'anonymous'
                  ? 'bg-[#BEFF00]/10 border-[#BEFF00] text-white'
                  : 'bg-[#161616] border-neutral-800 text-neutral-300 hover:border-neutral-700'
              }`}
            >
              <div>
                <div className="font-bold text-sm text-white">Initials Only</div>
                <div className="text-xs text-neutral-400">A. S. · Private student identity</div>
              </div>
              <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                privacySetting === 'anonymous' ? 'border-[#BEFF00] bg-[#BEFF00]' : 'border-neutral-600'
              }`}>
                {privacySetting === 'anonymous' && <div className="w-2 h-2 rounded-full bg-black"></div>}
              </div>
            </div>
          </div>
        </div>

        {/* Hide Earnings Toggle */}
        <div className="p-4 rounded-2xl bg-[#0A0A0A] border border-neutral-850 flex items-center justify-between">
          <div className="space-y-0.5 pr-4">
            <div className="font-bold text-sm text-white flex items-center gap-1.5">
              <EyeOff className="w-4 h-4 text-neutral-400" />
              <span>Mask exact public earnings</span>
            </div>
            <div className="text-xs text-neutral-400">
              Shows &ldquo;₹ •••••&rdquo; on the public row while still calculating your true rank.
            </div>
          </div>

          <label className="relative inline-flex items-center cursor-pointer shrink-0">
            <input
              type="checkbox"
              checked={hideEarnings}
              onChange={(e) => setHideEarnings(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-neutral-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#BEFF00]"></div>
          </label>
        </div>

        {/* Live Preview Bar */}
        <div className="p-3 rounded-2xl bg-[#161616] border border-neutral-800 text-xs font-mono text-neutral-300 flex items-center justify-between">
          <span>Public Leaderboard Preview:</span>
          <span className="text-[#BEFF00] font-bold">
            #{userProfile.rank} {getPreviewName()} · {hideEarnings ? '₹ •••••' : '₹12,450'}
          </span>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="w-full py-3.5 rounded-xl bg-[#BEFF00] hover:bg-[#a6e000] text-black font-extrabold text-sm tracking-tight transition-all flex items-center justify-center gap-2"
        >
          {saved ? (
            <>
              <Check className="w-4 h-4" />
              <span>Privacy Settings Updated!</span>
            </>
          ) : (
            <span>Save & Apply Visibility</span>
          )}
        </button>

      </div>
    </div>
  );
};
