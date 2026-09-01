import React from 'react';
import { X, ShieldCheck, CheckCircle, Clock, AlertTriangle, FileText, Lock, Award, Check } from 'lucide-react';

interface VerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VerificationModal: React.FC<VerificationModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl rounded-3xl bg-[#111111] border border-neutral-800 p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#BEFF00]/10 border border-[#BEFF00]/30 text-[#BEFF00] text-xs font-mono font-bold">
            <ShieldCheck className="w-3.5 h-3.5" />
            EYFI TRUST & INTEGRITY PROTOCOL
          </div>
          <h3 className="text-2xl sm:text-3xl font-heading font-black uppercase text-white tracking-wide">
            How Earnings Are Verified
          </h3>
          <p className="text-sm text-neutral-400">
            Income is real money. EYFI exists to reward authentic student hustle, not fake claims.
          </p>
        </div>

        {/* Verification Rules Cards */}
        <div className="space-y-3">
          
          <div className="p-4 rounded-2xl bg-[#161616] border border-neutral-800 flex items-start gap-3">
            <div className="p-2 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 shrink-0">
              <CheckCircle className="w-4 h-4 text-[#BEFF00]" />
            </div>
            <div className="space-y-1">
              <div className="font-bold text-sm text-white flex items-center gap-2">
                <span>✓ VERIFIED STATUS</span>
                <span className="text-[10px] font-mono bg-[#BEFF00]/10 text-[#BEFF00] px-1.5 py-0.5 rounded">
                  Counts towards ranking
                </span>
              </div>
              <p className="text-xs text-neutral-300 leading-relaxed">
                Only verified income contributes to final leaderboard ranking. Backed by bank credit proofs, UPI transaction IDs, Stripe dashboard exports, or client counter-invoices.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#161616] border border-neutral-800 flex items-start gap-3">
            <div className="p-2 rounded-xl bg-amber-950/60 border border-amber-500/30 text-amber-400 shrink-0">
              <Clock className="w-4 h-4 text-amber-400" />
            </div>
            <div className="space-y-1">
              <div className="font-bold text-sm text-white">
                <span>⏳ PENDING STATUS</span>
              </div>
              <p className="text-xs text-neutral-300 leading-relaxed">
                Income submitted · verification in progress. Our student audit council reviews proofs within 4 hours. Once verified, rank moves instantly.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#161616] border border-neutral-800 flex items-start gap-3">
            <div className="p-2 rounded-xl bg-rose-950/60 border border-rose-500/30 text-rose-400 shrink-0">
              <AlertTriangle className="w-4 h-4 text-rose-400" />
            </div>
            <div className="space-y-1">
              <div className="font-bold text-sm text-white">
                <span>⚠ UNDER REVIEW / DISPUTE</span>
              </div>
              <p className="text-xs text-neutral-300 leading-relaxed">
                If an earning is flagged by a peer or disputed due to duplicate transaction IDs, it is temporarily excluded while manual verification is re-conducted.
              </p>
            </div>
          </div>

        </div>

        {/* Accepted Proofs Checklist */}
        <div className="p-4 rounded-2xl bg-[#0A0A0A] border border-neutral-800 space-y-2">
          <div className="text-xs font-mono uppercase font-bold text-neutral-300 tracking-wider">
            Accepted Proof Types:
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-300">
            <div className="flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-[#BEFF00]" />
              <span>UPI / Bank Transfer Receipts</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-[#BEFF00]" />
              <span>Fiverr / Upwork / Stripe Invoices</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-[#BEFF00]" />
              <span>Cash on Delivery Merchant Logs</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-[#BEFF00]" />
              <span>Client WhatsApp Work Confirmation</span>
            </div>
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={onClose}
          className="w-full py-3.5 rounded-xl bg-[#BEFF00] hover:bg-[#a6e000] text-black font-extrabold text-sm tracking-tight transition-all shadow-sm"
        >
          Got It, Back to Rankings
        </button>

      </div>
    </div>
  );
};
