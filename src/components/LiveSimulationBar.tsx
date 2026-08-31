import React, { useState } from 'react';
import { Play, TrendingUp, TrendingDown, RefreshCw, UserCheck, Zap, AlertCircle, ShieldAlert, Sparkles, Check } from 'lucide-react';
import { UserRankProfile } from '../types';

interface LiveSimulationBarProps {
  onSimulateOvertake: () => void;
  onSimulateClimb: () => void;
  onResetSimulation: () => void;
  onToggleZeroState: () => void;
  isZeroState: boolean;
}

export const LiveSimulationBar: React.FC<LiveSimulationBarProps> = ({
  onSimulateOvertake,
  onSimulateClimb,
  onResetSimulation,
  onToggleZeroState,
  isZeroState,
}) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="my-6 p-4 rounded-2xl bento-card shadow-md">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <div className="p-1 rounded-lg bg-[#BEFF00] text-black">
            <Zap className="w-3.5 h-3.5 fill-black" />
          </div>
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-white">
            EYFI Interactive Simulation Sandbox
          </span>
          <span className="text-[10px] font-mono bg-[#161616] text-neutral-400 px-2 py-0.5 rounded-lg border border-neutral-800 hidden sm:inline">
            Test live overtake & climbing dynamics
          </span>
        </div>

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-[11px] font-mono text-neutral-400 hover:text-white"
        >
          {collapsed ? 'Expand Controls +' : 'Collapse Controls —'}
        </button>
      </div>

      {!collapsed && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5 pt-1">
          {/* Simulate Overtake */}
          <button
            onClick={onSimulateOvertake}
            className="px-3.5 py-2.5 rounded-xl bg-[#161616] hover:bg-[#1a1a1a] active:scale-95 text-xs font-mono font-bold text-amber-300 border border-amber-500/30 hover:border-amber-500/60 flex items-center justify-center gap-2 transition-all shadow-sm"
            id="btn-sim-overtake"
          >
            <TrendingDown className="w-3.5 h-3.5 text-amber-400" />
            <span>Simulate Overtaken (Drop to #28)</span>
          </button>

          {/* Simulate Climb */}
          <button
            onClick={onSimulateClimb}
            className="px-3.5 py-2.5 rounded-xl bg-[#161616] hover:bg-[#1a1a1a] active:scale-95 text-xs font-mono font-bold text-[#BEFF00] border border-[#BEFF00]/30 hover:border-[#BEFF00]/60 flex items-center justify-center gap-2 transition-all shadow-sm"
            id="btn-sim-climb"
          >
            <TrendingUp className="w-3.5 h-3.5 text-[#BEFF00]" />
            <span>Simulate +₹2,500 (Climb to #24)</span>
          </button>

          {/* Toggle Zero / New User State */}
          <button
            onClick={onToggleZeroState}
            className={`px-3.5 py-2.5 rounded-xl text-xs font-mono font-bold border flex items-center justify-center gap-2 transition-all shadow-sm ${
              isZeroState
                ? 'bg-neutral-800 text-white border-white'
                : 'bg-[#161616] hover:bg-[#1a1a1a] text-neutral-300 border-neutral-800'
            }`}
            id="btn-sim-zero-state"
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>{isZeroState ? 'Exit ₹0 New User' : 'Test ₹0 New User State'}</span>
          </button>

          {/* Reset */}
          <button
            onClick={onResetSimulation}
            className="px-3.5 py-2.5 rounded-xl bg-[#161616] hover:bg-[#1a1a1a] text-xs font-mono font-bold text-neutral-400 hover:text-white border border-neutral-800 flex items-center justify-center gap-2 transition-all"
            id="btn-sim-reset"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Demo State</span>
          </button>
        </div>
      )}
    </div>
  );
};
