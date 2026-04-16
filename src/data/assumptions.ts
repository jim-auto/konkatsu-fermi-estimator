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
  japan: 123_802_000,
  male: 60_233_000,
  female: 63_569_000,
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
    counts: { male: 6_587_000, female: 6_192_000 },
    unmarriedRatio: { male: 0.86, female: 0.794 },
    note: '人口は人口推計2024年、未婚率は2020年国勢調査の20-24歳/25-29歳を加重平均。',
  },
  {
    id: '25-34',
    label: '25-34歳',
    counts: { male: 6_644_000, female: 6_270_000 },
    unmarriedRatio: { male: 0.638, female: 0.518 },
    note: '人口は人口推計2024年、未婚率は2020年国勢調査の25-29歳/30-34歳を加重平均。',
  },
  {
    id: '30-39',
    label: '30-39歳',
    counts: { male: 6_797_000, female: 6_469_000 },
    unmarriedRatio: { male: 0.448, female: 0.32 },
    note: '人口は人口推計2024年、未婚率は2020年国勢調査の30-34歳/35-39歳を加重平均。',
  },
  {
    id: '35-44',
    label: '35-44歳',
    counts: { male: 7_379_000, female: 7_122_000 },
    unmarriedRatio: { male: 0.352, female: 0.236 },
    note: '人口は人口推計2024年、未婚率は2020年国勢調査の35-39歳/40-44歳を加重平均。',
  },
  {
    id: '40-49',
    label: '40-49歳',
    counts: { male: 8_301_000, female: 8_073_000 },
    unmarriedRatio: { male: 0.31, female: 0.202 },
    note: '人口は人口推計2024年、未婚率は2020年国勢調査の40-44歳/45-49歳を加重平均。',
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
  { id: 'standardOrSlim', label: '標準-細身', ratio: 0.83, note: '国民健康・栄養調査の若年女性BMIから、肥満ではない層を広めに置く。' },
  { id: 'slim', label: '細身', ratio: 0.32, note: '若年女性のやせ/BMI20以下に近い層として置く。' },
  { id: 'fitness', label: '運動習慣あり', ratio: 0.16, note: '運動習慣は婚活向け主観条件として仮定を残す。' },
];

export const cupSizeOptions: RatioOption<CupSizeId>[] = [
  { id: 'overB', label: 'Bカップ以上', ratio: 0.78, note: '自己申告や見た目の印象に揺れがある条件として広めに置く。' },
  { id: 'overC', label: 'Cカップ以上', ratio: 0.56, note: '平均よりやや絞る体型条件として扱う。' },
  { id: 'overD', label: 'Dカップ以上', ratio: 0.32, note: '上位寄りの身体条件として大きく絞る。' },
  { id: 'overE', label: 'Eカップ以上', ratio: 0.16, note: 'かなり希少な身体条件として扱う。' },
];

export const femaleEducationOptions: RatioOption<FemaleEducationId>[] = [
  { id: 'college', label: '大卒以上', ratio: 0.42, note: '2020年国勢調査の若年層最終学歴を参考に大学・大学院卒を置く。' },
  { id: 'selectiveCollege', label: '難関大以上', ratio: 0.1, note: '公式統計では大学群を分けにくいため仮定。' },
  { id: 'graduate', label: '大学院卒', ratio: 0.06, note: '学校基本調査の男女差を参考に、女性大学院卒を狭めに置く。' },
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
  { id: 'over400', label: '年収400万以上', ratio: 0.679, note: '国税庁2024年民間給与実態統計の男性・1年通じて勤務した給与所得者ベース。' },
  { id: 'over600', label: '年収600万以上', ratio: 0.363, note: '国税庁2024年民間給与実態統計の男性給与階級から算出。' },
  { id: 'over800', label: '年収800万以上', ratio: 0.184, note: '国税庁2024年民間給与実態統計の男性給与階級から算出。' },
  { id: 'over1000', label: '年収1000万以上', ratio: 0.098, note: '国税庁2024年民間給与実態統計の男性給与階級から算出。' },
  { id: 'over1200', label: '年収1200万以上', ratio: 0.07, note: '1000-1500万円階級内を線形補間した推定。' },
];

export const heightOptions: RatioOption<HeightId>[] = [
  { id: 'over165', label: '身長165cm以上', ratio: 0.88, note: '国民健康・栄養調査の男性平均身長・標準偏差から正規近似。' },
  { id: 'over170', label: '身長170cm以上', ratio: 0.61, note: '男性20-40代の平均身長171cm台を基準に正規近似。' },
  { id: 'over175', label: '身長175cm以上', ratio: 0.27, note: '男性身長分布の上位3割弱として正規近似。' },
  { id: 'over180', label: '身長180cm以上', ratio: 0.06, note: '男性身長分布の上位数%として正規近似。' },
];

export const educationOptions: RatioOption<EducationId>[] = [
  { id: 'college', label: '大卒以上', ratio: 0.46, note: '2020年国勢調査の若年層最終学歴を参考に大学・大学院卒を置く。' },
  { id: 'selectiveCollege', label: '難関大以上', ratio: 0.12, note: '公式統計では大学群を分けにくいため仮定。' },
  { id: 'graduate', label: '大学院卒', ratio: 0.09, note: '学校基本調査の大学院進学率・男女差を参考に置く。' },
];

export const maleOccupationOptions: RatioOption<MaleOccupationId>[] = [
  { id: 'regular', label: '正社員', ratio: 0.68, note: '安定雇用を広めに捉える。' },
  { id: 'stable', label: '安定職', ratio: 0.38, note: '大企業・公務員・堅い専門職など。' },
  { id: 'professional', label: '専門職', ratio: 0.17, note: '士業・医師・IT専門職など。' },
  { id: 'executive', label: '経営者/役員', ratio: 0.06, note: '肩書きで強く絞る条件。' },
];
