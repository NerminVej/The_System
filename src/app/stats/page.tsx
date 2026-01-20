'use client';

import { useStatsStore } from '@/store';
import { StatCard } from '@/components/stats/StatCard';
import { PlayerLevel } from '@/components/stats/PlayerLevel';
import { ActivityHeatmap } from '@/components/heatmap/ActivityHeatmap';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function StatsPage() {
  const { stats, playerLevel, totalXP } = useStatsStore();

  return (
    <div className="container mx-auto p-6 max-w-7xl space-y-8">
      <h1 className="text-4xl font-bold gradient-text">Stats Overview</h1>

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

      <Card className="stat-card">
        <CardHeader>
          <CardTitle>Activity History</CardTitle>
          <p className="text-sm text-muted-foreground">
            Last 365 days of your progress
          </p>
        </CardHeader>
        <CardContent>
          <ActivityHeatmap />
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-4">
        <Card className="stat-card">
          <CardHeader>
            <CardTitle>Total XP</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold gradient-text">{totalXP}</p>
          </CardContent>
        </Card>

        <Card className="stat-card">
          <CardHeader>
            <CardTitle>Progress to Next Level</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Level up by increasing all stats to the same level
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
