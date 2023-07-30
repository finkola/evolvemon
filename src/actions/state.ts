import { TIME_CONST } from "~/models/time";
import { type Traits, type Creature, type Stats } from "~/models/types";

export const updateCreatureStats = (stats: Stats) => {
  const { target, range, over, neutral, under } = stats;

  let newOver = over;
  let newNeutral = neutral;
  let newUnder = under;

  const now = Date.now();
  const delta = target - now;

  let feedFactor = 5 * 1000;

  const max = range;
  const min = -range;

  if (delta > max) {
    newOver += 1;
    feedFactor = 1;
  }
  if (delta < max && delta > min) {
    newNeutral += 1;
  }
  if (delta < min) {
    newUnder += 1;
  }

  const newTarget = target + feedFactor;

  return {
    target: newTarget,
    range: range,
    over: newOver,
    neutral: newNeutral,
    under: newUnder,
  };
};

export const levelUpCreature = (creature: Creature) => {
  const { levelStats, foodStats, traits } = creature;
  const { level, evolveTs, minFood } = levelStats;

  const {
    over: fullCount,
    under: hungryCount,
    neutral: satiatedCount,
  } = foodStats;
  const totalFood = fullCount + hungryCount + satiatedCount;

  const now = Date.now();

  if (!(now > evolveTs && totalFood > minFood)) {
    return creature;
  }
  // Level UP
  const MIN_FOOD_CONST = 6;

  const timeToNextLvl = level * TIME_CONST;
  const newMinFood = level * MIN_FOOD_CONST;
  const newEvolveTs = now + timeToNextLvl;
  const newLevel = level + 1;

  // Trait picking algorithm
  const traitKeys = Object.keys(traits);
  const newTraitKey = selectTrait(traitKeys);

  const newTraits = {
    ...traits,
  };

  if (newTraitKey) {
    newTraits[newTraitKey as keyof Traits] += 1;
  }

  return {
    levelStats: {
      level: newLevel,
      evolveTs: newEvolveTs,
      minFood: newMinFood,
    },
    traits: {
      ...newTraits,
    },
    foodStats: {
      ...foodStats,
      over: 0,
      neutral: 0,
      under: 0,
    },
  };
};

export const selectTrait = (traitKeys: string[]) => {
  const seed = Math.random() * traitKeys.length;
  let min = 0;
  let max = 1;
  for (const trait of traitKeys) {
    if (seed > min && seed <= max) {
      return trait;
    } else {
      min += 1;
      max += 1;
    }
  }
};

export const isInRange = (num: number, min: number, max: number) => {
  if (num < max && num > min) {
    return true;
  }
  return false;
};
