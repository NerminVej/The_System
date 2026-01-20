'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Target, Heart, Brain, TrendingUp } from 'lucide-react';

export function QuickActions() {
  return (
    <Card className="stat-card">
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-3">
        <Link href="/quests">
          <Button
            variant="outline"
            className="w-full h-20 flex-col gap-2 border-sl-blue/50 hover:bg-sl-blue/10"
          >
            <Target className="w-6 h-6 text-sl-blue" />
            <span className="text-sm">Quests</span>
          </Button>
        </Link>

        <Link href="/habits">
          <Button
            variant="outline"
            className="w-full h-20 flex-col gap-2 border-green-500/50 hover:bg-green-500/10"
          >
            <Heart className="w-6 h-6 text-green-500" />
            <span className="text-sm">Habits</span>
          </Button>
        </Link>

        <div>
          <Button
            variant="outline"
            className="w-full h-20 flex-col gap-2 border-sl-purple/50 hover:bg-sl-purple/10"
            onClick={() => {
              const timerSection = document.getElementById('deep-work-timer');
              timerSection?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <Brain className="w-6 h-6 text-sl-purple" />
            <span className="text-sm">Deep Work</span>
          </Button>
        </div>

        <Link href="/stats">
          <Button
            variant="outline"
            className="w-full h-20 flex-col gap-2 border-orange-500/50 hover:bg-orange-500/10"
          >
            <TrendingUp className="w-6 h-6 text-orange-500" />
            <span className="text-sm">Stats</span>
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
