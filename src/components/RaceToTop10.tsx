import React, { useState } from 'react';
import { 
  Trophy, 
  Target, 
  Sparkles, 
  TrendingUp, 
  ChevronRight, 
  Zap, 
  CheckCircle2, 
  ArrowRight,
  Flame,
  HelpCircle,
  Briefcase,
  Code,
  Video,
  GraduationCap,
  ShoppingBag
} from 'lucide-react';
import { UserRankProfile, Category } from '../types';
import { formatINR } from '../utils/formatters';

interface RaceToTop10Props {
  userProfile: UserRankProfile;
  onOpenSubmitModal: () => void;
  onSelectCategoryIdeas?: (category: Category) => void;
}

const ACTIONABLE_EARNING_IDEAS: Record<Category, { title: string; payout: number; turnaround: string; description: string; icon: any }[]> = {
  freelancing: [
    { title: '1 Framer Landing Page Redesign', payout: 15000, turnaround: '48 Hours', description: 'Remake a local startup landing page in Framer with smooth scroll effects.', icon: Briefcase },
    { title: '2 Brand Identity & Logo Packages', payout: 10000, turnaround: '3 Days', description: 'Design vector logo marks, color tokens, and business card mockups.', icon: Sparkles },
    { title: '3 Webflow CMS Setup & SEO Fixes', payout: 7500, turnaround: '24 Hours', description: 'Optimize mobile responsiveness and page speed for small agency sites.', icon: Zap },
  ],
  building: [
    { title: '1 Telegram Lead Alert Bot', payout: 6000, turnaround: '24 Hours', description: 'Build Python webhook scraper notifying clients of price drops or leads.', icon: Code },
    { title: '1 Next.js Fullstack Dashboard MVP', payout: 22000, turnaround: '4 Days', description: 'Connect Supabase Auth + Stripe checkout for an early-stage SaaS founder.', icon: Target },
    { title: '2 Custom Chrome Extensions', payout: 8000, turnaround: '2 Days', description: 'Automate repetitive LinkedIn outreach or form submissions.', icon: Zap },
  ],
  content: [
    { title: '4 Short-Form Viral Video Edits', payout: 6000, turnaround: '24 Hours', description: 'Cut podcasts into engaging 9:16 reels with Alex Hormozi-style captions.', icon: Video },
    { title: '1 Retainer YouTube Thumbnail Pack', payout: 4500, turnaround: '48 Hours', description: 'Deliver 6 high-CTR thumbnails for tech and finance channels.', icon: Sparkles },
    { title: '2 Ghostwritten LinkedIn Longposts', payout: 3500, turnaround: '1 Day', description: 'Turn podcast transcripts into thought leadership carousel posts.', icon: Briefcase },
  ],
  tutoring: [
    { title: '4 JEE / NEET Physics Doubt Sprints', payout: 4000, turnaround: 'Weekend', description: '1-on-1 problem-solving sessions focusing on high-weightage mechanics.', icon: GraduationCap },
    { title: '1 Python for Data Science Batch', payout: 12000, turnaround: '1 Week', description: 'Group cohort of 4 junior college students teaching pandas & numpy.', icon: GraduationCap },
    { title: '2 College Placement Mock Interviews', payout: 2500, turnaround: '2 Days', description: 'Resume roast + live DSA coding mock interview with feedback.', icon: Target },
  ],
  selling: [
    { title: '10 Custom College Oversized Tees', payout: 3500, turnaround: '3 Days', description: 'Take pre-orders for club fest merchandise and fulfill with local printer.', icon: ShoppingBag },
    { title: '15 Handcrafted Scented Candle Kits', payout: 4500, turnaround: '2 Days', description: 'Sell hostel-warming gifts and desk decor during campus festivals.', icon: Sparkles },
    { title: '20 Notion Template Student Bundles', payout: 5000, turnaround: 'Instant', description: 'Sell digital exam planners and semester GPA tracking templates.', icon: Zap },
  ],
  all: [
    { title: 'Close 1 Webflow or Framer Site', payout: 15000, turnaround: '48 Hours', description: 'Quickest high-ticket path to vault directly into the top 15.', icon: Briefcase },
    { title: '2 Retainer Content or Video Gigs', payout: 8000, turnaround: '2 Days', description: 'Recurring client contracts providing steady weekly climb velocity.', icon: Video },
    { title: 'Pick up an active ₹8,500 Bounty', payout: 8500, turnaround: '3 Days', description: 'Apply for verified sponsor bounties on the live EYFI Bounty Board.', icon: Target },
  ],
  other: [
    { title: 'Campus Event Photo & Reel Coverage', payout: 5000, turnaround: '1 Day', description: 'Photograph department orientation or inter-college sports meet.', icon: Sparkles },
    { title: 'Gym Diet & Workout Consultation', payout: 3000, turnaround: 'Instant', description: 'Customized macros and beginner lifting schedules for hostelers.', icon: Target },
  ]
};

