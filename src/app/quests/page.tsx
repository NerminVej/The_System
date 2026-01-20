'use client';

import { DailyQuestPanel } from '@/components/quests/DailyQuestPanel';
import { WeeklyQuestPanel } from '@/components/quests/WeeklyQuestPanel';

export default function QuestsPage() {
  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <h1 className="text-4xl font-bold gradient-text mb-8">Quests</h1>

      <div className="grid md:grid-cols-2 gap-6">
        <DailyQuestPanel />
        <WeeklyQuestPanel />
      </div>
    </div>
  );
}
