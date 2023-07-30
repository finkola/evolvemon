export interface Creature {
  traits: Traits;
  foodStats: Stats;
  levelStats: LevelStats;
}

export interface Traits {
  antlers: number;
  hair: number;
  goaty: number;
  ears: number;
  wings: number;
  tail: number;
  bling: number;
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
  //foodBonusCount: number; // Number of neutral feeds that contribute evolve time shortening
}

/*
interface CreatureStats {
  happiness: number;
  happyFactor: number;
  energy: number;
  energyFactor: number;
}

interface FeedInteractionStats {
  feedCount: number;
  fullFeeds: number;
  neutralFeeds: number;
  hungryFeeds: number;
}

interface PlayInteractionStats {
  playCount: number;
  happyPlays: number;
  neutralPlays: number;
  sadPlays: number;
}

interface TraitAffinity {
  energy: number;
  happiness: number;
  temperature: number;
}

interface FeedThresholds {
  targetFeedTs: number;
  satisfiedTs: number;
  hungryTs: number;
}

interface PlayThresholds {
  happyTs: number;
  neutralTs: number;
  sadTs: number;
}
*/
