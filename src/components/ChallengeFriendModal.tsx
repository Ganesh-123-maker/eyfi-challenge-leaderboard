import React, { useState } from 'react';
import { 
  X, 
  Swords, 
  MessageCircle, 
  Share2, 
  Copy, 
  Check, 
  Sparkles, 
  Flame,
  ArrowRight
} from 'lucide-react';
import { UserRankProfile } from '../types';
import { formatINR } from '../utils/formatters';

interface ChallengeFriendModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile: UserRankProfile;
}

export const ChallengeFriendModal: React.FC<ChallengeFriendModalProps> = ({
  isOpen,
  onClose,
  userProfile,
}) => {
  const [friendName, setFriendName] = useState('');
  const [targetAmount, setTargetAmount] = useState(25000);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const challengeText = `🔥 Hey ${friendName ? friendName : 'there'}! I challenge you to the EYFI 30-Day Earning Challenge.\n\nI'm currently at Rank #${userProfile.rank} with ${formatINR(userProfile.income)} verified earned.\n\nLet's see who hits ${formatINR(targetAmount)} first! Accept my challenge here:\n${window.location.origin}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(challengeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsAppShare = () => {
    const encoded = encodeURIComponent(challengeText);
    window.open(`https://wa.me/?text=${encoded}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-3xl bg-[#111111] border border-neutral-800 p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="space-y-1 text-center">
          <div className="w-12 h-12 rounded-2xl bg-[#BEFF00]/10 border border-[#BEFF00]/30 flex items-center justify-center mx-auto text-[#BEFF00] mb-2">
            <Swords className="w-6 h-6" />
          </div>
          <h3 className="font-heading text-2xl sm:text-3xl font-black uppercase text-white">
            1v1 Hustle Challenge
          </h3>
          <p className="text-xs sm:text-sm text-neutral-400">
            Put skin in the game. Challenge a classmate or friend to race towards an earning goal.
          </p>
        </div>

        {/* Inputs */}
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-mono text-neutral-400 uppercase font-bold mb-1">
              Friend&apos;s Name / Nickname
            </label>
            <input
              type="text"
              placeholder="e.g. Rohan, Priya, Vikram"
              value={friendName}
              onChange={(e) => setFriendName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-[#161616] border border-neutral-800 text-sm text-white focus:outline-none focus:border-[#BEFF00] font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-neutral-400 uppercase font-bold mb-1">
              Race Target Goal
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[15000, 25000, 50000].map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => setTargetAmount(amt)}
                  className={`py-2 rounded-xl font-mono text-xs font-bold border transition-all ${
                    targetAmount === amt
                      ? 'bg-[#BEFF00] text-black border-[#BEFF00]'
                      : 'bg-[#161616] text-neutral-400 border-neutral-800 hover:text-white'
                  }`}
                >
                  {formatINR(amt)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Faceoff Preview Card */}
        <div className="p-4 rounded-2xl bg-[#141414] border border-[#BEFF00]/30 space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-[#BEFF00] font-bold">1-ON-1 DUEL</span>
            <span className="text-neutral-400">Target: {formatINR(targetAmount)}</span>
          </div>

          <div className="grid grid-cols-5 items-center gap-2 text-center">
            <div className="col-span-2 space-y-1">
              <div className="w-12 h-12 rounded-full border-2 border-[#BEFF00] mx-auto overflow-hidden">
                <img src={userProfile.avatar} alt="You" className="w-full h-full object-cover" />
              </div>
              <div className="font-bold text-xs text-white truncate">{userProfile.displayName} (You)</div>
              <div className="font-mono text-xs text-[#BEFF00]">{formatINR(userProfile.income)}</div>
            </div>

            <div className="font-heading font-black text-xl text-neutral-500">
              VS
            </div>

            <div className="col-span-2 space-y-1">
              <div className="w-12 h-12 rounded-full border-2 border-dashed border-neutral-700 bg-neutral-900 flex items-center justify-center mx-auto text-neutral-400 font-mono text-sm font-bold">
                ?
              </div>
              <div className="font-bold text-xs text-neutral-300 truncate">{friendName || 'Friend'}</div>
              <div className="font-mono text-xs text-neutral-500">₹0 (Waiting)</div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2 pt-1">
          <button
            onClick={handleWhatsAppShare}
            className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs sm:text-sm tracking-tight transition-all flex items-center justify-center gap-2 shadow-sm"
          >
            <MessageCircle className="w-4 h-4 fill-black" />
            <span>Send Challenge on WhatsApp</span>
          </button>

          <button
            onClick={handleCopy}
            className="w-full py-2.5 rounded-xl bg-[#161616] hover:bg-neutral-800 text-neutral-300 hover:text-white font-mono text-xs font-bold border border-neutral-800 transition-all flex items-center justify-center gap-2"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-[#BEFF00]" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied to Clipboard!' : 'Copy Challenge Invite'}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
