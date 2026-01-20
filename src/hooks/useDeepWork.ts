'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { DEEP_WORK_DURATION, STORAGE_KEYS } from '@/lib/constants';

interface DeepWorkState {
  isRunning: boolean;
  startTime: number | null;
  elapsedTime: number;
}

export function useDeepWork() {
  const [state, setState] = useState<DeepWorkState>({
    isRunning: false,
    startTime: null,
    elapsedTime: 0,
  });
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Load state from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEYS.DEEP_WORK);
    if (stored) {
      try {
        const parsed: DeepWorkState = JSON.parse(stored);
        if (parsed.isRunning && parsed.startTime) {
          const elapsed = Date.now() - parsed.startTime;
          setState({
            isRunning: true,
            startTime: parsed.startTime,
            elapsedTime: elapsed,
          });
        }
      } catch (error) {
        console.error('Failed to parse deep work state:', error);
      }
    }
  }, []);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.DEEP_WORK, JSON.stringify(state));
  }, [state]);

  // Update elapsed time every second when running
  useEffect(() => {
    if (state.isRunning && state.startTime) {
      intervalRef.current = setInterval(() => {
        const elapsed = Date.now() - state.startTime!;
        setState((prev) => ({ ...prev, elapsedTime: elapsed }));
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [state.isRunning, state.startTime]);

  const start = useCallback(() => {
    const now = Date.now();
    setState({
      isRunning: true,
      startTime: now,
      elapsedTime: 0,
    });
  }, []);

  const pause = useCallback(() => {
    setState((prev) => ({ ...prev, isRunning: false }));
  }, []);

  const resume = useCallback(() => {
    setState((prev) => {
      if (!prev.startTime) return prev;
      const newStartTime = Date.now() - prev.elapsedTime;
      return {
        ...prev,
        isRunning: true,
        startTime: newStartTime,
      };
    });
  }, []);

  const cancel = useCallback(() => {
    setState({
      isRunning: false,
      startTime: null,
      elapsedTime: 0,
    });
  }, []);

  const complete = useCallback(() => {
    setState({
      isRunning: false,
      startTime: null,
      elapsedTime: 0,
    });
  }, []);

  const remainingTime = DEEP_WORK_DURATION - state.elapsedTime;
  const progress = (state.elapsedTime / DEEP_WORK_DURATION) * 100;
  const isComplete = state.elapsedTime >= DEEP_WORK_DURATION;

  return {
    isRunning: state.isRunning,
    elapsedTime: state.elapsedTime,
    remainingTime: Math.max(0, remainingTime),
    progress: Math.min(100, progress),
    isComplete,
    start,
    pause,
    resume,
    cancel,
    complete,
  };
}
