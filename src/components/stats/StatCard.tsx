'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatProgressBar } from './StatProgressBar';
import { StatType } from '@/types';
import { getStatColor, getStatIcon } from '@/lib/levelingSystem';
import { cn } from '@/lib/utils';

interface StatCardProps {
  statType: StatType;
  level: number;
  xp: number;
  className?: string;
}

export function StatCard({ statType, level, xp, className }: StatCardProps) {
  const statColor = getStatColor(statType);
  const statIcon = getStatIcon(statType);
  const isNegative = level < 0;

  return (
    <Card className={cn('stat-card', className)}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-sm font-medium">
          <span className="flex items-center gap-2">
            <span className="text-lg">{statIcon}</span>
            <span className="capitalize">{statType}</span>
          </span>
          <span
            className={cn(
              'text-xl font-bold',
              isNegative ? 'text-red-500' : statColor
            )}
          >
            {level}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <StatProgressBar level={level} showGlow />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>XP: {xp}</span>
          {isNegative && (
            <span className="text-red-500 font-semibold">Warning!</span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
