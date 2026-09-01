import React, { useState } from 'react';
import { Sparkles, MessageCircle, Menu, X, ArrowUpRight, ShieldCheck, Zap } from 'lucide-react';

interface HeaderProps {
  onOpenSubmitModal: () => void;
  onOpenWhatsAppModal: () => void;
  onOpenPrivacyModal: () => void;
  onOpenVerificationModal: () => void;
  onOpenHallOfFame?: () => void;
  onOpenMilestoneRewards?: () => void;
  scrollToSection: (id: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenSubmitModal,
  onOpenWhatsAppModal,
  onOpenPrivacyModal,
  onOpenVerificationModal,
  onOpenHallOfFame,
  onOpenMilestoneRewards,
  scrollToSection,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header id="main-header" className="sticky top-0 z-40 w-full border-b border-neutral-900/80 bg-[#0A0A0A]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        <div className="flex items-center gap-3">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2 group"
            id="header-logo-link"
          >
            <div className="w-8 h-8 rounded-lg bg-[#BEFF00] flex items-center justify-center text-black font-black text-lg tracking-tighter shadow-sm group-hover:scale-105 transition-transform">
              ₹
            </div>
            <div className="flex flex-col">
              <span className="font-heading text-2xl font-black tracking-wider text-white flex items-center gap-1 leading-none">
                EYFI
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#BEFF00] animate-pulse"></span>
              </span>
              <span className="text-[10px] text-neutral-400 font-medium tracking-tight -mt-0.5">
                Earn Your First Income
              </span>
            </div>
          </a>

          
          <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#141414] border border-neutral-800 text-xs font-semibold text-neutral-300">
            <span className="w-2 h-2 rounded-full bg-[#BEFF00] animate-ping"></span>
            <span className="w-2 h-2 rounded-full bg-[#BEFF00] -ml-3.5"></span>
            <span className="text-[#BEFF00] font-mono text-[11px] font-bold">WAVE 01</span>
            <span className="text-neutral-500">·</span>
            <span className="text-neutral-400 text-[11px]">30-DAY CHALLENGE</span>
          </div>
        </div>

        
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-neutral-300">
          <button
            onClick={() => scrollToSection('leaderboard-main')}
            className="text-[#BEFF00] font-semibold flex items-center gap-1 hover:text-[#aee600] transition-colors focus:outline-none"
            id="nav-leaderboard"
          >
            Leaderboard
            <span className="px-1.5 py-0.5 text-[9px] rounded bg-[#BEFF00]/10 text-[#BEFF00] border border-[#BEFF00]/30 uppercase font-mono font-bold">
              Live
            </span>
          </button>
          <button
            onClick={() => scrollToSection('campus-wars-section')}
            className="hover:text-[#BEFF00] transition-colors focus:outline-none focus:text-[#BEFF00]"
            id="nav-campus-wars"
          >
            Campus Wars
          </button>
          <button
            onClick={() => scrollToSection('bounty-board-section')}
            className="hover:text-[#BEFF00] transition-colors flex items-center gap-1 focus:outline-none focus:text-[#BEFF00]"
            id="nav-bounties"
          >
            <Zap className="w-3.5 h-3.5 text-[#BEFF00] fill-[#BEFF00]" />
            Bounties
          </button>
          <button
            onClick={() => scrollToSection('race-to-top-10-card')}
            className="hover:text-[#BEFF00] transition-colors focus:outline-none focus:text-[#BEFF00]"
            id="nav-top10"
          >
            Race to Top 10
          </button>
          {onOpenHallOfFame && (
            <button
              onClick={onOpenHallOfFame}
              className="hover:text-amber-300 transition-colors focus:outline-none text-neutral-400"
              id="nav-hall-of-fame"
            >
              Hall of Fame
            </button>
          )}
          <button
            onClick={onOpenVerificationModal}
            className="hover:text-[#BEFF00] transition-colors flex items-center gap-1 focus:outline-none"
            id="nav-verification"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#BEFF00]" />
            Trust & Rules
          </button>
        </nav>

        
        <div className="flex items-center gap-2.5 sm:gap-3">
          <button
            onClick={onOpenWhatsAppModal}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#141414] hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-800 text-xs font-semibold transition-colors"
            title="Get Rank Alerts on WhatsApp"
            id="btn-whatsapp-alerts"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span>Alerts</span>
          </button>

          <button
            onClick={onOpenSubmitModal}
            className="flex items-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-lg bg-[#BEFF00] hover:bg-[#aee600] active:scale-95 text-black font-extrabold text-xs sm:text-sm tracking-tight transition-all shadow-[0_0_20px_rgba(190,255,0,0.25)]"
            id="btn-start-earning"
          >
            <Zap className="w-3.5 h-3.5 fill-black" />
            <span>Submit ₹ Proof</span>
            <ArrowUpRight className="w-3.5 h-3.5 hidden sm:inline" />
          </button>

          
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-900 border border-neutral-800"
            aria-label="Toggle menu"
            id="btn-mobile-menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-neutral-800 bg-[#0E0E0E] px-4 py-4 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="grid grid-cols-2 gap-2 text-sm font-medium">
            <button
              onClick={() => {
                scrollToSection('leaderboard-main');
                setMobileMenuOpen(false);
              }}
              className="p-2.5 text-left rounded-lg bg-[#BEFF00]/10 text-[#BEFF00] font-semibold border border-[#BEFF00]/20"
            >
              Leaderboard
            </button>
            <button
              onClick={() => {
                scrollToSection('campus-wars-section');
                setMobileMenuOpen(false);
              }}
              className="p-2.5 text-left rounded-lg bg-neutral-900 text-neutral-200 hover:text-[#BEFF00]"
            >
              Campus Wars
            </button>
            <button
              onClick={() => {
                scrollToSection('bounty-board-section');
                setMobileMenuOpen(false);
              }}
              className="p-2.5 text-left rounded-lg bg-neutral-900 text-neutral-200 hover:text-[#BEFF00]"
            >
              ⚡ Bounties
            </button>
            <button
              onClick={() => {
                scrollToSection('race-to-top-10-card');
                setMobileMenuOpen(false);
              }}
              className="p-2.5 text-left rounded-lg bg-neutral-900 text-neutral-200 hover:text-[#BEFF00]"
            >
              Race to Top 10
            </button>
          </div>

          <div className="pt-2 border-t border-neutral-800/80 flex items-center justify-between text-xs text-neutral-400">
            {onOpenHallOfFame && (
              <button
                onClick={() => {
                  onOpenHallOfFame();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-1.5 text-amber-300"
              >
                🏆 Hall of Fame
              </button>
            )}
            <button
              onClick={() => {
                onOpenWhatsAppModal();
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-1.5 text-emerald-400 font-semibold"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp Alerts
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
