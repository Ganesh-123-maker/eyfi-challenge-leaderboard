import React from 'react';
import { 
  X, 
  Award, 
  Gift, 
  CheckCircle2, 
  Lock, 
  Sparkles, 
  Package, 
  Briefcase, 
  Crown,
  ArrowRight
} from 'lucide-react';
import { MilestoneReward, UserRankProfile } from '../types';
import { formatINR } from '../utils/formatters';

interface MilestoneRewardsDrawerProps {
  milestones: MilestoneReward[];
  userProfile?: UserRankProfile;
  userIncome?: number;
  isOpen: boolean;
  onClose: () => void;
  onClaimMilestone?: (id: string) => void;
  onClaimReward?: (id: string) => void;
  onOpenSubmitModal: () => void;
}

export const MilestoneRewardsDrawer: React.FC<MilestoneRewardsDrawerProps> = ({
  milestones,
  userProfile,
  userIncome: propIncome,
  isOpen,
  onClose,
  onClaimMilestone,
  onClaimReward,
  onOpenSubmitModal,
}) => {
  if (!isOpen) return null;

  const currentIncome = userProfile?.income ?? propIncome ?? 0;
  const currentStreak = userProfile?.streakDays ?? 4;
  const handleClaim = (id: string) => {
    if (onClaimReward) onClaimReward(id);
    else if (onClaimMilestone) onClaimMilestone(id);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl rounded-3xl bg-[#111111] border border-neutral-800 p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
        
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
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#BEFF00]/10 text-[#BEFF00] font-mono text-xs font-bold uppercase">
            <Gift className="w-3.5 h-3.5" />
            <span>Milestone Perks & Rewards</span>
          </div>
          <h3 className="font-heading text-2xl sm:text-3xl font-black uppercase text-white">
            Unlock Real Rewards as You Earn
          </h3>
          <p className="text-xs sm:text-sm text-neutral-400">
            Reach verified income thresholds to unlock physical merch, founder perks, VC pitch access, and angel grant pools.
          </p>
        </div>

        {/* Current Income Status */}
        <div className="p-4 rounded-2xl bg-[#161616] border border-neutral-800 flex items-center justify-between">
          <div>
            <div className="text-[11px] font-mono text-neutral-400 uppercase">Your Verified Total</div>
            <div className="font-mono text-2xl font-black text-[#BEFF00]">
              {formatINR(currentIncome)}
            </div>
          </div>
          <div className="text-right">
            <div className="text-[11px] font-mono text-neutral-400 uppercase">Streak</div>
            <div className="font-mono text-sm font-bold text-amber-400">
              🔥 {currentStreak}-Day Hustle
            </div>
          </div>
        </div>

        {/* Milestones List */}
        <div className="space-y-3">
          {milestones.map((m) => {
            const isUnlocked = currentIncome >= m.targetIncome || m.unlocked;
            const remaining = Math.max(m.targetIncome - currentIncome, 0);

            return (
              <div
                key={m.id}
                className={`p-4 rounded-2xl border transition-all ${
                  isUnlocked
                    ? 'bg-[#141414] border-[#BEFF00]/40'
                    : 'bg-[#0F0F0F] border-neutral-850 opacity-70'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-heading text-base font-bold text-white">
                        {m.title}
                      </span>
                      <span className="font-mono text-xs font-black text-[#BEFF00]">
                        ({formatINR(m.targetIncome)})
                      </span>
                    </div>

                    <p className="text-xs text-neutral-400">
                      {m.rewardDescription}
                    </p>
                  </div>

                  {/* Status Button */}
                  <div className="shrink-0">
                    {isUnlocked ? (
                      m.claimed ? (
                        <span className="px-3 py-1 rounded-lg bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Claimed</span>
                        </span>
                      ) : (
                        <button
                          onClick={() => handleClaim(m.id)}
                          className="px-3 py-1.5 rounded-lg bg-[#BEFF00] hover:bg-[#aee600] text-black font-mono text-xs font-extrabold shadow-sm transition-all"
                        >
                          Claim Perk
                        </button>
                      )
                    ) : (
                      <span className="px-2.5 py-1 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-500 font-mono text-[11px] flex items-center gap-1">
                        <Lock className="w-3 h-3" />
                        <span>{formatINR(remaining)} to unlock</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action */}
        <div className="pt-2">
          <button
            onClick={() => {
              onClose();
              onOpenSubmitModal();
            }}
            className="w-full py-3.5 rounded-xl bg-[#BEFF00] hover:bg-[#aee600] text-black font-extrabold text-sm tracking-tight transition-all text-center shadow-sm flex items-center justify-center gap-2"
          >
            <span>Log Earnings to Unlock Next Tier</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
