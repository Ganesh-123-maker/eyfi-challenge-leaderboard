import React, { useState } from 'react';
import { ArrowUpDown, ShieldCheck, Sparkles, Inbox, RefreshCw } from 'lucide-react';
import { Participant, Team, LeaderboardType } from '../types';
import { LeaderboardRow } from './LeaderboardRow';
import { LeaderboardMobileCard } from './LeaderboardMobileCard';

interface LeaderboardTableProps {
  items: (Participant | Team)[];
  mode: LeaderboardType;
  onSelectParticipant?: (p: Participant) => void;
  onSelectTeam?: (t: Team) => void;
  onOpenVerificationModal: () => void;
  onOpenCaseStudy?: (participantId: string) => void;
  isLoading?: boolean;
}

export const LeaderboardTable: React.FC<LeaderboardTableProps> = ({
  items,
  mode,
  onSelectParticipant,
  onSelectTeam,
  onOpenVerificationModal,
  onOpenCaseStudy,
  isLoading = false,
}) => {
  const [displayLimit, setDisplayLimit] = useState(25);

  const displayedItems = items.slice(0, displayLimit);
  const hasMore = items.length > displayLimit;

  if (items.length === 0) {
    return (
      <div className="bento-card p-10 text-center space-y-3 my-6">
        <div className="w-12 h-12 rounded-full bg-[#161616] flex items-center justify-center mx-auto text-neutral-400">
          <Inbox className="w-6 h-6 text-[#BEFF00]" />
        </div>
        <div className="font-heading text-xl font-bold uppercase text-white">
          No Hustlers Found
        </div>
        <p className="text-sm text-neutral-400 max-w-md mx-auto">
          No participants match your current search query or active filter criteria. Try resetting your search or exploring other categories.
        </p>
      </div>
    );
  }

  return (
    <div id="leaderboard-table-container" className="my-6 space-y-4">
      {/* Desktop Table View (Hidden on Small Screens) */}
      <div className="hidden sm:block overflow-hidden rounded-2xl border border-neutral-800 bg-[#111111] shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-neutral-800 bg-[#161616]/80 text-xs font-mono font-bold uppercase tracking-wider text-neutral-400">
                <th scope="col" className="py-3.5 px-4 sm:px-6 w-20">Rank</th>
                <th scope="col" className="py-3.5 px-4 sm:px-6">
                  {mode === 'individual' ? 'Participant / Hustle' : 'Team / Members'}
                </th>
                <th scope="col" className="py-3.5 px-4 sm:px-6 hidden md:table-cell">
                  {mode === 'individual' ? 'College' : 'Roster'}
                </th>
                <th scope="col" className="py-3.5 px-4 sm:px-6 text-right md:text-left">
                  Verified Income
                </th>
                <th scope="col" className="py-3.5 px-4 sm:px-6 text-center">Movement</th>
                <th scope="col" className="py-3.5 px-4 sm:px-6 hidden sm:table-cell text-right">
                  Verification
                </th>
                <th scope="col" className="py-3.5 px-3 w-10"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/80">
              {displayedItems.map((item, index) => (
                <LeaderboardRow
                  key={item.id}
                  item={item}
                  mode={mode}
                  index={index}
                  onSelect={() => {
                    if (mode === 'individual') onSelectParticipant?.(item as Participant);
                    else onSelectTeam?.(item as Team);
                  }}
                  onOpenVerificationModal={onOpenVerificationModal}
                  onOpenCaseStudy={onOpenCaseStudy}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Card List View (Visible on Small Screens) */}
      <div className="sm:hidden space-y-3">
        {displayedItems.map((item) => (
          <LeaderboardMobileCard
            key={item.id}
            item={item}
            mode={mode}
            onSelect={() => {
              if (mode === 'individual') onSelectParticipant?.(item as Participant);
              else onSelectTeam?.(item as Team);
            }}
            onOpenVerificationModal={onOpenVerificationModal}
          />
        ))}
      </div>

      {/* Pagination / Scalability Architecture: Load More Hustlers */}
      {hasMore && (
        <div className="pt-4 text-center">
          <button
            onClick={() => setDisplayLimit((prev) => prev + 25)}
            className="px-6 py-3 rounded-xl bg-[#161616] hover:bg-neutral-800 text-white font-mono text-xs font-bold uppercase tracking-wider border border-neutral-800 hover:border-[#BEFF00]/40 transition-all inline-flex items-center gap-2 shadow-sm"
            id="btn-load-more-participants"
          >
            <span>Load More ({items.length - displayLimit} Remaining)</span>
            <RefreshCw className="w-3.5 h-3.5 text-[#BEFF00]" />
          </button>
          <div className="text-[11px] font-mono text-neutral-500 mt-1.5">
            Designed for 50,000+ high-scale verified ranking architecture
          </div>
        </div>
      )}
    </div>
  );
};
