'use client';

import { SystemWindow } from '@/components/ui/system-window';
import { cn } from '@/lib/utils';
import { User } from 'lucide-react';

interface PlayerLevelProps {
  level: number;
  className?: string;
}

export function PlayerLevel({ level, className }: PlayerLevelProps) {
  return (
    <SystemWindow
      title="PLAYER LEVEL"
      icon={<User className="w-4 h-4" />}
      className={cn('text-center hex-pattern', className)}
    >
      <div className="space-y-4">
        <div className="glow-divider" />
        <p className="text-8xl font-bold font-mono stat-value animate-pulse-glow">
          {level}
        </p>
        <div className="glow-divider" />
        <p className="text-xs text-sl-grey uppercase tracking-widest mt-4">
          Increase all stats to level up
        </p>
      </div>
    </SystemWindow>
  );
}
