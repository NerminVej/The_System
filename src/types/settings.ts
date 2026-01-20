export interface Settings {
  dailyResetTime: string; // HH:mm format (e.g., "00:00" for midnight)
  weeklyResetDay: number; // 0-6, where 0 = Sunday
  soundEnabled: boolean;
}

export interface SettingsState {
  settings: Settings;
}
