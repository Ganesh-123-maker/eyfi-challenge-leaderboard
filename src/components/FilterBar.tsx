import React from 'react';
import { 
  Search, 
  X, 
  SlidersHorizontal, 
  TrendingUp, 
  Trophy, 
  School, 
  Flame, 
  ArrowUpDown,
  Calendar,
  RotateCcw
} from 'lucide-react';
import { FilterType, TimeRange, SortOption } from '../types';

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedFilter: FilterType;
  onSelectFilter: (f: FilterType) => void;
  selectedTimeRange: TimeRange;
  onSelectTimeRange: (t: TimeRange) => void;
  selectedSort: SortOption;
  onSelectSort: (s: SortOption) => void;
  userCollege: string;
  totalResultsCount: number;
  onResetFilters: () => void;
  isFiltered: boolean;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  searchQuery,
  onSearchChange,
  selectedFilter,
  onSelectFilter,
  selectedTimeRange,
  onSelectTimeRange,
  selectedSort,
  onSelectSort,
  userCollege,
  totalResultsCount,
  onResetFilters,
  isFiltered,
}) => {
  return (
    <div className="bento-card p-4 sm:p-5 space-y-4 my-4">
      
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
        
        
        <div className="md:col-span-7 relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
            <Search className="w-4 h-4 text-neutral-400" />
          </div>

          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search student, college, or team name..."
            id="leaderboard-search-input"
            className="w-full pl-10 pr-10 py-2.5 bg-[#161616] border border-neutral-800 rounded-xl text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#BEFF00] focus:ring-1 focus:ring-[#BEFF00] transition-colors"
          />

          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-neutral-400 hover:text-white"
              title="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        
        <div className="md:col-span-5 flex items-center justify-start md:justify-end gap-1.5 overflow-x-auto">
          <div className="p-1 rounded-xl bg-[#161616] border border-neutral-800 flex items-center w-full sm:w-auto">
            {(['overall', 'week', 'today'] as TimeRange[]).map((tr) => (
              <button
                key={tr}
                onClick={() => onSelectTimeRange(tr)}
                id={`time-range-${tr}`}
                className={`flex-1 sm:flex-initial px-3 py-1.5 rounded-lg text-xs font-mono font-bold uppercase tracking-wider transition-all ${
                  selectedTimeRange === tr
                    ? 'bg-[#BEFF00] text-black shadow-sm font-extrabold'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {tr === 'overall' ? 'OVERALL' : tr === 'week' ? 'THIS WEEK' : 'TODAY'}
              </button>
            ))}
          </div>
        </div>

      </div>

      
      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-neutral-800">
        
        
        <div className="flex flex-wrap items-center gap-2">
          
          <button
            onClick={() => onSelectFilter('all')}
            id="filter-pill-all"
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
              selectedFilter === 'all'
                ? 'bg-[#BEFF00] text-black border-[#BEFF00] font-extrabold'
                : 'bg-[#161616] text-neutral-300 border-neutral-800 hover:border-neutral-700'
            }`}
          >
            ALL PARTICIPANTS
          </button>

          
          <button
            onClick={() => onSelectFilter('my_college')}
            id="filter-pill-my-college"
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border flex items-center gap-1.5 ${
              selectedFilter === 'my_college'
                ? 'bg-[#BEFF00] text-black border-[#BEFF00] font-extrabold'
                : 'bg-[#161616] text-neutral-300 border-neutral-800 hover:border-neutral-700'
            }`}
          >
            <School className="w-3.5 h-3.5" />
            <span>MY COLLEGE ({userCollege})</span>
          </button>

          
          <button
            onClick={() => onSelectFilter('top_10')}
            id="filter-pill-top10"
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border flex items-center gap-1.5 ${
              selectedFilter === 'top_10'
                ? 'bg-[#BEFF00] text-black border-[#BEFF00] font-extrabold'
                : 'bg-[#161616] text-neutral-300 border-neutral-800 hover:border-neutral-700'
            }`}
          >
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span>TOP 10</span>
          </button>

          
          <button
            onClick={() => onSelectFilter('rising_fast')}
            id="filter-pill-rising"
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border flex items-center gap-1.5 ${
              selectedFilter === 'rising_fast'
                ? 'bg-[#BEFF00] text-black border-[#BEFF00] font-extrabold'
                : 'bg-[#161616] text-neutral-300 border-neutral-800 hover:border-neutral-700'
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-[#BEFF00]" />
            <span>RISING FAST (↑3+)</span>
          </button>
        </div>

        
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5 text-xs text-neutral-400 font-mono">
            <ArrowUpDown className="w-3.5 h-3.5 text-[#BEFF00]" />
            <span className="hidden sm:inline">SORT:</span>
          </div>

          <select
            value={selectedSort}
            onChange={(e) => onSelectSort(e.target.value as SortOption)}
            id="leaderboard-sort-select"
            className="px-3 py-1.5 rounded-lg bg-[#161616] text-neutral-200 border border-neutral-800 text-xs font-mono font-semibold focus:outline-none focus:border-[#BEFF00]"
          >
            <option value="income">HIGHEST INCOME (₹)</option>
            <option value="rank">LEADERBOARD RANK</option>
            <option value="movement">BIGGEST MOVEMENT (↑)</option>
          </select>

          {isFiltered && (
            <button
              onClick={onResetFilters}
              className="p-1.5 rounded-lg bg-[#161616] hover:bg-neutral-800 text-neutral-400 hover:text-white border border-neutral-800 transition-colors"
              title="Reset all filters"
              id="btn-reset-filters"
            >
              <RotateCcw className="w-3.5 h-3.5 text-rose-400" />
            </button>
          )}
        </div>

      </div>

      
      <div className="flex items-center justify-between text-xs text-neutral-400 font-mono pt-1">
        <span>Showing <strong>{totalResultsCount}</strong> hustlers</span>
        {isFiltered && (
          <span className="text-[#BEFF00] text-[11px]">
            Active filters applied
          </span>
        )}
      </div>

    </div>
  );
};
