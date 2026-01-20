export type StatType =
  | 'strength'
  | 'stamina'
  | 'intelligence'
  | 'agility'
  | 'discipline'
  | 'willpower';

export interface Stat {
  level: number;
  xp: number;
}

export interface PlayerStats {
  strength: Stat;
  stamina: Stat;
  intelligence: Stat;
  agility: Stat;
  discipline: Stat;
  willpower: Stat;
}

export interface PlayerState {
  playerLevel: number;
  stats: PlayerStats;
  totalXP: number;
}