export const RaceToTop10: React.FC<RaceToTop10Props> = ({
  userProfile,
  onOpenSubmitModal,
}) => {
  const [activeTab, setActiveTab] = useState<Category>('freelancing');


  const gapToTop10 = Math.max(userProfile.top10CutoffIncome - userProfile.income, 0);
  const percentToTop10 = Math.min(Math.round((userProfile.income / userProfile.top10CutoffIncome) * 100), 100);

  const isAlreadyTop10 = userProfile.rank <= 10 && userProfile.rank > 0;

  return (
    <div id="race-to-top-10-card" className="bento-card p-5 sm:p-7 md:p-8 my-6 relative overflow-hidden bg-gradient-to-br from-[#121212] via-[#101010] to-[#0A0A0A] border border-neutral-800 hover:border-[#BEFF00]/30 transition-all">
      
      
      <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>

      
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/25 text-amber-300 font-mono text-xs font-bold uppercase tracking-wider">
            <Trophy className="w-3.5 h-3.5" />
            <span>Race to the Top 10 Cutoff</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-heading font-black uppercase text-white tracking-wide">
            {isAlreadyTop10 ? '👑 Defending Your Top 10 Spot' : '🎯 Your Path to the Prize Cutoff'}
          </h3>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-xl">
            Top 10 earners unlock the ₹50,000 cash pool, Angel Investor intros, and the EYFI Wave 01 Trophy.
          </p>
        </div>

        
        <div className="p-3 sm:p-4 rounded-2xl bg-[#161616] border border-neutral-800 text-right space-y-0.5">
          <div className="text-[11px] font-mono text-neutral-400 uppercase">#10 Cutoff (Zoya Khan)</div>
          <div className="text-lg sm:text-xl font-mono font-black text-amber-400">
            {formatINR(userProfile.top10CutoffIncome)}
          </div>
          <div className="text-[10px] text-neutral-500 font-mono">
            {isAlreadyTop10 ? 'You are inside the cutoff!' : `${formatINR(gapToTop10)} to enter top 10`}
          </div>
        </div>
      </div>

      
      <div className="space-y-3 mb-8 p-4 sm:p-5 rounded-2xl bg-[#141414] border border-neutral-850">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-white font-bold flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5 text-[#BEFF00]" />
            Your Standing: #{userProfile.rank} ({formatINR(userProfile.income)})
          </span>
          <span className="text-amber-400 font-bold">
            {percentToTop10}% of Top 10 Cutoff
          </span>
        </div>

        
        <div className="relative h-4 bg-neutral-950 rounded-full overflow-hidden border border-neutral-800 p-0.5">
          <div 
            className="h-full bg-gradient-to-r from-emerald-500 via-[#BEFF00] to-amber-400 rounded-full transition-all duration-700 relative"
            style={{ width: `${Math.max(percentToTop10, 8)}%` }}
          >
            <div className="absolute right-0 top-0 bottom-0 w-2 bg-white rounded-full shadow-[0_0_8px_#ffffff]"></div>
          </div>
        </div>

        
        <div className="grid grid-cols-3 gap-2 pt-2 text-[11px] font-mono">
          <div className={`p-2.5 rounded-xl border ${userProfile.rank <= 25 ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-300' : 'bg-[#161616] border-neutral-800 text-neutral-500'}`}>
            <div className="font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
              <span>Top 25 (#25)</span>
            </div>
            <div className="text-[10px] text-neutral-400 mt-0.5">₹13,800 threshold</div>
          </div>

          <div className={`p-2.5 rounded-xl border ${userProfile.rank <= 10 ? 'bg-amber-950/40 border-amber-500/40 text-amber-300' : 'bg-[#161616] border-neutral-800 text-neutral-400'}`}>
            <div className="font-bold flex items-center gap-1 text-amber-300">
              <Trophy className="w-3 h-3 text-amber-400" />
              <span>Top 10 Prize (#10)</span>
            </div>
            <div className="text-[10px] text-neutral-400 mt-0.5">₹39,500 threshold</div>
          </div>

          <div className={`p-2.5 rounded-xl border ${userProfile.rank <= 3 ? 'bg-[#BEFF00]/15 border-[#BEFF00]/40 text-[#BEFF00]' : 'bg-[#161616] border-neutral-800 text-neutral-500'}`}>
            <div className="font-bold flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#BEFF00]" />
              <span>Podium (#3)</span>
            </div>
            <div className="text-[10px] text-neutral-400 mt-0.5">₹94,600 threshold</div>
          </div>
        </div>
      </div>

      
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#BEFF00]" />
            <h4 className="font-heading text-lg sm:text-xl font-bold uppercase text-white">
              Actionable Playbooks to Bridge the {formatINR(gapToTop10)} Gap
            </h4>
          </div>
          <span className="text-xs font-mono text-neutral-400">
            Real proven student formulas
          </span>
        </div>

        
        <div className="flex flex-wrap gap-2 pb-1">
          {(['freelancing', 'building', 'content', 'tutoring', 'selling'] as Category[]).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold capitalize transition-all border ${
                activeTab === cat
                  ? 'bg-[#BEFF00] text-black border-[#BEFF00] shadow-sm'
                  : 'bg-[#161616] text-neutral-400 hover:text-white border-neutral-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {(ACTIONABLE_EARNING_IDEAS[activeTab] || ACTIONABLE_EARNING_IDEAS.freelancing).map((idea, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-[#161616] border border-neutral-800 hover:border-neutral-700 flex flex-col justify-between space-y-3 group transition-all"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded-md bg-[#BEFF00]/10 text-[#BEFF00] font-mono text-[10px] font-extrabold border border-[#BEFF00]/20">
                    +{formatINR(idea.payout)}
                  </span>
                  <span className="text-[10px] font-mono text-neutral-400">
                    ⏱ {idea.turnaround}
                  </span>
                </div>
                <div className="font-bold text-sm text-white group-hover:text-[#BEFF00] transition-colors leading-snug">
                  {idea.title}
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  {idea.description}
                </p>
              </div>

              <button
                onClick={onOpenSubmitModal}
                className="w-full py-2 px-3 rounded-xl bg-neutral-900 hover:bg-[#BEFF00] text-neutral-300 hover:text-black font-mono text-xs font-bold transition-all flex items-center justify-center gap-1.5 border border-neutral-800 hover:border-transparent"
              >
                <span>Log This Earning</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
};
