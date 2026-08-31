import React from 'react';
import { ArrowUp, ArrowDown, Minus, Flame, Trophy, Sparkles, CheckCircle2, ChevronRight, User, TrendingUp, BookOpen } from 'lucide-react';
import { Participant, Team, LeaderboardType } from '../types';
import { formatINR, formatRank } from '../utils/formatters';
import { VerificationBadge } from './VerificationBadge';

interface LeaderboardRowProps {
  item: Participant | Team;
  mode: LeaderboardType;
  index: number;
  onSelect: () => void;
  onOpenVerificationModal: () => void;
  onOpenCaseStudy?: (participantId: string) => void;
}

export const LeaderboardRow: React.FC<LeaderboardRowProps> = ({
  item,
  mode,
  index,
  onSelect,
  onOpenVerificationModal,
  onOpenCaseStudy,
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
  const hasCaseStudy = isIndividual && ['p-1', 'p-2', 'p-14', 'user-current'].includes(participant?.id || '');

  return (
    <tr
      onClick={onSelect}
      id={`leaderboard-row-${item.id}`}
      className={`group cursor-pointer transition-all duration-200 border-b border-neutral-800/80 ${
        isCurrentUser
          ? 'bg-[#BEFF00]/10 hover:bg-[#BEFF00]/15 border-l-4 border-l-[#BEFF00]'
          : 'hover:bg-neutral-850/60'
      }`}
    >
      {/* Rank Column */}
      <td className="py-4 px-4 sm:px-6 whitespace-nowrap">
        <div className="flex items-center gap-2">
          <span
            className={`font-heading text-lg sm:text-2xl font-black ${
              rank === 1
                ? 'text-[#BEFF00]'
                : rank <= 3
                ? 'text-amber-400'
                : isCurrentUser
                ? 'text-[#BEFF00]'
                : 'text-neutral-300'
            }`}
          >
            {formatRank(rank)}
          </span>

          {item.isTied && (
            <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-400 border border-neutral-700">
              TIED
            </span>
          )}

          {isCurrentUser && (
            <span className="px-2 py-0.5 rounded bg-[#BEFF00] text-black font-mono font-black text-[10px] uppercase shadow-sm">
              YOU
            </span>
          )}
        </div>
      </td>

      {/* Participant / Team Details Column */}
      <td className="py-4 px-4 sm:px-6">
        <div className="flex items-center gap-3">
          {/* Avatar or Team Cluster */}
          {isIndividual ? (
            <div className="relative shrink-0">
              <img
                src={participant!.avatar}
                alt={name}
                className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover border ${
                  isCurrentUser ? 'border-[#BEFF00]' : 'border-neutral-800'
                }`}
                loading="lazy"
              />
              {rank <= 3 && (
                <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-500 text-black flex items-center justify-center text-[9px] font-bold">
                  ★
                </div>
              )}
            </div>
          ) : (
            <div className="flex -space-x-2 shrink-0">
              {team!.members.slice(0, 3).map((m, idx) => (
                <img
                  key={idx}
                  src={m.avatar}
                  alt={m.name}
                  className="w-8 h-8 rounded-full border-2 border-neutral-950 object-cover"
                />
              ))}
            </div>
          )}

          {/* Name and Badges */}
          <div className="space-y-0.5 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-sm sm:text-base text-white group-hover:text-[#BEFF00] transition-colors truncate">
                {name}
              </span>

              {badge && (
                <span
                  className={`text-[9px] font-mono font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                    badge === 'TOP EARNER'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      : badge === 'ON FIRE'
                      ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                      : badge === 'FASTEST RISER'
                      ? 'bg-[#BEFF00]/15 text-[#BEFF00] border border-[#BEFF00]/30'
                      : 'bg-neutral-800 text-neutral-300'
                  }`}
                >
                  {badge}
                </span>
              )}

              {hasCaseStudy && onOpenCaseStudy && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenCaseStudy(participant!.id);
                  }}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-indigo-950/60 hover:bg-indigo-900 border border-indigo-500/40 text-[9px] font-mono font-bold text-indigo-300 transition-colors"
                  title="Read breakdown of how they earned this amount"
                >
                  <BookOpen className="w-2.5 h-2.5" />
                  <span>Playbook</span>
                </button>
              )}
            </div>

            {/* Sub-text: Category & Hustle Title */}
            <div className="flex items-center gap-2 text-xs text-neutral-400 truncate">
              {isIndividual && participant?.hustleTitle ? (
                <span className="truncate max-w-[200px] sm:max-w-[300px]">
                  {participant.hustleTitle}
                </span>
              ) : !isIndividual && team ? (
                <span className="text-neutral-400 truncate">
                  {team.members.map((m) => m.name).join(' · ')}
                </span>
              ) : null}
            </div>
          </div>
        </div>
      </td>

      {/* College Column (Desktop) */}
      <td className="py-4 px-4 sm:px-6 hidden md:table-cell whitespace-nowrap text-sm text-neutral-300 font-medium">
        <span className="truncate max-w-[180px] block">{college}</span>
      </td>

      {/* Verified Income Column */}
      <td className="py-4 px-4 sm:px-6 whitespace-nowrap text-right md:text-left">
        <div className="space-y-0.5">
          <div className="font-mono text-base sm:text-lg font-black text-[#BEFF00] tracking-tight">
            {formatINR(income)}
          </div>
          <div className="text-[11px] text-neutral-400 font-mono hidden sm:block">
            verified total
          </div>
        </div>
      </td>

      {/* Rank Movement Column */}
      <td className="py-4 px-4 sm:px-6 whitespace-nowrap text-center">
        <div className="inline-flex items-center justify-center font-mono text-xs sm:text-sm font-bold">
          {rankChange > 0 ? (
            <span className="text-emerald-400 flex items-center gap-0.5 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/20">
              <ArrowUp className="w-3.5 h-3.5" /> ↑ {rankChange}
            </span>
          ) : rankChange < 0 ? (
            <span className="text-rose-400 flex items-center gap-0.5 bg-rose-950/40 px-2 py-0.5 rounded border border-rose-500/20">
              <ArrowDown className="w-3.5 h-3.5" /> ↓ {Math.abs(rankChange)}
            </span>
          ) : (
            <span className="text-neutral-500 flex items-center gap-0.5 px-2 py-0.5">
              <Minus className="w-3.5 h-3.5" /> —
            </span>
          )}
        </div>
      </td>

      {/* Verification Column */}
      <td className="py-4 px-4 sm:px-6 hidden sm:table-cell whitespace-nowrap text-right">
        <VerificationBadge
          status={verificationStatus}
          proofCount={isIndividual ? participant?.proofCount : undefined}
          onClick={(e) => {
            // Stop propagation to prevent opening row detail
            e?.stopPropagation?.();
            onOpenVerificationModal();
          }}
        />
      </td>

      {/* Detail Arrow */}
      <td className="py-4 px-3 text-right text-neutral-500 group-hover:text-white">
        <ChevronRight className="w-4 h-4 ml-auto" />
      </td>
    </tr>
  );
};
