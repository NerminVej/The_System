'use client';

import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { STAT_MAX_LEVEL } from '@/lib/constants';

interface StatProgressBarProps {
  level: number;
  className?: string;
  showGlow?: boolean;
}

export function StatProgressBar({ level, className, showGlow = false }: StatProgressBarProps) {
  const progress = (level / STAT_MAX_LEVEL) * 100;
  const isMaxLevel = level >= STAT_MAX_LEVEL;

  return (
    <div className="relative">
      <Progress
        value={progress}
        className={cn(
          'h-2',
          isMaxLevel && showGlow && 'glow-effect',
          className
        )}
      />
      {isMaxLevel && (
        <span className="absolute -right-8 top-1/2 -translate-y-1/2 text-xs text-sl-purple animate-pulse">
          MAX
        </span>
      )}
    </div>
  );
}
