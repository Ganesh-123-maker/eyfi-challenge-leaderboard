import React from 'react';
import { ArrowUp, ArrowDown, Minus, ChevronRight, ShieldCheck } from 'lucide-react';
import { Participant, Team, LeaderboardType } from '../types';
import { formatINR, formatRank } from '../utils/formatters';
import { VerificationBadge } from './VerificationBadge';

interface LeaderboardMobileCardProps {
  item: Participant | Team;
  mode: LeaderboardType;
  onSelect: () => void;
  onOpenVerificationModal: () => void;
}

export const LeaderboardMobileCard: React.FC<LeaderboardMobileCardProps> = ({
  item,
  mode,
  onSelect,
  onOpenVerificationModal,
}) => {
  const isIndividual = mode === 'individual';
  const participant = isIndividual ? (item as Participant) : null;
  const team = !isIndividual ? (item as Team) : null;

  const isCurrentUser = isIndividual ? participant?.isCurrentUser : team?.isCurrentUserTeam;
  const income = isIndividual ? participant!.income : team!.combinedIncome;
  const name = isIndividual ? participant!.name : team!.teamName;
  const college = isIndividual ? participant!.college : `${team!.members.length} Members`;
  const rank = item.rank;
  const rankChange = item.rankChange;
  const badge = item.badge;
  const verificationStatus = item.verificationStatus;

  return (
    <div
      onClick={onSelect}
      id={`mobile-card-${item.id}`}
      className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer space-y-3 ${
        isCurrentUser
          ? 'bg-[#BEFF00]/10 border-2 border-[#BEFF00] shadow-[0_0_20px_rgba(190,255,0,0.15)]'
          : 'bg-[#111111] border-neutral-800 hover:border-neutral-700'
      }`}
    >
      
      <div className="flex items-center justify-between gap-3">
        
        <div className="flex items-center gap-3">
          
          <div className="flex items-center gap-1">
            <span
              className={`font-heading text-2xl font-black ${
                rank === 1
                  ? 'text-[#BEFF00]'
                  : rank <= 3
                  ? 'text-amber-400'
                  : isCurrentUser
                  ? 'text-[#BEFF00]'
                  : 'text-white'
              }`}
            >
              {formatRank(rank)}
            </span>
          </div>

          
          {isIndividual ? (
            <img
              src={participant!.avatar}
              alt={name}
              className={`w-10 h-10 rounded-full object-cover border ${
                isCurrentUser ? 'border-[#BEFF00]' : 'border-neutral-800'
              }`}
            />
          ) : (
            <div className="flex -space-x-2">
              {team!.members.slice(0, 3).map((m, idx) => (
                <img
                  key={idx}
                  src={m.avatar}
                  alt={m.name}
                  className="w-7 h-7 rounded-full border-2 border-neutral-950 object-cover"
                />
              ))}
            </div>
          )}

          <div className="min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="font-bold text-sm text-white truncate max-w-[140px]">
                {name}
              </span>
              {isCurrentUser && (
                <span className="px-1.5 py-0.2 rounded bg-[#BEFF00] text-black font-mono font-black text-[9px]">
                  YOU
                </span>
              )}
            </div>
            <div className="text-[11px] text-neutral-400 truncate">
              {college}
            </div>
          </div>
        </div>

        
        <div className="shrink-0 font-mono text-xs font-bold">
          {rankChange > 0 ? (
            <span className="text-emerald-400 flex items-center gap-0.5 bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-500/20">
              <ArrowUp className="w-3 h-3" /> ↑ {rankChange}
            </span>
          ) : rankChange < 0 ? (
            <span className="text-rose-400 flex items-center gap-0.5 bg-rose-950/50 px-2 py-0.5 rounded border border-rose-500/20">
              <ArrowDown className="w-3 h-3" /> ↓ {Math.abs(rankChange)}
            </span>
          ) : (
            <span className="text-neutral-500 flex items-center gap-0.5 px-2 py-0.5">
              <Minus className="w-3 h-3" /> —
            </span>
          )}
        </div>

      </div>

      
      <div className="pt-2 border-t border-neutral-800/80 flex items-center justify-between gap-2">
        <div className="flex items-baseline gap-1.5">
          <span className="font-mono text-lg font-black text-[#BEFF00]">
            {formatINR(income)}
          </span>
          <span className="text-[10px] text-neutral-400 font-mono">earned</span>
        </div>

        <div className="flex items-center gap-2">
          <VerificationBadge
            status={verificationStatus}
            compact={true}
            onClick={(e) => {
              e?.stopPropagation?.();
              onOpenVerificationModal();
            }}
          />
          <ChevronRight className="w-4 h-4 text-neutral-500" />
        </div>
      </div>

      
      {isIndividual && participant?.hustleTitle && (
        <div className="text-[11px] text-neutral-400 italic truncate">
          &ldquo;{participant.hustleTitle}&rdquo;
        </div>
      )}
    </div>
  );
};
