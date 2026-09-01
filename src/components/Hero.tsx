import React, { useState, useEffect } from 'react';
import { Sparkles, Trophy, Users, School, ArrowDown, Activity, Clock, Flame, ChevronRight } from 'lucide-react';
import { PRIZE_POOL_STATS } from '../data/mockData';

interface HeroProps {
  onExploreClick: () => void;
  onOpenSubmitModal: () => void;
  totalIncomeCount: number;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreClick,
  onOpenSubmitModal,
  totalIncomeCount,
}) => {

  const [timeLeft, setTimeLeft] = useState({
    days: 12,
    hours: 8,
    minutes: 42,
    seconds: 17,
  });

  const [secondsAgo, setSecondsAgo] = useState(18);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    const updateTicker = setInterval(() => {
      setSecondsAgo((prev) => (prev >= 45 ? 3 : prev + 1));
    }, 1000);

    return () => {
      clearInterval(timer);
      clearInterval(updateTicker);
    };
  }, []);

  return (
    <section
      id="hero-section"
      className="relative pt-8 pb-12 sm:pt-14 sm:pb-16 overflow-hidden bg-rupee-pattern border-b border-neutral-900"
    >
      
      <div className="rupee-watermark text-9xl -top-8 -left-6 select-none opacity-20">₹</div>
      <div className="rupee-watermark text-8xl top-1/2 -right-8 select-none opacity-15">₹</div>
      <div className="rupee-watermark text-7xl bottom-2 left-1/3 select-none opacity-10">₹</div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 sm:mb-8">
          <div className="flex items-center gap-2 flex-wrap">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#141414] border border-neutral-800 text-xs font-semibold text-white backdrop-blur">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#BEFF00] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#BEFF00]"></span>
              </span>
              <span className="font-mono text-[#BEFF00] font-bold">LIVE COMPETITION</span>
              <span className="text-neutral-600">|</span>
              <span className="text-neutral-300 font-medium">{PRIZE_POOL_STATS.waveName}</span>
            </div>

            
            <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950/30 border border-amber-500/30 text-xs font-semibold text-amber-300">
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              <span>Prize Pool: <strong>{PRIZE_POOL_STATS.totalPrizePool}</strong></span>
            </div>
          </div>

          
          <div className="flex items-center gap-1.5 text-xs text-neutral-400 font-mono">
            <Activity className="w-3.5 h-3.5 text-[#BEFF00] animate-pulse" />
            <span>Updated {secondsAgo}s ago</span>
          </div>
        </div>

        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-5 text-left">
            <div className="inline-block">
              <span className="text-xs sm:text-sm font-mono uppercase tracking-widest text-[#BEFF00] font-bold bg-[#BEFF00]/10 px-3 py-1 rounded-md border border-[#BEFF00]/20">
                India&apos;s Student Earning Movement
              </span>
            </div>

            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-heading font-extrabold uppercase tracking-tight text-white leading-[0.9] drop-shadow-sm">
              who&apos;s earning <br />
              <span className="text-[#BEFF00] inline-flex items-center gap-2">
                the most?
                <span className="text-3xl sm:text-5xl lg:text-6xl text-white/40 font-mono font-normal">₹</span>
              </span>
            </h1>

            <p className="text-base sm:text-lg text-neutral-300 max-w-xl font-normal leading-relaxed">
              The challenge is live. See where you stand, climb the ranks, and earn your way to the top. <span className="text-[#BEFF00] font-semibold">&ldquo;Learn by doing&rdquo;</span> while in college.
            </p>

            
            <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
              <button
                onClick={onExploreClick}
                className="px-6 py-3.5 rounded-xl bg-[#BEFF00] hover:bg-[#aee600] active:scale-95 text-black font-extrabold text-sm sm:text-base tracking-tight transition-all shadow-[0_0_25px_rgba(190,255,0,0.3)] flex items-center gap-2"
                id="hero-view-leaderboard-btn"
              >
                <span>View Live Rankings</span>
                <ArrowDown className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenSubmitModal}
                className="px-5 py-3.5 rounded-xl bg-[#141414] hover:bg-neutral-800 active:scale-95 text-neutral-200 hover:text-white font-bold text-sm sm:text-base tracking-tight border border-neutral-800 transition-all flex items-center gap-2"
                id="hero-submit-earning-btn"
              >
                <Flame className="w-4 h-4 text-[#BEFF00]" />
                <span>Submit Income Proof</span>
              </button>
            </div>
          </div>

          
          <div className="lg:col-span-5">
            <div className="bento-card p-6 sm:p-7 relative overflow-hidden">
              
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#BEFF00]/10 blur-3xl pointer-events-none"></div>

              
              <div className="space-y-3 pb-6 border-b border-neutral-800/80">
                <div className="flex items-center justify-between text-xs text-neutral-400">
                  <span className="flex items-center gap-1.5 font-mono uppercase font-bold tracking-wider text-neutral-300">
                    <Clock className="w-3.5 h-3.5 text-[#BEFF00]" />
                    Challenge Ends In
                  </span>
                  <span className="text-[11px] text-neutral-500 font-mono">Wave 01 Deadline</span>
                </div>

                
                <div className="grid grid-cols-4 gap-2 text-center">
                  <div className="p-2.5 sm:p-3 rounded-xl bg-[#161616] border border-neutral-800">
                    <div className="font-mono text-2xl sm:text-3xl font-extrabold text-white">
                      {String(timeLeft.days).padStart(2, '0')}
                    </div>
                    <div className="text-[10px] text-neutral-400 uppercase font-mono tracking-widest mt-0.5">
                      Days
                    </div>
                  </div>
                  <div className="p-2.5 sm:p-3 rounded-xl bg-[#161616] border border-neutral-800">
                    <div className="font-mono text-2xl sm:text-3xl font-extrabold text-white">
                      {String(timeLeft.hours).padStart(2, '0')}
                    </div>
                    <div className="text-[10px] text-neutral-400 uppercase font-mono tracking-widest mt-0.5">
                      Hours
                    </div>
                  </div>
                  <div className="p-2.5 sm:p-3 rounded-xl bg-[#161616] border border-neutral-800">
                    <div className="font-mono text-2xl sm:text-3xl font-extrabold text-white">
                      {String(timeLeft.minutes).padStart(2, '0')}
                    </div>
                    <div className="text-[10px] text-neutral-400 uppercase font-mono tracking-widest mt-0.5">
                      Mins
                    </div>
                  </div>
                  <div className="p-2.5 sm:p-3 rounded-xl bg-[#161616] border border-neutral-800 ring-1 ring-[#BEFF00]/30">
                    <div className="font-mono text-2xl sm:text-3xl font-extrabold text-[#BEFF00]">
                      {String(timeLeft.seconds).padStart(2, '0')}
                    </div>
                    <div className="text-[10px] text-[#BEFF00]/80 uppercase font-mono tracking-widest mt-0.5">
                      Secs
                    </div>
                  </div>
                </div>
              </div>

              
              <div className="grid grid-cols-2 gap-3 pt-5">
                <div className="p-3 rounded-xl bg-[#161616]/70 border border-neutral-800">
                  <div className="text-[11px] text-neutral-400 font-medium">Total Verified Income</div>
                  <div className="font-mono text-lg sm:text-xl font-bold text-[#BEFF00] mt-0.5">
                    ₹{totalIncomeCount.toLocaleString('en-IN')}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#161616]/70 border border-neutral-800">
                  <div className="text-[11px] text-neutral-400 font-medium">Top 10 Incentive</div>
                  <div className="font-mono text-lg sm:text-xl font-bold text-amber-400 mt-0.5">
                    {PRIZE_POOL_STATS.top10Prize}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#161616]/70 border border-neutral-800 flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-neutral-800 text-neutral-300">
                    <Users className="w-4 h-4 text-[#BEFF00]" />
                  </div>
                  <div>
                    <div className="font-mono text-base font-bold text-white leading-tight">2,840+</div>
                    <div className="text-[10px] text-neutral-400">Active Hustlers</div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#161616]/70 border border-neutral-800 flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-neutral-800 text-neutral-300">
                    <School className="w-4 h-4 text-[#BEFF00]" />
                  </div>
                  <div>
                    <div className="font-mono text-base font-bold text-white leading-tight">142+</div>
                    <div className="text-[10px] text-neutral-400">Colleges in India</div>
                  </div>
                </div>
              </div>

              
              <div className="mt-4 pt-3.5 border-t border-neutral-800/80 flex items-center justify-between text-xs">
                <span className="text-neutral-400 italic">
                  &ldquo;if they could, so <span className="text-white font-semibold not-italic">CAN YOU</span>&rdquo;
                </span>
                <span className="text-[#BEFF00] text-[11px] font-semibold flex items-center">
                  Learn by doing <ChevronRight className="w-3 h-3 ml-0.5" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
