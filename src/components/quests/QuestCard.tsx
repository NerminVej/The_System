'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { QuestTypeTag } from './QuestTypeTag';
import { Quest } from '@/types';
import { Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuestCardProps {
  quest: Quest;
  onToggle: () => void;
  onDelete: () => void;
  className?: string;
}

export function QuestCard({ quest, onToggle, onDelete, className }: QuestCardProps) {
  return (
    <Card className={cn('quest-card', quest.completed && 'opacity-60', className)}>
      <CardContent className="flex items-center gap-4 p-4">
        <Checkbox
          checked={quest.completed}
          onCheckedChange={onToggle}
          className="border-sl-blue data-[state=checked]:bg-sl-blue"
        />

        <div className="flex-1 space-y-1">
          <div className="flex items-center gap-2">
            <h3
              className={cn(
                'font-medium',
                quest.completed && 'line-through text-muted-foreground'
              )}
            >
              {quest.title}
            </h3>
            <QuestTypeTag type={quest.type} />
          </div>
          {quest.description && (
            <p className="text-sm text-muted-foreground">{quest.description}</p>
          )}
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={onDelete}
          className="text-destructive hover:text-destructive hover:bg-destructive/10"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
}
