'use client';

import { useStatsStore } from '@/store';
import { StatCard } from '@/components/stats/StatCard';
import { PlayerLevel } from '@/components/stats/PlayerLevel';
import { TodayProgress } from './TodayProgress';
import { QuickActions } from './QuickActions';
import { StreakCounter } from '@/components/punishment/StreakCounter';
import { DeepWorkTimer } from '@/components/deepwork/DeepWorkTimer';
import { useQuestStore } from '@/store';

export function DashboardOverview() {
  const { stats, playerLevel } = useStatsStore();
  const { currentStreak, longestStreak } = useQuestStore();

  return (
    <div className="space-y-6">
      <PlayerLevel level={playerLevel} />

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
          statType="discipline"
          level={stats.discipline.level}
          xp={stats.discipline.xp}
        />
        <StatCard
          statType="willpower"
          level={stats.willpower.level}
          xp={stats.willpower.xp}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <TodayProgress />
        <QuickActions />
      </div>

      <StreakCounter
        currentStreak={currentStreak}
        longestStreak={longestStreak}
      />

      <div id="deep-work-timer">
        <DeepWorkTimer />
      </div>
    </div>
  );
}
