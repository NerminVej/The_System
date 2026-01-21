import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Quest, QuestType, QuestFrequency } from '@/types';
import { STORAGE_KEYS } from '@/lib/constants';

interface QuestState {
  dailyQuests: Quest[];
  weeklyQuests: Quest[];
  lastDailyReset: string;
  lastWeeklyReset: string;
  currentStreak: number;
  longestStreak: number;
  punishmentPending: boolean;

  // Actions
  addQuest: (
    title: string,
    type: QuestType,
    frequency: QuestFrequency,
    description?: string
  ) => void;
  removeQuest: (id: string, frequency: QuestFrequency) => void;
  toggleQuest: (id: string, frequency: QuestFrequency) => Quest | null;
  resetDailyQuests: (allCompleted: boolean) => void;
  resetWeeklyQuests: () => void;
  clearPunishment: () => void;
  importQuests: (data: Partial<QuestState>) => void;
}

const validQuestTypes: QuestType[] = ['workout', 'endurance', 'skill', 'intelligence', 'willpower', 'general'];

const isValidQuest = (quest: Quest): boolean => {
  return validQuestTypes.includes(quest.type);
};

export const useQuestStore = create<QuestState>()(
  persist(
    (set, get) => ({
      dailyQuests: [],
      weeklyQuests: [],
      lastDailyReset: new Date().toISOString(),
      lastWeeklyReset: new Date().toISOString(),
      currentStreak: 0,
      longestStreak: 0,
      punishmentPending: false,

      addQuest: (
        title: string,
        type: QuestType,
        frequency: QuestFrequency,
        description?: string
      ) => {
        const newQuest: Quest = {
          id: crypto.randomUUID(),
          title,
          description,
          type,
          frequency,
          completed: false,
          createdAt: new Date().toISOString(),
        };

        set((state) => {
          if (frequency === 'daily') {
            return { dailyQuests: [...state.dailyQuests, newQuest] };
          } else {
            return { weeklyQuests: [...state.weeklyQuests, newQuest] };
          }
        });
      },

      removeQuest: (id: string, frequency: QuestFrequency) => {
        set((state) => {
          if (frequency === 'daily') {
            return {
              dailyQuests: state.dailyQuests.filter((q) => q.id !== id),
            };
          } else {
            return {
              weeklyQuests: state.weeklyQuests.filter((q) => q.id !== id),
            };
          }
        });
      },

      toggleQuest: (id: string, frequency: QuestFrequency) => {
        let completedQuest: Quest | null = null;

        set((state) => {
          const quests = frequency === 'daily' ? state.dailyQuests : state.weeklyQuests;
          const updatedQuests = quests.map((quest) => {
            if (quest.id === id) {
              const updatedQuest = {
                ...quest,
                completed: !quest.completed,
                completedAt: !quest.completed ? new Date().toISOString() : undefined,
              };
              if (updatedQuest.completed) {
                completedQuest = updatedQuest;
              }
              return updatedQuest;
            }
            return quest;
          });

          if (frequency === 'daily') {
            return { dailyQuests: updatedQuests };
          } else {
            return { weeklyQuests: updatedQuests };
          }
        });

        return completedQuest;
      },

      resetDailyQuests: (allCompleted: boolean) => {
        set((state) => {
          const newCurrentStreak = allCompleted ? state.currentStreak + 1 : 0;
          const newLongestStreak = Math.max(newCurrentStreak, state.longestStreak);

          return {
            dailyQuests: state.dailyQuests.map((quest) => ({
              ...quest,
              completed: false,
              completedAt: undefined,
            })),
            lastDailyReset: new Date().toISOString(),
            currentStreak: newCurrentStreak,
            longestStreak: newLongestStreak,
            punishmentPending: !allCompleted && state.dailyQuests.length > 0,
          };
        });
      },

      resetWeeklyQuests: () => {
        set((state) => ({
          weeklyQuests: state.weeklyQuests.map((quest) => ({
            ...quest,
            completed: false,
            completedAt: undefined,
          })),
          lastWeeklyReset: new Date().toISOString(),
        }));
      },

      clearPunishment: () => {
        set({ punishmentPending: false });
      },

      importQuests: (data: Partial<QuestState>) => {
        set((state) => ({
          ...state,
          ...data,
        }));
      },
    }),
    {
      name: STORAGE_KEYS.QUESTS,
      onRehydrateStorage: () => (state) => {
        if (state) {
          // Clean up any quests with invalid types (like removed 'deepwork')
          state.dailyQuests = state.dailyQuests.filter(isValidQuest);
          state.weeklyQuests = state.weeklyQuests.filter(isValidQuest);
        }
      },
    }
  )
);
