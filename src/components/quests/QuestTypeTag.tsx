'use client';

import { Badge } from '@/components/ui/badge';
import { QuestType } from '@/types';
import { cn } from '@/lib/utils';

interface QuestTypeTagProps {
  type: QuestType;
  className?: string;
}

const questTypeConfig: Record<
  QuestType,
  { label: string; color: string; icon: string }
> = {
  workout: { label: 'Workout', color: 'bg-red-500/20 text-red-500 border-red-500/50', icon: '💪' },
  endurance: { label: 'Endurance', color: 'bg-green-500/20 text-green-500 border-green-500/50', icon: '🏃' },
  skill: { label: 'Skill', color: 'bg-yellow-500/20 text-yellow-500 border-yellow-500/50', icon: '⚡' },
  deepwork: { label: 'Deep Work', color: 'bg-blue-500/20 text-blue-500 border-blue-500/50', icon: '🧠' },
  general: { label: 'General', color: 'bg-gray-500/20 text-gray-500 border-gray-500/50', icon: '📋' },
};

export function QuestTypeTag({ type, className }: QuestTypeTagProps) {
  const config = questTypeConfig[type];

  return (
    <Badge variant="outline" className={cn(config.color, 'border', className)}>
      <span className="mr-1">{config.icon}</span>
      {config.label}
    </Badge>
  );
}
