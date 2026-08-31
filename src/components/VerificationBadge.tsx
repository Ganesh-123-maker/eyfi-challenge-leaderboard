import React from 'react';
import { CheckCircle2, Clock, AlertTriangle, HelpCircle } from 'lucide-react';
import { VerificationStatus } from '../types';

interface VerificationBadgeProps {
  status: VerificationStatus;
  proofCount?: number;
  onClick?: () => void;
  compact?: boolean;
}

export const VerificationBadge: React.FC<VerificationBadgeProps> = ({
  status,
  proofCount,
  onClick,
  compact = false,
}) => {
  if (status === 'verified') {
    return (
      <button
        onClick={onClick}
        type="button"
        title="Income verified by EYFI Council via bank/UPI/invoice proof"
        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-950/60 text-emerald-400 border border-emerald-500/40 text-[11px] font-mono font-bold hover:bg-emerald-900/80 transition-colors focus:outline-none"
      >
        <CheckCircle2 className="w-3 h-3 text-[#BEFF00]" />
        <span>{compact ? 'Verified' : '✓ Verified'}</span>
        {proofCount !== undefined && proofCount > 1 && (
          <span className="text-[10px] text-emerald-300 opacity-80">({proofCount})</span>
        )}
      </button>
    );
  }

  if (status === 'pending') {
    return (
      <button
        onClick={onClick}
        type="button"
        title="Income submitted · verification in progress (within 4 hrs)"
        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-950/60 text-amber-400 border border-amber-500/40 text-[11px] font-mono font-bold hover:bg-amber-900/80 transition-colors focus:outline-none"
      >
        <Clock className="w-3 h-3 text-amber-400 animate-spin" />
        <span>Pending</span>
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      type="button"
      title="Under review · Temporarily excluded while dispute or verification is checked"
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-950/60 text-rose-400 border border-rose-500/40 text-[11px] font-mono font-bold hover:bg-rose-900/80 transition-colors focus:outline-none"
    >
      <AlertTriangle className="w-3 h-3 text-rose-400" />
      <span>Under Review</span>
    </button>
  );
};
