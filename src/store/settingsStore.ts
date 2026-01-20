import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Settings } from '@/types';
import { STORAGE_KEYS, DEFAULT_SETTINGS } from '@/lib/constants';

interface SettingsState {
  settings: Settings;

  // Actions
  updateSettings: (settings: Partial<Settings>) => void;
  resetSettings: () => void;
  importSettings: (data: Partial<SettingsState>) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      settings: DEFAULT_SETTINGS,

      updateSettings: (newSettings: Partial<Settings>) => {
        set((state) => ({
          settings: {
            ...state.settings,
            ...newSettings,
          },
        }));
      },

      resetSettings: () => {
        set({ settings: DEFAULT_SETTINGS });
      },

      importSettings: (data: Partial<SettingsState>) => {
        set((state) => ({
          ...state,
          ...data,
        }));
      },
    }),
    {
      name: STORAGE_KEYS.SETTINGS,
    }
  )
);
