'use client';

import { StatProgressBar } from './StatProgressBar';
import { StatType } from '@/types';
import { getStatColor, getStatIcon } from '@/lib/levelingSystem';
import { cn } from '@/lib/utils';
import { CornerBrackets } from '@/components/ui/corner-brackets';

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
    <div className={cn('stat-card tech-border relative', className)}>
      <CornerBrackets size="md" corners="diagonal" />

      {/* Header section */}
      <div className="system-header">
        <span className="text-lg">{statIcon}</span>
        <span className="uppercase text-xs tracking-wider font-bold text-foreground">
          {statType}
        </span>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Level display */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-sl-grey uppercase tracking-wider">LEVEL</span>
          <span
            className={cn(
              'text-3xl font-bold font-mono',
              isNegative ? 'text-red-500' : 'stat-value'
            )}
          >
            {level}
          </span>
        </div>

        <div className="accent-line" />

        {/* Progress bar */}
        <StatProgressBar level={level} showGlow />

        {/* XP display */}
        <div className="flex justify-between text-xs">
          <span className="text-sl-grey uppercase tracking-wider">XP</span>
          <span className="font-mono text-sl-cyan">{xp}</span>
        </div>

        {isNegative && (
          <div className="mt-2 px-2 py-1 bg-red-500/10 border border-red-500/50 rounded">
            <span className="text-red-500 font-semibold text-xs uppercase tracking-wider">
              ⚠ Warning!
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
