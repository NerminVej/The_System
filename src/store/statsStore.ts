import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { PlayerStats, StatType } from '@/types';
import { STORAGE_KEYS, STAT_MAX_LEVEL, WILLPOWER_MIN } from '@/lib/constants';
import { calculatePlayerLevel, canIncreaseStat, calculateTotalXP } from '@/lib/levelingSystem';

interface StatsState {
  playerLevel: number;
  stats: PlayerStats;
  totalXP: number;

  // Actions
  increaseStat: (statType: StatType, amount?: number) => boolean;
  decreaseStat: (statType: StatType, amount?: number) => void;
  resetStats: () => void;
  importStats: (data: Partial<StatsState>) => void;
}

const initialStats: PlayerStats = {
  strength: { level: 0, xp: 0 },
  stamina: { level: 0, xp: 0 },
  intelligence: { level: 0, xp: 0 },
  agility: { level: 0, xp: 0 },
  willpower: { level: 0, xp: 0 },
};

export const useStatsStore = create<StatsState>()(
  persist(
    (set, get) => ({
      playerLevel: 0,
      stats: initialStats,
      totalXP: 0,

      increaseStat: (statType: StatType, amount: number = 1) => {
        const currentStat = get().stats[statType];

        // For willpower, don't check max level (can go negative)
        if (statType !== 'willpower' && !canIncreaseStat(currentStat.level)) {
          return false; // Cannot increase stat further
        }

        set((state) => {
          const newXP = currentStat.xp + amount;
          const newLevel = currentStat.level + amount;

          const newStats = {
            ...state.stats,
            [statType]: {
              level: newLevel,
              xp: newXP,
            },
          };

          const newPlayerLevel = calculatePlayerLevel(newStats);
          const newTotalXP = calculateTotalXP(newStats);

          return {
            stats: newStats,
            playerLevel: newPlayerLevel,
            totalXP: newTotalXP,
          };
        });

        return true;
      },

      decreaseStat: (statType: StatType, amount: number = 1) => {
        const currentStat = get().stats[statType];

        set((state) => {
          const newXP = Math.max(0, currentStat.xp - amount);
          let newLevel = currentStat.level - amount;

          // For willpower, allow negative but cap at minimum
          if (statType === 'willpower') {
            newLevel = Math.max(WILLPOWER_MIN, newLevel);
          } else {
            newLevel = Math.max(0, newLevel);
          }

          const newStats = {
            ...state.stats,
            [statType]: {
              level: newLevel,
              xp: newXP,
            },
          };

          const newPlayerLevel = calculatePlayerLevel(newStats);
          const newTotalXP = calculateTotalXP(newStats);

          return {
            stats: newStats,
            playerLevel: newPlayerLevel,
            totalXP: newTotalXP,
          };
        });
      },

      resetStats: () => {
        set({
          playerLevel: 0,
          stats: initialStats,
          totalXP: 0,
        });
      },

      importStats: (data: Partial<StatsState>) => {
        set((state) => ({
          ...state,
          ...data,
        }));
      },
    }),
    {
      name: STORAGE_KEYS.STATS,
    }
  )
);
