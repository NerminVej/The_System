'use client';

import { Habit } from '@/types';
import { HabitCard } from './HabitCard';

interface HabitListProps {
  habits: Habit[];
  onToggleHabit: (habitId: string) => void;
  isHabitCheckedToday: (habitId: string) => boolean;
  onDeleteHabit: (habitId: string) => void;
}

export function HabitList({
  habits,
  onToggleHabit,
  isHabitCheckedToday,
  onDeleteHabit,
}: HabitListProps) {
  if (habits.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <p>No habits tracked yet. Create your first habit!</p>
      </div>
    );
  }

  const goodHabits = habits.filter((h) => h.type === 'good');
  const badHabits = habits.filter((h) => h.type === 'bad');

  return (
    <div className="space-y-6">
      {goodHabits.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-green-500">Good Habits</h3>
          {goodHabits.map((habit) => (
            <HabitCard
              key={habit.id}
              habit={habit}
              isCheckedToday={isHabitCheckedToday(habit.id)}
              onToggle={() => onToggleHabit(habit.id)}
              onDelete={() => onDeleteHabit(habit.id)}
            />
          ))}
        </div>
      )}

      {badHabits.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-red-500">Bad Habits</h3>
          {badHabits.map((habit) => (
            <HabitCard
              key={habit.id}
              habit={habit}
              isCheckedToday={isHabitCheckedToday(habit.id)}
              onToggle={() => onToggleHabit(habit.id)}
              onDelete={() => onDeleteHabit(habit.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
