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
  toggleHabitToday: (habitId: string) => boolean;
  isHabitCheckedToday: (habitId: string) => boolean;
  calculateStreak: (habitId: string) => number;
  updateHabitStreaks: (habitId: string) => void;
  getHabitLogs: (habitId: string, days?: number) => HabitLog[];
  getTodayLogs: () => HabitLog[];
  importHabits: (data: Partial<HabitState>) => void;
}

// Helper function to get today's date in YYYY-MM-DD format
const getTodayDate = (): string => {
  return new Date().toISOString().split('T')[0];
};

// Helper function to check if dates are consecutive
const isConsecutiveDay = (date1: string, date2: string): boolean => {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  const diffTime = Math.abs(d2.getTime() - d1.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays === 1;
};

// Migration function to convert old format to new format
const migrateOldData = (state: HabitState): HabitState => {
  // Ensure state.logs exists
  if (!state.logs) {
    state.logs = [];
  }

  // Ensure state.habits exists
  if (!state.habits) {
    state.habits = [];
  }

  // Check if migration is needed (old format has 'type' and 'timestamp' fields)
  const needsLogMigration = state.logs.some((log: any) =>
    'type' in log || 'timestamp' in log
  );

  // Check if habits need streak fields initialized
  const needsHabitMigration = state.habits.some((habit: any) =>
    habit.currentStreak === undefined || habit.longestStreak === undefined
  );

  if (!needsLogMigration && !needsHabitMigration) {
    return state;
  }

  console.log('Migrating habit data to new format...');

  let newLogs: HabitLog[] = state.logs;

  // Only migrate logs if needed
  if (needsLogMigration) {
    // Group old logs by habitId and date
    const logsByHabitAndDate = new Map<string, Map<string, any[]>>();

    state.logs.forEach((log: any) => {
      // Convert timestamp to date
      const date = log.timestamp
        ? new Date(log.timestamp).toISOString().split('T')[0]
        : log.date;

      if (!logsByHabitAndDate.has(log.habitId)) {
        logsByHabitAndDate.set(log.habitId, new Map());
      }

      const habitLogs = logsByHabitAndDate.get(log.habitId)!;
      if (!habitLogs.has(date)) {
        habitLogs.set(date, []);
      }

      habitLogs.get(date)!.push(log);
    });

    // Create new format logs (one per day, only successful actions)
    newLogs = [];

    logsByHabitAndDate.forEach((dateMap, habitId) => {
      dateMap.forEach((logs, date) => {
        // Check if any log for this day was successful
        const hasSuccess = logs.some((log: any) =>
          log.type === 'completed' || log.type === 'resisted'
        );

        if (hasSuccess) {
          newLogs.push({
            id: crypto.randomUUID(),
            habitId,
            date,
            completed: true,
          });
        }
      });
    });
  }

  // Initialize streak fields for existing habits
  const updatedHabits = state.habits.map((habit: any) => ({
    ...habit,
    currentStreak: habit.currentStreak ?? 0,
    longestStreak: habit.longestStreak ?? 0,
  }));

  console.log(`Migration complete: ${newLogs.length} logs migrated`);

  return {
    ...state,
    habits: updatedHabits,
    logs: newLogs,
  };
};

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
          currentStreak: 0,
          longestStreak: 0,
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

      toggleHabitToday: (habitId: string): boolean => {
        const today = getTodayDate();
        const state = get();
        const existingLog = state.logs.find(
          (log) => log.habitId === habitId && log.date === today
        );

        if (existingLog) {
          // Uncheck: remove today's log
          set((state) => ({
            logs: state.logs.filter((log) => log.id !== existingLog.id),
          }));

          // Recalculate streaks after unchecking
          setTimeout(() => get().updateHabitStreaks(habitId), 0);
          return false;
        } else {
          // Check: add today's log
          const newLog: HabitLog = {
            id: crypto.randomUUID(),
            habitId,
            date: today,
            completed: true,
          };

          set((state) => ({
            logs: [...state.logs, newLog],
          }));

          // Update streaks after checking
          setTimeout(() => get().updateHabitStreaks(habitId), 0);
          return true;
        }
      },

      isHabitCheckedToday: (habitId: string): boolean => {
        const today = getTodayDate();
        return get().logs.some(
          (log) => log.habitId === habitId && log.date === today
        );
      },

      calculateStreak: (habitId: string): number => {
        const logs = get()
          .logs.filter((log) => log.habitId === habitId && log.completed)
          .sort((a, b) => b.date.localeCompare(a.date)); // Sort newest first

        if (logs.length === 0) {
          return 0;
        }

        const today = getTodayDate();
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayDate = yesterday.toISOString().split('T')[0];

        const mostRecentLog = logs[0];

        // Check if most recent log is today or yesterday (grace period)
        if (mostRecentLog.date !== today && mostRecentLog.date !== yesterdayDate) {
          return 0; // Streak is broken
        }

        // Count consecutive days backward from most recent log
        let streak = 1;
        let currentDate = mostRecentLog.date;

        for (let i = 1; i < logs.length; i++) {
          const prevDate = logs[i].date;

          if (isConsecutiveDay(prevDate, currentDate)) {
            streak++;
            currentDate = prevDate;
          } else if (prevDate === currentDate) {
            // Same day (shouldn't happen with new format, but handle it)
            continue;
          } else {
            // Gap in dates, streak ends
            break;
          }
        }

        return streak;
      },

      updateHabitStreaks: (habitId: string) => {
        const currentStreak = get().calculateStreak(habitId);

        set((state) => ({
          habits: state.habits.map((habit) => {
            if (habit.id === habitId) {
              const longestStreak = Math.max(
                habit.longestStreak,
                currentStreak
              );
              return {
                ...habit,
                currentStreak,
                longestStreak,
              };
            }
            return habit;
          }),
        }));
      },

      getHabitLogs: (habitId: string, days?: number) => {
        const logs = get().logs.filter((log) => log.habitId === habitId);

        if (days) {
          const cutoffDate = new Date();
          cutoffDate.setDate(cutoffDate.getDate() - days);
          const cutoffDateStr = cutoffDate.toISOString().split('T')[0];
          return logs.filter((log) => log.date >= cutoffDateStr);
        }

        return logs;
      },

      getTodayLogs: () => {
        const today = getTodayDate();
        return get().logs.filter((log) => log.date === today);
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
      onRehydrateStorage: () => (state) => {
        if (state) {
          // Run migration after rehydration
          const migratedState = migrateOldData(state);

          // If migration occurred, save the migrated state
          if (migratedState !== state) {
            Object.assign(state, migratedState);

            // Recalculate all streaks after migration
            // Use setTimeout to ensure methods are available
            setTimeout(() => {
              if (state && state.updateHabitStreaks) {
                migratedState.habits.forEach((habit) => {
                  state.updateHabitStreaks(habit.id);
                });
              }
            }, 0);
          }
        }
      },
    }
  )
);
