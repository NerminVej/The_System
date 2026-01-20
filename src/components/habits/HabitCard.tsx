'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Habit } from '@/types';
import { Trash2, Flame } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HabitCardProps {
  habit: Habit;
  isCheckedToday: boolean;
  onToggle: () => void;
  onDelete: () => void;
  className?: string;
}

export function HabitCard({
  habit,
  isCheckedToday,
  onToggle,
  onDelete,
  className,
}: HabitCardProps) {
  const currentStreak = habit.currentStreak ?? 0;
  const longestStreak = habit.longestStreak ?? 0;
  const showWarning = !isCheckedToday && currentStreak >= 3;

  // Determine flame color based on streak
  const getFlameColor = () => {
    if (currentStreak >= 30) return 'text-red-500';
    if (currentStreak >= 7) return 'text-orange-500';
    return 'text-yellow-500';
  };

  return (
    <Card className={cn('quest-card', className)}>
      <CardContent className="flex items-center gap-4 p-4">
        <Checkbox
          checked={isCheckedToday}
          onCheckedChange={onToggle}
          className="h-5 w-5"
        />

        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
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

          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            {currentStreak > 0 && (
              <div className="flex items-center gap-1">
                <Flame className={cn('h-4 w-4', getFlameColor())} />
                <span className="font-medium">
                  {currentStreak} {currentStreak === 1 ? 'day' : 'days'}
                </span>
              </div>
            )}

            {longestStreak > currentStreak && longestStreak > 0 && (
              <span>Best: {longestStreak}</span>
            )}

            <span>Willpower: {habit.willpowerImpact > 0 ? '+' : ''}{habit.willpowerImpact}</span>
          </div>

          {showWarning && (
            <p className="text-xs text-orange-500 font-medium">
              Don&apos;t break your {currentStreak}-day streak!
            </p>
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
