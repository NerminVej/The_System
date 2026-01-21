export type QuestType =
  | 'workout'      // Increases Strength
  | 'endurance'    // Increases Stamina
  | 'skill'        // Increases Agility
  | 'intelligence' // Increases Intelligence
  | 'willpower'    // Increases Willpower
  | 'general';     // No specific stat increase

export type QuestFrequency = 'daily' | 'weekly';

export interface Quest {
  id: string;
  title: string;
  description?: string;
  type: QuestType;
  frequency: QuestFrequency;
  completed: boolean;
  createdAt: string;
  completedAt?: string;
}

export interface QuestState {
  dailyQuests: Quest[];
  weeklyQuests: Quest[];
  lastDailyReset: string;
  lastWeeklyReset: string;
  currentStreak: number;
  longestStreak: number;
  punishmentPending: boolean;
}
