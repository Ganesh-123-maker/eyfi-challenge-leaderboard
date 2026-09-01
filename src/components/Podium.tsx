import React from 'react';
import { Crown, Flame, ArrowUp, ArrowDown, Minus, CheckCircle, Trophy, Sparkles, Users } from 'lucide-react';
import { Participant, Team, LeaderboardType } from '../types';
import { formatINR } from '../utils/formatters';

interface PodiumProps {
  mode: LeaderboardType;
  topParticipants: Participant[];
  topTeams: Team[];
  onSelectParticipant?: (p: Participant) => void;
  onSelectTeam?: (t: Team) => void;
}

export const Podium: React.FC<PodiumProps> = ({
  mode,
  topParticipants,
  topTeams,
  onSelectParticipant,
  onSelectTeam,
}) => {

  const first = mode === 'individual' ? topParticipants[0] : topTeams[0];
  const second = mode === 'individual' ? topParticipants[1] : topTeams[1];
  const third = mode === 'individual' ? topParticipants[2] : topTeams[2];

  if (!first || !second || !third) return null;

  return (
    <div className="relative pt-2 pb-1 sm:pt-4 sm:pb-2 my-2 sm:my-3">
      
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
        <div className="w-80 h-80 bg-[#BEFF00]/10 rounded-full blur-3xl"></div>
      </div>

      <div className="text-center mb-3 sm:mb-5">
        <span className="text-[11px] sm:text-xs font-mono uppercase tracking-widest text-[#BEFF00] font-bold">
          The Hall of Hustlers
        </span>
        <h3 className="text-xl sm:text-2xl md:text-3xl font-heading font-extrabold uppercase text-white mt-0.5">
          Top 3 Verified Earners
        </h3>
      </div>

      
      <div className="max-w-4xl mx-auto grid grid-cols-3 gap-2 sm:gap-4 md:gap-6 items-end">
        
        
        <div className="order-1 flex flex-col items-center">
          <PodiumCard
            rank={2}
            item={second}
            mode={mode}
            accentColor="border-neutral-400"
            rankBadgeColor="bg-neutral-300 text-black"
            podiumHeight="h-11 sm:h-14 md:h-16"
            onClick={() => {
              if (mode === 'individual') onSelectParticipant?.(second as Participant);
              else onSelectTeam?.(second as Team);
            }}
          />
        </div>

        
        <div className="order-2 flex flex-col items-center -mt-3 sm:-mt-6 z-10">
          <PodiumCard
            rank={1}
            item={first}
            mode={mode}
            isFirst={true}
            accentColor="border-[#BEFF00] glow-lime"
            rankBadgeColor="bg-[#BEFF00] text-black shadow-lg font-black"
            podiumHeight="h-16 sm:h-20 md:h-24"
            onClick={() => {
              if (mode === 'individual') onSelectParticipant?.(first as Participant);
              else onSelectTeam?.(first as Team);
            }}
          />
        </div>

        
        <div className="order-3 flex flex-col items-center">
          <PodiumCard
            rank={3}
            item={third}
            mode={mode}
            accentColor="border-amber-700/60"
            rankBadgeColor="bg-amber-600 text-white"
            podiumHeight="h-7 sm:h-9 md:h-11"
            onClick={() => {
              if (mode === 'individual') onSelectParticipant?.(third as Participant);
              else onSelectTeam?.(third as Team);
            }}
          />
        </div>

      </div>
    </div>
  );
};

interface PodiumCardProps {
  rank: 1 | 2 | 3;
  item: Participant | Team;
  mode: LeaderboardType;
  isFirst?: boolean;
  accentColor: string;
  rankBadgeColor: string;
  podiumHeight: string;
  onClick: () => void;
}

