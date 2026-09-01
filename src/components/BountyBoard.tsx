import React, { useState } from 'react';
import { 
  Zap, 
  Clock, 
  Users, 
  ArrowRight, 
  CheckCircle2, 
  Search, 
  Sparkles, 
  ExternalLink,
  ShieldCheck,
  Tag
} from 'lucide-react';
import { Bounty, Category } from '../types';
import { formatINR } from '../utils/formatters';

interface BountyBoardProps {
  bounties: Bounty[];
  onOpenSubmitModal: (bountyTitle?: string, suggestedAmount?: number) => void;
}

export const BountyBoard: React.FC<BountyBoardProps> = ({
  bounties,
  onOpenSubmitModal,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [claimedBounties, setClaimedBounties] = useState<Record<string, boolean>>({});

  const filteredBounties = bounties.filter(
    (b) => selectedCategory === 'all' || b.category === selectedCategory
  );

  const handleClaim = (bountyId: string) => {
    setClaimedBounties((prev) => ({ ...prev, [bountyId]: true }));
  };

  return (
    <div id="bounty-board-section" className="my-10 sm:my-14 space-y-6">
      
      {/* Section Header */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#BEFF00]/10 border border-[#BEFF00]/25 text-[#BEFF00] font-mono text-xs font-bold uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5 fill-[#BEFF00]" />
            <span>Instant Earning Board</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-heading font-black uppercase text-white tracking-wide">
            ⚡ Live Gigs & Verified Bounties
          </h3>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-xl">
            Grab client tasks sponsored by startups, agencies, and campus clubs. Complete deliverables, get paid, and climb the leaderboard immediately.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-[#161616] border border-neutral-800 font-mono text-xs text-neutral-300">
            {bounties.length} Available Bounties
          </span>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2">
        {(['all', 'building', 'freelancing', 'content', 'tutoring', 'selling'] as Category[]).map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold capitalize transition-all border ${
              selectedCategory === cat
                ? 'bg-[#BEFF00] text-black border-[#BEFF00] shadow-sm font-black'
                : 'bg-[#161616] text-neutral-400 hover:text-white border-neutral-800'
            }`}
          >
            {cat === 'all' ? 'All Bounties' : cat}
          </button>
        ))}
      </div>

      {/* Bounties Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredBounties.map((bounty) => {
          const isClaimed = claimedBounties[bounty.id];
          return (
            <div
              key={bounty.id}
              className={`bento-card p-5 flex flex-col justify-between space-y-4 transition-all duration-300 relative overflow-hidden ${
                isClaimed
                  ? 'border-emerald-500/50 bg-emerald-950/10'
                  : 'hover:border-neutral-700 hover:bg-[#141414]'
              }`}
            >
              <div className="space-y-3">
                
                {/* Top Meta Bar */}
                <div className="flex items-start justify-between gap-2">
                  <span className="font-mono text-xl sm:text-2xl font-black text-[#BEFF00]">
                    {formatINR(bounty.reward)}
                  </span>

                  <div className="flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded-md bg-neutral-900 border border-neutral-800 font-mono text-[10px] text-neutral-300 font-semibold uppercase">
                      {bounty.difficulty}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/30 font-mono text-[10px] text-amber-300 font-bold flex items-center gap-1">
                      <Clock className="w-2.5 h-2.5" />
                      {bounty.deadline}
                    </span>
                  </div>
                </div>

                {/* Title and Sponsor */}
                <div>
                  <div className="font-heading text-base sm:text-lg font-bold text-white leading-snug">
                    {bounty.title}
                  </div>
                  <div className="text-xs text-neutral-400 font-mono mt-0.5">
                    Sponsored by <span className="text-neutral-200">{bounty.sponsorName}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-neutral-400 leading-relaxed">
                  {bounty.description}
                </p>

                {/* Deliverable info */}
                <div className="p-2.5 rounded-xl bg-[#161616] border border-neutral-800 text-[11px] font-mono text-neutral-300 space-y-1">
                  <div className="text-neutral-500 uppercase text-[9px] font-bold">DELIVERABLE:</div>
                  <div>{bounty.deliverable}</div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {bounty.tags.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded bg-neutral-900 text-neutral-400 text-[10px] font-mono border border-neutral-800"
                    >
                      #{t}
                    </span>
                  ))}
                </div>

              </div>

              {/* Action Button */}
              <div className="pt-2">
                {isClaimed ? (
                  <button
                    onClick={() => onOpenSubmitModal(bounty.title, bounty.reward)}
                    className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs tracking-tight transition-all flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Deliverable Ready? Submit Proof</span>
                  </button>
                ) : (
                  <button
                    onClick={() => handleClaim(bounty.id)}
                    className="w-full py-2.5 rounded-xl bg-[#BEFF00] hover:bg-[#aee600] active:scale-95 text-black font-extrabold text-xs tracking-tight transition-all flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <span>Claim Gig ({bounty.spotsLeft} spots left)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
