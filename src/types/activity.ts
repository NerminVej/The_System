export interface DailyActivity {
  date: string; // ISO date string (YYYY-MM-DD)
  questsCompleted: number;
  habitsCompleted: number;
  statsGained: number;
  allDailyQuestsCompleted: boolean;
}

export interface ActivityState {
  activities: DailyActivity[];
}
