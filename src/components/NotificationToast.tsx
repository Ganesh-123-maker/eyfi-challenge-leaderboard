import React from 'react';
import { X, Flame, AlertCircle, ArrowUp, ArrowRight, MessageCircle, Zap } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'overtaken' | 'climbed' | 'verified';
  title: string;
  body: string;
  ctaText?: string;
  action?: () => void;
}

interface NotificationToastProps {
  toast: ToastMessage | null;
  onDismiss: () => void;
}

export const NotificationToast: React.FC<NotificationToastProps> = ({
  toast,
  onDismiss,
}) => {
  if (!toast) return null;

  return (
    <div className="fixed top-20 right-4 z-50 max-w-md w-[calc(100vw-2rem)] rounded-2xl bg-neutral-950/95 border-2 border-[#CCFF00] p-4 shadow-[0_0_30px_rgba(204,255,0,0.25)] backdrop-blur-md animate-in slide-in-from-top-4 duration-300">
      <div className="flex items-start justify-between gap-3">
        
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-xl bg-[#CCFF00] text-black shrink-0 mt-0.5">
            {toast.type === 'overtaken' ? (
              <AlertCircle className="w-5 h-5 fill-black text-[#CCFF00]" />
            ) : (
              <Flame className="w-5 h-5 fill-black text-[#CCFF00]" />
            )}
          </div>

          <div className="space-y-1">
            <div className="font-bold text-sm text-white flex items-center gap-1.5">
              <span>{toast.title}</span>
            </div>

            <p className="text-xs text-neutral-300 leading-relaxed font-mono">
              {toast.body}
            </p>

            {toast.ctaText && (
              <div className="pt-2">
                <button
                  onClick={() => {
                    toast.action?.();
                    onDismiss();
                  }}
                  className="px-3 py-1.5 rounded-lg bg-[#CCFF00] hover:bg-[#b8e600] text-black font-extrabold text-xs font-mono flex items-center gap-1.5 transition-all shadow-sm"
                >
                  <span>{toast.ctaText}</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>
        </div>

        <button
          onClick={onDismiss}
          className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-900 transition-colors"
          aria-label="Dismiss notification"
        >
          <X className="w-4 h-4" />
        </button>

      </div>
    </div>
  );
};
