'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useStatsStore } from '@/store';
import { Progress } from '@/components/ui/progress';
import { STAT_MAX_LEVEL, WILLPOWER_MIN } from '@/lib/constants';
import { cn } from '@/lib/utils';

export function WillpowerTracker() {
  const willpower = useStatsStore((state) => state.stats.willpower);
  const isNegative = willpower.level < 0;
  const isMaxLevel = willpower.level >= STAT_MAX_LEVEL;

  // Calculate progress (0-100) accounting for negative values
  const range = STAT_MAX_LEVEL - WILLPOWER_MIN;
  const adjustedLevel = willpower.level - WILLPOWER_MIN;
  const progress = (adjustedLevel / range) * 100;

  return (
    <Card className="stat-card">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <span className="text-2xl">🔥</span>
            <span>Willpower</span>
          </span>
          <span
            className={cn(
              'text-3xl font-bold',
              isNegative && 'text-red-500',
              isMaxLevel && 'text-cyan-500'
            )}
          >
            {willpower.level}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Progress value={progress} className="h-3" />

        {isNegative && (
          <div className="bg-red-500/10 border border-red-500/50 rounded p-3">
            <p className="text-sm text-red-500 font-semibold">
              ⚠️ Warning: Negative Willpower!
            </p>
            <p className="text-xs text-red-400 mt-1">
              Complete good habits or resist bad ones to recover.
            </p>
          </div>
        )}

        {isMaxLevel && (
          <div className="bg-cyan-500/10 border border-cyan-500/50 rounded p-3">
            <p className="text-sm text-cyan-500 font-semibold">
              ✨ Maximum Willpower Achieved!
            </p>
          </div>
        )}

        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Min: {WILLPOWER_MIN}</span>
          <span>Max: {STAT_MAX_LEVEL}</span>
        </div>
      </CardContent>
    </Card>
  );
}
