'use client';

import { useState, useEffect } from 'react';
import { useQuestStore } from '@/store';

export function usePunishment() {
  const { punishmentPending, clearPunishment } = useQuestStore();
  const [showPunishment, setShowPunishment] = useState(false);

  useEffect(() => {
    if (punishmentPending) {
      setShowPunishment(true);
    }
  }, [punishmentPending]);

  const onPunishmentClose = () => {
    setShowPunishment(false);
    clearPunishment();
  };

  return { showPunishment, onPunishmentClose };
}
