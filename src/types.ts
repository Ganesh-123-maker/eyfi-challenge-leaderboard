export type VerificationStatus = 'verified' | 'pending' | 'under_review';

export type Category = 
  | 'all'
  | 'freelancing'
  | 'tutoring'
  | 'selling'
  | 'content'
  | 'building'
  | 'other';

export type LeaderboardType = 'individual' | 'team' | 'college';
export type TimeRange = 'overall' | 'week' | 'today';
export type FilterType = 'all' | 'my_college' | 'top_10' | 'rising_fast';
export type SortOption = 'income' | 'rank' | 'movement';

export type BadgeType = 
  | 'TOP EARNER'
  | 'ON FIRE'
  | 'FASTEST RISER'
  | 'CONSISTENT HUSTLER'
  | 'FIRST TIMER'
  | 'WEEKLY CHAMPION'
  | '10K CLUB'
  | '50K CLUB'
  | '100K CLUB';

export interface Participant {
  id: string;
  name: string;
  displayName: string;
  college: string;
  collegeShort: string;
  avatar: string;
  income: number;
  incomeThisWeek: number;
  incomeToday: number;
  rank: number;
  previousRank: number;
  rankChange: number; // positive = climbed, negative = dropped, 0 = unchanged
  category: Category;
  verificationStatus: VerificationStatus;
  badge?: BadgeType;
  badges?: BadgeType[];
  proofCount: number;
  isCurrentUser?: boolean;
  hustleTitle?: string;
  lastActive?: string;
  isTied?: boolean;
  velocitySparkline?: number[];
  streakDays?: number;
  caseStudyId?: string;
}

export interface TeamMember {
  name: string;
  avatar: string;
  college: string;
  contribution: number;
}

export interface Team {
  id: string;
  teamName: string;
  avatar: string;
  members: TeamMember[];
  combinedIncome: number;
  combinedIncomeThisWeek: number;
  combinedIncomeToday: number;
  rank: number;
  previousRank: number;
  rankChange: number;
  category: Category;
  verificationStatus: VerificationStatus;
  badge?: BadgeType;
  isCurrentUserTeam?: boolean;
}

export interface CollegeRanking {
  id: string;
  college: string;
  collegeShort: string;
  totalIncome: number;
  totalIncomeThisWeek: number;
  totalIncomeToday: number;
  participantCount: number;
  rank: number;
  previousRank: number;
  rankChange: number;
  topContributorName: string;
  topContributorAvatar: string;
  topContributorAmount: number;
  badge?: string;
  isUserCollege?: boolean;
}

export interface UserRankProfile {
  id: string;
  name: string;
  displayName: string;
  college: string;
  avatar: string;
  income: number;
  rank: number;
  previousRank: number;
  rankChange: number;
  gapToNextRank: number;
  nextRankParticipantName: string;
  nextRankParticipantAvatar?: string;
  nextRankParticipantCollege?: string;
  nextRankNumber: number;
  gapToTop10: number;
  top10CutoffIncome: number;
  category: Category;
  verificationStatus: VerificationStatus;
  privacySetting: 'full' | 'short' | 'anonymous';
  hideEarnings: boolean;
  notificationOptIn: boolean;
  notificationPhone?: string;
  notificationFrequency?: 'instant' | 'daily' | 'weekly';
  streakDays: number;
  streakActive: boolean;
  unlockedMilestonesCount: number;
}

export interface Bounty {
  id: string;
  title: string;
  reward: number;
  category: Category;
  sponsorName: string;
  sponsorLogo?: string;
  deadline: string;
  spotsLeft: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  tags: string[];
  description: string;
  deliverable: string;
  claimedByYou?: boolean;
}

export interface CaseStudy {
  id: string;
  participantId: string;
  name: string;
  college: string;
  avatar: string;
  hustleTitle: string;
  verifiedAmount: number;
  category: Category;
  storySummary: string;
  howTheyAcquiredClient: string;
  toolsUsed: string[];
  timeToFirstRupee: string;
  keyPlaybookTips: string[];
  proofImages: string[];
  clientTestimonial?: string;
}

export interface MilestoneReward {
  id: string;
  targetIncome: number;
  title: string;
  rewardDescription: string;
  iconName: string;
  claimed: boolean;
  unlocked: boolean;
  badgeText: string;
}

export interface PastWave {
  id: string;
  name: string;
  period: string;
  totalPool: string;
  totalVerifiedEarnings: string;
  participantsCount: number;
  champion: {
    name: string;
    avatar: string;
    college: string;
    income: number;
    hustle: string;
  };
  runnerUp: {
    name: string;
    avatar: string;
    college: string;
    income: number;
  };
  thirdPlace: {
    name: string;
    avatar: string;
    college: string;
    income: number;
  };
}

export interface WhileAwayRecapData {
  hoursAway: number;
  overtakenCount: number;
  climbedCount: number;
  newVerifiedVolume: number;
  collegeRankChange: number;
  collegeName: string;
  newBountiesCount: number;
  closestRival: {
    name: string;
    gap: number;
    rank: number;
  };
}

