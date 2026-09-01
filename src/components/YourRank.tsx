import React from 'react';
import { 
  ArrowUp, 
  ArrowRight, 
  Share2, 
  PlusCircle, 
  Flame, 
  ShieldCheck, 
  MessageCircle, 
  Eye, 
  TrendingUp, 
  Target,
  Sparkles,
  Zap,
  Gift,
  Swords,
  Clock
} from 'lucide-react';
import { UserRankProfile } from '../types';
import { formatINR } from '../utils/formatters';

interface YourRankProps {
  userProfile: UserRankProfile;
  onOpenShareModal: () => void;
  onOpenSubmitModal: () => void;
  onOpenWhatsAppModal: () => void;
  onOpenPrivacyModal: () => void;
  onOpenMilestoneRewards?: () => void;
  onOpenChallengeFriend?: () => void;
  onOpenWhileAway?: () => void;
  onViewLeaderboardRow?: () => void;
  onViewRivalCaseStudy?: (participantId: string) => void;
}

export const YourRank: React.FC<YourRankProps> = ({
  userProfile,
  onOpenShareModal,
  onOpenSubmitModal,
  onOpenWhatsAppModal,
  onOpenPrivacyModal,
  onOpenMilestoneRewards,
  onOpenChallengeFriend,
  onOpenWhileAway,
  onViewLeaderboardRow,
  onViewRivalCaseStudy,
}) => {

  const nextTargetIncome = userProfile.income + userProfile.gapToNextRank;
  const progressRatio = Math.min(Math.max((userProfile.income / nextTargetIncome) * 100, 15), 90);

  return (
    <div id="your-rank-card" className="relative my-4 sm:my-6 rounded-2xl sm:rounded-3xl bg-[#111111] border-2 border-[#BEFF00]/40 p-5 sm:p-7 md:p-8 shadow-[0_0_40px_rgba(190,255,0,0.12)] overflow-hidden">
      
      
      <div className="rupee-watermark text-8xl sm:text-9xl -bottom-6 -right-6 select-none opacity-20">₹</div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#BEFF00]/10 rounded-full blur-3xl pointer-events-none"></div>

      
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5 sm:mb-6">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-md bg-[#BEFF00] text-black font-extrabold text-xs tracking-wider uppercase font-mono shadow-sm">
            YOUR STANDING
          </span>
          <span className="px-2.5 py-0.5 rounded-md bg-amber-500/15 border border-amber-500/30 text-amber-300 font-mono text-xs font-bold flex items-center gap-1">
            <Flame className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{userProfile.streakDays}-Day Earning Streak</span>
          </span>
        </div>

        
        <div className="flex items-center gap-2">
          {onOpenWhileAway && (
            <button
              onClick={onOpenWhileAway}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#161616] hover:bg-neutral-800 border border-neutral-800 text-[11px] font-mono text-amber-400 hover:text-amber-300 transition-colors"
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Catch-Up (14h away)</span>
            </button>
          )}

          <button
            onClick={onOpenPrivacyModal}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#161616] hover:bg-neutral-800 border border-neutral-800 text-[11px] font-mono text-neutral-400 hover:text-neutral-200 transition-colors"
            title="Change public display name or hide earnings"
            id="btn-privacy-settings"
          >
            <Eye className="w-3.5 h-3.5 text-neutral-400" />
            <span>Showing as: <strong className="text-white">{userProfile.displayName}</strong></span>
          </button>
        </div>
      </div>

      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        
        
        <div className="lg:col-span-6 flex items-center gap-4 sm:gap-6">
          
          <div className="relative shrink-0">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-neutral-900 border-2 border-[#BEFF00] p-0.5 overflow-hidden shadow-md">
              <img
                src={userProfile.avatar}
                alt={userProfile.name}
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
            <div className="absolute -bottom-2 -right-1 px-1.5 py-0.5 bg-[#BEFF00] text-black font-mono text-[10px] font-extrabold rounded-md shadow">
              YOU
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-baseline gap-3">
              <span className="font-heading text-4xl sm:text-5xl md:text-6xl font-black text-[#BEFF00] leading-none">
                #{userProfile.rank}
              </span>
              <span className="text-xs sm:text-sm font-mono font-bold text-emerald-400 flex items-center gap-1 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/30">
                <ArrowUp className="w-3.5 h-3.5" /> ↑ {userProfile.rankChange} today
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-mono text-xl sm:text-2xl md:text-3xl font-extrabold text-white">
                {userProfile.hideEarnings ? '₹ •••••' : formatINR(userProfile.income)}
              </span>
              <span className="text-xs sm:text-sm text-neutral-400 font-medium">earned</span>
              <span className="inline-flex items-center text-[11px] font-semibold text-[#BEFF00] bg-[#BEFF00]/10 px-2 py-0.5 rounded border border-[#BEFF00]/20 font-mono">
                <ShieldCheck className="w-3 h-3 mr-1" /> Verified
              </span>
            </div>

            <div className="text-xs text-neutral-400">
              {userProfile.name} · {userProfile.college}
            </div>
          </div>
        </div>

        
        <div className="lg:col-span-6 p-4 sm:p-5 rounded-2xl bg-[#161616] border border-neutral-800 space-y-3">
          
          <div className="flex items-center justify-between text-xs sm:text-sm">
            <div className="flex items-center gap-1.5 font-bold text-white">
              <Target className="w-4 h-4 text-[#BEFF00]" />
              <span>Personal Rival Target:</span>
              <span className="text-[#BEFF00] font-mono">
                {formatINR(userProfile.gapToNextRank)} gap
              </span>
            </div>

            <span className="text-[11px] font-mono text-neutral-400">
              #{userProfile.nextRankNumber} Standing
            </span>
          </div>

          
          <div className="p-2.5 rounded-xl bg-neutral-900/80 border border-neutral-800 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <img
                src={userProfile.nextRankParticipantAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
                alt={userProfile.nextRankParticipantName}
                className="w-9 h-9 rounded-full object-cover border border-amber-400/60 shrink-0"
              />
              <div className="truncate">
                <div className="font-bold text-xs text-white truncate">
                  #{userProfile.nextRankNumber} {userProfile.nextRankParticipantName}
                </div>
                <div className="text-[10px] font-mono text-neutral-400">
                  {userProfile.nextRankParticipantCollege || 'SRM University'} · {formatINR(nextTargetIncome)}
                </div>
              </div>
            </div>

            <button
              onClick={() => onViewRivalCaseStudy?.('p-1')}
              className="px-2.5 py-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-[#BEFF00] font-mono text-[10px] font-bold border border-neutral-700 shrink-0"
            >
              Inspect Playbook
            </button>
          </div>

          
          <div className="space-y-1.5">
            <div className="relative h-3.5 bg-neutral-950 rounded-full overflow-hidden border border-neutral-800 p-0.5">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 via-[#BEFF00] to-[#BEFF00] rounded-full transition-all duration-500 relative"
                style={{ width: `${progressRatio}%` }}
              >
                <div className="absolute right-0 top-0 bottom-0 w-2 bg-white rounded-full shadow-[0_0_8px_#ffffff]"></div>
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400">
              <span className="text-white font-semibold flex items-center gap-1">
                #{userProfile.rank} YOU ({formatINR(userProfile.income)})
              </span>
              <span className="text-[#BEFF00] font-semibold flex items-center gap-1">
                #{userProfile.nextRankNumber} ({formatINR(nextTargetIncome)})
              </span>
            </div>
          </div>

          
          <div className="flex items-center justify-between pt-1 text-xs">
            <p className="text-neutral-300 italic font-medium flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-[#BEFF00]" />
              &ldquo;One ₹1,000 gig flips this rank.&rdquo;
            </p>
            <span className="text-[11px] text-amber-300 font-mono flex items-center gap-1">
              {formatINR(userProfile.gapToTop10)} to Top 10
            </span>
          </div>
        </div>

      </div>

      
      <div className="mt-6 pt-5 border-t border-neutral-850 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={onOpenSubmitModal}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#BEFF00] hover:bg-[#aee600] active:scale-95 text-black font-extrabold text-xs sm:text-sm tracking-tight transition-all shadow-md"
            id="btn-submit-earning-your-rank"
          >
            <PlusCircle className="w-4 h-4 fill-black text-[#BEFF00]" />
            <span>Submit ₹ Proof to Climb</span>
          </button>

          {onOpenChallengeFriend && (
            <button
              onClick={onOpenChallengeFriend}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#161616] hover:bg-neutral-800 text-white font-bold text-xs sm:text-sm tracking-tight border border-neutral-800 transition-all hover:border-[#BEFF00]/40"
            >
              <Swords className="w-4 h-4 text-[#BEFF00]" />
              <span>1v1 Duel a Friend</span>
            </button>
          )}

          {onOpenMilestoneRewards && (
            <button
              onClick={onOpenMilestoneRewards}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#161616] hover:bg-neutral-800 text-amber-300 font-bold text-xs sm:text-sm tracking-tight border border-neutral-800 transition-all"
            >
              <Gift className="w-4 h-4 text-amber-400" />
              <span>Milestone Perks</span>
            </button>
          )}

          <button
            onClick={onOpenShareModal}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#161616] hover:bg-neutral-800 active:scale-95 text-neutral-300 hover:text-white font-bold text-xs sm:text-sm tracking-tight border border-neutral-800 transition-all"
            id="btn-share-my-rank"
          >
            <Share2 className="w-4 h-4 text-[#BEFF00]" />
            <span className="hidden sm:inline">Share Rank</span>
          </button>

          <button
            onClick={onOpenWhatsAppModal}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#161616] hover:bg-neutral-800 text-neutral-300 hover:text-white font-semibold text-xs sm:text-sm border border-neutral-800 transition-all"
            id="btn-whatsapp-alert-pref"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span className="hidden sm:inline">WhatsApp Alerts</span>
          </button>
        </div>

        
        {onViewLeaderboardRow && (
          <button
            onClick={onViewLeaderboardRow}
            className="text-xs font-mono text-neutral-400 hover:text-[#BEFF00] flex items-center gap-1 transition-colors"
          >
            <span>Jump to row in table</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

    </div>
  );
};

