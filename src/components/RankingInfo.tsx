import React from 'react';
import { ShieldCheck, HelpCircle, ArrowRight, Zap, CheckCircle2, Clock, Award } from 'lucide-react';
import { HOW_IT_WORKS_STEPS } from '../data/mockData';

interface RankingInfoProps {
  onOpenVerificationModal: () => void;
  onOpenSubmitModal: () => void;
}

export const RankingInfo: React.FC<RankingInfoProps> = ({
  onOpenVerificationModal,
  onOpenSubmitModal,
}) => {
  return (
    <section id="how-it-works-section" className="my-12 sm:my-16 relative">
      
      {/* Background Watermark */}
      <div className="rupee-watermark text-8xl -top-6 -left-6 opacity-10">₹</div>

      <div className="bento-card p-6 sm:p-10 shadow-2xl space-y-8">
        
        {/* Section Header */}
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase font-bold tracking-widest text-[#BEFF00]">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Trust, Rules & Integrity</span>
            </div>
            <h3 className="text-3xl sm:text-4xl font-heading font-black uppercase text-white tracking-wide">
              How Rankings Work
            </h3>
            <p className="text-sm text-neutral-400 max-w-xl">
              100% verified student earnings. No shortcuts, no fabricated claims — just pure hustle and real client transactions.
            </p>
          </div>

          <button
            onClick={onOpenVerificationModal}
            className="px-4 py-2 rounded-xl bg-[#161616] hover:bg-neutral-800 text-neutral-200 hover:text-white text-xs font-mono font-bold border border-neutral-800 flex items-center gap-1.5 transition-colors"
          >
            <span>Full Verification SLA & FAQ</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#BEFF00]" />
          </button>
        </div>

        {/* 4 Step Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {HOW_IT_WORKS_STEPS.map((step, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-[#161616] border border-neutral-800 space-y-2.5 relative group hover:border-[#BEFF00]/40 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-extrabold text-[#BEFF00] px-2 py-0.5 rounded-lg bg-[#BEFF00]/10 border border-[#BEFF00]/20">
                  STEP {step.step}
                </span>
              </div>

              <div className="font-heading text-xl font-bold uppercase text-white tracking-wide">
                {step.title}
              </div>

              <p className="text-xs text-neutral-300 leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Key Trust Banner */}
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#161616] to-[#111111] border border-neutral-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#BEFF00] text-black shrink-0">
              <Zap className="w-5 h-5 fill-black" />
            </div>
            <div>
              <div className="font-bold text-sm text-white">
                Earn your first ₹ to enter the leaderboard
              </div>
              <div className="text-xs text-neutral-400">
                Whether it&apos;s ₹500 from a freelance logo or ₹15,000 from a coding gig, start your climb now.
              </div>
            </div>
          </div>

          <button
            onClick={onOpenSubmitModal}
            className="px-5 py-2.5 rounded-xl bg-[#BEFF00] hover:bg-[#a6e000] active:scale-95 text-black font-extrabold text-xs sm:text-sm tracking-tight transition-all shrink-0 shadow-md"
          >
            Start Earning Now →
          </button>
        </div>

      </div>

    </section>
  );
};
