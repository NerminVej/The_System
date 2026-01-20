'use client';

import { useEffect } from 'react';
import { useQuestStore, useSettingsStore } from '@/store';
import { shouldResetDaily, shouldResetWeekly } from '@/lib/questReset';

export function useQuestReset() {
  const { dailyQuests, lastDailyReset, lastWeeklyReset, resetDailyQuests, resetWeeklyQuests } =
    useQuestStore();
  const { settings } = useSettingsStore();

  useEffect(() => {
    const checkReset = () => {
      // Check daily reset
      if (shouldResetDaily(lastDailyReset, settings.dailyResetTime)) {
        const allCompleted = dailyQuests.every((q) => q.completed);
        resetDailyQuests(allCompleted);
      }

      // Check weekly reset
      if (
        shouldResetWeekly(
          lastWeeklyReset,
          settings.weeklyResetDay,
          settings.dailyResetTime
        )
      ) {
        resetWeeklyQuests();
      }
    };

    // Check on mount
    checkReset();

    // Check every minute
    const interval = setInterval(checkReset, 60000);

    return () => clearInterval(interval);
  }, [
    dailyQuests,
    lastDailyReset,
    lastWeeklyReset,
    settings.dailyResetTime,
    settings.weeklyResetDay,
    resetDailyQuests,
    resetWeeklyQuests,
  ]);
}
