'use client';

import { useActivityStore } from '@/store';
import { format, subDays, startOfDay, eachDayOfInterval } from 'date-fns';
import { cn } from '@/lib/utils';
import { useState } from 'react';

export function ActivityHeatmap() {
  const { activities } = useActivityStore();
  const [hoveredDate, setHoveredDate] = useState<string | null>(null);

  // Generate last 365 days
  const endDate = startOfDay(new Date());
  const startDate = subDays(endDate, 364);
  const days = eachDayOfInterval({ start: startDate, end: endDate });

  // Create a map for quick lookups
  const activityMap = new Map(
    activities.map((activity) => [activity.date, activity])
  );

  const getIntensityColor = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    const activity = activityMap.get(dateStr);

    if (!activity) return 'bg-sl-black-lighter border-sl-purple/10';

    const totalActivity =
      activity.questsCompleted + activity.habitsCompleted + activity.statsGained;

    if (totalActivity === 0) return 'bg-sl-black-lighter border-sl-purple/10';
    if (totalActivity <= 2) return 'bg-sl-purple/20 border-sl-purple/30';
    if (totalActivity <= 5) return 'bg-sl-purple/40 border-sl-purple/50';
    if (totalActivity <= 10) return 'bg-sl-purple/60 border-sl-purple/70';
    return 'bg-sl-purple border-sl-purple';
  };

  // Group days by week
  const weeks: Date[][] = [];
  let currentWeek: Date[] = [];

  days.forEach((day, index) => {
    if (index > 0 && day.getDay() === 0) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
    currentWeek.push(day);
  });
  if (currentWeek.length > 0) {
    weeks.push(currentWeek);
  }

  const hoveredActivity = hoveredDate ? activityMap.get(hoveredDate) : null;

  return (
    <div className="space-y-4">
      <div className="flex gap-1 overflow-x-auto pb-2">
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="flex flex-col gap-1">
            {week.map((day) => {
              const dateStr = format(day, 'yyyy-MM-dd');
              return (
                <div
                  key={dateStr}
                  className={cn(
                    'w-3 h-3 rounded-sm border transition-all cursor-pointer hover:scale-125',
                    getIntensityColor(day)
                  )}
                  onMouseEnter={() => setHoveredDate(dateStr)}
                  onMouseLeave={() => setHoveredDate(null)}
                  title={format(day, 'MMM d, yyyy')}
                />
              );
            })}
          </div>
        ))}
      </div>

      {hoveredDate && (
        <div className="bg-sl-black-lighter border border-sl-purple/30 rounded p-3 text-sm">
          <p className="font-semibold mb-2">
            {format(new Date(hoveredDate), 'MMMM d, yyyy')}
          </p>
          {hoveredActivity ? (
            <div className="space-y-1 text-muted-foreground">
              <p>Quests: {hoveredActivity.questsCompleted}</p>
              <p>Habits: {hoveredActivity.habitsCompleted}</p>
              <p>Stats Gained: {hoveredActivity.statsGained}</p>
              {hoveredActivity.allDailyQuestsCompleted && (
                <p className="text-sl-purple font-semibold">
                  ✓ All daily quests completed
                </p>
              )}
            </div>
          ) : (
            <p className="text-muted-foreground">No activity</p>
          )}
        </div>
      )}

      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <span>Less</span>
        <div className="flex gap-1">
          <div className="w-3 h-3 bg-sl-black-lighter border border-sl-purple/10 rounded-sm" />
          <div className="w-3 h-3 bg-sl-purple/20 border border-sl-purple/30 rounded-sm" />
          <div className="w-3 h-3 bg-sl-purple/40 border border-sl-purple/50 rounded-sm" />
          <div className="w-3 h-3 bg-sl-purple/60 border border-sl-purple/70 rounded-sm" />
          <div className="w-3 h-3 bg-sl-purple border border-sl-purple rounded-sm" />
        </div>
        <span>More</span>
      </div>
    </div>
  );
}
