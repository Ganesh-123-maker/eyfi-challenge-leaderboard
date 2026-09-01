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
  RaceToTop10 
} from './components/RaceToTop10';
import { 
  CampusWars 
} from './components/CampusWars';
import { 
  BountyBoard 
} from './components/BountyBoard';
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
  HowIEarnedItModal 
} from './components/HowIEarnedItModal';
import { 
  MilestoneRewardsDrawer 
} from './components/MilestoneRewardsDrawer';
import { 
  ChallengeFriendModal 
} from './components/ChallengeFriendModal';
import { 
  WhileYouWereAwayModal 
} from './components/WhileYouWereAwayModal';
import { 
  HallOfFameModal 
} from './components/HallOfFameModal';
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
  Category,
  CollegeRanking,
  Bounty,
  MilestoneReward
} from './types';

import { 
  INITIAL_USER_PROFILE, 
  MOCK_PARTICIPANTS, 
  MOCK_TEAMS,
  MOCK_COLLEGES,
  MOCK_BOUNTIES,
  MOCK_CASE_STUDIES,
  MOCK_MILESTONES,
  MOCK_PAST_WAVES,
  MOCK_WHILE_AWAY_RECAP
} from './data/mockData';

export default function App() {

  const [participants, setParticipants] = useState<Participant[]>(MOCK_PARTICIPANTS);
  const [teams, setTeams] = useState<Team[]>(MOCK_TEAMS);
  const [colleges, setColleges] = useState<CollegeRanking[]>(MOCK_COLLEGES);
  const [bounties, setBounties] = useState<Bounty[]>(MOCK_BOUNTIES);
  const [milestones, setMilestones] = useState<MilestoneReward[]>(MOCK_MILESTONES);
  const [userProfile, setUserProfile] = useState<UserRankProfile>(INITIAL_USER_PROFILE);


  const [mode, setMode] = useState<LeaderboardType>('individual');
  const [timeRange, setTimeRange] = useState<TimeRange>('overall');
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [selectedFilter, setSelectedFilter] = useState<FilterType>('all');
  const [selectedSort, setSelectedSort] = useState<SortOption>('rank');
  const [searchQuery, setSearchQuery] = useState('');


  const [isVerificationModalOpen, setIsVerificationModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [selectedDetailItem, setSelectedDetailItem] = useState<Participant | Team | null>(null);
  

  const [isWhileAwayOpen, setIsWhileAwayOpen] = useState(false);
  const [isMilestonesOpen, setIsMilestonesOpen] = useState(false);
  const [isChallengeFriendOpen, setIsChallengeFriendOpen] = useState(false);
  const [isHallOfFameOpen, setIsHallOfFameOpen] = useState(false);
  const [selectedCaseStudyId, setSelectedCaseStudyId] = useState<string | null>(null);


  const [showStickyRank, setShowStickyRank] = useState(false);
  const yourRankRef = useRef<HTMLDivElement>(null);


  const [activeToast, setActiveToast] = useState<ToastMessage | null>(null);


  const [isZeroState, setIsZeroState] = useState(false);


  useEffect(() => {
    const hasSeenAway = sessionStorage.getItem('eyfi_seen_away_recap');
    if (!hasSeenAway) {

      const timer = setTimeout(() => {
        setIsWhileAwayOpen(true);
        sessionStorage.setItem('eyfi_seen_away_recap', 'true');
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);


  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const urlType = params.get('type');
      const urlPeriod = params.get('period');
      const urlCategory = params.get('category');
      const urlFilter = params.get('filter');
      const urlSort = params.get('sort');
      const urlSearch = params.get('search');

      if (urlType === 'team' || urlType === 'individual' || urlType === 'college') setMode(urlType);
      if (urlPeriod === 'overall' || urlPeriod === 'week' || urlPeriod === 'today') setTimeRange(urlPeriod);
      if (urlCategory) setSelectedCategory(urlCategory as Category);
      if (urlFilter) setSelectedFilter(urlFilter as FilterType);
      if (urlSort) setSelectedSort(urlSort as SortOption);
      if (urlSearch) setSearchQuery(urlSearch);
    } catch {

    }
  }, []);


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

    }
  }, [mode, timeRange, selectedCategory, selectedFilter, selectedSort, searchQuery]);


  useEffect(() => {
    const handleScroll = () => {
      if (!yourRankRef.current) return;
      const rect = yourRankRef.current.getBoundingClientRect();
      if (rect.bottom < 50) {
        setShowStickyRank(true);
      } else {
        setShowStickyRank(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  const totalVerifiedIncome = useMemo(() => {
    return participants.reduce((acc, curr) => acc + curr.income, 0);
  }, [participants]);


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


  const processedItems = useMemo(() => {
    let list: (Participant | Team)[] = mode === 'individual' ? [...participants] : [...teams];


    if (searchQuery && searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter((item) => {
        if (mode === 'individual') {
          const p = item as Participant;
          return (
            (p.name && p.name.toLowerCase().includes(q)) ||
            (p.displayName && p.displayName.toLowerCase().includes(q)) ||
            (p.college && p.college.toLowerCase().includes(q)) ||
            (p.hustleTitle && p.hustleTitle.toLowerCase().includes(q))
          );
        } else {
          const t = item as Team;
          return (
            (t.teamName && t.teamName.toLowerCase().includes(q)) ||
            (t.members && t.members.some((m) => 
              (m.name && m.name.toLowerCase().includes(q)) || 
              (m.college && m.college.toLowerCase().includes(q))
            ))
          );
        }
      });
    }


    if (selectedCategory !== 'all') {
      list = list.filter((item) => item.category === selectedCategory);
    }


    if (selectedFilter === 'my_college') {
      const userCol = (userProfile?.college || '').toLowerCase();
      list = list.filter((item) => {
        if (mode === 'individual') {
          const p = item as Participant;
          return p.college ? p.college.toLowerCase().includes(userCol) : false;
        } else {
          const t = item as Team;
          return t.members ? t.members.some((m) => m.college && m.college.toLowerCase().includes(userCol)) : false;
        }
      });
    } else if (selectedFilter === 'top_10') {
      list = list.filter((item) => item.rank <= 10);
    } else if (selectedFilter === 'rising_fast') {
      list = list.filter((item) => item.rankChange >= 3);
    }


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
        return a.rank - b.rank;
      }
    });

    return list;
  }, [participants, teams, mode, searchQuery, selectedCategory, selectedFilter, selectedSort, timeRange, userProfile.college]);


  const topParticipants = useMemo(() => {
    return [...participants].sort((a, b) => a.rank - b.rank).slice(0, 3);
  }, [participants]);

  const topTeams = useMemo(() => {
    return [...teams].sort((a, b) => a.rank - b.rank).slice(0, 3);
  }, [teams]);


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


  const handleSubmitSuccess = (amount: number, category: Category, title: string) => {
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
      streakDays: prev.streakDays + 1,
    }));

    setParticipants((prev) =>
      prev.map((p) =>
        p.isCurrentUser
          ? {
              ...p,
              income: newIncome,
              rank: newRank,
              rankChange: p.rankChange + climbedPositions,
              hustleTitle: title,
              streakDays: (p.streakDays || 4) + 1,
            }
          : p
      )
    );


    setColleges((prev) =>
      prev.map((c) =>
        c.isUserCollege
          ? {
              ...c,
              totalIncome: c.totalIncome + amount,
              rankChange: c.rankChange + 1,
            }
          : c
      )
    );


    setMilestones((prev) =>
      prev.map((m) => {
        if (newIncome >= m.targetIncome && m.status === 'locked') {
          return { ...m, status: 'unlocked' };
        }
        return m;
      })
    );

    setActiveToast({
      id: 'toast-climbed',
      type: 'climbed',
      title: `🔥 Climbed to #${newRank}!`,
      body: `Verified ₹${amount.toLocaleString('en-IN')}! You jumped ${climbedPositions} positions on the live board and boosted your college standing.`,
      ctaText: 'Share My New Rank',
      action: () => setIsShareModalOpen(true),
    });
  };


  const handleClaimBounty = (bountyId: string) => {
    const bounty = bounties.find((b) => b.id === bountyId);
    if (!bounty) return;

    setBounties((prev) =>
      prev.map((b) => (b.id === bountyId ? { ...b, status: 'claimed' as const } : b))
    );

    setActiveToast({
      id: `toast-bounty-${bountyId}`,
      type: 'climbed',
      title: `⚡ Bounty Claimed: ${bounty.title}`,
      body: `Complete this task within ${bounty.deadline} and submit proof to claim ₹${bounty.rewardINR.toLocaleString('en-IN')}.`,
      ctaText: 'Submit Proof When Done',
      action: () => setIsSubmitModalOpen(true),
    });
  };


  const handleClaimReward = (milestoneId: string) => {
    setMilestones((prev) =>
      prev.map((m) => (m.id === milestoneId ? { ...m, status: 'claimed' as const } : m))
    );

    const m = milestones.find((item) => item.id === milestoneId);
    setActiveToast({
      id: `toast-milestone-${milestoneId}`,
      type: 'climbed',
      title: `🎁 Perk Claimed: ${m?.rewardTitle}`,
      body: 'Check your email/WhatsApp for instructions to redeem your exclusive unlocked reward.',
    });
  };


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
    setColleges(MOCK_COLLEGES);
    setBounties(MOCK_BOUNTIES);
    setMilestones(MOCK_MILESTONES);
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
      
      
      <Header
        onOpenSubmitModal={() => setIsSubmitModalOpen(true)}
        onOpenWhatsAppModal={() => setIsWhatsAppModalOpen(true)}
        onOpenPrivacyModal={() => setIsPrivacyModalOpen(true)}
        onOpenVerificationModal={() => setIsVerificationModalOpen(true)}
        onOpenHallOfFame={() => setIsHallOfFameOpen(true)}
        onOpenMilestoneRewards={() => setIsMilestonesOpen(true)}
        scrollToSection={scrollToSection}
      />

      
      <main className="flex-1">
        
        
        <Hero
          onExploreClick={() => scrollToSection('leaderboard-main')}
          onOpenSubmitModal={() => setIsSubmitModalOpen(true)}
          totalIncomeCount={totalVerifiedIncome}
        />

        
        <div id="leaderboard-main" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 pb-12 sm:pb-16">
          
          
          <LiveSimulationBar
            onSimulateOvertake={handleSimulateOvertake}
            onSimulateClimb={handleSimulateClimb}
            onResetSimulation={handleResetSimulation}
            onToggleZeroState={handleToggleZeroState}
            isZeroState={isZeroState}
          />

          
          <LeaderboardModeToggle
            mode={mode}
            onChange={setMode}
            individualCount={participants.length}
            teamCount={teams.length}
            collegeCount={colleges.length}
          />

          
          {mode === 'college' ? (
            <div className="my-6">
              <CampusWars
                colleges={colleges}
                userCollege={userProfile.college}
                userCollegeName={userProfile.college}
                userCollegeRank={4}
                userContributionINR={userProfile.income}
                onOpenSubmitModal={() => setIsSubmitModalOpen(true)}
                onOpenShareModal={() => setIsShareModalOpen(true)}
              />
            </div>
          ) : (
            <>
              
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

              
              <div ref={yourRankRef}>
                {isZeroState ? (
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
                  <YourRank
                    userProfile={userProfile}
                    onOpenShareModal={() => setIsShareModalOpen(true)}
                    onOpenSubmitModal={() => setIsSubmitModalOpen(true)}
                    onOpenWhatsAppModal={() => setIsWhatsAppModalOpen(true)}
                    onOpenPrivacyModal={() => setIsPrivacyModalOpen(true)}
                    onOpenMilestoneRewards={() => setIsMilestonesOpen(true)}
                    onOpenChallengeFriend={() => setIsChallengeFriendOpen(true)}
                    onOpenBounties={() => scrollToSection('bounty-board-section')}
                    onOpenCaseStudy={(participantId) => setSelectedCaseStudyId(participantId || 'p-1')}
                    onOpenRaceToTop10={() => scrollToSection('race-to-top-10-card')}
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

              
              <div id="race-to-top-10-card">
                <RaceToTop10
                  userProfile={userProfile}
                  top10ThresholdINR={28400}
                  onOpenSubmitModal={() => setIsSubmitModalOpen(true)}
                  onOpenCaseStudy={(id) => setSelectedCaseStudyId(id || 'p-1')}
                  onOpenBounties={() => scrollToSection('bounty-board-section')}
                />
              </div>

              
              <CategoryFilter
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
                categoryCounts={categoryCounts}
              />

              
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

              
              <LeaderboardTable
                items={processedItems}
                mode={mode}
                onSelectParticipant={(p) => setSelectedDetailItem(p)}
                onSelectTeam={(t) => setSelectedDetailItem(t)}
                onOpenVerificationModal={() => setIsVerificationModalOpen(true)}
                onOpenCaseStudy={(participantId) => setSelectedCaseStudyId(participantId)}
              />
            </>
          )}

          
          <div id="campus-wars-section">
            <CampusWars
              colleges={colleges}
              userCollege={userProfile.college}
              userCollegeName={userProfile.college}
              userCollegeRank={4}
              userContributionINR={userProfile.income}
              onOpenSubmitModal={() => setIsSubmitModalOpen(true)}
              onOpenShareModal={() => setIsShareModalOpen(true)}
            />
          </div>

          
          <div id="bounty-board-section">
            <BountyBoard
              bounties={bounties}
              onClaimBounty={handleClaimBounty}
              onOpenSubmitModal={() => setIsSubmitModalOpen(true)}
            />
          </div>

          
          <div id="fastest-risers-section">
            <FastestRisers
              onSelectRiser={(id) => {
                const found = participants.find((p) => p.id === id);
                if (found) setSelectedDetailItem(found);
              }}
            />
          </div>

          
          <div id="how-it-works-section">
            <RankingInfo
              onOpenVerificationModal={() => setIsVerificationModalOpen(true)}
              onOpenSubmitModal={() => setIsSubmitModalOpen(true)}
            />
          </div>

        </div>
      </main>

      
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

      
      <NotificationToast
        toast={activeToast}
        onDismiss={() => setActiveToast(null)}
      />

      
      
      
      <VerificationModal
        isOpen={isVerificationModalOpen}
        onClose={() => setIsVerificationModalOpen(false)}
      />

      
      <ShareRankModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        userProfile={userProfile}
      />

      
      <WhatsAppNotificationModal
        isOpen={isWhatsAppModalOpen}
        onClose={() => setIsWhatsAppModalOpen(false)}
        userProfile={userProfile}
        onUpdatePreferences={handleUpdateNotificationPreferences}
      />

      
      <PrivacySettingsModal
        isOpen={isPrivacyModalOpen}
        onClose={() => setIsPrivacyModalOpen(false)}
        userProfile={userProfile}
        onUpdatePrivacy={handleUpdatePrivacy}
      />

      
      <SubmitEarningModal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        onSubmitSuccess={handleSubmitSuccess}
      />

      
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

      
      <HowIEarnedItModal
        participantId={selectedCaseStudyId}
        isOpen={Boolean(selectedCaseStudyId)}
        onClose={() => setSelectedCaseStudyId(null)}
        onOpenSubmitModal={() => {
          setSelectedCaseStudyId(null);
          setIsSubmitModalOpen(true);
        }}
        caseStudies={MOCK_CASE_STUDIES}
      />

      
      <MilestoneRewardsDrawer
        isOpen={isMilestonesOpen}
        onClose={() => setIsMilestonesOpen(false)}
        userProfile={userProfile}
        userIncome={userProfile.income}
        milestones={milestones}
        onClaimReward={handleClaimReward}
        onOpenSubmitModal={() => {
          setIsMilestonesOpen(false);
          setIsSubmitModalOpen(true);
        }}
      />

      
      <ChallengeFriendModal
        isOpen={isChallengeFriendOpen}
        onClose={() => setIsChallengeFriendOpen(false)}
        userProfile={userProfile}
      />

      
      <WhileYouWereAwayModal
        isOpen={isWhileAwayOpen}
        onClose={() => setIsWhileAwayOpen(false)}
        recap={MOCK_WHILE_AWAY_RECAP}
        data={MOCK_WHILE_AWAY_RECAP}
        userProfile={userProfile}
        onOpenSubmitModal={() => {
          setIsWhileAwayOpen(false);
          setIsSubmitModalOpen(true);
        }}
        onOpenWhatsAppModal={() => {
          setIsWhileAwayOpen(false);
          setIsWhatsAppModalOpen(true);
        }}
      />

      
      <HallOfFameModal
        isOpen={isHallOfFameOpen}
        onClose={() => setIsHallOfFameOpen(false)}
        pastWaves={MOCK_PAST_WAVES}
      />

      
      <Footer
        onOpenVerificationModal={() => setIsVerificationModalOpen(true)}
        onOpenWhatsAppModal={() => setIsWhatsAppModalOpen(true)}
        onOpenPrivacyModal={() => setIsPrivacyModalOpen(true)}
      />

    </div>
  );
}
