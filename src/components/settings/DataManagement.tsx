'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  useStatsStore,
  useQuestStore,
  useHabitStore,
  useActivityStore,
  useSettingsStore,
} from '@/store';
import { Download, Upload, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

export function DataManagement() {
  const [isResetting, setIsResetting] = useState(false);

  const statsStore = useStatsStore();
  const questStore = useQuestStore();
  const habitStore = useHabitStore();
  const activityStore = useActivityStore();
  const settingsStore = useSettingsStore();

  const handleExport = () => {
    const data = {
      stats: {
        playerLevel: statsStore.playerLevel,
        stats: statsStore.stats,
        totalXP: statsStore.totalXP,
      },
      quests: {
        dailyQuests: questStore.dailyQuests,
        weeklyQuests: questStore.weeklyQuests,
        lastDailyReset: questStore.lastDailyReset,
        lastWeeklyReset: questStore.lastWeeklyReset,
        currentStreak: questStore.currentStreak,
        longestStreak: questStore.longestStreak,
        punishmentPending: questStore.punishmentPending,
      },
      habits: {
        habits: habitStore.habits,
        logs: habitStore.logs,
      },
      activities: {
        activities: activityStore.activities,
      },
      settings: {
        settings: settingsStore.settings,
      },
      exportDate: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `the-system-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast.success('Data exported successfully!');
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      try {
        const text = await file.text();
        const data = JSON.parse(text);

        if (data.stats) statsStore.importStats(data.stats);
        if (data.quests) questStore.importQuests(data.quests);
        if (data.habits) habitStore.importHabits(data.habits);
        if (data.activities) activityStore.importActivities(data.activities);
        if (data.settings) settingsStore.importSettings(data.settings);

        toast.success('Data imported successfully!');
        setTimeout(() => window.location.reload(), 1000);
      } catch (error) {
        toast.error('Failed to import data. Please check the file format.');
        console.error('Import error:', error);
      }
    };
    input.click();
  };

  const handleReset = () => {
    if (!isResetting) {
      setIsResetting(true);
      toast.error('Click again to confirm reset', { duration: 3000 });
      setTimeout(() => setIsResetting(false), 3000);
      return;
    }

    statsStore.resetStats();
    // Reset quests by setting them to empty
    questStore.importQuests({
      dailyQuests: [],
      weeklyQuests: [],
      lastDailyReset: new Date().toISOString(),
      lastWeeklyReset: new Date().toISOString(),
      currentStreak: 0,
      longestStreak: 0,
      punishmentPending: false,
    });
    habitStore.importHabits({ habits: [], logs: [] });
    activityStore.importActivities({ activities: [] });
    settingsStore.resetSettings();

    toast.success('All data reset!');
    setIsResetting(false);
    setTimeout(() => window.location.reload(), 1000);
  };

  return (
    <Card className="stat-card">
      <CardHeader>
        <CardTitle>Data Management</CardTitle>
        <CardDescription>Export, import, or reset your data</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button
          onClick={handleExport}
          className="w-full bg-sl-cyan hover:bg-sl-cyan/90"
        >
          <Download className="mr-2 h-4 w-4" />
          Export Data
        </Button>

        <Button onClick={handleImport} variant="outline" className="w-full">
          <Upload className="mr-2 h-4 w-4" />
          Import Data
        </Button>

        <Button
          onClick={handleReset}
          variant="destructive"
          className={`w-full ${isResetting ? 'animate-pulse' : ''}`}
        >
          <Trash2 className="mr-2 h-4 w-4" />
          {isResetting ? 'Click Again to Confirm' : 'Reset All Data'}
        </Button>

        <p className="text-xs text-muted-foreground">
          {isResetting
            ? 'This will delete all your progress permanently!'
            : 'Export your data regularly to prevent data loss.'}
        </p>
      </CardContent>
    </Card>
  );
}