const PodiumCard: React.FC<PodiumCardProps> = ({
  rank,
  item,
  mode,
  isFirst,
  accentColor,
  rankBadgeColor,
  podiumHeight,
  onClick,
}) => {
  const isIndividual = mode === 'individual';
  const participant = isIndividual ? (item as Participant) : null;
  const team = !isIndividual ? (item as Team) : null;

  const income = isIndividual ? participant!.income : team!.combinedIncome;
  const name = isIndividual ? participant!.name : team!.teamName;
  const college = isIndividual ? participant!.college : `${team!.members.length} Members`;
  const rankChange = item.rankChange;
  const badge = item.badge;

  return (
    <div
      onClick={onClick}
      className={`w-full flex flex-col items-center cursor-pointer group focus:outline-none`}
      role="button"
      tabIndex={0}
      aria-label={`Rank ${rank}: ${name}, ${formatINR(income)}`}
    >
      
      {isFirst && (
        <div className="mb-2 flex items-center gap-1 text-[#BEFF00] animate-bounce">
          <Crown className="w-6 h-6 fill-[#BEFF00] drop-shadow-[0_0_8px_rgba(190,255,0,0.8)]" />
        </div>
      )}

      
      <div className="relative mb-3">
        {isIndividual ? (
          <div
            className={`rounded-full p-1 bg-neutral-900 border-2 transition-all duration-300 group-hover:scale-105 ${
              isFirst ? 'w-20 h-20 sm:w-28 sm:h-28 border-[#BEFF00] shadow-[0_0_20px_rgba(190,255,0,0.3)]' : 'w-16 h-16 sm:w-20 sm:h-20 border-neutral-700'
            }`}
          >
            <img
              src={participant!.avatar}
              alt={name}
              className="w-full h-full object-cover rounded-full"
              loading="lazy"
            />
          </div>
        ) : (

          <div
            className={`rounded-2xl p-2 bg-neutral-900 border-2 transition-all duration-300 group-hover:scale-105 flex items-center justify-center relative ${
              isFirst ? 'w-20 h-20 sm:w-28 sm:h-28 border-[#BEFF00] shadow-[0_0_20px_rgba(190,255,0,0.3)]' : 'w-16 h-16 sm:w-20 sm:h-20 border-neutral-700'
            }`}
          >
            <div className="flex -space-x-2 sm:-space-x-3 items-center justify-center">
              {team!.members.slice(0, 3).map((m, idx) => (
                <img
                  key={idx}
                  src={m.avatar}
                  alt={m.name}
                  className="w-7 h-7 sm:w-10 sm:h-10 rounded-full border-2 border-neutral-900 object-cover"
                />
              ))}
            </div>
          </div>
        )}

        
        <div
          className={`absolute -bottom-2 -right-1 sm:bottom-0 sm:right-0 px-2 py-0.5 rounded-full font-mono text-xs sm:text-sm font-extrabold flex items-center justify-center ${rankBadgeColor}`}
        >
          #{rank}
        </div>
      </div>

      
      <div className="text-center px-1 w-full">
        
        {badge && (
          <div className="mb-1 hidden sm:inline-block">
            <span
              className={`text-[9px] font-mono font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                isFirst
                  ? 'bg-[#BEFF00]/15 text-[#BEFF00] border border-[#BEFF00]/30'
                  : 'bg-neutral-800 text-neutral-300 border border-neutral-700'
              }`}
            >
              {badge}
            </span>
          </div>
        )}

        <div className="font-heading text-sm sm:text-lg md:text-xl font-black text-white truncate max-w-[120px] sm:max-w-[180px] mx-auto tracking-wide group-hover:text-[#BEFF00] transition-colors">
          {name}
        </div>

        <div className="text-[10px] sm:text-xs text-neutral-400 truncate max-w-[110px] sm:max-w-[160px] mx-auto mb-1">
          {college}
        </div>

        
        <div className="font-mono text-xs sm:text-base md:text-lg font-black text-[#BEFF00] flex items-center justify-center gap-1">
          <span>{formatINR(income)}</span>
          <CheckCircle className="w-3 h-3 text-[#BEFF00] shrink-0" />
        </div>

        
        <div className="text-[10px] sm:text-xs font-mono font-semibold flex items-center justify-center gap-1 mt-0.5">
          {rankChange > 0 ? (
            <span className="text-[#BEFF00] flex items-center">
              <ArrowUp className="w-3 h-3" /> ↑ {rankChange}
            </span>
          ) : rankChange < 0 ? (
            <span className="text-rose-400 flex items-center">
              <ArrowDown className="w-3 h-3" /> ↓ {Math.abs(rankChange)}
            </span>
          ) : (
            <span className="text-neutral-500 flex items-center">
              <Minus className="w-3 h-3" /> —
            </span>
          )}
        </div>
      </div>

      
      <div
        className={`w-full mt-2 sm:mt-2.5 rounded-t-lg sm:rounded-t-xl border-t-2 border-x border-neutral-800/80 bg-gradient-to-b from-[#141414] to-[#0A0A0A] flex flex-col items-center justify-center py-1.5 sm:py-2 transition-all duration-300 group-hover:border-[#BEFF00]/50 ${podiumHeight} ${accentColor}`}
      >
        <span
          className={`font-heading text-xl sm:text-2xl md:text-3xl font-black leading-none ${
            isFirst ? 'text-[#BEFF00]' : 'text-neutral-400'
          }`}
        >
          #{rank}
        </span>
        <span className="text-[8px] sm:text-[10px] font-mono uppercase tracking-wider text-neutral-500 mt-0.5">
          {isFirst ? 'CHAMPION' : rank === 2 ? 'RUNNER UP' : 'PODIUM'}
        </span>
      </div>
    </div>
  );
};
