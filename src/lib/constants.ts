// Game constants
export const STAT_MAX_LEVEL = 10;
export const STAT_MIN_LEVEL = 0;
export const WILLPOWER_MIN = -5; // Cap for negative willpower

// LocalStorage keys
export const STORAGE_KEYS = {
  STATS: 'the-system-stats',
  QUESTS: 'the-system-quests',
  HABITS: 'the-system-habits',
  HABIT_LOGS: 'the-system-habit-logs',
  ACTIVITIES: 'the-system-activities',
  SETTINGS: 'the-system-settings',
} as const;

// Default settings
export const DEFAULT_SETTINGS = {
  dailyResetTime: '00:00',
  weeklyResetDay: 0, // Sunday
  soundEnabled: true,
};
