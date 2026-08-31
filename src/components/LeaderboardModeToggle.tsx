import React from 'react';
import { User, Users } from 'lucide-react';
import { LeaderboardType } from '../types';

interface LeaderboardModeToggleProps {
  mode: LeaderboardType;
  onChange: (mode: LeaderboardType) => void;
  individualCount: number;
  teamCount: number;
}

export const LeaderboardModeToggle: React.FC<LeaderboardModeToggleProps> = ({
  mode,
  onChange,
  individualCount,
  teamCount,
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2">
      <div>
        <h2 className="text-xl sm:text-2xl font-heading font-extrabold uppercase tracking-wide text-white flex items-center gap-2">
          Rankings & Standings
          <span className="text-xs font-mono font-normal normal-case px-2 py-0.5 rounded bg-neutral-900 text-neutral-400 border border-neutral-800">
            {mode === 'individual' ? 'Personal verified income' : 'Combined team earnings (max 3/team)'}
          </span>
        </h2>
      </div>

      {/* Main Mode Toggle Container */}
      <div 
        role="tablist"
        aria-label="Leaderboard mode selection"
        className="inline-flex p-1 rounded-2xl bg-[#0A0A0A] border border-neutral-800 self-start sm:self-auto"
      >
        <button
          role="tab"
          aria-selected={mode === 'individual'}
          id="toggle-individual-mode"
          onClick={() => onChange('individual')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold tracking-tight transition-all ${
            mode === 'individual'
              ? 'bg-[#BEFF00] text-black shadow-md font-extrabold'
              : 'text-neutral-400 hover:text-white hover:bg-[#161616]'
          }`}
        >
          <User className="w-3.5 h-3.5" />
          <span>INDIVIDUAL</span>
          <span
            className={`text-[10px] font-mono px-1.5 py-0.2 rounded-md ${
              mode === 'individual'
                ? 'bg-black/20 text-black font-extrabold'
                : 'bg-neutral-800 text-neutral-400'
            }`}
          >
            {individualCount}
          </span>
        </button>

        <button
          role="tab"
          aria-selected={mode === 'team'}
          id="toggle-team-mode"
          onClick={() => onChange('team')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold tracking-tight transition-all ${
            mode === 'team'
              ? 'bg-[#BEFF00] text-black shadow-md font-extrabold'
              : 'text-neutral-400 hover:text-white hover:bg-[#161616]'
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span>TEAM</span>
          <span
            className={`text-[10px] font-mono px-1.5 py-0.2 rounded-md ${
              mode === 'team'
                ? 'bg-black/20 text-black font-extrabold'
                : 'bg-neutral-800 text-neutral-400'
            }`}
          >
            {teamCount}
          </span>
        </button>
      </div>
    </div>
  );
};
