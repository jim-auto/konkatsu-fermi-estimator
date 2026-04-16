import {
  ageBuckets,
  appearanceOptions,
  cupSizeOptions,
  educationOptions,
  experienceOptions,
  faceScoreOptions,
  heightOptions,
  incomeOptions,
  locationOptions,
  population,
  specValueOptions,
  targetLabels,
} from '../data/assumptions';
import type {
  EstimationResult,
  EstimationStep,
  FilterState,
  RatioOption,
} from '../types';

function findById<TId extends string>(options: RatioOption<TId>[], id: TId): RatioOption<TId> {
  const option = options.find((item) => item.id === id);
  if (!option) {
    throw new Error(`Unknown option: ${id}`);
  }
  return option;
}

function getAgeBucketIndex(id: FilterState['common']['ageFrom']): number {
  const index = ageBuckets.findIndex((item) => item.id === id);
  if (index < 0) {
    throw new Error(`Unknown age bucket: ${id}`);
  }
  return index;
}

function getSelectedAgeRange(input: FilterState) {
  const fromIndex = getAgeBucketIndex(input.common.ageFrom);
  const toIndex = getAgeBucketIndex(input.common.ageTo);
  const start = Math.min(fromIndex, toIndex);
  const end = Math.max(fromIndex, toIndex);
  const buckets = ageBuckets.slice(start, end + 1);
  const first = buckets[0];
  const last = buckets[buckets.length - 1];
  const label = first.id === last.id ? first.label : `${first.label}〜${last.label}`;

  return {
    label,
    buckets,
    counts: {
      male: buckets.reduce((sum, bucket) => sum + bucket.counts.male, 0),
      female: buckets.reduce((sum, bucket) => sum + bucket.counts.female, 0),
    },
    unmarriedRatio: {
      male:
        buckets.reduce((sum, bucket) => sum + bucket.counts.male * bucket.unmarriedRatio.male, 0) /
        buckets.reduce((sum, bucket) => sum + bucket.counts.male, 0),
      female:
        buckets.reduce((sum, bucket) => sum + bucket.counts.female * bucket.unmarriedRatio.female, 0) /
        buckets.reduce((sum, bucket) => sum + bucket.counts.female, 0),
    },
    note: buckets.length === 1
      ? first.note
      : '選択した年齢帯の人口を合算し、未婚率は人口で加重平均する。',
  };
}

function getRarity(finalCount: number, ratio: number): Pick<EstimationResult, 'rarityLabel' | 'rarityTone'> {
  const percent = ratio * 100;

  if (finalCount < 1) {
    return { rarityLabel: '都市伝説クラス', rarityTone: 'mythic' };
  }
  if (percent < 0.001) {
    return { rarityLabel: 'SSR（出現率0.001%未満）', rarityTone: 'mythic' };
  }
  if (percent < 0.01) {
    return { rarityLabel: '天然記念物レベル', rarityTone: 'rare' };
  }
  if (percent < 0.1) {
    return { rarityLabel: '見つけたら即いいね推奨', rarityTone: 'rare' };
  }
  if (percent < 1) {
    return { rarityLabel: 'かなり絞っています', rarityTone: 'narrow' };
  }
  return { rarityLabel: 'まだ現実的な母集団', rarityTone: 'reasonable' };
}

function appendStep(
  steps: EstimationStep[],
  id: string,
  label: string,
  ratio: number,
  note: string,
): void {
  const previous = steps[steps.length - 1].remaining;
  steps.push({
    id,
    label,
    ratio,
    remaining: previous * ratio,
    note,
  });
}

