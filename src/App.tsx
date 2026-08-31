import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Header 
} from './components/Header';
import { 
  Hero 
} from './components/Hero';
import { 
  LeaderboardModeToggle 
} from './components/LeaderboardModeToggle';
import { 
  Podium 
} from './components/Podium';
import { 
  YourRank 
} from './components/YourRank';
import { 
  StickyRankBar 
} from './components/StickyRankBar';
import { 
  CategoryFilter 
} from './components/CategoryFilter';
import { 
  FilterBar 
} from './components/FilterBar';
import { 
  LeaderboardTable 
} from './components/LeaderboardTable';
import { 
  FastestRisers 
} from './components/FastestRisers';
import { 
  RankingInfo 
} from './components/RankingInfo';
import { 
  VerificationModal 
} from './components/VerificationModal';
import { 
  ShareRankModal 
} from './components/ShareRankModal';
import { 
  WhatsAppNotificationModal 
} from './components/WhatsAppNotificationModal';
import { 
  PrivacySettingsModal 
} from './components/PrivacySettingsModal';
import { 
  ParticipantDetailModal 
} from './components/ParticipantDetailModal';
import { 
  SubmitEarningModal 
} from './components/SubmitEarningModal';
import { 
  LiveSimulationBar 
} from './components/LiveSimulationBar';
import { 
  NotificationToast, 
  ToastMessage 
} from './components/NotificationToast';
import { 
  Footer 
} from './components/Footer';

import { 
  Participant, 
  Team, 
  UserRankProfile, 
  LeaderboardType, 
  TimeRange, 
  FilterType, 
  SortOption, 
  Category 
} from './types';

import { 
  INITIAL_USER_PROFILE, 
  MOCK_PARTICIPANTS, 
  MOCK_TEAMS 
} from './data/mockData';

