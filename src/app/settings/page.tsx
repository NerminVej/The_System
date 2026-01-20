'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { DataManagement } from '@/components/settings/DataManagement';
import { useSettingsStore } from '@/store';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';

export default function SettingsPage() {
  const { settings, updateSettings } = useSettingsStore();
  const [resetTime, setResetTime] = useState(settings.dailyResetTime);
  const [resetDay, setResetDay] = useState(settings.weeklyResetDay);

  const handleSaveSettings = () => {
    updateSettings({
      dailyResetTime: resetTime,
      weeklyResetDay: resetDay,
    });
    toast.success('Settings saved!');
  };

  const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  return (
    <div className="container mx-auto p-6 max-w-4xl space-y-6">
      <h1 className="text-4xl font-bold gradient-text">Settings</h1>

      <Card className="stat-card">
        <CardHeader>
          <CardTitle>Reset Schedule</CardTitle>
          <CardDescription>
            Configure when your daily and weekly quests reset
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="resetTime">Daily Reset Time</Label>
            <Input
              id="resetTime"
              type="time"
              value={resetTime}
              onChange={(e) => setResetTime(e.target.value)}
              className="bg-sl-black border-sl-purple/30"
            />
            <p className="text-xs text-muted-foreground">
              Daily quests will reset at this time each day
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="resetDay">Weekly Reset Day</Label>
            <select
              id="resetDay"
              value={resetDay}
              onChange={(e) => setResetDay(Number(e.target.value))}
              className="w-full rounded-md border border-sl-purple/30 bg-sl-black px-3 py-2 text-sm"
            >
              {daysOfWeek.map((day, index) => (
                <option key={index} value={index}>
                  {day}
                </option>
              ))}
            </select>
            <p className="text-xs text-muted-foreground">
              Weekly quests will reset on this day
            </p>
          </div>

          <Button
            onClick={handleSaveSettings}
            className="w-full bg-sl-purple hover:bg-sl-purple/90"
          >
            Save Settings
          </Button>
        </CardContent>
      </Card>

      <DataManagement />

      <Card className="stat-card">
        <CardHeader>
          <CardTitle>About The System</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>
            The System is a Solo Leveling-inspired self-improvement app that
            gamifies your personal growth journey.
          </p>
          <p>Complete quests, build habits, and level up your stats!</p>
          <div className="pt-4 border-t border-sl-purple/20">
            <p className="text-xs">
              Version 1.0.0 • Built with Next.js, TypeScript, and Zustand
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
