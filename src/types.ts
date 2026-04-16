export type TargetGender = 'female' | 'male';

export type CommonConditionId = 'age' | 'location' | 'unmarried';

export type FemaleConditionId =
  | 'appearance'
  | 'specValue'
  | 'cupSize'
  | 'femaleEducation'
  | 'employment'
  | 'dualIncome'
  | 'children'
  | 'experience';

export type MaleConditionId = 'income' | 'height' | 'education' | 'occupation';

export type ConditionId = CommonConditionId | FemaleConditionId | MaleConditionId;

export type AgeRangeId = 'around20' | 'around30' | 'around40' | 'around50';
export type LocationId = 'urban' | 'regional';
export type AppearanceId = 'top50' | 'top30' | 'top20' | 'top10' | 'top5';
export type SpecValueId = 'over90' | 'over100' | 'over105' | 'over110';
export type CupSizeId = 'aToB' | 'c' | 'd' | 'eOrMore';
export type FemaleEducationId = 'college' | 'selectiveCollege' | 'graduate';
export type FemaleEmploymentId = 'fullTime' | 'regular' | 'professional';
export type DualIncomeId = 'yes' | 'flexible' | 'homemaker';
export type ChildrenId = 'wants' | 'open' | 'noKids';
export type ExperienceId =
  | 'none'
  | 'oneToTwo'
  | 'threeToFive'
  | 'sixToTen'
  | 'elevenToTwenty'
  | 'twentyOnePlus';
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
    specValue: SpecValueId;
    cupSize: CupSizeId;
    education: FemaleEducationId;
    employment: FemaleEmploymentId;
    dualIncome: DualIncomeId;
    children: ChildrenId;
    experience: ExperienceId;
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
