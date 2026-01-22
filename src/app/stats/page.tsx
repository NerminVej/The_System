'use client';

import { useStatsStore } from '@/store';
import { StatCard } from '@/components/stats/StatCard';
import { PlayerLevel } from '@/components/stats/PlayerLevel';
import { StatsRadarChart } from '@/components/stats/StatsRadarChart';
import { ActivityHeatmap } from '@/components/heatmap/ActivityHeatmap';
import { SystemWindow } from '@/components/ui/system-window';
import { Zap, TrendingUp, Calendar } from 'lucide-react';

export default function StatsPage() {
  const { stats, playerLevel, totalXP } = useStatsStore();

  return (
    <div className="container mx-auto p-6 max-w-7xl space-y-8">
      <h1 className="text-4xl font-bold gradient-text font-display uppercase tracking-wider">
        Player Statistics
      </h1>
      <div className="glow-divider" />

      <PlayerLevel level={playerLevel} />

      <StatsRadarChart stats={stats} />

      <div className="grid md:grid-cols-3 gap-4">
        <StatCard
          statType="strength"
          level={stats.strength.level}
          xp={stats.strength.xp}
        />
        <StatCard
          statType="stamina"
          level={stats.stamina.level}
          xp={stats.stamina.xp}
        />
        <StatCard
          statType="intelligence"
          level={stats.intelligence.level}
          xp={stats.intelligence.xp}
        />
        <StatCard
          statType="agility"
          level={stats.agility.level}
          xp={stats.agility.xp}
        />
        <StatCard
          statType="willpower"
          level={stats.willpower.level}
          xp={stats.willpower.xp}
        />
      </div>

      <SystemWindow
        title="ACTIVITY HISTORY"
        icon={<Calendar className="w-4 h-4" />}
        className="hex-pattern"
      >
        <div className="space-y-2">
          <p className="text-xs text-sl-grey uppercase tracking-widest">
            Last 365 days of progression
          </p>
          <div className="glow-divider" />
          <ActivityHeatmap />
        </div>
      </SystemWindow>

      <div className="grid md:grid-cols-2 gap-4">
        <SystemWindow
          title="TOTAL EXPERIENCE"
          icon={<Zap className="w-4 h-4" />}
          className="hex-pattern"
        >
          <div className="text-center space-y-2">
            <div className="glow-divider" />
            <p className="text-6xl font-bold font-mono stat-value">{totalXP}</p>
            <div className="glow-divider" />
            <p className="text-xs text-sl-grey uppercase tracking-widest mt-4">
              Accumulated XP
            </p>
          </div>
        </SystemWindow>

        <SystemWindow
          title="LEVEL PROGRESSION"
          icon={<TrendingUp className="w-4 h-4" />}
          className="hex-pattern"
        >
          <div className="space-y-3">
            <p className="text-xs text-sl-grey uppercase tracking-widest">
              Level Up Requirement
            </p>
            <div className="glow-divider" />
            <p className="text-sm text-foreground">
              Increase all stats to the same level to progress to the next player level
            </p>
          </div>
        </SystemWindow>
      </div>
    </div>
  );
}
