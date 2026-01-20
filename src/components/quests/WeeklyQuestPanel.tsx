'use client';

import { useQuestStore, useStatsStore, useActivityStore } from '@/store';
import { QuestList } from './QuestList';
import { CreateQuestDialog } from './CreateQuestDialog';
import { QuestType } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import toast from 'react-hot-toast';

export function WeeklyQuestPanel() {
  const { weeklyQuests, addQuest, removeQuest, toggleQuest } = useQuestStore();
  const { increaseStat } = useStatsStore();
  const { logActivity } = useActivityStore();

  const completedCount = weeklyQuests.filter((q) => q.completed).length;
  const totalCount = weeklyQuests.length;
  const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;
  const allCompleted = totalCount > 0 && completedCount === totalCount;

  const handleToggleQuest = (id: string) => {
    const completedQuest = toggleQuest(id, 'weekly');

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
        toast.success(`Weekly quest completed! +1 ${completedQuest.type}`);
      } else {
        toast.success('Weekly quest completed!');
      }

      // Log activity
      logActivity(1, 0, statIncreased ? 1 : 0);
    }
  };

  const handleCreateQuest = (title: string, type: QuestType, description?: string) => {
    addQuest(title, type, 'weekly', description);
    toast.success('Weekly quest created!');
  };

  const handleDeleteQuest = (id: string) => {
    removeQuest(id, 'weekly');
    toast.success('Quest deleted');
  };

  return (
    <Card className="stat-card">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Weekly Quests</span>
          <span className="text-sm font-normal text-muted-foreground">
            {completedCount} / {totalCount}
          </span>
        </CardTitle>
        <Progress value={progress} className="h-2 mt-2" />
        {allCompleted && (
          <p className="text-sm text-sl-blue mt-2">All weekly quests completed!</p>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        <QuestList
          quests={weeklyQuests}
          onToggleQuest={handleToggleQuest}
          onDeleteQuest={handleDeleteQuest}
        />
        <CreateQuestDialog frequency="weekly" onCreateQuest={handleCreateQuest} />
      </CardContent>
    </Card>
  );
}
