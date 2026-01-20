'use client';

import { useHabitStore, useStatsStore, useActivityStore } from '@/store';
import { HabitList } from '@/components/habits/HabitList';
import { CreateHabitDialog } from '@/components/habits/CreateHabitDialog';
import { WillpowerTracker } from '@/components/habits/WillpowerTracker';
import { HabitType } from '@/types';
import toast from 'react-hot-toast';

export default function HabitsPage() {
  const {
    habits,
    addHabit,
    removeHabit,
    toggleHabitToday,
    isHabitCheckedToday,
  } = useHabitStore();
  const { increaseStat, decreaseStat } = useStatsStore();
  const { logActivity } = useActivityStore();

  const handleCreateHabit = (name: string, type: HabitType) => {
    addHabit(name, type);
    toast.success('Habit created!');
  };

  const handleDeleteHabit = (habitId: string) => {
    removeHabit(habitId);
    toast.success('Habit deleted');
  };

  const handleToggleHabit = (habitId: string) => {
    const habit = habits.find((h) => h.id === habitId);
    if (!habit) return;

    // Store current streak before toggling
    const oldStreak = habit.currentStreak ?? 0;
    const wasChecked = isHabitCheckedToday(habitId);

    // Toggle the habit (returns new checked state)
    const isNowChecked = toggleHabitToday(habitId);

    if (isNowChecked) {
      // Habit was just checked
      increaseStat('willpower');
      logActivity(0, 1, 1);

      // Get the new streak after update
      // Use a small delay to ensure the store has updated
      setTimeout(() => {
        const updatedHabit = habits.find((h) => h.id === habitId);
        if (!updatedHabit) return;

        const newStreak = updatedHabit.currentStreak ?? 0;

        // Check for milestone streaks
        if (newStreak === 30) {
          toast.success('30-day streak! You\'re unstoppable! 🔥🔥🔥', {
            duration: 5000,
          });
        } else if (newStreak === 7) {
          toast.success('7-day streak! Keep it up! 🔥', {
            duration: 4000,
          });
        } else {
          toast.success('Habit completed! Willpower +1');
        }
      }, 100);
    } else {
      // Habit was just unchecked
      decreaseStat('willpower');
      logActivity(0, 1, 1);

      if (oldStreak >= 3) {
        toast.error(`Streak broken! Lost ${oldStreak}-day streak. Willpower -1`, {
          duration: 4000,
        });
      } else {
        toast.error('Habit unchecked. Willpower -1');
      }
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h1 className="text-4xl font-bold gradient-text mb-8">Habit Tracker</h1>

      <div className="space-y-6">
        <WillpowerTracker />

        <div className="space-y-4">
          <HabitList
            habits={habits}
            onToggleHabit={handleToggleHabit}
            isHabitCheckedToday={isHabitCheckedToday}
            onDeleteHabit={handleDeleteHabit}
          />
          <CreateHabitDialog onCreateHabit={handleCreateHabit} />
        </div>
      </div>
    </div>
  );
}
