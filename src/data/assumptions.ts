import type {
  AgeBucketId,
  AppearanceId,
  BinaryChoiceId,
  CupSizeId,
  EducationId,
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

export const ageBuckets: Array<{
  id: AgeBucketId;
  label: string;
  counts: Record<TargetGender, number>;
  unmarriedRatio: Record<TargetGender, number>;
  note: string;
}> = [
  {
    id: 'lateTeens',
    label: '10代後半',
    counts: { male: 1_247_000, female: 1_173_000 },
    unmarriedRatio: { male: 0.995, female: 0.995 },
    note: '18-24歳人口を年数按分し、18-19歳はほぼ未婚として置く。',
  },
  {
    id: 'early20s',
    label: '20代前半',
    counts: { male: 3_118_000, female: 2_932_000 },
    unmarriedRatio: { male: 0.956, female: 0.928 },
    note: '18-24歳人口から18-19歳を除いた近似。未婚率は18-24歳全体と整合するように調整。',
  },
  {
    id: 'late20s',
    label: '20代後半',
    counts: { male: 3_322_000, female: 3_135_000 },
    unmarriedRatio: { male: 0.73, female: 0.62 },
    note: '25-34歳人口を前後半に按分。未婚率は2020年国勢調査の5歳階級に寄せた近似。',
  },
  {
    id: 'early30s',
    label: '30代前半',
    counts: { male: 3_322_000, female: 3_135_000 },
    unmarriedRatio: { male: 0.546, female: 0.416 },
    note: '25-34歳人口を前後半に按分。未婚率は2020年国勢調査の5歳階級に寄せた近似。',
  },
  {
    id: 'late30s',
    label: '30代後半',
    counts: { male: 3_690_000, female: 3_561_000 },
    unmarriedRatio: { male: 0.41, female: 0.292 },
    note: '35-44歳人口を前後半に按分。未婚率は2020年国勢調査の5歳階級に寄せた近似。',
  },
  {
    id: 'early40s',
    label: '40代前半',
    counts: { male: 3_689_000, female: 3_561_000 },
    unmarriedRatio: { male: 0.294, female: 0.18 },
    note: '35-44歳人口を前後半に按分。未婚率は2020年国勢調査の5歳階級に寄せた近似。',
  },
  {
    id: 'late40s',
    label: '40代後半',
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
  { id: 'score50', label: '外見偏差値50以上', ratio: 0.5, note: '主観評価を偏差値風に換算。正規分布なら上位50%。' },
  { id: 'score55', label: '外見偏差値55以上', ratio: 0.31, note: '主観評価を偏差値風に換算。正規分布なら上位約31%。' },
  { id: 'score60', label: '外見偏差値60以上', ratio: 0.16, note: '主観評価を偏差値風に換算。正規分布なら上位約16%。' },
  { id: 'score65', label: '外見偏差値65以上', ratio: 0.07, note: '主観評価を偏差値風に換算。正規分布なら上位約7%。' },
  { id: 'score70', label: '外見偏差値70以上', ratio: 0.02, note: '主観評価を偏差値風に換算。正規分布なら上位約2%。' },
];

export const faceScoreOptions: RatioOption<AppearanceId>[] = appearanceOptions.map((option) => ({
  ...option,
  label: option.label.replace('外見偏差値', '顔面偏差値'),
}));

export const specValueOptions: RatioOption<SpecValueId>[] = [
  { id: 'over90', label: 'スペ値90以上', ratio: 0.78, note: '身長(cm)-体重(kg)。国民健康・栄養調査の身長・体重分布を参考に広めに置く。' },
  { id: 'over100', label: 'スペ値100以上', ratio: 0.52, note: '美容・婚活文脈でよく使われる目安。実統計ではなく近似。' },
  { id: 'over105', label: 'スペ値105以上', ratio: 0.32, note: '細身寄りの条件として強めに絞る。' },
  { id: 'over110', label: 'スペ値110以上', ratio: 0.15, note: 'かなり細身の条件として扱う。' },
  { id: 'over115', label: 'スペ値115以上', ratio: 0.07, note: 'モデル体型寄りの強い条件として扱う。' },
  { id: 'over120', label: 'スペ値120以上', ratio: 0.03, note: 'かなり希少なスペ値条件として扱う。' },
];

export const educationOptions: RatioOption<EducationId>[] = [
  { id: 'highSchoolOrMore', label: '高卒以上', ratio: 0.94, note: '最終学歴分布を婚活条件向けに丸めた仮定。年齢差は単純化。' },
  { id: 'vocationalOrJuniorCollegeOrMore', label: '専門・短大以上', ratio: 0.72, note: '専門学校・短大・高専・大学以上を含むざっくり仮定。' },
  { id: 'universityOrMore', label: '大卒以上', ratio: 0.52, note: '大学・大学院卒を合わせた近似。年齢帯による差は未補正。' },
  { id: 'graduateSchoolOrMore', label: '院卒以上', ratio: 0.08, note: '大学院修了者をかなり粗く置いた仮定。' },
  { id: 'topUniversityOrMore', label: '難関大卒以上', ratio: 0.06, note: '学校群の定義に強く依存する、エンタメ寄りの仮定。' },
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

export const experienceOptions: Array<
  RatioOption<ExperienceId> & {
    shortLabel: string;
    rangeStartLabel: string;
    rangeEndLabel: string;
  }
> = [
  {
    id: 'none',
    label: '経験人数 0人',
    shortLabel: '0人',
    rangeStartLabel: '0人',
    rangeEndLabel: '0人',
    ratio: 0.1,
    note: '自己申告前提のセンシティブ条件。かなり不確実な仮定。',
  },
  {
    id: 'oneToTwo',
    label: '経験人数 1-2人',
    shortLabel: '1-2人',
    rangeStartLabel: '1人',
    rangeEndLabel: '2人',
    ratio: 0.22,
    note: '自己申告前提のセンシティブ条件。かなり不確実な仮定。',
  },
  {
    id: 'threeToFive',
    label: '経験人数 3-5人',
    shortLabel: '3-5人',
    rangeStartLabel: '3人',
    rangeEndLabel: '5人',
    ratio: 0.28,
    note: 'ボリュームゾーン寄りの範囲として置く。',
  },
  {
    id: 'sixToTen',
    label: '経験人数 6-10人',
    shortLabel: '6-10人',
    rangeStartLabel: '6人',
    rangeEndLabel: '10人',
    ratio: 0.2,
    note: 'やや多めの経験レンジとして絞る。',
  },
  {
    id: 'elevenToTwenty',
    label: '経験人数 11-20人',
    shortLabel: '11-20人',
    rangeStartLabel: '11人',
    rangeEndLabel: '20人',
    ratio: 0.12,
    note: '多めの経験レンジとしてさらに絞る。',
  },
  {
    id: 'twentyOnePlus',
    label: '経験人数 21人以上',
    shortLabel: '21人以上',
    rangeStartLabel: '21人',
    rangeEndLabel: '21人以上',
    ratio: 0.08,
    note: 'かなり多めの経験レンジとして扱う。',
  },
];

export const nightWorkOptions: RatioOption<BinaryChoiceId>[] = [
  {
    id: 'no',
    label: '夜職経験なし',
    ratio: 0.92,
    note: '公的統計ではなく、自己申告前提のかなり粗い仮定。',
  },
  {
    id: 'yes',
    label: '夜職経験あり',
    ratio: 0.08,
    note: '対象範囲の定義で大きく変わる、エンタメ寄りの仮定。',
  },
];

export const luxuryBrandInterestOptions: RatioOption<BinaryChoiceId>[] = [
  {
    id: 'no',
    label: 'ハイブラ興味なし',
    ratio: 0.68,
    note: '購買力ではなく興味・志向の自己申告条件として置いた仮定。',
  },
  {
    id: 'yes',
    label: 'ハイブラ興味あり',
    ratio: 0.32,
    note: 'ブランド関心の強さは定義が曖昧なため、エンタメ寄りの仮定。',
  },
];

export const movedToTokyoOptions: RatioOption<BinaryChoiceId>[] = [
  {
    id: 'no',
    label: '上京経験なし',
    ratio: 0.84,
    note: '東京圏への移住経験をざっくり扱う仮定。地域差は未補正。',
  },
  {
    id: 'yes',
    label: '上京経験あり',
    ratio: 0.16,
    note: '東京圏への移住経験をざっくり扱う仮定。年齢差や居住地との相関は未補正。',
  },
];

export const incomeOptions: RatioOption<IncomeId>[] = [
  { id: 'over400', label: '年収400万以上', ratio: 0.679, note: '国税庁2024年民間給与実態統計の男性・1年通じて勤務した給与所得者ベース。' },
  { id: 'over600', label: '年収600万以上', ratio: 0.363, note: '国税庁2024年民間給与実態統計の男性給与階級から算出。' },
  { id: 'over800', label: '年収800万以上', ratio: 0.184, note: '国税庁2024年民間給与実態統計の男性給与階級から算出。' },
  { id: 'over1000', label: '年収1000万以上', ratio: 0.098, note: '国税庁2024年民間給与実態統計の男性給与階級から算出。' },
  { id: 'over1200', label: '年収1200万以上', ratio: 0.07, note: '1000-1500万円階級内を線形補間した推定。' },
];

export const heightOptions: Array<
  RatioOption<HeightId> & {
    shortLabel: string;
    rangeStartLabel: string;
    rangeEndLabel: string;
  }
> = [
  {
    id: 'under165',
    label: '身長165cm未満',
    shortLabel: '165cm未満',
    rangeStartLabel: '165cm未満',
    rangeEndLabel: '164cm以下',
    ratio: 0.12,
    note: '165cm以上の割合を88%と置いた正規近似からの差分。',
  },
  {
    id: 'cm165To169',
    label: '身長165-169cm',
    shortLabel: '165-169cm',
    rangeStartLabel: '165cm',
    rangeEndLabel: '169cm',
    ratio: 0.27,
    note: '165cm以上と170cm以上の累積割合の差分として置く。',
  },
  {
    id: 'cm170To174',
    label: '身長170-174cm',
    shortLabel: '170-174cm',
    rangeStartLabel: '170cm',
    rangeEndLabel: '174cm',
    ratio: 0.34,
    note: '170cm以上と175cm以上の累積割合の差分として置く。',
  },
  {
    id: 'cm175To179',
    label: '身長175-179cm',
    shortLabel: '175-179cm',
    rangeStartLabel: '175cm',
    rangeEndLabel: '179cm',
    ratio: 0.21,
    note: '175cm以上と180cm以上の累積割合の差分として置く。',
  },
  {
    id: 'cm180OrMore',
    label: '身長180cm以上',
    shortLabel: '180cm以上',
    rangeStartLabel: '180cm',
    rangeEndLabel: '180cm以上',
    ratio: 0.06,
    note: '男性身長分布の上位数%として正規近似。',
  },
];
