import React, { useState } from 'react';
import { 
  X, 
  Trophy, 
  Crown, 
  Sparkles, 
  Calendar, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { PastWave } from '../types';
import { formatINR } from '../utils/formatters';

interface HallOfFameModalProps {
  isOpen: boolean;
  onClose: () => void;
  pastWaves: PastWave[];
}

export const HallOfFameModal: React.FC<HallOfFameModalProps> = ({
  isOpen,
  onClose,
  pastWaves,
}) => {
  const [selectedWaveId, setSelectedWaveId] = useState(pastWaves[0]?.id || 'wave-00');

  if (!isOpen) return null;

  const currentWave = pastWaves.find((w) => w.id === selectedWaveId) || pastWaves[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl rounded-3xl bg-[#111111] border border-neutral-800 p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
        
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-300 font-mono text-xs font-bold uppercase">
            <Trophy className="w-3.5 h-3.5" />
            <span>Hall of Fame & Wave Archives</span>
          </div>
          <h3 className="font-heading text-2xl sm:text-3xl font-black uppercase text-white">
            Past Challenge Champions
          </h3>
          <p className="text-xs sm:text-sm text-neutral-400">
            Official archives of verified student income leaders from previous EYFI cohorts.
          </p>
        </div>

        
        <div className="flex flex-wrap gap-2">
          {pastWaves.map((wave) => (
            <button
              key={wave.id}
              onClick={() => setSelectedWaveId(wave.id)}
              className={`px-3.5 py-1.5 rounded-xl font-mono text-xs font-bold border transition-all ${
                selectedWaveId === wave.id
                  ? 'bg-[#BEFF00] text-black border-[#BEFF00] font-black'
                  : 'bg-[#161616] text-neutral-400 hover:text-white border-neutral-800'
              }`}
            >
              {wave.name.split('·')[0].trim()}
            </button>
          ))}
        </div>

        
        {currentWave && (
          <div className="space-y-4">
            
            
            <div className="p-4 rounded-2xl bg-[#161616] border border-neutral-800 grid grid-cols-2 sm:grid-cols-3 gap-3 font-mono text-xs">
              <div>
                <div className="text-neutral-500 uppercase text-[10px]">Challenge Period</div>
                <div className="font-bold text-white mt-0.5">{currentWave.period}</div>
              </div>
              <div>
                <div className="text-neutral-500 uppercase text-[10px]">Total Verified ₹</div>
                <div className="font-bold text-[#BEFF00] mt-0.5">{currentWave.totalVerifiedEarnings}</div>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <div className="text-neutral-500 uppercase text-[10px]">Prize Pool</div>
                <div className="font-bold text-amber-400 mt-0.5">{currentWave.totalPool}</div>
              </div>
            </div>

            
            <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-950/20 via-[#141414] to-[#111111] border-2 border-amber-500/40 space-y-3 relative overflow-hidden">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      src={currentWave.champion.avatar}
                      alt={currentWave.champion.name}
                      className="w-14 h-14 rounded-2xl object-cover border-2 border-amber-400"
                    />
                    <div className="absolute -top-2 -left-1 text-amber-400">
                      <Crown className="w-5 h-5 fill-amber-400" />
                    </div>
                  </div>

                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-extrabold">
                      GRAND CHAMPION
                    </div>
                    <div className="font-heading text-lg font-black text-white">
                      {currentWave.champion.name}
                    </div>
                    <div className="text-xs text-neutral-400 font-mono">
                      {currentWave.champion.college}
                    </div>
                  </div>
                </div>

                <div className="text-right font-mono">
                  <div className="text-lg sm:text-xl font-black text-[#BEFF00]">
                    {formatINR(currentWave.champion.income)}
                  </div>
                  <div className="text-[10px] text-neutral-400">
                    verified 30d total
                  </div>
                </div>
              </div>

              <div className="text-xs text-neutral-300 italic pt-1 border-t border-neutral-800">
                &ldquo;{currentWave.champion.hustle}&rdquo;
              </div>
            </div>

            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-2xl bg-[#141414] border border-neutral-800 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <img
                    src={currentWave.runnerUp.avatar}
                    alt={currentWave.runnerUp.name}
                    className="w-10 h-10 rounded-full object-cover border border-neutral-700"
                  />
                  <div>
                    <div className="font-bold text-xs text-white">#2 {currentWave.runnerUp.name}</div>
                    <div className="text-[10px] text-neutral-400">{currentWave.runnerUp.college}</div>
                  </div>
                </div>
                <div className="font-mono text-xs font-bold text-neutral-300">
                  {formatINR(currentWave.runnerUp.income)}
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#141414] border border-neutral-800 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <img
                    src={currentWave.thirdPlace.avatar}
                    alt={currentWave.thirdPlace.name}
                    className="w-10 h-10 rounded-full object-cover border border-neutral-700"
                  />
                  <div>
                    <div className="font-bold text-xs text-white">#3 {currentWave.thirdPlace.name}</div>
                    <div className="text-[10px] text-neutral-400">{currentWave.thirdPlace.college}</div>
                  </div>
                </div>
                <div className="font-mono text-xs font-bold text-neutral-300">
                  {formatINR(currentWave.thirdPlace.income)}
                </div>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
