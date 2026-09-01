import React, { useState } from 'react';
import { X, MessageCircle, Copy, Check, Download, Share2, Sparkles, Flame, Trophy, ExternalLink, Instagram } from 'lucide-react';
import { UserRankProfile } from '../types';
import { formatINR, getWhatsAppShareUrl, getTwitterShareUrl, getLinkedInShareUrl } from '../utils/formatters';

interface ShareRankModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile: UserRankProfile;
}

type CardRatio = 'story' | 'square' | 'wide';

export const ShareRankModal: React.FC<ShareRankModalProps> = ({
  isOpen,
  onClose,
  userProfile,
}) => {
  const [ratio, setRatio] = useState<CardRatio>('story');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const shareText = `🔥 I'm currently ranked #${userProfile.rank} on the EYFI Challenge with ${formatINR(userProfile.income)} verified income!\n\nJust ${formatINR(userProfile.gapToNextRank)} more to overtake #${userProfile.nextRankNumber} (${userProfile.nextRankParticipantName}).\n\nThink you can beat me? Join India's student earning challenge: ${window.location.origin}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleWhatsAppShare = () => {
    const url = getWhatsAppShareUrl(
      userProfile.rank,
      userProfile.income,
      userProfile.gapToNextRank,
      userProfile.nextRankNumber
    );
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleTwitterShare = () => {
    const url = getTwitterShareUrl(userProfile.rank, userProfile.income);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl rounded-3xl bg-[#111111] border border-neutral-800 p-5 sm:p-8 shadow-2xl space-y-6 max-h-[95vh] overflow-y-auto">
        
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#BEFF00]/10 border border-[#BEFF00]/30 text-[#BEFF00] text-xs font-mono font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            VIRAL GROWTH CARD
          </div>
          <h3 className="text-2xl sm:text-3xl font-heading font-black uppercase text-white tracking-wide">
            Share Your Rank & Challenge Friends
          </h3>
          <p className="text-xs sm:text-sm text-neutral-400">
            Showcase your verified student earnings on WhatsApp, Instagram Stories, and LinkedIn.
          </p>
        </div>

        
        <div className="flex items-center gap-2 p-1 rounded-2xl bg-[#0A0A0A] border border-neutral-800 w-fit">
          <button
            onClick={() => setRatio('story')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold uppercase transition-all ${
              ratio === 'story'
                ? 'bg-[#BEFF00] text-black font-extrabold shadow'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Instagram Story (9:16)
          </button>
          <button
            onClick={() => setRatio('square')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold uppercase transition-all ${
              ratio === 'square'
                ? 'bg-[#BEFF00] text-black font-extrabold shadow'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            WhatsApp / Post (1:1)
          </button>
          <button
            onClick={() => setRatio('wide')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold uppercase transition-all ${
              ratio === 'wide'
                ? 'bg-[#BEFF00] text-black font-extrabold shadow'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            LinkedIn Banner (16:9)
          </button>
        </div>

        
        <div className="flex justify-center my-2">
          <div
            id="eyfi-share-card-element"
            className={`w-full relative rounded-2xl bg-gradient-to-b from-[#141414] via-[#0A0A0A] to-[#0A0A0A] border-2 border-[#BEFF00] p-6 sm:p-8 flex flex-col justify-between overflow-hidden shadow-[0_0_50px_rgba(190,255,0,0.2)] transition-all ${
              ratio === 'story'
                ? 'max-w-xs min-h-[420px]'
                : ratio === 'square'
                ? 'max-w-sm min-h-[340px]'
                : 'max-w-lg min-h-[280px]'
            }`}
          >
            
            <div className="rupee-watermark text-9xl -top-6 -right-6 select-none opacity-20">₹</div>
            <div className="rupee-watermark text-7xl -bottom-6 -left-6 select-none opacity-15">₹</div>

            
            <div className="flex items-center justify-between relative z-10">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-md bg-[#BEFF00] text-black font-black text-sm flex items-center justify-center">
                  ₹
                </div>
                <span className="font-heading text-xl font-black text-white tracking-wider">
                  EYFI
                </span>
              </div>
              <span className="text-[10px] font-mono font-extrabold px-2 py-0.5 rounded bg-neutral-900 border border-neutral-700 text-[#BEFF00] uppercase tracking-widest">
                WAVE 01 · 30 DAYS
              </span>
            </div>

            
            <div className="space-y-3 py-4 text-center relative z-10">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#BEFF00]/15 border border-[#BEFF00]/30 text-[#BEFF00] text-xs font-mono font-black uppercase">
                <Flame className="w-3.5 h-3.5 fill-[#BEFF00]" />
                I&apos;M RANK #{userProfile.rank}
              </div>

              <div className="space-y-0.5">
                <div className="font-mono text-3xl sm:text-4xl font-black text-white tracking-tight">
                  {formatINR(userProfile.income)}
                </div>
                <div className="text-xs font-mono text-[#BEFF00] uppercase tracking-widest font-bold">
                  VERIFIED INCOME EARNED
                </div>
              </div>

              
              <div className="p-2 rounded-xl bg-neutral-900/90 border border-neutral-800 text-[11px] font-mono text-neutral-300">
                <span className="text-[#BEFF00] font-bold">
                  {formatINR(userProfile.gapToNextRank)} more
                </span>{' '}
                to take #{userProfile.nextRankNumber} ({userProfile.nextRankParticipantName})
              </div>
            </div>

            
            <div className="border-t border-neutral-850 pt-3 flex items-center justify-between text-xs relative z-10">
              <div className="text-left">
                <div className="font-bold text-white leading-tight">{userProfile.name}</div>
                <div className="text-[10px] text-neutral-400">{userProfile.college}</div>
              </div>

              <div className="text-right">
                <span className="font-heading text-lg font-black text-[#BEFF00] tracking-wide block leading-none">
                  CAN YOU BEAT ME?
                </span>
                <span className="text-[9px] font-mono text-neutral-400">eyfi.in/challenge</span>
              </div>
            </div>

          </div>
        </div>

        
        <div className="space-y-3 pt-2">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            
            <button
              onClick={handleWhatsAppShare}
              className="py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-95"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Share WhatsApp</span>
            </button>

            
            <button
              onClick={handleTwitterShare}
              className="py-3 px-4 rounded-xl bg-[#161616] hover:bg-[#1f1f1f] text-white font-bold text-xs sm:text-sm border border-neutral-800 flex items-center justify-center gap-2 transition-all hover:border-neutral-700 active:scale-95"
            >
              <Share2 className="w-4 h-4 text-[#BEFF00]" />
              <span>Share to X / Twitter</span>
            </button>

            
            <button
              onClick={handleCopy}
              className="py-3 px-4 rounded-xl bg-[#161616] hover:bg-[#1f1f1f] text-white font-bold text-xs sm:text-sm border border-neutral-800 flex items-center justify-center gap-2 transition-all hover:border-neutral-700 active:scale-95"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-[#BEFF00]" />
                  <span className="text-[#BEFF00]">Copied Text!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy Challenge Post</span>
                </>
              )}
            </button>
          </div>

          <div className="p-3 rounded-2xl bg-[#0A0A0A] border border-neutral-850 text-xs text-neutral-400 flex items-center justify-between">
            <span className="truncate">
              &ldquo;₹850 more and you&apos;re #26&rdquo; — Ready to post on Instagram stories
            </span>
            <span className="text-[11px] font-mono text-[#BEFF00] font-bold shrink-0 ml-2">
              #EYFIChallenge
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};
