import React from 'react';
import { 
  X, 
  Clock, 
  Flame, 
  ArrowUp, 
  ArrowDown, 
  Zap, 
  Trophy, 
  ShieldCheck, 
  School,
  ArrowRight
} from 'lucide-react';
import { WhileAwayRecapData, UserRankProfile } from '../types';
import { formatINR } from '../utils/formatters';
import { MOCK_WHILE_AWAY_RECAP } from '../data/mockData';

interface WhileYouWereAwayModalProps {
  isOpen: boolean;
  onClose: () => void;
  recap?: WhileAwayRecapData;
  data?: WhileAwayRecapData;
  userProfile?: UserRankProfile;
  onOpenSubmitModal: () => void;
  onOpenWhatsAppModal?: () => void;
}

export const WhileYouWereAwayModal: React.FC<WhileYouWereAwayModalProps> = ({
  isOpen,
  onClose,
  recap: initialRecap,
  data,
  userProfile,
  onOpenSubmitModal,
}) => {
  if (!isOpen) return null;

  const recap = initialRecap || data || MOCK_WHILE_AWAY_RECAP;
  const rank = userProfile?.rank ?? 27;
  const gapToNextRank = userProfile?.gapToNextRank ?? 850;
  const nextRankNumber = userProfile?.nextRankNumber ?? 26;
  const nextRankParticipantName = userProfile?.nextRankParticipantName ?? 'Priya Sharma';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-3xl bg-[#111111] border-2 border-[#BEFF00]/40 p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#BEFF00] text-black font-mono text-xs font-black uppercase tracking-wider">
            <Clock className="w-3.5 h-3.5" />
            <span>While You Were Away</span>
          </div>
          <h3 className="font-heading text-2xl sm:text-3xl font-black uppercase text-white">
            Last {recap.hoursAway} Hours Catch-Up
          </h3>
          <p className="text-xs sm:text-sm text-neutral-400">
            The leaderboard moves in real-time. Here is what happened since your last login:
          </p>
        </div>

        {/* Recap Matrix */}
        <div className="grid grid-cols-2 gap-3">
          
          <div className="p-4 rounded-2xl bg-[#161616] border border-neutral-800 space-y-1">
            <div className="text-[11px] font-mono text-neutral-400 uppercase">Movement Alert</div>
            <div className="font-mono text-lg font-black text-amber-400 flex items-center gap-1">
              <ArrowDown className="w-4 h-4 text-amber-400" />
              <span>{recap.overtakenCount} Overtakes</span>
            </div>
            <div className="text-[10px] text-neutral-400">
              Priya & Divya logged new gigs
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#161616] border border-neutral-800 space-y-1">
            <div className="text-[11px] font-mono text-neutral-400 uppercase">Campus Movement</div>
            <div className="font-mono text-lg font-black text-emerald-400 flex items-center gap-1">
              <School className="w-4 h-4 text-emerald-400" />
              <span>{recap.collegeName} #{rank > 20 ? 3 : 2}</span>
            </div>
            <div className="text-[10px] text-neutral-400">
              IIT Delhi added ₹35k today
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#161616] border border-neutral-800 space-y-1">
            <div className="text-[11px] font-mono text-neutral-400 uppercase">New Live Gigs</div>
            <div className="font-mono text-lg font-black text-[#BEFF00] flex items-center gap-1">
              <Zap className="w-4 h-4 fill-[#BEFF00]" />
              <span>{recap.newBountiesCount} Bounties Added</span>
            </div>
            <div className="text-[10px] text-neutral-400">
              Up to ₹8,500 available to claim
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#161616] border border-neutral-800 space-y-1">
            <div className="text-[11px] font-mono text-neutral-400 uppercase">Next Target Gap</div>
            <div className="font-mono text-lg font-black text-white">
              {formatINR(gapToNextRank)}
            </div>
            <div className="text-[10px] text-[#BEFF00] font-mono">
              Close #{nextRankNumber} ({nextRankParticipantName})
            </div>
          </div>

        </div>

        {/* Action Button */}
        <div className="pt-2">
          <button
            onClick={() => {
              onClose();
              onOpenSubmitModal();
            }}
            className="w-full py-3.5 rounded-xl bg-[#BEFF00] hover:bg-[#aee600] text-black font-extrabold text-sm tracking-tight transition-all text-center shadow-sm flex items-center justify-center gap-2"
          >
            <span>Log Proof & Take Back Your Spot</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
