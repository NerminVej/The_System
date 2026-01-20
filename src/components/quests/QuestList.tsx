'use client';

import { Quest } from '@/types';
import { QuestCard } from './QuestCard';

interface QuestListProps {
  quests: Quest[];
  onToggleQuest: (id: string) => void;
  onDeleteQuest: (id: string) => void;
}

export function QuestList({ quests, onToggleQuest, onDeleteQuest }: QuestListProps) {
  if (quests.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <p>No quests yet. Create your first quest to get started!</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {quests.map((quest) => (
        <QuestCard
          key={quest.id}
          quest={quest}
          onToggle={() => onToggleQuest(quest.id)}
          onDelete={() => onDeleteQuest(quest.id)}
        />
      ))}
    </div>
  );
}
