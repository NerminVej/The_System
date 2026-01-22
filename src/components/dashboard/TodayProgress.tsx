'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useQuestStore } from '@/store';
import { CheckCircle2 } from 'lucide-react';

export function TodayProgress() {
  const { dailyQuests } = useQuestStore();

  const completed = dailyQuests.filter((q) => q.completed).length;
  const total = dailyQuests.length;
  const progress = total > 0 ? (completed / total) * 100 : 0;

  return (
    <Card className="stat-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-sl-cyan" />
          <span>Today&apos;s Progress</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Daily Quests</span>
            <span className="font-semibold">
              {completed} / {total}
            </span>
          </div>
          <Progress value={progress} className="h-3" />
        </div>

        {total === 0 ? (
          <p className="text-sm text-muted-foreground">
            No daily quests yet. Create some to get started!
          </p>
        ) : completed === total ? (
          <div className="bg-sl-cyan/10 border border-sl-cyan/50 rounded p-3">
            <p className="text-sm text-sl-cyan font-semibold">
              🎉 All daily quests completed!
            </p>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            Complete all quests to earn +1 Willpower
          </p>
        )}
      </CardContent>
    </Card>
  );
}
