import React from 'react';
import { X, ShieldCheck, CheckCircle2, Trophy, Flame, ArrowUp, ArrowDown, Users, Sparkles, Building, School, Calendar, FileText } from 'lucide-react';
import { Participant, Team, LeaderboardType } from '../types';
import { formatINR, formatRank } from '../utils/formatters';
import { VerificationBadge } from './VerificationBadge';

interface ParticipantDetailModalProps {
  item: Participant | Team | null;
  mode: LeaderboardType;
  isOpen: boolean;
  onClose: () => void;
  onOpenSubmitModal: () => void;
}

export const ParticipantDetailModal: React.FC<ParticipantDetailModalProps> = ({
  item,
  mode,
  isOpen,
  onClose,
  onOpenSubmitModal,
}) => {
  if (!isOpen || !item) return null;

  const isIndividual = mode === 'individual';
  const participant = isIndividual ? (item as Participant) : null;
  const team = !isIndividual ? (item as Team) : null;

  const income = isIndividual ? participant!.income : team!.combinedIncome;
  const name = isIndividual ? participant!.name : team!.teamName;
  const college = isIndividual ? participant!.college : `${team!.members.length} Members`;
  const rank = item.rank;
  const rankChange = item.rankChange;
  const badge = item.badge;
  const category = item.category;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl rounded-3xl bg-[#111111] border border-neutral-800 p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Header Card */}
        <div className="flex items-start gap-4">
          {/* Avatar or Cluster */}
          {isIndividual ? (
            <div className="relative shrink-0">
              <img
                src={participant!.avatar}
                alt={name}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-neutral-700"
              />
              <div className="absolute -bottom-2 -right-1 px-2 py-0.5 rounded-md bg-[#BEFF00] text-black font-mono font-black text-xs">
                #{rank}
              </div>
            </div>
          ) : (
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#161616] border border-neutral-700 flex items-center justify-center text-3xl shrink-0">
              {team!.avatar}
            </div>
          )}

          <div className="space-y-1 min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-heading text-xl sm:text-2xl font-black text-white truncate">
                {name}
              </h3>
              {badge && (
                <span className="text-[10px] font-mono font-extrabold px-2 py-0.5 rounded-full bg-[#BEFF00]/15 text-[#BEFF00] border border-[#BEFF00]/30 uppercase">
                  {badge}
                </span>
              )}
            </div>

            <div className="text-xs text-neutral-400 flex items-center gap-1.5">
              <School className="w-3.5 h-3.5 text-[#BEFF00]" />
              <span>{college}</span>
            </div>

            <div className="pt-1 flex items-center gap-2">
              <VerificationBadge status={item.verificationStatus} />
              <span className="text-[11px] font-mono text-neutral-400">
                {isIndividual ? `Active in ${category}` : `${team?.members.length} Hustlers`}
              </span>
            </div>
          </div>
        </div>

        {/* Key Earnings Breakdown Matrix */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <div className="p-3.5 rounded-2xl bg-[#161616] border border-neutral-800 space-y-0.5">
            <div className="text-[11px] text-neutral-400 font-mono">TOTAL VERIFIED</div>
            <div className="font-mono text-xl sm:text-2xl font-black text-[#BEFF00]">
              {formatINR(income)}
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#161616] border border-neutral-800 space-y-0.5">
            <div className="text-[11px] text-neutral-400 font-mono">THIS WEEK</div>
            <div className="font-mono text-lg sm:text-xl font-bold text-white">
              {formatINR(isIndividual ? participant!.incomeThisWeek : team!.combinedIncomeThisWeek)}
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#161616] border border-neutral-800 space-y-0.5 col-span-2 sm:col-span-1">
            <div className="text-[11px] text-neutral-400 font-mono">MOVEMENT</div>
            <div className="font-mono text-base sm:text-lg font-bold">
              {rankChange > 0 ? (
                <span className="text-emerald-400 flex items-center gap-1">
                  <ArrowUp className="w-4 h-4" /> ↑ {rankChange} spots
                </span>
              ) : rankChange < 0 ? (
                <span className="text-rose-400 flex items-center gap-1">
                  <ArrowDown className="w-4 h-4" /> ↓ {Math.abs(rankChange)}
                </span>
              ) : (
                <span className="text-neutral-400">Unchanged</span>
              )}
            </div>
          </div>
        </div>

        {/* Team Members List (If Team Mode) */}
        {!isIndividual && team && (
          <div className="space-y-3 pt-2">
            <div className="text-xs font-mono uppercase font-bold text-neutral-300">
              Team Member Contribution Roster
            </div>

            <div className="space-y-2">
              {team.members.map((member, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-2xl bg-[#161616] border border-neutral-800 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-9 h-9 rounded-full object-cover border border-neutral-700"
                    />
                    <div>
                      <div className="font-bold text-xs sm:text-sm text-white">{member.name}</div>
                      <div className="text-[10px] text-neutral-400">{member.college}</div>
                    </div>
                  </div>

                  <div className="text-right font-mono">
                    <div className="text-xs sm:text-sm font-black text-[#BEFF00]">
                      {formatINR(member.contribution)}
                    </div>
                    <div className="text-[10px] text-neutral-400">
                      {Math.round((member.contribution / team.combinedIncome) * 100)}% share
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Individual Verified Proof History */}
        {isIndividual && (
          <div className="space-y-3 pt-2">
            <div className="text-xs font-mono uppercase font-bold text-neutral-300 flex items-center justify-between">
              <span>Verified Hustles & Invoices ({participant?.proofCount || 3} items)</span>
              <span className="text-[10px] text-[#BEFF00] font-normal">Audit Council Approved</span>
            </div>

            <div className="space-y-2">
              <div className="p-3 rounded-2xl bg-[#0A0A0A] border border-neutral-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#BEFF00]"></div>
                  <span className="text-neutral-200 font-semibold">{participant?.hustleTitle || 'Client Deliverables'}</span>
                </div>
                <span className="font-mono text-[#BEFF00] font-bold">✓ Verified</span>
              </div>

              <div className="p-3 rounded-2xl bg-[#0A0A0A] border border-neutral-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                  <span className="text-neutral-200 font-semibold">Direct UPI Payment Reference Verified</span>
                </div>
                <span className="font-mono text-neutral-400 text-[11px]">Txn #EYFI-9821</span>
              </div>
            </div>
          </div>
        )}

        {/* CTA Footer */}
        <div className="pt-2 flex items-center gap-3">
          <button
            onClick={() => {
              onClose();
              onOpenSubmitModal();
            }}
            className="flex-1 py-3.5 rounded-xl bg-[#BEFF00] hover:bg-[#a6e000] text-black font-extrabold text-sm tracking-tight transition-all text-center shadow-sm"
          >
            Submit ₹ to Climb Past Them
          </button>
        </div>

      </div>
    </div>
  );
};
