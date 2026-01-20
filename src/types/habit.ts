export type HabitType = 'good' | 'bad';

export interface Habit {
  id: string;
  name: string;
  type: HabitType;
  willpowerImpact: number; // +1 for good, -1 for bad
  createdAt: string;
  currentStreak: number;
  longestStreak: number;
}

export interface HabitLog {
  id: string;
  habitId: string;
  date: string; // YYYY-MM-DD format
  completed: boolean;
}

export interface HabitState {
  habits: Habit[];
  logs: HabitLog[];
}
