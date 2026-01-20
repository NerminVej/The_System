import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { DailyActivity } from '@/types';
import { STORAGE_KEYS } from '@/lib/constants';
import { format, startOfDay } from 'date-fns';

interface ActivityState {
  activities: DailyActivity[];

  // Actions
  logActivity: (
    questsCompleted?: number,
    habitsCompleted?: number,
    statsGained?: number,
    allDailyQuestsCompleted?: boolean
  ) => void;
  getActivity: (date: string) => DailyActivity | undefined;
  getActivitiesInRange: (startDate: string, endDate: string) => DailyActivity[];
  getLast365Days: () => DailyActivity[];
  importActivities: (data: Partial<ActivityState>) => void;
}

export const useActivityStore = create<ActivityState>()(
  persist(
    (set, get) => ({
      activities: [],

      logActivity: (
        questsCompleted: number = 0,
        habitsCompleted: number = 0,
        statsGained: number = 0,
        allDailyQuestsCompleted: boolean = false
      ) => {
        const today = format(startOfDay(new Date()), 'yyyy-MM-dd');

        set((state) => {
          const existingActivityIndex = state.activities.findIndex(
            (a) => a.date === today
          );

          if (existingActivityIndex >= 0) {
            // Update existing activity
            const updatedActivities = [...state.activities];
            updatedActivities[existingActivityIndex] = {
              date: today,
              questsCompleted:
                updatedActivities[existingActivityIndex].questsCompleted +
                questsCompleted,
              habitsCompleted:
                updatedActivities[existingActivityIndex].habitsCompleted +
                habitsCompleted,
              statsGained:
                updatedActivities[existingActivityIndex].statsGained +
                statsGained,
              allDailyQuestsCompleted:
                allDailyQuestsCompleted ||
                updatedActivities[existingActivityIndex].allDailyQuestsCompleted,
            };
            return { activities: updatedActivities };
          } else {
            // Create new activity
            const newActivity: DailyActivity = {
              date: today,
              questsCompleted,
              habitsCompleted,
              statsGained,
              allDailyQuestsCompleted,
            };
            return { activities: [...state.activities, newActivity] };
          }
        });
      },

      getActivity: (date: string) => {
        return get().activities.find((a) => a.date === date);
      },

      getActivitiesInRange: (startDate: string, endDate: string) => {
        return get().activities.filter(
          (a) => a.date >= startDate && a.date <= endDate
        );
      },

      getLast365Days: () => {
        const endDate = format(new Date(), 'yyyy-MM-dd');
        const startDate = format(
          new Date(Date.now() - 365 * 24 * 60 * 60 * 1000),
          'yyyy-MM-dd'
        );
        return get().getActivitiesInRange(startDate, endDate);
      },

      importActivities: (data: Partial<ActivityState>) => {
        set((state) => ({
          ...state,
          ...data,
        }));
      },
    }),
    {
      name: STORAGE_KEYS.ACTIVITIES,
    }
  )
);
