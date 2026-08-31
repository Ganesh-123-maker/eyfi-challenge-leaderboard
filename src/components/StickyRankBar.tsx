import React from 'react';
import { ArrowUp, Target, PlusCircle, Share2, Eye } from 'lucide-react';
import { UserRankProfile } from '../types';
import { formatINR } from '../utils/formatters';

interface StickyRankBarProps {
  userProfile: UserRankProfile;
  visible: boolean;
  onOpenShareModal: () => void;
  onOpenSubmitModal: () => void;
  onScrollToRank: () => void;
}

export const StickyRankBar: React.FC<StickyRankBarProps> = ({
  userProfile,
  visible,
  onOpenShareModal,
  onOpenSubmitModal,
  onScrollToRank,
}) => {
  if (!visible) return null;

  return (
    <div
      id="sticky-rank-bar"
      className="fixed bottom-0 left-0 right-0 z-30 bg-[#0A0A0A]/95 border-t-2 border-[#BEFF00]/40 p-3 backdrop-blur-lg shadow-2xl transition-all duration-300 animate-in slide-in-from-bottom-4"
    >
      <div className="max-w-7xl mx-auto px-2 sm:px-6 flex items-center justify-between gap-3">
        
        {/* Left info */}
        <div 
          onClick={onScrollToRank}
          className="flex items-center gap-2.5 sm:gap-4 cursor-pointer group"
          role="button"
          tabIndex={0}
        >
          <div className="w-10 h-10 rounded-xl bg-[#161616] border border-[#BEFF00] p-0.5 shrink-0">
            <img
              src={userProfile.avatar}
              alt={userProfile.name}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-heading text-xl sm:text-2xl font-black text-[#BEFF00] leading-none">
                #{userProfile.rank} YOU
              </span>
              <span className="text-[10px] sm:text-xs font-mono font-bold text-emerald-400 flex items-center">
                <ArrowUp className="w-3 h-3" /> ↑ {userProfile.rankChange}
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="font-mono font-bold text-white">
                {userProfile.hideEarnings ? '₹ •••••' : formatINR(userProfile.income)}
              </span>
              <span className="text-neutral-500 hidden sm:inline">·</span>
              <span className="text-[#BEFF00] font-mono text-[11px] truncate max-w-[140px] sm:max-w-none">
                {formatINR(userProfile.gapToNextRank)} → #{userProfile.nextRankNumber}
              </span>
            </div>
          </div>
        </div>

        {/* Right action buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenSubmitModal}
            className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-[#BEFF00] hover:bg-[#a6e000] active:scale-95 text-black font-extrabold text-xs sm:text-sm tracking-tight transition-all shadow-sm"
          >
            <PlusCircle className="w-3.5 h-3.5 fill-black text-[#BEFF00]" />
            <span className="hidden sm:inline">Submit Proof</span>
            <span className="sm:hidden">Submit ₹</span>
          </button>

          <button
            onClick={onOpenShareModal}
            className="flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-[#161616] hover:bg-neutral-800 text-white font-bold text-xs sm:text-sm border border-neutral-800 transition-all hover:border-[#BEFF00]/40"
          >
            <Share2 className="w-3.5 h-3.5 text-[#BEFF00]" />
            <span className="hidden sm:inline">Share</span>
          </button>
        </div>

      </div>
    </div>
  );
};
