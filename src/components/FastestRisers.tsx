import React from 'react';
import { Flame, ArrowUp, Rocket, Zap, Trophy, ChevronRight } from 'lucide-react';
import { FASTEST_RISERS_DATA } from '../data/mockData';
import { formatINR } from '../utils/formatters';

interface FastestRisersProps {
  onSelectRiser?: (participantId: string) => void;
}

export const FastestRisers: React.FC<FastestRisersProps> = ({ onSelectRiser }) => {
  return (
    <section id="fastest-risers-section" className="my-10 sm:my-14 relative">
      
      {/* Section Header */}
      <div className="flex flex-wrap items-end justify-between gap-3 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase font-bold tracking-widest text-[#BEFF00] mb-1">
            <Rocket className="w-3.5 h-3.5" />
            <span>Climbing Velocity Engine</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-heading font-black uppercase text-white tracking-wide flex items-center gap-2">
            🚀 Fastest Risers Today
          </h3>
          <p className="text-xs sm:text-sm text-neutral-400">
            Students who made the biggest position jumps in the last 24 hours.
          </p>
        </div>

        <div className="text-xs font-mono text-neutral-400 bg-[#161616] px-3 py-1.5 rounded-xl border border-neutral-800">
          Rank movement loop
        </div>
      </div>

      {/* Grid of Climber Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {FASTEST_RISERS_DATA.map((riser) => (
          <div
            key={riser.id}
            onClick={() => onSelectRiser?.(riser.participantId)}
            className={`bento-card p-4 sm:p-5 transition-all duration-300 cursor-pointer group relative overflow-hidden ${
              riser.isYou
                ? 'bg-[#BEFF00]/10 border-2 border-[#BEFF00] shadow-[0_0_25px_rgba(190,255,0,0.15)]'
                : 'hover:border-neutral-700 hover:bg-[#161616]'
            }`}
          >
            {/* Top row: Avatar, Name & Movement */}
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src={riser.avatar}
                    alt={riser.name}
                    className={`w-12 h-12 rounded-full object-cover border ${
                      riser.isYou ? 'border-[#BEFF00]' : 'border-neutral-700'
                    }`}
                  />
                  <div className="absolute -bottom-1 -right-1 p-0.5 rounded-full bg-black text-[#BEFF00]">
                    <Flame className="w-3.5 h-3.5 fill-[#BEFF00]" />
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-sm sm:text-base text-white group-hover:text-[#BEFF00] transition-colors">
                      {riser.name}
                    </span>
                    {riser.isYou && (
                      <span className="px-1.5 py-0.2 rounded bg-[#BEFF00] text-black font-mono font-black text-[9px]">
                        YOU
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-neutral-400">
                    {riser.college}
                  </div>
                </div>
              </div>

              {/* Jump Pill */}
              <div className="text-right">
                <div className="px-2.5 py-1 rounded-xl bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-black inline-flex items-center gap-1 shadow-sm">
                  <ArrowUp className="w-3.5 h-3.5" />
                  <span>+{riser.positionsClimbed} Spots</span>
                </div>
              </div>
            </div>

            {/* Middle: Old rank vs New Rank */}
            <div className="p-2.5 rounded-xl bg-[#161616] border border-neutral-800 flex items-center justify-between font-mono text-xs mb-2.5">
              <div className="flex items-center gap-2">
                <span className="text-neutral-500">#{riser.oldRank}</span>
                <span className="text-neutral-600">→</span>
                <span className="text-[#BEFF00] font-black text-sm">#{riser.newRank}</span>
              </div>
              <div className="text-neutral-300 font-bold">
                +{formatINR(riser.recentGain)} today
              </div>
            </div>

            {/* Shoutout microcopy */}
            <div className="text-xs text-neutral-300 font-medium flex items-center justify-between">
              <span className="truncate italic text-neutral-400">
                {riser.shoutout}
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-neutral-500 group-hover:text-white shrink-0 ml-1" />
            </div>

          </div>
        ))}
      </div>

    </section>
  );
};
