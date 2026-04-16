import type {
  AgeRangeId,
  AppearanceId,
  BodyTypeId,
  ChildrenId,
  CupSizeId,
  DualIncomeId,
  EducationId,
  ExperienceId,
  FemaleEducationId,
  FemaleEmploymentId,
  HeightId,
  IncomeId,
  LocationId,
  MaleOccupationId,
  RatioOption,
  TargetGender,
} from '../types';

export const population = {
  japan: 124_000_000,
  male: 60_500_000,
  female: 63_500_000,
} as const;

export const targetLabels: Record<TargetGender, string> = {
  female: '女性',
  male: '男性',
};

export const searchLabels: Record<TargetGender, string> = {
  female: '女性を探す',
  male: '男性を探す',
};

export const ageRanges: Array<{
  id: AgeRangeId;
  label: string;
  counts: Record<TargetGender, number>;
  unmarriedRatio: Record<TargetGender, number>;
  note: string;
}> = [
  {
    id: '20-29',
    label: '20-29歳',
    counts: { male: 6_300_000, female: 6_100_000 },
    unmarriedRatio: { male: 0.82, female: 0.76 },
    note: '20代全体。婚活初期層を広めに見る仮定。',
  },
  {
    id: '25-34',
    label: '25-34歳',
    counts: { male: 6_600_000, female: 6_400_000 },
    unmarriedRatio: { male: 0.58, female: 0.47 },
    note: '20代後半から30代前半。相談所・アプリでよく指定される範囲。',
  },
  {
    id: '30-39',
    label: '30-39歳',
    counts: { male: 7_000_000, female: 6_800_000 },
    unmarriedRatio: { male: 0.41, female: 0.3 },
    note: '30代。未婚率は年齢上昇により大きく下がる前提。',
  },
  {
    id: '35-44',
    label: '35-44歳',
    counts: { male: 7_500_000, female: 7_300_000 },
    unmarriedRatio: { male: 0.32, female: 0.23 },
    note: '30代後半から40代前半。婚歴や子供条件の影響が増える層。',
  },
  {
    id: '40-49',
    label: '40-49歳',
    counts: { male: 8_100_000, female: 7_900_000 },
    unmarriedRatio: { male: 0.26, female: 0.19 },
    note: '40代。初婚だけに絞ると母集団がさらに減る前提。',
  },
];

export const locationOptions: RatioOption<LocationId>[] = [
  {
    id: 'urban',
    label: '都市部',
    ratio: 0.56,
    note: '三大都市圏・政令市周辺に住む人をざっくり56%と仮定。',
  },
  {
    id: 'regional',
    label: '地方',
    ratio: 0.44,
    note: '都市部以外を44%と仮定。',
  },
];

export const appearanceOptions: RatioOption<AppearanceId>[] = [
  { id: 'top50', label: '外見 上位50%', ratio: 0.5, note: '主観評価を順位で扱う。' },
  { id: 'top30', label: '外見 上位30%', ratio: 0.3, note: '写真で良い印象を持つ層を広めに仮定。' },
  { id: 'top20', label: '外見 上位20%', ratio: 0.2, note: '多くの人が魅力的と感じる層。' },
  { id: 'top10', label: '外見 上位10%', ratio: 0.1, note: '人気会員として競争が強い層。' },
  { id: 'top5', label: '外見 上位5%', ratio: 0.05, note: 'かなり希少な見た目条件。' },
];

export const bodyTypeOptions: RatioOption<BodyTypeId>[] = [
  { id: 'standardOrSlim', label: '標準-細身', ratio: 0.58, note: 'BMI標準域と細身を合わせた推定。' },
  { id: 'slim', label: '細身', ratio: 0.33, note: '細身寄りに限定する仮定。' },
  { id: 'fitness', label: '運動習慣あり', ratio: 0.16, note: '体型維持に積極的な層として狭める。' },
];

export const cupSizeOptions: RatioOption<CupSizeId>[] = [
  { id: 'overB', label: 'Bカップ以上', ratio: 0.78, note: '自己申告や見た目の印象に揺れがある条件として広めに置く。' },
  { id: 'overC', label: 'Cカップ以上', ratio: 0.56, note: '平均よりやや絞る体型条件として扱う。' },
  { id: 'overD', label: 'Dカップ以上', ratio: 0.32, note: '上位寄りの身体条件として大きく絞る。' },
  { id: 'overE', label: 'Eカップ以上', ratio: 0.16, note: 'かなり希少な身体条件として扱う。' },
];

