import type {
  AgeRangeId,
  AppearanceId,
  CupSizeId,
  ExperienceId,
  HeightId,
  IncomeId,
  LocationId,
  RatioOption,
  SpecValueId,
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
    id: 'around20',
    label: 'アラツー（18-24歳）',
    counts: { male: 4_365_000, female: 4_105_000 },
    unmarriedRatio: { male: 0.967, female: 0.947 },
    note: '人口は人口推計2024年の18-24歳。未婚率は18-19歳をほぼ未婚、20-24歳は2020年国勢調査で近似。',
  },
  {
    id: 'around30',
    label: 'アラサー（25-34歳）',
    counts: { male: 6_644_000, female: 6_270_000 },
    unmarriedRatio: { male: 0.638, female: 0.518 },
    note: '人口は人口推計2024年、未婚率は2020年国勢調査の25-29歳/30-34歳を加重平均。',
  },
  {
    id: 'around40',
    label: 'アラフォー（35-44歳）',
    counts: { male: 7_379_000, female: 7_122_000 },
    unmarriedRatio: { male: 0.352, female: 0.236 },
    note: '人口は人口推計2024年、未婚率は2020年国勢調査の35-39歳/40-44歳を加重平均。',
  },
  {
    id: 'around50',
    label: 'アラフィフ前半（45-49歳）',
    counts: { male: 4_431_000, female: 4_313_000 },
    unmarriedRatio: { male: 0.299, female: 0.192 },
    note: '人口は人口推計2024年の45-49歳。未婚率は2020年国勢調査の45-49歳を使用。',
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

export const specValueOptions: RatioOption<SpecValueId>[] = [
  { id: 'over90', label: 'スペ値90以上', ratio: 0.78, note: '身長(cm)-体重(kg)。国民健康・栄養調査の身長・体重分布を参考に広めに置く。' },
  { id: 'over100', label: 'スペ値100以上', ratio: 0.52, note: '美容・婚活文脈でよく使われる目安。実統計ではなく近似。' },
  { id: 'over105', label: 'スペ値105以上', ratio: 0.32, note: '細身寄りの条件として強めに絞る。' },
  { id: 'over110', label: 'スペ値110以上', ratio: 0.15, note: 'かなり細身の条件として扱う。' },
];

export const cupSizeOptions: RatioOption<CupSizeId>[] = [
  { id: 'aToB', label: 'A-Bカップ', ratio: 0.42, note: '民間調査を参考にした自己申告前提のレンジ仮定。' },
  { id: 'c', label: 'Cカップ', ratio: 0.24, note: '民間調査を参考にした自己申告前提のレンジ仮定。' },
  { id: 'd', label: 'Dカップ', ratio: 0.18, note: '民間調査を参考にした自己申告前提のレンジ仮定。' },
  { id: 'e', label: 'Eカップ', ratio: 0.09, note: '民間調査を参考にした自己申告前提のレンジ仮定。' },
  { id: 'f', label: 'Fカップ', ratio: 0.04, note: 'Eカップ以上の層をさらに分割した仮定。' },
  { id: 'g', label: 'Gカップ', ratio: 0.02, note: 'Eカップ以上の層をさらに分割した仮定。' },
  { id: 'hOrMore', label: 'Hカップ以上', ratio: 0.01, note: 'かなり希少な自己申告条件として扱う。' },
];

export const experienceOptions: RatioOption<ExperienceId>[] = [
  { id: 'none', label: '経験人数 0人', ratio: 0.1, note: '自己申告前提のセンシティブ条件。かなり不確実な仮定。' },
  { id: 'oneToTwo', label: '経験人数 1-2人', ratio: 0.22, note: '自己申告前提のセンシティブ条件。かなり不確実な仮定。' },
  { id: 'threeToFive', label: '経験人数 3-5人', ratio: 0.28, note: 'ボリュームゾーン寄りの範囲として置く。' },
  { id: 'sixToTen', label: '経験人数 6-10人', ratio: 0.2, note: 'やや多めの経験レンジとして絞る。' },
  { id: 'elevenToTwenty', label: '経験人数 11-20人', ratio: 0.12, note: '多めの経験レンジとしてさらに絞る。' },
  { id: 'twentyOnePlus', label: '経験人数 21人以上', ratio: 0.08, note: 'かなり多めの経験レンジとして扱う。' },
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
