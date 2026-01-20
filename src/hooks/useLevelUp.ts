'use client';

import { useState, useEffect, useRef } from 'react';
import { useStatsStore } from '@/store';

export function useLevelUp() {
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [newLevel, setNewLevel] = useState(0);
  const playerLevel = useStatsStore((state) => state.playerLevel);
  const prevLevelRef = useRef(playerLevel);

  useEffect(() => {
    if (playerLevel > prevLevelRef.current && prevLevelRef.current > 0) {
      setNewLevel(playerLevel);
      setShowLevelUp(true);
    }
    prevLevelRef.current = playerLevel;
  }, [playerLevel]);

  const onLevelUpComplete = () => {
    setShowLevelUp(false);
  };

  return { showLevelUp, newLevel, onLevelUpComplete };
}
