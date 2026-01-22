'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Flame } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StreakCounterProps {
  currentStreak: number;
  longestStreak: number;
  className?: string;
}

export function StreakCounter({
  currentStreak,
  longestStreak,
  className,
}: StreakCounterProps) {
  return (
    <Card className={cn('stat-card', className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-orange-500/20 rounded-full">
              <Flame className="w-8 h-8 text-orange-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Current Streak</p>
              <p className="text-3xl font-bold gradient-text">{currentStreak}</p>
            </div>
          </div>

          <div className="text-right">
            <p className="text-sm text-muted-foreground">Longest</p>
            <p className="text-2xl font-bold text-sl-cyan">{longestStreak}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
