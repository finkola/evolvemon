export interface Creature {
  traits: Traits;
  foodStats: Stats;
  levelStats: LevelStats;
}

export interface Traits {
  antlers: number;
  hair: number;
  ears: number;
  wings: number;
}

export interface Stats {
  target: number;
  range: number;
  over: number;
  neutral: number;
  under: number;
}

export interface LevelStats {
  level: number;
  minFood: number;
  evolveTs: number;
}
