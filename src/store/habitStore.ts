import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Habit, HabitType, HabitLog } from '@/types';
import { STORAGE_KEYS } from '@/lib/constants';

interface HabitState {
  habits: Habit[];
  logs: HabitLog[];

  // Actions
  addHabit: (name: string, type: HabitType) => void;
  removeHabit: (id: string) => void;
  logHabit: (habitId: string, logType: 'completed' | 'resisted') => HabitLog;
  getHabitLogs: (habitId: string, days?: number) => HabitLog[];
  getTodayLogs: () => HabitLog[];
  importHabits: (data: Partial<HabitState>) => void;
}

export const useHabitStore = create<HabitState>()(
  persist(
    (set, get) => ({
      habits: [],
      logs: [],

      addHabit: (name: string, type: HabitType) => {
        const newHabit: Habit = {
          id: crypto.randomUUID(),
          name,
          type,
          willpowerImpact: type === 'good' ? 1 : -1,
          createdAt: new Date().toISOString(),
        };

        set((state) => ({
          habits: [...state.habits, newHabit],
        }));
      },

      removeHabit: (id: string) => {
        set((state) => ({
          habits: state.habits.filter((h) => h.id !== id),
          logs: state.logs.filter((l) => l.habitId !== id),
        }));
      },

      logHabit: (habitId: string, logType: 'completed' | 'resisted') => {
        const newLog: HabitLog = {
          id: crypto.randomUUID(),
          habitId,
          timestamp: new Date().toISOString(),
          type: logType,
        };

        set((state) => ({
          logs: [...state.logs, newLog],
        }));

        return newLog;
      },

      getHabitLogs: (habitId: string, days?: number) => {
        const logs = get().logs.filter((log) => log.habitId === habitId);

        if (days) {
          const cutoffDate = new Date();
          cutoffDate.setDate(cutoffDate.getDate() - days);
          return logs.filter(
            (log) => new Date(log.timestamp) >= cutoffDate
          );
        }

        return logs;
      },

      getTodayLogs: () => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        return get().logs.filter((log) => {
          const logDate = new Date(log.timestamp);
          logDate.setHours(0, 0, 0, 0);
          return logDate.getTime() === today.getTime();
        });
      },

      importHabits: (data: Partial<HabitState>) => {
        set((state) => ({
          ...state,
          ...data,
        }));
      },
    }),
    {
      name: STORAGE_KEYS.HABITS,
    }
  )
);
