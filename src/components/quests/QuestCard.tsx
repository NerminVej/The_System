'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { QuestTypeTag } from './QuestTypeTag';
import { Quest } from '@/types';
import { Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CornerBrackets } from '@/components/ui/corner-brackets';

interface QuestCardProps {
  quest: Quest;
  onToggle: () => void;
  onDelete: () => void;
  className?: string;
}

export function QuestCard({ quest, onToggle, onDelete, className }: QuestCardProps) {
  return (
    <div className={cn(
      'quest-card tech-border relative transition-all',
      quest.completed && 'opacity-50',
      className
    )}>
      <CornerBrackets size="sm" corners="diagonal" />

      <div className="flex items-center gap-4 p-4">
        <Checkbox
          checked={quest.completed}
          onCheckedChange={onToggle}
          className="border-sl-cyan data-[state=checked]:bg-sl-cyan data-[state=checked]:border-sl-cyan"
        />

        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            <h3
              className={cn(
                'font-medium text-sm uppercase tracking-wide',
                quest.completed ? 'line-through text-muted-foreground' : 'text-foreground'
              )}
            >
              {quest.title}
            </h3>
            <QuestTypeTag type={quest.type} />
          </div>
          {quest.description && (
            <p className="text-xs text-sl-grey">{quest.description}</p>
          )}
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={onDelete}
          className="text-destructive hover:text-destructive hover:bg-destructive/10 shrink-0"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
