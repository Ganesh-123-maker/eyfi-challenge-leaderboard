import React from 'react';
import { MessageCircle, ShieldCheck, ArrowUpRight, Sparkles, Heart } from 'lucide-react';

interface FooterProps {
  onOpenVerificationModal: () => void;
  onOpenWhatsAppModal: () => void;
  onOpenPrivacyModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenVerificationModal,
  onOpenWhatsAppModal,
  onOpenPrivacyModal,
}) => {
  return (
    <footer className="border-t border-neutral-900 bg-[#080808] text-neutral-400 text-xs py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#BEFF00] flex items-center justify-center text-black font-black text-lg">
                ₹
              </div>
              <span className="font-heading text-2xl font-black text-white tracking-wider">
                EYFI
              </span>
            </div>

            <p className="text-sm text-neutral-300 font-medium">
              India&apos;s student earning movement.
            </p>

            <p className="text-xs text-neutral-400 max-w-sm leading-relaxed">
              We believe students shouldn&apos;t wait until graduation to earn their first income. Built around the philosophy: <span className="text-[#BEFF00] font-semibold">&ldquo;learn by doing&rdquo;</span>.
            </p>

            <div className="pt-1 flex items-center gap-3">
              <button
                onClick={onOpenWhatsAppModal}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 text-xs font-bold hover:bg-emerald-900 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Join Official WhatsApp Community</span>
              </button>
            </div>
          </div>

          
          <div className="md:col-span-2 space-y-2.5">
            <div className="font-mono uppercase font-bold text-white text-xs tracking-wider">
              Challenge
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#hero-section" className="hover:text-[#BEFF00] transition-colors">
                  Wave 01 Rules
                </a>
              </li>
              <li>
                <a href="#leaderboard-main" className="hover:text-[#BEFF00] transition-colors">
                  Live Standings
                </a>
              </li>
              <li>
                <a href="#fastest-risers-section" className="hover:text-[#BEFF00] transition-colors">
                  Fastest Risers
                </a>
              </li>
              <li>
                <span className="text-neutral-500">Prize Pool & Grants</span>
              </li>
            </ul>
          </div>

          
          <div className="md:col-span-2 space-y-2.5">
            <div className="font-mono uppercase font-bold text-white text-xs tracking-wider">
              Integrity & Trust
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={onOpenVerificationModal} className="hover:text-[#BEFF00] transition-colors text-left">
                  Verification Protocol
                </button>
              </li>
              <li>
                <button onClick={onOpenPrivacyModal} className="hover:text-[#BEFF00] transition-colors text-left">
                  Privacy Settings
                </button>
              </li>
              <li>
                <button onClick={onOpenVerificationModal} className="hover:text-[#BEFF00] transition-colors text-left">
                  Dispute Resolution
                </button>
              </li>
              <li>
                <span className="text-neutral-500">Student Code of Honor</span>
              </li>
            </ul>
          </div>

          
          <div className="md:col-span-3 space-y-2.5">
            <div className="font-mono uppercase font-bold text-white text-xs tracking-wider">
              Verification Policy
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Every ₹ listed on this leaderboard represents real, verified client transactions reviewed by our verification council.
            </p>
            <div className="text-[11px] font-mono text-[#BEFF00]">
              Avg audit turnaround: &lt; 4 Hours
            </div>
          </div>

        </div>

        
        <div className="pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-neutral-500">
          <div>
            © {new Date().getFullYear()} EYFI (Earn Your First Income). All rights reserved.
          </div>
          <div className="flex items-center gap-1 font-mono text-[11px]">
            <span>Crafted for India&apos;s ambitious student builders</span>
            <span className="text-[#BEFF00]">₹</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
