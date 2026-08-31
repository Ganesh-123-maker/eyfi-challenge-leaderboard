import React, { useState } from 'react';
import { 
  School, 
  Crown, 
  Flame, 
  ArrowUp, 
  ArrowDown, 
  Minus, 
  Users, 
  Trophy, 
  ShieldCheck, 
  ChevronRight, 
  Sparkles,
  Share2
} from 'lucide-react';
import { CollegeRanking } from '../types';
import { formatINR, formatRank } from '../utils/formatters';

interface CampusWarsProps {
  colleges: CollegeRanking[];
  userCollege?: string;
  userCollegeName?: string;
  userCollegeRank?: number;
  userContributionINR?: number;
  onOpenSubmitModal: () => void;
  onOpenShareModal?: () => void;
}

export const CampusWars: React.FC<CampusWarsProps> = ({
  colleges,
  userCollege,
  userCollegeName,
  userCollegeRank = 4,
  userContributionINR,
  onOpenSubmitModal,
  onOpenShareModal,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const activeUserCollege = userCollege || userCollegeName || 'IIT Delhi';
  const query = (searchQuery || '').toLowerCase().trim();

  const filteredColleges = colleges.filter((c) =>
    (c.college && c.college.toLowerCase().includes(query)) ||
    (c.collegeShort && c.collegeShort.toLowerCase().includes(query))
  );

  const userCollegeData = colleges.find((c) => 
    (c.college && c.college.toLowerCase().includes(activeUserCollege.toLowerCase())) ||
    (activeUserCollege && activeUserCollege.toLowerCase().includes((c.college || '').toLowerCase()))
  ) || colleges[2]; // Fallback to IIT Delhi

  return (
    <div id="campus-wars-section" className="space-y-6 my-8">
      
      {/* Top Banner: Campus Pride Duel */}
      <div className="bento-card p-5 sm:p-7 md:p-8 bg-gradient-to-r from-[#141414] via-[#111111] to-[#0D0D0D] border-2 border-[#BEFF00]/30 shadow-[0_0_35px_rgba(190,255,0,0.08)] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-[#BEFF00]/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#BEFF00] text-black font-mono text-xs font-black uppercase tracking-wider">
              <School className="w-3.5 h-3.5" />
              <span>Inter-College War Room</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-heading font-black uppercase text-white tracking-wide">
              Campus vs. Campus Standings
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 max-w-xl">
              Every single rupee earned by you and your campus peers counts towards your college&apos;s national rank.
            </p>
          </div>

          {/* Your Campus Spotlight Card */}
          {userCollegeData && (
            <div className="p-4 rounded-2xl bg-[#161616] border border-[#BEFF00]/50 shadow-md min-w-[260px] space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-[#BEFF00] font-black uppercase flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#BEFF00] animate-pulse"></span>
                  YOUR CAMPUS
                </span>
                <span className="text-white font-bold">
                  Rank #{userCollegeData.rank} Nationally
                </span>
              </div>

              <div className="flex items-baseline justify-between gap-2">
                <span className="font-heading text-lg font-black text-white truncate">
                  {userCollegeData.college}
                </span>
                <span className="font-mono text-base font-black text-[#BEFF00]">
                  {formatINR(userCollegeData.totalIncome)}
                </span>
              </div>

              <div className="text-[11px] text-neutral-400 font-mono flex items-center justify-between pt-1 border-t border-neutral-800">
                <span>{userCollegeData.participantCount} Verified Hustlers</span>
                <span className="text-emerald-400">
                  {userCollegeData.rankChange >= 0 ? `↑ ${userCollegeData.rankChange} today` : `↓ ${Math.abs(userCollegeData.rankChange)}`}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Top 3 Campus Matchup Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          {colleges.slice(0, 3).map((col, idx) => (
            <div
              key={col.id}
              className={`p-4 rounded-2xl border transition-all ${
                idx === 0
                  ? 'bg-amber-950/20 border-amber-500/40 shadow-lg'
                  : idx === 1
                  ? 'bg-neutral-900/60 border-neutral-700'
                  : 'bg-neutral-900/60 border-amber-800/40'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-heading text-2xl font-black text-white flex items-center gap-1">
                  {idx === 0 ? '👑 #1' : `#${idx + 1}`}
                </span>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-neutral-800 text-neutral-300">
                  {col.collegeShort}
                </span>
              </div>
              <div className="font-bold text-sm text-white truncate">{col.college}</div>
              <div className="font-mono text-base font-black text-[#BEFF00] mt-1">
                {formatINR(col.totalIncome)}
              </div>
              <div className="text-[11px] text-neutral-400 font-mono mt-1 flex items-center gap-1">
                <span>Top: {col.topContributorName} ({formatINR(col.topContributorAmount)})</span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* College Standings Table */}
      <div className="overflow-hidden rounded-2xl border border-neutral-800 bg-[#111111] shadow-xl">
        
        {/* Table Header Bar */}
        <div className="p-4 sm:p-5 border-b border-neutral-800 flex flex-wrap items-center justify-between gap-3 bg-[#141414]">
          <div className="flex items-center gap-2 font-mono text-xs font-bold text-neutral-300">
            <School className="w-4 h-4 text-[#BEFF00]" />
            <span>ALL 142 COMPETING COLLEGES</span>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Search college name or shortcode..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-3.5 py-1.5 rounded-xl bg-[#161616] border border-neutral-800 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#BEFF00] font-mono w-60"
            />
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-neutral-800 bg-[#161616]/80 text-xs font-mono font-bold uppercase tracking-wider text-neutral-400">
                <th scope="col" className="py-3.5 px-4 sm:px-6 w-20">Rank</th>
                <th scope="col" className="py-3.5 px-4 sm:px-6">College / University</th>
                <th scope="col" className="py-3.5 px-4 sm:px-6 hidden sm:table-cell">Top Earner</th>
                <th scope="col" className="py-3.5 px-4 sm:px-6 text-center">Hustlers</th>
                <th scope="col" className="py-3.5 px-4 sm:px-6 text-right">Total Verified Income</th>
                <th scope="col" className="py-3.5 px-4 sm:px-6 text-center">Movement</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/80">
              {filteredColleges.map((col) => {
                const isUser = col.isUserCollege || (activeUserCollege && col.college && col.college.toLowerCase().includes(activeUserCollege.toLowerCase()));
                return (
                  <tr
                    key={col.id}
                    className={`transition-colors ${
                      isUser
                        ? 'bg-[#BEFF00]/10 hover:bg-[#BEFF00]/15 border-l-4 border-l-[#BEFF00]'
                        : 'hover:bg-neutral-850/60'
                    }`}
                  >
                    <td className="py-4 px-4 sm:px-6 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <span className={`font-heading text-lg sm:text-2xl font-black ${
                          col.rank === 1 ? 'text-[#BEFF00]' : col.rank <= 3 ? 'text-amber-400' : 'text-neutral-300'
                        }`}>
                          {formatRank(col.rank)}
                        </span>
                        {isUser && (
                          <span className="px-2 py-0.5 rounded bg-[#BEFF00] text-black font-mono font-black text-[9px] uppercase">
                            YOU
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="py-4 px-4 sm:px-6">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm sm:text-base text-white">
                            {col.college}
                          </span>
                          {col.badge && (
                            <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-full bg-neutral-800 text-[#BEFF00] border border-neutral-700">
                              {col.badge}
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-neutral-400 font-mono">
                          {col.collegeShort} · {formatINR(col.totalIncomeThisWeek)} this week
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-4 sm:px-6 hidden sm:table-cell whitespace-nowrap">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={col.topContributorAvatar}
                          alt={col.topContributorName}
                          className="w-7 h-7 rounded-full object-cover border border-neutral-700"
                        />
                        <div>
                          <div className="text-xs font-bold text-neutral-200">
                            {col.topContributorName}
                          </div>
                          <div className="text-[10px] font-mono text-[#BEFF00]">
                            {formatINR(col.topContributorAmount)}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-4 sm:px-6 text-center whitespace-nowrap font-mono text-xs text-neutral-300">
                      <span className="px-2.5 py-1 rounded-lg bg-neutral-900 border border-neutral-800 font-bold">
                        {col.participantCount} students
                      </span>
                    </td>

                    <td className="py-4 px-4 sm:px-6 text-right whitespace-nowrap">
                      <div className="font-mono text-base sm:text-lg font-black text-[#BEFF00]">
                        {formatINR(col.totalIncome)}
                      </div>
                      <div className="text-[10px] font-mono text-neutral-400">
                        +{formatINR(col.totalIncomeToday)} today
                      </div>
                    </td>

                    <td className="py-4 px-4 sm:px-6 text-center whitespace-nowrap">
                      <div className="inline-flex items-center justify-center font-mono text-xs font-bold">
                        {col.rankChange > 0 ? (
                          <span className="text-emerald-400 flex items-center gap-0.5 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/20">
                            <ArrowUp className="w-3.5 h-3.5" /> ↑ {col.rankChange}
                          </span>
                        ) : col.rankChange < 0 ? (
                          <span className="text-rose-400 flex items-center gap-0.5 bg-rose-950/40 px-2 py-0.5 rounded border border-rose-500/20">
                            <ArrowDown className="w-3.5 h-3.5" /> ↓ {Math.abs(col.rankChange)}
                          </span>
                        ) : (
                          <span className="text-neutral-500 flex items-center gap-0.5 px-2 py-0.5">
                            <Minus className="w-3.5 h-3.5" /> —
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer Action */}
        <div className="p-4 sm:p-5 border-t border-neutral-800 bg-[#141414] flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-neutral-400 font-mono">
            Want to boost your college&apos;s rank? Log your client invoices or sell products.
          </div>
          <button
            onClick={onOpenSubmitModal}
            className="px-5 py-2 rounded-xl bg-[#BEFF00] hover:bg-[#aee600] text-black font-extrabold text-xs tracking-tight shadow-sm transition-all"
          >
            Earn ₹ for {userCollegeData?.collegeShort || 'Your College'}
          </button>
        </div>

      </div>

    </div>
  );
};
