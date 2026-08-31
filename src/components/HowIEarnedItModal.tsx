import React from 'react';
import { 
  X, 
  Sparkles, 
  CheckCircle2, 
  ExternalLink, 
  Clock, 
  Wrench, 
  Lightbulb, 
  Quote, 
  FileText, 
  ArrowRight,
  ShieldCheck,
  Building
} from 'lucide-react';
import { CaseStudy } from '../types';
import { formatINR } from '../utils/formatters';

interface HowIEarnedItModalProps {
  caseStudy?: CaseStudy | null;
  participantId?: string | null;
  caseStudies?: CaseStudy[];
  isOpen: boolean;
  onClose: () => void;
  onOpenSubmitModal: () => void;
}

export const HowIEarnedItModal: React.FC<HowIEarnedItModalProps> = ({
  caseStudy: initialCaseStudy,
  participantId,
  caseStudies,
  isOpen,
  onClose,
  onOpenSubmitModal,
}) => {
  const caseStudy = initialCaseStudy || (caseStudies && participantId ? caseStudies.find(c => c.participantId === participantId) : null) || (caseStudies && caseStudies.length > 0 ? caseStudies[0] : null);

  if (!isOpen || !caseStudy) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl rounded-3xl bg-[#111111] border border-neutral-800 p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Header */}
        <div className="flex items-start gap-4">
          <img
            src={caseStudy.avatar}
            alt={caseStudy.name}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-[#BEFF00]/50 shrink-0"
          />

          <div className="space-y-1 min-w-0 flex-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#BEFF00]/15 text-[#BEFF00] font-mono text-[10px] font-extrabold uppercase">
              <Sparkles className="w-3 h-3" />
              <span>Verified Case Study</span>
            </div>

            <h3 className="font-heading text-xl sm:text-2xl font-black text-white truncate">
              How {caseStudy.name} Earned {formatINR(caseStudy.verifiedAmount)}
            </h3>

            <div className="text-xs text-neutral-400 font-mono">
              {caseStudy.college} · {caseStudy.hustleTitle}
            </div>
          </div>
        </div>

        {/* Story Summary Box */}
        <div className="p-4 rounded-2xl bg-[#161616] border border-neutral-800 space-y-2">
          <div className="text-xs font-mono font-bold uppercase text-neutral-300 flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-[#BEFF00]" />
            <span>The Breakdown</span>
          </div>
          <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
            {caseStudy.storySummary}
          </p>
        </div>

        {/* Client Acquisition & Tools Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          
          <div className="p-4 rounded-2xl bg-[#161616] border border-neutral-800 space-y-2">
            <div className="text-xs font-mono font-bold uppercase text-neutral-400">
              Client Acquisition Method
            </div>
            <p className="text-xs text-neutral-300 leading-relaxed">
              {caseStudy.howTheyAcquiredClient}
            </p>
            <div className="text-[10px] font-mono text-emerald-400">
              ⏱ First payout in: {caseStudy.timeToFirstRupee}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#161616] border border-neutral-800 space-y-2">
            <div className="text-xs font-mono font-bold uppercase text-neutral-400">
              Tech Stack & Tools Used
            </div>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {caseStudy.toolsUsed.map((tool, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg bg-neutral-900 border border-neutral-800 text-xs font-mono text-neutral-200 font-semibold"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Actionable Playbook Rules */}
        <div className="space-y-3">
          <div className="text-xs font-mono font-bold uppercase text-white flex items-center gap-1.5">
            <Lightbulb className="w-4 h-4 text-amber-400" />
            <span>Key Playbook Tips From {caseStudy.name.split(' ')[0]}</span>
          </div>

          <div className="space-y-2">
            {caseStudy.keyPlaybookTips.map((tip, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-[#141414] border border-neutral-850 flex items-start gap-2.5 text-xs text-neutral-300 leading-relaxed"
              >
                <span className="font-mono font-black text-[#BEFF00] shrink-0">#{idx + 1}</span>
                <span>{tip}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Client Testimonial (if present) */}
        {caseStudy.clientTestimonial && (
          <div className="p-4 rounded-2xl bg-[#141414] border border-neutral-800/80 italic text-xs text-neutral-300 flex items-start gap-2.5">
            <Quote className="w-5 h-5 text-[#BEFF00] shrink-0 opacity-80" />
            <span>{caseStudy.clientTestimonial}</span>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="pt-2 flex items-center gap-3">
          <button
            onClick={() => {
              onClose();
              onOpenSubmitModal();
            }}
            className="flex-1 py-3.5 rounded-xl bg-[#BEFF00] hover:bg-[#aee600] text-black font-extrabold text-sm tracking-tight transition-all text-center shadow-sm"
          >
            Apply This Playbook & Log Earnings
          </button>
        </div>

      </div>
    </div>
  );
};
