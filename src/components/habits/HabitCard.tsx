'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Habit } from '@/types';
import { Check, X, Trash2, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HabitCardProps {
  habit: Habit;
  onLog: (type: 'completed' | 'resisted' | 'failed') => void;
  onDelete: () => void;
  className?: string;
}

export function HabitCard({ habit, onLog, onDelete, className }: HabitCardProps) {
  return (
    <Card className={cn('quest-card', className)}>
      <CardContent className="flex items-center gap-4 p-4">
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2">
            <h3 className="font-medium">{habit.name}</h3>
            <Badge
              variant="outline"
              className={cn(
                'border',
                habit.type === 'good'
                  ? 'bg-green-500/20 text-green-500 border-green-500/50'
                  : 'bg-red-500/20 text-red-500 border-red-500/50'
              )}
            >
              {habit.type === 'good' ? 'Good' : 'Bad'}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground">
            Willpower: {habit.willpowerImpact > 0 ? '+' : ''}
            {habit.willpowerImpact}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {habit.type === 'good' ? (
            <Button
              size="sm"
              onClick={() => onLog('completed')}
              className="bg-green-500 hover:bg-green-600"
            >
              <Check className="h-4 w-4 mr-1" />
              Done
            </Button>
          ) : (
            <>
              <Button
                size="sm"
                onClick={() => onLog('resisted')}
                className="bg-blue-500 hover:bg-blue-600"
              >
                <X className="h-4 w-4 mr-1" />
                Resisted
              </Button>
              <Button
                size="sm"
                onClick={() => onLog('failed')}
                className="bg-red-500 hover:bg-red-600"
              >
                <XCircle className="h-4 w-4 mr-1" />
                Failed
              </Button>
            </>
          )}

          <Button
            variant="ghost"
            size="icon"
            onClick={onDelete}
            className="text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
