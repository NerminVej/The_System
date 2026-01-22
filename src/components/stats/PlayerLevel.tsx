'use client';

import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface PlayerLevelProps {
  level: number;
  className?: string;
}

export function PlayerLevel({ level, className }: PlayerLevelProps) {
  return (
    <Card
      className={cn(
        'holo-card text-center py-8 border-2 border-sl-cyan/50',
        className
      )}
    >
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground uppercase tracking-wider">
          Player Level
        </p>
        <p className="text-6xl font-bold gradient-text">{level}</p>
        <p className="text-xs text-muted-foreground">
          Level up by increasing all stats
        </p>
      </div>
    </Card>
  );
}
