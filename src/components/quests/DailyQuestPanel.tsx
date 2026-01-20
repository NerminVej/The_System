'use client';

import { useQuestStore, useStatsStore, useActivityStore } from '@/store';
import { QuestList } from './QuestList';
import { CreateQuestDialog } from './CreateQuestDialog';
import { QuestType } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import toast from 'react-hot-toast';

export function DailyQuestPanel() {
  const { dailyQuests, addQuest, removeQuest, toggleQuest } = useQuestStore();
  const { increaseStat } = useStatsStore();
  const { logActivity } = useActivityStore();

  const completedCount = dailyQuests.filter((q) => q.completed).length;
  const totalCount = dailyQuests.length;
  const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;
  const allCompleted = totalCount > 0 && completedCount === totalCount;

  const handleToggleQuest = (id: string) => {
    const completedQuest = toggleQuest(id, 'daily');

    if (completedQuest) {
      // Reward stat based on quest type
      let statIncreased = false;
      switch (completedQuest.type) {
        case 'workout':
          statIncreased = increaseStat('strength');
          break;
        case 'endurance':
          statIncreased = increaseStat('stamina');
          break;
        case 'skill':
          statIncreased = increaseStat('agility');
          break;
        case 'deepwork':
          statIncreased = increaseStat('intelligence');
          break;
      }

      if (statIncreased) {
        toast.success(`Quest completed! +1 ${completedQuest.type}`);
      } else {
        toast.success('Quest completed!');
      }

      // Check if all daily quests are now completed
      const newCompletedCount = dailyQuests.filter((q) =>
        q.id === id ? true : q.completed
      ).length;

      if (newCompletedCount === totalCount && totalCount > 0) {
        increaseStat('discipline');
        toast.success('All daily quests completed! +1 Discipline');
      }

      // Log activity
      logActivity(1, 0, statIncreased ? 1 : 0, newCompletedCount === totalCount);
    }
  };

  const handleCreateQuest = (title: string, type: QuestType, description?: string) => {
    addQuest(title, type, 'daily', description);
    toast.success('Daily quest created!');
  };

  const handleDeleteQuest = (id: string) => {
    removeQuest(id, 'daily');
    toast.success('Quest deleted');
  };

  return (
    <Card className="stat-card">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Daily Quests</span>
          <span className="text-sm font-normal text-muted-foreground">
            {completedCount} / {totalCount}
          </span>
        </CardTitle>
        <Progress value={progress} className="h-2 mt-2" />
        {allCompleted && (
          <p className="text-sm text-sl-purple mt-2">All daily quests completed!</p>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        <QuestList
          quests={dailyQuests}
          onToggleQuest={handleToggleQuest}
          onDeleteQuest={handleDeleteQuest}
        />
        <CreateQuestDialog frequency="daily" onCreateQuest={handleCreateQuest} />
      </CardContent>
    </Card>
  );
}
