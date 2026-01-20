export type HabitType = 'good' | 'bad';

export interface Habit {
  id: string;
  name: string;
  type: HabitType;
  willpowerImpact: number; // +1 for good, -1 for bad
  createdAt: string;
}

export interface HabitLog {
  id: string;
  habitId: string;
  timestamp: string;
  type: 'completed' | 'resisted'; // completed for good habits, resisted for bad habits
}

export interface HabitState {
  habits: Habit[];
  logs: HabitLog[];
}
