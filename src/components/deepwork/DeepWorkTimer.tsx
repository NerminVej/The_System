'use client';

import { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useDeepWork } from '@/hooks/useDeepWork';
import { useStatsStore, useActivityStore } from '@/store';
import { Play, Pause, RotateCcw, Check } from 'lucide-react';
import toast from 'react-hot-toast';

export function DeepWorkTimer() {
  const {
    isRunning,
    elapsedTime,
    remainingTime,
    progress,
    isComplete,
    start,
    pause,
    resume,
    cancel,
    complete,
  } = useDeepWork();

  const { increaseStat } = useStatsStore();
  const { logActivity } = useActivityStore();

  // Check for completion
  useEffect(() => {
    if (isComplete && isRunning) {
      pause();
      toast.success('Deep work session completed! +1 Intelligence', {
        duration: 5000,
      });
    }
  }, [isComplete, isRunning, pause]);

  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleComplete = () => {
    increaseStat('intelligence');
    logActivity(0, 0, 1);
    complete();
    toast.success('Deep work session recorded!');
  };

  return (
    <Card className="stat-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">🧠</span>
          <span>Deep Work Timer</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center space-y-4">
          <div className="text-6xl font-bold gradient-text tabular-nums">
            {formatTime(remainingTime)}
          </div>
          <Progress value={progress} className="h-3" />
          <p className="text-sm text-muted-foreground">
            {isComplete
              ? 'Session complete!'
              : isRunning
              ? 'Focus mode active...'
              : 'Start a 30-minute deep work session'}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {!isRunning && !isComplete && elapsedTime === 0 && (
            <Button
              onClick={start}
              className="col-span-2 bg-sl-purple hover:bg-sl-purple/90"
            >
              <Play className="mr-2 h-4 w-4" />
              Start Session
            </Button>
          )}

          {!isRunning && elapsedTime > 0 && !isComplete && (
            <>
              <Button
                onClick={resume}
                className="bg-sl-purple hover:bg-sl-purple/90"
              >
                <Play className="mr-2 h-4 w-4" />
                Resume
              </Button>
              <Button onClick={cancel} variant="outline">
                <RotateCcw className="mr-2 h-4 w-4" />
                Cancel
              </Button>
            </>
          )}

          {isRunning && !isComplete && (
            <>
              <Button onClick={pause} variant="outline">
                <Pause className="mr-2 h-4 w-4" />
                Pause
              </Button>
              <Button onClick={cancel} variant="destructive">
                <RotateCcw className="mr-2 h-4 w-4" />
                Cancel
              </Button>
            </>
          )}

          {isComplete && (
            <>
              <Button
                onClick={handleComplete}
                className="bg-green-500 hover:bg-green-600"
              >
                <Check className="mr-2 h-4 w-4" />
                Claim Reward
              </Button>
              <Button onClick={cancel} variant="outline">
                <RotateCcw className="mr-2 h-4 w-4" />
                New Session
              </Button>
            </>
          )}
        </div>

        {isComplete && (
          <div className="bg-green-500/10 border border-green-500/50 rounded p-3 text-center">
            <p className="text-sm text-green-500 font-semibold">
              🎉 Claim your reward to gain +1 Intelligence!
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
