import { PlayerStats, StatType } from '@/types';
import { STAT_MAX_LEVEL } from './constants';

/**
 * Calculate player level as the minimum of all stat levels
 */
export function calculatePlayerLevel(stats: PlayerStats): number {
  const statLevels = Object.values(stats).map((stat) => stat.level);
  return Math.min(...statLevels);
}

/**
 * Check if a stat can be increased (not at max level)
 */
export function canIncreaseStat(statLevel: number): boolean {
  return statLevel < STAT_MAX_LEVEL;
}

/**
 * Calculate total XP across all stats
 */
export function calculateTotalXP(stats: PlayerStats): number {
  return Object.values(stats).reduce((total, stat) => total + stat.xp, 0);
}

/**
 * Check if player leveled up after stat increase
 * Returns true if new player level is higher than old player level
 */
export function checkLevelUp(
  oldStats: PlayerStats,
  newStats: PlayerStats
): boolean {
  const oldLevel = calculatePlayerLevel(oldStats);
  const newLevel = calculatePlayerLevel(newStats);
  return newLevel > oldLevel;
}

/**
 * Get stat type color for UI
 */
export function getStatColor(statType: StatType): string {
  const colors: Record<StatType, string> = {
    strength: 'text-red-500',
    stamina: 'text-green-500',
    intelligence: 'text-blue-500',
    agility: 'text-yellow-500',
    discipline: 'text-purple-500',
    willpower: 'text-cyan-500',
  };
  return colors[statType];
}

/**
 * Get stat type icon
 */
export function getStatIcon(statType: StatType): string {
  const icons: Record<StatType, string> = {
    strength: '💪',
    stamina: '🏃',
    intelligence: '🧠',
    agility: '⚡',
    discipline: '🎯',
    willpower: '🔥',
  };
  return icons[statType];
}
