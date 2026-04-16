export type TargetGender = 'female' | 'male';

export type CommonConditionId = 'age' | 'location' | 'unmarried';

export type FemaleConditionId =
  | 'appearance'
  | 'specValue'
  | 'cupSize'
  | 'experience';

export type MaleConditionId = 'income' | 'height';

export type ConditionId = CommonConditionId | FemaleConditionId | MaleConditionId;

export type AgeBucketId =
  | 'lateTeens'
  | 'early20s'
  | 'late20s'
  | 'early30s'
  | 'late30s'
  | 'early40s'
  | 'late40s';
export type LocationId = 'urban' | 'regional';
export type AppearanceId = 'score50' | 'score55' | 'score60' | 'score65' | 'score70';
export type SpecValueId = 'over90' | 'over100' | 'over105' | 'over110' | 'over115' | 'over120';
export type CupSizeId = 'aToB' | 'c' | 'd' | 'e' | 'f' | 'g' | 'hOrMore';
export type ExperienceId =
  | 'none'
  | 'oneToTwo'
  | 'threeToFive'
  | 'sixToTen'
  | 'elevenToTwenty'
  | 'twentyOnePlus';
export type IncomeId = 'over400' | 'over600' | 'over800' | 'over1000' | 'over1200';
export type HeightId = 'over165' | 'over170' | 'over175' | 'over180';

export type EnabledConditions = Record<ConditionId, boolean>;

export interface FilterState {
  targetGender: TargetGender;
  compareMode: boolean;
  enabled: EnabledConditions;
  common: {
    ageFrom: AgeBucketId;
    ageTo: AgeBucketId;
    location: LocationId;
  };
  female: {
    appearance: AppearanceId;
    specValue: SpecValueId;
    cupSize: CupSizeId;
    experience: ExperienceId;
  };
  male: {
    income: IncomeId;
    height: HeightId;
  };
}

export interface RatioOption<TId extends string> {
  id: TId;
  label: string;
  ratio: number;
  note: string;
}

export interface EstimationStep {
  id: string;
  label: string;
  ratio: number;
  remaining: number;
  note: string;
}

export interface EstimationResult {
  targetGender: TargetGender;
  targetLabel: string;
  basePopulation: number;
  finalCount: number;
  targetPopulationRatio: number;
  japanPopulationRatio: number;
  steps: EstimationStep[];
  enabledConditionCount: number;
  rarityLabel: string;
  rarityTone: 'reasonable' | 'narrow' | 'rare' | 'mythic';
}
