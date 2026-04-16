export type TargetGender = 'female' | 'male';

export type CommonConditionId = 'age' | 'location' | 'unmarried';

export type FemaleConditionId =
  | 'appearance'
  | 'bodyType'
  | 'employment'
  | 'dualIncome'
  | 'children';

export type MaleConditionId = 'income' | 'height' | 'education' | 'occupation';

export type ConditionId = CommonConditionId | FemaleConditionId | MaleConditionId;

export type AgeRangeId = '20-29' | '25-34' | '30-39' | '35-44' | '40-49';
export type LocationId = 'urban' | 'regional';
export type AppearanceId = 'top50' | 'top30' | 'top20' | 'top10' | 'top5';
export type BodyTypeId = 'standardOrSlim' | 'slim' | 'fitness';
export type FemaleEmploymentId = 'fullTime' | 'regular' | 'professional';
export type DualIncomeId = 'yes' | 'flexible' | 'homemaker';
export type ChildrenId = 'wants' | 'open' | 'noKids';
export type IncomeId = 'over400' | 'over600' | 'over800' | 'over1000' | 'over1200';
export type HeightId = 'over165' | 'over170' | 'over175' | 'over180';
export type EducationId = 'college' | 'selectiveCollege' | 'graduate';
export type MaleOccupationId = 'regular' | 'stable' | 'professional' | 'executive';

export type EnabledConditions = Record<ConditionId, boolean>;

export interface FilterState {
  targetGender: TargetGender;
  compareMode: boolean;
  enabled: EnabledConditions;
  common: {
    ageRange: AgeRangeId;
    location: LocationId;
  };
  female: {
    appearance: AppearanceId;
    bodyType: BodyTypeId;
    employment: FemaleEmploymentId;
    dualIncome: DualIncomeId;
    children: ChildrenId;
  };
  male: {
    income: IncomeId;
    height: HeightId;
    education: EducationId;
    occupation: MaleOccupationId;
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
