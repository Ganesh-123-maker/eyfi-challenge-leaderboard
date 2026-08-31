export type VerificationStatus = 'verified' | 'pending' | 'under_review';

export type Category = 
  | 'all'
  | 'freelancing'
  | 'tutoring'
  | 'selling'
  | 'content'
  | 'building'
  | 'other';

export type LeaderboardType = 'individual' | 'team';
export type TimeRange = 'overall' | 'week' | 'today';
export type FilterType = 'all' | 'my_college' | 'top_10' | 'rising_fast';
export type SortOption = 'income' | 'rank' | 'movement';

export type BadgeType = 
  | 'TOP EARNER'
  | 'ON FIRE'
  | 'FASTEST RISER'
  | 'CONSISTENT HUSTLER'
  | 'FIRST TIMER'
  | 'WEEKLY CHAMPION';

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
  proofCount: number;
  isCurrentUser?: boolean;
  hustleTitle?: string;
  lastActive?: string;
  isTied?: boolean;
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
  nextRankNumber: number;
  category: Category;
  verificationStatus: VerificationStatus;
  privacySetting: 'full' | 'short' | 'anonymous';
  hideEarnings: boolean;
  notificationOptIn: boolean;
  notificationPhone?: string;
  notificationFrequency?: 'instant' | 'daily' | 'weekly';
}