export function estimatePopulation(input: FilterState, targetGender = input.targetGender): EstimationResult {
  const basePopulation = population[targetGender];
  const targetLabel = targetLabels[targetGender];
  const ageRange = getSelectedAgeRange(input);
  const steps: EstimationStep[] = [
    {
      id: 'base',
      label: `日本の${targetLabel}`,
      ratio: 1,
      remaining: basePopulation,
      note: '日本全体の性別人口を起点にする。',
    },
  ];

  if (input.enabled.age) {
    appendStep(
      steps,
      'age',
      ageRange.label,
      ageRange.counts[targetGender] / basePopulation,
      ageRange.note,
    );
  }

  if (input.enabled.unmarried) {
    appendStep(
      steps,
      'unmarried',
      '未婚',
      ageRange.unmarriedRatio[targetGender],
      `${ageRange.label}の未婚率を性別ごとに変える仮定。`,
    );
  }

  if (input.enabled.location) {
    const option = findById(locationOptions, input.common.location);
    appendStep(steps, 'location', option.label, option.ratio, option.note);
  }

  if (targetGender === 'female') {
    if (input.enabled.appearance) {
      const option = findById(appearanceOptions, input.female.appearance);
      appendStep(steps, 'appearance', option.label, option.ratio, option.note);
    }
    if (input.enabled.specValue) {
      const option = findById(specValueOptions, input.female.specValue);
      appendStep(steps, 'specValue', option.label, option.ratio, option.note);
    }
    if (input.enabled.cupSize) {
      const option = findById(cupSizeOptions, input.female.cupSize);
      appendStep(steps, 'cupSize', option.label, option.ratio, option.note);
    }
    if (input.enabled.experience) {
      const option = findById(experienceOptions, input.female.experience);
      appendStep(steps, 'experience', option.label, option.ratio, option.note);
    }
  }

  if (targetGender === 'male') {
    if (input.enabled.appearance) {
      const option = findById(faceScoreOptions, input.male.appearance);
      appendStep(steps, 'appearance', option.label, option.ratio, option.note);
    }
    if (input.enabled.specValue) {
      const option = findById(specValueOptions, input.male.specValue);
      appendStep(steps, 'specValue', option.label, option.ratio, option.note);
    }
    if (input.enabled.education) {
      const option = findById(educationOptions, input.male.education);
      appendStep(steps, 'education', option.label, option.ratio, option.note);
    }
    if (input.enabled.income) {
      const option = findById(incomeOptions, input.male.income);
      appendStep(steps, 'income', option.label, option.ratio, option.note);
    }
    if (input.enabled.height) {
      const option = findById(heightOptions, input.male.height);
      appendStep(steps, 'height', option.label, option.ratio, option.note);
    }
  }

  const finalCount = steps[steps.length - 1].remaining;
  const targetPopulationRatio = finalCount / basePopulation;
  const rarity = getRarity(finalCount, targetPopulationRatio);

  return {
    targetGender,
    targetLabel,
    basePopulation,
    finalCount,
    targetPopulationRatio,
    japanPopulationRatio: finalCount / population.japan,
    steps,
    enabledConditionCount: steps.length - 1,
    ...rarity,
  };
}

export function formatPeople(value: number): string {
  if (value < 1) {
    return `${value.toFixed(2)}人`;
  }
  return `${Math.round(value).toLocaleString('ja-JP')}人`;
}

export function formatPercent(value: number): string {
  const percent = value * 100;
  if (percent === 0) {
    return '0%';
  }
  if (percent < 0.0001) {
    return `${percent.toExponential(2)}%`;
  }
  if (percent < 0.01) {
    return `${percent.toFixed(4)}%`;
  }
  if (percent < 1) {
    return `${percent.toFixed(3)}%`;
  }
  return `${percent.toFixed(2)}%`;
}

export function getAverageScenario(current: FilterState): FilterState {
  return {
    ...current,
    enabled: {
      age: true,
      location: true,
      unmarried: true,
      appearance: true,
      specValue: true,
      cupSize: true,
      experience: true,
      education: true,
      income: true,
      height: true,
    },
    common: {
      ageFrom: 'lateTeens',
      ageTo: 'early20s',
      location: 'urban',
    },
    female: {
      appearance: 'score50',
      specValue: 'over90',
      cupSize: 'c',
      experience: 'threeToFive',
    },
    male: {
      appearance: 'score50',
      specValue: 'over90',
      education: 'highSchoolOrMore',
      income: 'over400',
      height: 'over170',
    },
  };
}

export function getExtremeMaleScenario(): FilterState {
  return {
    targetGender: 'male',
    compareMode: true,
    enabled: {
      age: true,
      location: true,
      unmarried: true,
      appearance: true,
      specValue: true,
      cupSize: true,
      experience: true,
      education: true,
      income: true,
      height: true,
    },
    common: {
      ageFrom: 'lateTeens',
      ageTo: 'early20s',
      location: 'urban',
    },
    female: {
      appearance: 'score65',
      specValue: 'over105',
      cupSize: 'e',
      experience: 'none',
    },
    male: {
      appearance: 'score65',
      specValue: 'over105',
      education: 'universityOrMore',
      income: 'over800',
      height: 'over175',
    },
  };
}

export function getExtremeFemaleScenario(): FilterState {
  return {
    ...getExtremeMaleScenario(),
    targetGender: 'female',
    compareMode: true,
    common: {
      ageFrom: 'lateTeens',
      ageTo: 'early20s',
      location: 'urban',
    },
    female: {
      appearance: 'score65',
      specValue: 'over105',
      cupSize: 'e',
      experience: 'none',
    },
  };
}
