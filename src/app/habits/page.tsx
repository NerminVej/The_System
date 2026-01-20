'use client';

import { useHabitStore, useStatsStore, useActivityStore } from '@/store';
import { HabitList } from '@/components/habits/HabitList';
import { CreateHabitDialog } from '@/components/habits/CreateHabitDialog';
import { WillpowerTracker } from '@/components/habits/WillpowerTracker';
import { HabitType } from '@/types';
import toast from 'react-hot-toast';

export default function HabitsPage() {
  const { habits, addHabit, removeHabit, logHabit } = useHabitStore();
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

  const handleLogHabit = (habitId: string, logType: 'completed' | 'resisted') => {
    const habit = habits.find((h) => h.id === habitId);
    if (!habit) return;

    logHabit(habitId, logType);

    // Update willpower based on habit type and log type
    if (habit.type === 'good' && logType === 'completed') {
      increaseStat('willpower');
      toast.success(`Good habit completed! Willpower +1`);
      logActivity(0, 1, 1);
    } else if (habit.type === 'bad' && logType === 'resisted') {
      increaseStat('willpower');
      toast.success(`Bad habit resisted! Willpower +1`);
      logActivity(0, 1, 1);
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
            onLogHabit={handleLogHabit}
            onDeleteHabit={handleDeleteHabit}
          />
          <CreateHabitDialog onCreateHabit={handleCreateHabit} />
        </div>
      </div>
    </div>
  );
}