export const femaleEducationOptions: RatioOption<FemaleEducationId>[] = [
  { id: 'college', label: '大卒以上', ratio: 0.52, note: '女性の大学・大学院卒を半数強に置く。' },
  { id: 'selectiveCollege', label: '難関大以上', ratio: 0.1, note: '大学群をさらに絞る仮定。' },
  { id: 'graduate', label: '大学院卒', ratio: 0.06, note: '修士・博士まで限定。' },
];

export const femaleEmploymentOptions: RatioOption<FemaleEmploymentId>[] = [
  { id: 'fullTime', label: 'フルタイム', ratio: 0.55, note: 'フルタイム就業者を広めに見る。' },
  { id: 'regular', label: '正社員', ratio: 0.42, note: '雇用形態を正社員に限定。' },
  { id: 'professional', label: '専門職', ratio: 0.13, note: '医療・士業・ITなどの専門職に限定。' },
];

export const dualIncomeOptions: RatioOption<DualIncomeId>[] = [
  { id: 'yes', label: '共働き希望', ratio: 0.68, note: '結婚後も働く意向がある層。' },
  { id: 'flexible', label: '状況次第で可', ratio: 0.78, note: '共働きに拒否感がない層を広めに見る。' },
  { id: 'homemaker', label: '専業志向', ratio: 0.2, note: '専業・家庭優先を希望する層。' },
];

export const childrenOptions: RatioOption<ChildrenId>[] = [
  { id: 'wants', label: '子供を希望', ratio: 0.58, note: '明確に子供を希望する層。' },
  { id: 'open', label: 'どちらでも可', ratio: 0.74, note: '相手や状況次第で柔軟な層。' },
  { id: 'noKids', label: '子供は希望しない', ratio: 0.18, note: 'DINKs志向などに限定。' },
];

export const experienceOptions: RatioOption<ExperienceId>[] = [
  { id: 'zeroToTwo', label: '経験人数 0-2人', ratio: 0.32, note: '自己申告前提のセンシティブ条件。かなり不確実な仮定。' },
  { id: 'threeToFive', label: '経験人数 3-5人', ratio: 0.28, note: 'ボリュームゾーン寄りの範囲として置く。' },
  { id: 'sixToTen', label: '経験人数 6-10人', ratio: 0.2, note: 'やや多めの経験レンジとして絞る。' },
  { id: 'elevenPlus', label: '経験人数 11人以上', ratio: 0.12, note: '多めの経験レンジとしてさらに絞る。' },
];

export const incomeOptions: RatioOption<IncomeId>[] = [
  { id: 'over400', label: '年収400万以上', ratio: 0.62, note: '正社員男性を中心に広めに残す。' },
  { id: 'over600', label: '年収600万以上', ratio: 0.32, note: '全国では明確に上位寄り。' },
  { id: 'over800', label: '年収800万以上', ratio: 0.14, note: '婚活でよく見るがかなり狭い条件。' },
  { id: 'over1000', label: '年収1000万以上', ratio: 0.06, note: '上位数%から1割弱として扱う。' },
  { id: 'over1200', label: '年収1200万以上', ratio: 0.03, note: '都市部でも希少な高年収層。' },
];

export const heightOptions: RatioOption<HeightId>[] = [
  { id: 'over165', label: '身長165cm以上', ratio: 0.78, note: '男性の平均身長より少し低め以上。' },
  { id: 'over170', label: '身長170cm以上', ratio: 0.54, note: '平均付近以上。' },
  { id: 'over175', label: '身長175cm以上', ratio: 0.26, note: '上位約4分の1として扱う。' },
  { id: 'over180', label: '身長180cm以上', ratio: 0.07, note: 'かなり背が高い層。' },
];

export const educationOptions: RatioOption<EducationId>[] = [
  { id: 'college', label: '大卒以上', ratio: 0.48, note: '大学・大学院卒を半数弱に置く。' },
  { id: 'selectiveCollege', label: '難関大以上', ratio: 0.12, note: '大学群をさらに絞る仮定。' },
  { id: 'graduate', label: '大学院卒', ratio: 0.09, note: '修士・博士まで限定。' },
];

export const maleOccupationOptions: RatioOption<MaleOccupationId>[] = [
  { id: 'regular', label: '正社員', ratio: 0.68, note: '安定雇用を広めに捉える。' },
  { id: 'stable', label: '安定職', ratio: 0.38, note: '大企業・公務員・堅い専門職など。' },
  { id: 'professional', label: '専門職', ratio: 0.17, note: '士業・医師・IT専門職など。' },
  { id: 'executive', label: '経営者/役員', ratio: 0.06, note: '肩書きで強く絞る条件。' },
];