export default function App() {
  // State: Data Collections
  const [participants, setParticipants] = useState<Participant[]>(MOCK_PARTICIPANTS);
  const [teams, setTeams] = useState<Team[]>(MOCK_TEAMS);
  const [userProfile, setUserProfile] = useState<UserRankProfile>(INITIAL_USER_PROFILE);

  // State: Leaderboard Filters & View
  const [mode, setMode] = useState<LeaderboardType>('individual');
  const [timeRange, setTimeRange] = useState<TimeRange>('overall');
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [selectedFilter, setSelectedFilter] = useState<FilterType>('all');
  const [selectedSort, setSelectedSort] = useState<SortOption>('rank');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals & Drawers
  const [isVerificationModalOpen, setIsVerificationModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [selectedDetailItem, setSelectedDetailItem] = useState<Participant | Team | null>(null);

  // Sticky Rank Bar Visibility
  const [showStickyRank, setShowStickyRank] = useState(false);
  const yourRankRef = useRef<HTMLDivElement>(null);

  // Toast System
  const [activeToast, setActiveToast] = useState<ToastMessage | null>(null);

  // Simulation State Flag (e.g. Zero-earning new user)
  const [isZeroState, setIsZeroState] = useState(false);

  // 1. URL Query Parameter Sync on Initial Load
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const urlType = params.get('type');
      const urlPeriod = params.get('period');
      const urlCategory = params.get('category');
      const urlFilter = params.get('filter');
      const urlSort = params.get('sort');
      const urlSearch = params.get('search');

      if (urlType === 'team' || urlType === 'individual') setMode(urlType);
      if (urlPeriod === 'overall' || urlPeriod === 'week' || urlPeriod === 'today') setTimeRange(urlPeriod);
      if (urlCategory) setSelectedCategory(urlCategory as Category);
      if (urlFilter) setSelectedFilter(urlFilter as FilterType);
      if (urlSort) setSelectedSort(urlSort as SortOption);
      if (urlSearch) setSearchQuery(urlSearch);
    } catch {
      // Ignore URL parsing errors
    }
  }, []);

  // 2. Persist Active Filters to URL smoothly
  useEffect(() => {
    try {
      const params = new URLSearchParams();
      if (mode !== 'individual') params.set('type', mode);
      if (timeRange !== 'overall') params.set('period', timeRange);
      if (selectedCategory !== 'all') params.set('category', selectedCategory);
      if (selectedFilter !== 'all') params.set('filter', selectedFilter);
      if (selectedSort !== 'rank') params.set('sort', selectedSort);
      if (searchQuery.trim()) params.set('search', searchQuery.trim());

      const queryStr = params.toString();
      const newUrl = queryStr ? `${window.location.pathname}?${queryStr}` : window.location.pathname;
      window.history.replaceState({}, '', newUrl);
    } catch {
      // Ignore
    }
  }, [mode, timeRange, selectedCategory, selectedFilter, selectedSort, searchQuery]);

  // 3. Scroll Listener for Sticky Rank Bar
  useEffect(() => {
    const handleScroll = () => {
      if (!yourRankRef.current) return;
      const rect = yourRankRef.current.getBoundingClientRect();
      // Show sticky bar once the main card scrolls past the viewport top
      if (rect.bottom < 50) {
        setShowStickyRank(true);
      } else {
        setShowStickyRank(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate Total Live Verified Student Income
  const totalVerifiedIncome = useMemo(() => {
    return participants.reduce((acc, curr) => acc + curr.income, 0);
  }, [participants]);

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<Category, number> = {
      all: mode === 'individual' ? participants.length : teams.length,
      freelancing: 0,
      building: 0,
      content: 0,
      tutoring: 0,
      selling: 0,
      other: 0,
    };

    const targetList = mode === 'individual' ? participants : teams;
    targetList.forEach((item) => {
      if (item.category && counts[item.category] !== undefined) {
        counts[item.category]++;
      }
    });

    return counts;
  }, [participants, teams, mode]);

  // Filtered and Sorted Dataset
  const processedItems = useMemo(() => {
    let list: (Participant | Team)[] = mode === 'individual' ? [...participants] : [...teams];

    // 1. Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter((item) => {
        if (mode === 'individual') {
          const p = item as Participant;
          return (
            p.name.toLowerCase().includes(q) ||
            p.displayName.toLowerCase().includes(q) ||
            p.college.toLowerCase().includes(q) ||
            (p.hustleTitle && p.hustleTitle.toLowerCase().includes(q))
          );
        } else {
          const t = item as Team;
          return (
            t.teamName.toLowerCase().includes(q) ||
            t.members.some((m) => m.name.toLowerCase().includes(q) || m.college.toLowerCase().includes(q))
          );
        }
      });
    }

    // 2. Category Filter
    if (selectedCategory !== 'all') {
      list = list.filter((item) => item.category === selectedCategory);
    }

    // 3. Special Filter Type
    if (selectedFilter === 'my_college') {
      const userCol = userProfile.college.toLowerCase();
      list = list.filter((item) => {
        if (mode === 'individual') {
          return (item as Participant).college.toLowerCase().includes(userCol);
        } else {
          return (item as Team).members.some((m) => m.college.toLowerCase().includes(userCol));
        }
      });
    } else if (selectedFilter === 'top_10') {
      list = list.filter((item) => item.rank <= 10);
    } else if (selectedFilter === 'rising_fast') {
      list = list.filter((item) => item.rankChange >= 3);
    }

    // 4. Time Range Calculation for Income
    // We sort according to selected sort option:
    list.sort((a, b) => {
      const getAmount = (item: Participant | Team) => {
        if (mode === 'individual') {
          const p = item as Participant;
          return timeRange === 'today' ? p.incomeToday : timeRange === 'week' ? p.incomeThisWeek : p.income;
        } else {
          const t = item as Team;
          return timeRange === 'today' ? t.combinedIncomeToday : timeRange === 'week' ? t.combinedIncomeThisWeek : t.combinedIncome;
        }
      };

      if (selectedSort === 'income') {
        return getAmount(b) - getAmount(a);
      } else if (selectedSort === 'movement') {
        return b.rankChange - a.rankChange;
      } else {
        // default rank
        return a.rank - b.rank;
      }
    });

    return list;
  }, [participants, teams, mode, searchQuery, selectedCategory, selectedFilter, selectedSort, timeRange, userProfile.college]);

  // Top 3 for Podium
  const topParticipants = useMemo(() => {
    return [...participants].sort((a, b) => a.rank - b.rank).slice(0, 3);
  }, [participants]);

  const topTeams = useMemo(() => {
    return [...teams].sort((a, b) => a.rank - b.rank).slice(0, 3);
  }, [teams]);

  // Handlers
  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedFilter('all');
    setTimeRange('overall');
    setSelectedSort('rank');
  };

  const isFiltered = Boolean(
    searchQuery ||
    selectedCategory !== 'all' ||
    selectedFilter !== 'all' ||
    timeRange !== 'overall' ||
    selectedSort !== 'rank'
  );

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Earning Submission Handler
  const handleSubmitSuccess = (amount: number, category: Category, title: string) => {
    // 1. Update user profile
    const newIncome = userProfile.income + amount;
    const climbedPositions = Math.min(Math.floor(amount / 500) + 1, 6);
    const newRank = Math.max(userProfile.rank - climbedPositions, 1);
    const newGap = Math.max(850 - (amount % 800), 250);

    setUserProfile((prev) => ({
      ...prev,
      income: newIncome,
      rank: newRank,
      previousRank: prev.rank,
      rankChange: prev.rankChange + climbedPositions,
      gapToNextRank: newGap,
      category: category,
    }));

    // 2. Update participants list
    setParticipants((prev) =>
      prev.map((p) =>
        p.isCurrentUser
          ? {
              ...p,
              income: newIncome,
              rank: newRank,
              rankChange: p.rankChange + climbedPositions,
              hustleTitle: title,
            }
          : p
      )
    );

    // 3. Trigger celebratory toast
    setActiveToast({
      id: 'toast-climbed',
      type: 'climbed',
      title: `🔥 Climbed to #${newRank}!`,
      body: `Verified ₹${amount.toLocaleString('en-IN')}! You jumped ${climbedPositions} positions on the live board.`,
      ctaText: 'Share My New Rank',
      action: () => setIsShareModalOpen(true),
    });
  };

  // Simulation: Overtake
  const handleSimulateOvertake = () => {
    setUserProfile((prev) => ({
      ...prev,
      rank: 28,
      previousRank: 27,
      rankChange: prev.rankChange - 1,
      gapToNextRank: 450,
      nextRankNumber: 27,
      nextRankParticipantName: 'Rahul Kumar',
    }));

    setActiveToast({
      id: 'toast-overtaken',
      type: 'overtaken',
      title: '👀 You just got overtaken!',
      body: 'Rahul Kumar logged ₹13,300 and moved ahead of you. You are now #28. Earn ₹450 to take your spot back.',
      ctaText: 'Reclaim My Spot',
      action: () => setIsSubmitModalOpen(true),
    });
  };

  // Simulation: Climb
  const handleSimulateClimb = () => {
    setUserProfile((prev) => ({
      ...prev,
      income: prev.income + 2500,
      rank: 24,
      previousRank: 27,
      rankChange: prev.rankChange + 3,
      gapToNextRank: 600,
      nextRankNumber: 23,
      nextRankParticipantName: 'Anika Pillai',
    }));

    setActiveToast({
      id: 'toast-climb-sim',
      type: 'climbed',
      title: '🚀 Position Leap! Now #24',
      body: 'Logged ₹2,500 from Webflow design! You climbed past Priya, Manish & Harsh.',
      ctaText: 'Share My Rank',
      action: () => setIsShareModalOpen(true),
    });
  };

  // Simulation: Toggle Zero State
  const handleToggleZeroState = () => {
    if (!isZeroState) {
      setUserProfile((prev) => ({
        ...prev,
        income: 0,
        rank: 0,
        rankChange: 0,
        gapToNextRank: 500,
        nextRankNumber: 38,
        nextRankParticipantName: 'Simran Walia',
      }));
      setIsZeroState(true);
    } else {
      setUserProfile(INITIAL_USER_PROFILE);
      setIsZeroState(false);
    }
  };

  const handleResetSimulation = () => {
    setUserProfile(INITIAL_USER_PROFILE);
    setParticipants(MOCK_PARTICIPANTS);
    setTeams(MOCK_TEAMS);
    setIsZeroState(false);
    setActiveToast(null);
  };

  const handleUpdatePrivacy = (
    setting: 'full' | 'short' | 'anonymous',
    hideEarnings: boolean
  ) => {
    const disp = setting === 'full' ? 'Aarav Sharma' : setting === 'short' ? 'Aarav S.' : 'A. S.';
    setUserProfile((prev) => ({
      ...prev,
      privacySetting: setting,
      displayName: disp,
      hideEarnings: hideEarnings,
    }));
  };

  const handleUpdateNotificationPreferences = (
    optIn: boolean,
    phone: string,
    freq: 'instant' | 'daily' | 'weekly'
  ) => {
    setUserProfile((prev) => ({
      ...prev,
      notificationOptIn: optIn,
      notificationPhone: phone,
      notificationFrequency: freq,
    }));
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-neutral-100 flex flex-col selection:bg-[#BEFF00] selection:text-black">
      
      {/* 1. Primary Header */}
      <Header
        onOpenSubmitModal={() => setIsSubmitModalOpen(true)}
        onOpenWhatsAppModal={() => setIsWhatsAppModalOpen(true)}
        onOpenPrivacyModal={() => setIsPrivacyModalOpen(true)}
        onOpenVerificationModal={() => setIsVerificationModalOpen(true)}
        scrollToSection={scrollToSection}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        
        {/* 2. Challenge Hero with Live Countdown & Stats */}
        <Hero
          onExploreClick={() => scrollToSection('leaderboard-main')}
          onOpenSubmitModal={() => setIsSubmitModalOpen(true)}
          totalIncomeCount={totalVerifiedIncome}
        />

        {/* 3. Main Leaderboard Experience Container */}
        <div id="leaderboard-main" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
          
          {/* Simulation Controls Banner (Interactive Reviewer/User Sandbox) */}
          <LiveSimulationBar
            onSimulateOvertake={handleSimulateOvertake}
            onSimulateClimb={handleSimulateClimb}
            onResetSimulation={handleResetSimulation}
            onToggleZeroState={handleToggleZeroState}
            isZeroState={isZeroState}
          />

          {/* 4. Individual / Team Toggle */}
          <LeaderboardModeToggle
            mode={mode}
            onChange={setMode}
            individualCount={participants.length}
            teamCount={teams.length}
          />

          {/* 5. Top 3 Podium (Dominant Visual Hierarchy) */}
          <Podium
            mode={mode}
            topParticipants={topParticipants}
            topTeams={topTeams}
            onSelectParticipant={(p) => {
              setSelectedDetailItem(p);
            }}
            onSelectTeam={(t) => {
              setSelectedDetailItem(t);
            }}
          />

          {/* 6. YOUR RANK — THE MOTIVATION ENGINE */}
          <div ref={yourRankRef}>
            {isZeroState ? (
              // Edge State: New User / ₹0 State
              <div className="my-6 sm:my-8 rounded-2xl sm:rounded-3xl bg-[#111111] border-2 border-dashed border-[#BEFF00]/40 p-6 sm:p-8 text-center space-y-4 shadow-xl">
                <div className="w-14 h-14 rounded-2xl bg-[#BEFF00]/10 border border-[#BEFF00]/30 flex items-center justify-center mx-auto text-[#BEFF00] font-mono text-2xl font-black">
                  ₹0
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-mono uppercase text-[#BEFF00] font-bold tracking-wider">
                    NEW HUSTLER ONBOARDING
                  </span>
                  <h3 className="font-heading text-2xl sm:text-3xl font-black uppercase text-white">
                    No Rank Yet — Earn Your First ₹
                  </h3>
                  <p className="text-sm text-neutral-400 max-w-md mx-auto">
                    You haven&apos;t logged verified income yet. Complete your first client gig or sell your first product to claim your rank on the leaderboard!
                  </p>
                </div>
                <button
                  onClick={() => setIsSubmitModalOpen(true)}
                  className="px-6 py-3 rounded-xl bg-[#BEFF00] hover:bg-[#aee600] text-black font-extrabold text-sm tracking-tight shadow-md transition-all active:scale-95"
                >
                  Start Earning & Submit Proof →
                </button>
              </div>
            ) : (
              // Regular User Motivation Engine
              <YourRank
                userProfile={userProfile}
                onOpenShareModal={() => setIsShareModalOpen(true)}
                onOpenSubmitModal={() => setIsSubmitModalOpen(true)}
                onOpenWhatsAppModal={() => setIsWhatsAppModalOpen(true)}
                onOpenPrivacyModal={() => setIsPrivacyModalOpen(true)}
                onViewLeaderboardRow={() => {
                  const el = document.getElementById(`leaderboard-row-user-current`);
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    el.classList.add('ring-2', 'ring-[#BEFF00]');
                    setTimeout(() => el.classList.remove('ring-2', 'ring-[#BEFF00]'), 2000);
                  }
                }}
              />
            )}
          </div>

          {/* 7. Category Filter ("Explore by hustle") */}
          <CategoryFilter
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            categoryCounts={categoryCounts}
          />

          {/* 8. Search & Functional Filter Bar */}
          <FilterBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedFilter={selectedFilter}
            onSelectFilter={setSelectedFilter}
            selectedTimeRange={timeRange}
            onSelectTimeRange={setTimeRange}
            selectedSort={selectedSort}
            onSelectSort={setSelectedSort}
            userCollege={userProfile.college}
            totalResultsCount={processedItems.length}
            onResetFilters={handleResetFilters}
            isFiltered={isFiltered}
          />

          {/* 9. Interactive Leaderboard Table & Mobile Cards */}
          <LeaderboardTable
            items={processedItems}
            mode={mode}
            onSelectParticipant={(p) => setSelectedDetailItem(p)}
            onSelectTeam={(t) => setSelectedDetailItem(t)}
            onOpenVerificationModal={() => setIsVerificationModalOpen(true)}
          />

          {/* 10. Fastest Risers Module */}
          <FastestRisers
            onSelectRiser={(id) => {
              const found = participants.find((p) => p.id === id);
              if (found) setSelectedDetailItem(found);
            }}
          />

          {/* 11. How Rankings Work & Trust Section */}
          <RankingInfo
            onOpenVerificationModal={() => setIsVerificationModalOpen(true)}
            onOpenSubmitModal={() => setIsSubmitModalOpen(true)}
          />

        </div>
      </main>

      {/* 12. Sticky Mobile/Desktop Rank Bar */}
      <StickyRankBar
        userProfile={userProfile}
        visible={showStickyRank && !isZeroState}
        onOpenShareModal={() => setIsShareModalOpen(true)}
        onOpenSubmitModal={() => setIsSubmitModalOpen(true)}
        onScrollToRank={() => {
          if (yourRankRef.current) {
            yourRankRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }}
      />

      {/* 13. Dynamic Toast Alert */}
      <NotificationToast
        toast={activeToast}
        onDismiss={() => setActiveToast(null)}
      />

      {/* 14. Modals & Dialogs */}
      {/* Verification SLA & Trust Rules Modal */}
      <VerificationModal
        isOpen={isVerificationModalOpen}
        onClose={() => setIsVerificationModalOpen(false)}
      />

      {/* Share Rank Generator Card Modal */}
      <ShareRankModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        userProfile={userProfile}
      />

      {/* WhatsApp Notification Preferences Modal */}
      <WhatsAppNotificationModal
        isOpen={isWhatsAppModalOpen}
        onClose={() => setIsWhatsAppModalOpen(false)}
        userProfile={userProfile}
        onUpdatePreferences={handleUpdateNotificationPreferences}
      />

      {/* Privacy Settings Modal */}
      <PrivacySettingsModal
        isOpen={isPrivacyModalOpen}
        onClose={() => setIsPrivacyModalOpen(false)}
        userProfile={userProfile}
        onUpdatePrivacy={handleUpdatePrivacy}
      />

      {/* Submit New Earning Modal */}
      <SubmitEarningModal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        onSubmitSuccess={handleSubmitSuccess}
      />

      {/* Participant / Team Detail Inspector Modal */}
      <ParticipantDetailModal
        item={selectedDetailItem}
        mode={mode}
        isOpen={Boolean(selectedDetailItem)}
        onClose={() => setSelectedDetailItem(null)}
        onOpenSubmitModal={() => {
          setSelectedDetailItem(null);
          setIsSubmitModalOpen(true);
        }}
      />

      {/* 15. Footer */}
      <Footer
        onOpenVerificationModal={() => setIsVerificationModalOpen(true)}
        onOpenWhatsAppModal={() => setIsWhatsAppModalOpen(true)}
        onOpenPrivacyModal={() => setIsPrivacyModalOpen(true)}
      />

    </div>
  );
}
