# Copilot 引き継ぎ計画書

最終更新: 2026-04-16  
対象リポジトリ: `jim-auto/konkatsu-fermi-estimator`  
公開URL: https://jim-auto.github.io/konkatsu-fermi-estimator/  
現在の先頭コミットは `git log -1 --oneline` で確認してください。
この引き継ぎメモは 2026-04-16 時点の仕様をまとめています。

このファイルは、GitHub Copilot や別エージェントが途中から作業を引き継ぐための詳細メモです。  
まずこのファイルを読んでから、README、`docs/assumptions.md`、`src/data/assumptions.ts`、`src/utils/estimator.ts` を確認してください。

## 1. プロダクト概要

恋人条件シミュレーターは、条件を指定すると「その条件に当てはまる相手がどれくらい存在するか」をフェルミ推定で見せる React アプリです。

目的は厳密な人口統計ツールを作ることではなく、以下の体験を作ることです。

- 条件を追加するほど母集団が掛け算で減っていく感覚を直感的に理解させる
- 「理想の相手」がどれくらいレアかを人数と割合で見せる
- 統計の正確さより、納得感とエンタメ性を優先する
- ただし、仮定値であることは明示する
- 男女どちらを検索対象にするかで使う分布を変える

現状の画面コピーは以下です。

- H1: `恋人条件シミュレーター`
- サブコピー: `条件を重ねるほど、候補は何人残るのか。日本人口を起点に、フェルミ推定で恋人候補の母集団を可視化します。`

「フェルミ推定」という言葉は H1 に入れず、サブコピー、結果パネル、グラフエリアで推しています。

## 2. 技術スタック

- フロントエンド: React 19 + TypeScript
- ビルド: Vite
- グラフ: HTML/CSSのログ幅バー
- 状態管理: `useState` + `useMemo`
- スタイリング: 単一CSSファイル `src/App.css`
- デプロイ: GitHub Pages + GitHub Actions

主要コマンド:

```bash
npm install
npm run dev
npm run build
npm run build:pages
```

GitHub Pages 用ビルドは `vite.config.ts` の `mode === 'github-pages'` により、`base` が `/konkatsu-fermi-estimator/` になります。

```ts
base: mode === 'github-pages' ? '/konkatsu-fermi-estimator/' : '/'
```

## 3. 現在のディレクトリ構成

```text
src/
  App.tsx
  App.css
  main.tsx
  types.ts
  components/
    ConditionRow.tsx
    FilterPanel.tsx
    GenderComparison.tsx
    PopulationChart.tsx
    ResultSummary.tsx
  data/
    assumptions.ts
  hooks/
    useEstimator.ts
  utils/
    estimator.ts
docs/
  assumptions.md
  data-sources.md
  experiments.md
  readme-preview.svg
.github/
  workflows/
    deploy.yml
README.md
PLAN.md
```

`PLAN.md` はこの引き継ぎ用ファイルです。

## 4. 現在のUI仕様

### 4.1 ヘッダー

`src/App.tsx` にあります。

- 上部ラベル: `フェルミ推定で母集団を可視化`
- H1: `恋人条件シミュレーター`
- サブコピーでフェルミ推定を説明

H1 はプロダクト名にして、フェルミ推定はサブコピーで説明する方針です。
以前の `理想の相手、何人残る？` より、初見で機能が伝わる `恋人条件シミュレーター` を採用しています。

### 4.2 検索条件パネル

`src/components/FilterPanel.tsx` にあります。

現在の検索条件はシンプルに絞っています。

共通条件:

- 年齢レンジ
- 未婚
- 居住地

女性対象の条件:

- 外見偏差値
- スペ値
- カップ数
- 経験人数

男性対象の条件:

- 年収レンジ
- 身長

過去にあったが削除済みの条件:

- 学歴
- 職業
- 共働き可否
- 子供希望

これらはユーザー要望で消した条件です。  
明示的に再追加を求められない限り、勝手に戻さないでください。

### 4.3 レイアウト

`src/App.css` にあります。

現在はデスクトップで検索条件パネルを広めにし、条件カードを2列表示しています。

重要なCSS:

```css
.workspace {
  grid-template-columns: minmax(480px, 560px) minmax(520px, 1fr);
}

.condition-group {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}
```

680px以下では1列に戻します。

```css
@media (max-width: 680px) {
  .condition-group {
    grid-template-columns: 1fr;
  }
}
```

### 4.4 結果パネル

`src/components/ResultSummary.tsx` にあります。

表示内容:

- `フェルミ推定: n条件を乗算`
- レア度ラベル
- 推定人数
- 対象性別人口に対する割合
- 日本人口に対する割合
- 平均条件との比較

レア度ラベルは `src/utils/estimator.ts` の `getRarity` で決まります。

現在の閾値:

- `finalCount < 1`: `都市伝説クラス`
- 対象性別人口比 `< 0.001%`: `SSR（出現率0.001%未満）`
- `< 0.01%`: `天然記念物レベル`
- `< 0.1%`: `見つけたら即いいね推奨`
- `< 1%`: `かなり絞っています`
- それ以上: `まだ現実的な母集団`

### 4.5 条件ごとの残存人数

`src/components/PopulationChart.tsx` にあります。

現在は HTML/CSS のログ幅バーに加えて、下に条件ごとのステップカードを表示しています。

ステップカードの表示内容:

- ステップ番号
- 条件名
- 条件の仮定メモ
- `前の人数 → 残存人数`
- 残存人数
- 残存率
- 減少率
- 残存バー

この部分は直近で改善した重要箇所です。  
以前は `x0.184` と残存人数だけの小さいリストでしたが、ユーザーから「もっと見やすく。あとフェルミ推定も推して」と要望があり、現在のカード形式に変更しました。さらに、右側グラフの値が見づらいという指摘を受け、Recharts の折れ線/棒グラフではなく、人数ラベルを常時表示する自前のログ幅バーに切り替えています。

## 5. 現在の推定ロジック

中心は `src/utils/estimator.ts` の `estimatePopulation` です。

計算の流れ:

1. 対象性別人口から開始
2. 年齢条件がONなら、対象年齢レンジ人口 / 対象性別人口 を掛ける
3. 未婚条件がONなら、年齢レンジ別・性別別の未婚率を掛ける
4. 居住地条件がONなら、都市部/地方の割合を掛ける
5. 検索対象が女性なら、女性条件を順番に掛ける
6. 検索対象が男性なら、男性条件を順番に掛ける
7. 最終人数、対象性別人口比、日本人口比、レア度を返す

計算はすべて単純な乗算です。

```text
推定人数 = 対象性別人口
  x 年齢レンジ割合
  x 未婚率
  x 居住地割合
  x 条件1割合
  x 条件2割合
  ...
```

条件同士の相関補正は未実装です。  
都市部と年収、年齢と未婚率、外見偏差値とスペ値などは本来独立ではありませんが、現状はUXと分かりやすさを優先して独立に近いものとして扱っています。

## 6. 現在の型定義

`src/types.ts` を参照してください。

重要な型:

```ts
export type TargetGender = 'female' | 'male';
export type CommonConditionId = 'age' | 'location' | 'unmarried';
export type FemaleConditionId = 'appearance' | 'specValue' | 'cupSize' | 'experience';
export type MaleConditionId = 'income' | 'height';
export type ConditionId = CommonConditionId | FemaleConditionId | MaleConditionId;
```

検索条件状態:

```ts
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
```

条件を追加または削除する場合は、最低限以下を同時に更新してください。

- `src/types.ts`
- `src/data/assumptions.ts`
- `src/utils/estimator.ts`
- `src/components/FilterPanel.tsx`
- `docs/assumptions.md`
- `docs/experiments.md`
- 必要なら `README.md`

## 7. 現在の仮定値

すべて `src/data/assumptions.ts` に集約されています。  
ドキュメント側は `docs/assumptions.md` に対応表があります。

### 7.1 基本人口

総務省統計局「人口推計 2024年10月1日現在」をベースにした値です。

```ts
japan: 123_802_000
male: 60_233_000
female: 63_569_000
```

### 7.2 年齢レンジ

現在の年齢レンジは、最小年齢帯 `ageFrom` と最大年齢帯 `ageTo` ではさむ形式です。

デフォルトは `lateTeens` から `early20s` です。
つまり、10代後半〜20代前半（18-24歳）が初期範囲です。

年齢帯の人口と未婚率:

| ID | 表示 | 男性人口 | 女性人口 | 男性未婚率 | 女性未婚率 |
| --- | --- | ---: | ---: | ---: | ---: |
| `lateTeens` | 10代後半（18-19歳） | 1,247,000 | 1,173,000 | 99.5% | 99.5% |
| `early20s` | 20代前半（20-24歳） | 3,118,000 | 2,932,000 | 95.6% | 92.8% |
| `late20s` | 20代後半（25-29歳） | 3,322,000 | 3,135,000 | 73.0% | 62.0% |
| `early30s` | 30代前半（30-34歳） | 3,322,000 | 3,135,000 | 54.6% | 41.6% |
| `late30s` | 30代後半（35-39歳） | 3,690,000 | 3,561,000 | 41.0% | 29.2% |
| `early40s` | 40代前半（40-44歳） | 3,689,000 | 3,561,000 | 29.4% | 18.0% |
| `late40s` | 40代後半（45-49歳） | 4,431,000 | 4,313,000 | 29.9% | 19.2% |

### 7.3 居住地

- 都市部: 56%
- 地方: 44%

都市部は三大都市圏・政令市周辺を広めに見る仮定です。

### 7.4 女性対象条件

外見偏差値:

- 偏差値50以上: 50%
- 偏差値55以上: 31%
- 偏差値60以上: 16%
- 偏差値65以上: 7%
- 偏差値70以上: 2%

スペ値:

スペ値は `身長(cm) - 体重(kg)` です。  
以前は BMI/体型でしたが、ユーザー要望によりスペ値に置き換えました。

- スペ値90以上: 78%
- スペ値100以上: 52%
- スペ値105以上: 32%
- スペ値110以上: 15%
- スペ値115以上: 7%
- スペ値120以上: 3%

カップ数:

F/G/H以上まで拡張済みです。

- A-Bカップ: 42%
- Cカップ: 24%
- Dカップ: 18%
- Eカップ: 9%
- Fカップ: 4%
- Gカップ: 2%
- Hカップ以上: 1%

経験人数:

- 0人: 10%
- 1-2人: 22%
- 3-5人: 28%
- 6-10人: 20%
- 11-20人: 12%
- 21人以上: 8%

カップ数と経験人数は公的統計では弱く、自己申告バイアスも大きいので、エンタメ寄りの仮定として扱ってください。

### 7.5 男性対象条件

年収:

- 400万以上: 67.9%
- 600万以上: 36.3%
- 800万以上: 18.4%
- 1000万以上: 9.8%
- 1200万以上: 7.0%

身長:

- 165cm以上: 88%
- 170cm以上: 61%
- 175cm以上: 27%
- 180cm以上: 6%

年収は国税庁「令和6年分 民間給与実態統計調査」の男性給与階級をベースにしています。  
身長は国民健康・栄養調査の男性平均身長・標準偏差から正規近似しています。

## 8. プリセットの現状

`src/utils/estimator.ts` にあります。

### 8.1 初期状態

`src/hooks/useEstimator.ts` で以下のように初期化しています。

```ts
const [filters, setFilters] = useState<FilterState>(() => getExtremeFemaleScenario());
```

つまり、初期状態は「女性を探す」かつ「極端: 女性」です。

### 8.2 極端: 女性

デフォルトで有効な条件:

- 10代後半〜20代前半
- 都市部
- 未婚
- 外見偏差値65以上
- スペ値105以上
- Eカップ
- 経験人数0人

概算:

```text
4,105,000
x 0.947
x 0.56
x 0.07
x 0.32
x 0.09
x 0.10
= 約440人
```

### 8.3 極端: 男性

条件:

- 10代後半〜20代前半
- 都市部
- 未婚
- 年収800万以上
- 身長175cm以上

概算:

```text
4,365,000
x 0.967
x 0.56
x 0.184
x 0.27
= 約117,000人
```

### 8.4 平均条件: 女性

条件:

- 10代後半〜20代前半
- 都市部
- 未婚
- 外見偏差値50以上
- スペ値90以上
- Cカップ
- 経験人数3-5人

概算:

```text
4,105,000
x 0.947
x 0.56
x 0.50
x 0.78
x 0.24
x 0.28
= 約57,000人
```

### 8.5 平均条件: 男性

条件:

- 10代後半〜20代前半
- 都市部
- 未婚
- 年収400万以上
- 身長170cm以上

概算:

```text
4,365,000
x 0.967
x 0.56
x 0.679
x 0.61
= 約979,000人
```

## 9. データソースと扱い

詳しくは `docs/data-sources.md` を参照してください。

現在参照している、または参照候補として記録している主なソース:

- 総務省統計局「人口推計」
- 総務省統計局「人口推計 2024年10月1日現在」
- 国税庁「民間給与実態統計調査」
- 国税庁「令和6年分 民間給与実態統計調査」
- 厚生労働省「国民健康・栄養調査報告」
- ワコール系のカップ数関連民間調査

方針:

- 年齢・性別人口、未婚率、年収、身長は公的統計に寄せる
- 外見偏差値、カップ数、経験人数はエンタメ寄りの仮定として扱う
- UIやDocsで「推定」「仮定」を明示する
- 厳密な統計値と言い切らない

## 10. GitHub Pages とリポジトリ状態

リポジトリ:

- `jim-auto/konkatsu-fermi-estimator`
- visibility: public
- homepage: https://jim-auto.github.io/konkatsu-fermi-estimator/

GitHub Actions:

- workflow: `.github/workflows/deploy.yml`
- push先: `main`
- build command: `npm run build:pages`
- artifact: `dist/`

Actions で Node.js 20 deprecated のannotationが出ることがあります。  
現状は失敗ではなく、デプロイ自体は成功しています。

ローカル確認:

```bash
npm run dev
```

Pages相当のビルド確認:

```bash
npm run build:pages
```

## 11. 直近の変更履歴

直近コミット:

```text
f39a2f9 Refine hero copy
88bd0c1 Improve fermi funnel readability
26569fa Use two-column filter layout
eb04ae7 Simplify filters and default to around twenty
bcb7bac Expand cup size filter options
b9496b9 Use age bands and spec value filters
139b03b Use public statistics for core assumptions
0eef2e8 Document data source candidates
731d7a0 Add female education cup and experience filters
d756a34 Add README preview image
```

特に重要な流れ:

1. アプリ全体を React + TypeScript + Vite で作成
2. GitHub Pages 対応
3. README preview SVG を追加
4. 女性検索をデフォルト化
5. 女性条件に学歴、カップ数、経験人数を追加
6. ネット上の公的データを参照して、人口・未婚率・年収・身長の仮定を補強
7. 年齢レンジを10代後半/20代前半などの細かい帯に分割し、最小/最大で範囲指定できる形式へ変更
8. BMI/体型をスペ値へ変更
9. カップ数を F/G/H以上まで拡張
10. 学歴、職業、共働き可否、子供希望を削除
11. 検索条件を2列レイアウトへ変更
12. 条件ごとの残存人数をカード型に改善
13. H1を `理想の相手、何人残る？` に変更
14. プロダクト名を `恋人条件シミュレーター` に変更

## 12. 今後の改善候補

### 12.1 UX改善

優先度高め:

- 条件ON/OFF時の差分をもっと強調する
- 「この条件で何人減ったか」をグラフ上にも出す
- 条件カードのON/OFFをもっと大きく分かりやすくする
- プリセットボタンの意味を視覚的に区別する
- 現在の検索対象が女性/男性のどちらかを結果パネルにも大きく出す

具体案:

- ResultSummaryに `女性対象` / `男性対象` バッジを追加
- PopulationChartのステップカードで、一番削っている条件を強調
- `減少率 90%` 以上なら赤系にする
- 条件をOFFにした瞬間、該当ステップが消えるので、差分が見えにくい。将来的には「OFF時も薄く表示」するモードを検討

### 12.2 フェルミ推定の見せ方

現在はサブコピー、結果パネル、Fermi Funnelの説明カードで押しています。  
さらに推すなら以下がよいです。

- `推定式` を小さく表示する
- `日本の女性 → 10代後半〜20代前半 → 未婚 → 都市部 → ...` のようにパンくず型で見せる
- `これは正確な統計ではなく、桁感を見るフェルミ推定です` をチャート下に常時表示する
- `条件は独立として単純化しています` を説明カードに追記

ただし、画面が説明だらけになると触る楽しさが落ちるので、テキストは短くしてください。

### 12.3 データ精度

公的統計で強化できる候補:

- 年齢別の年収分布
- 都市部/地方別の年収差
- 年齢別の身長分布
- 未婚率の最新化

注意:

- カップ数と経験人数は公的統計として扱いづらい
- ここを厳密にしようとしすぎるとアプリの目的から逸れる
- 数値の正確性より、仮定の明示と納得感を優先

### 12.4 相関補正

現在はすべて掛け算です。  
今後、より納得感を上げるなら相関補正を検討できます。

例:

- 都市部と年収は相関がある
- 年齢と未婚率はすでに年齢別にしているが、年収や身長の年齢差は未補正
- 外見偏差値、スペ値、カップ数は独立ではない可能性がある

ただし、相関補正を入れると説明が複雑になります。  
まずは `docs/assumptions.md` に「未補正」と明示する程度で十分です。

### 12.5 テスト

現状、専用テストはありません。  
最低限追加するなら、`estimatePopulation` の単体テストが最優先です。

テストしたいこと:

- 条件をすべてONにしたとき、期待するステップ数になる
- 女性対象で男性条件が計算に入らない
- 男性対象で女性条件が計算に入らない
- `formatPeople` と `formatPercent` の表示が壊れない
- 未知IDでエラーになる

候補:

- Vitest を追加
- `src/utils/estimator.test.ts` を作る

ただし、現状の依存にはVitestがないので、追加時は `package.json` と `package-lock.json` が変わります。

### 12.6 パフォーマンス

右側の可視化は Recharts から HTML/CSS のログ幅バーへ切り替え済みです。
これにより、チャートライブラリ由来の大きなJSチャンクは解消しています。

将来的にさらに対応するなら:

- 条件ステップカードのレンダリングをより軽くする
- SVG/Canvasでファネル専用の小さな可視化を作る
- 使っていない依存が増えた場合は `package.json` を整理する

### 12.7 README画像

`docs/readme-preview.svg` は現状、古い表示を多少含んでいます。  
最新UIに合わせて更新するなら、以下を反映してください。

- H1: `恋人条件シミュレーター`
- `Fermi Funnel`
- 条件別残存カード
- 10代後半〜20代前半/スペ値/カップ数/経験人数の雰囲気

ただし README 画像はアプリ本体ではないため、優先度は中程度です。

## 13. コーディング上の注意

### 13.1 既存方針

- TypeScriptの型を先に整える
- 条件IDは文字列リテラル型で管理する
- 仮定値は `src/data/assumptions.ts` に置く
- 計算ロジックは `src/utils/estimator.ts` に集約する
- UIコンポーネントは `src/components/` に置く
- 状態管理は `src/hooks/useEstimator.ts` に寄せる

### 13.2 条件追加の手順

新しい条件を追加する場合:

1. `src/types.ts` にID型と `ConditionId` を追加
2. `FilterState` に状態を追加
3. `src/data/assumptions.ts` に選択肢と割合を追加
4. `src/utils/estimator.ts` の `estimatePopulation` に計算ステップを追加
5. `getAverageScenario` / `getExtremeMaleScenario` / `getExtremeFemaleScenario` にデフォルト値を追加
6. `src/components/FilterPanel.tsx` に `ConditionRow` を追加
7. `docs/assumptions.md` と `docs/experiments.md` を更新
8. `npm run build` と `npm run build:pages` を実行

削除する場合も同じファイルから消し切ってください。  
型だけ残す、Docsだけ残す、UIだけ消すとズレます。

### 13.3 消した条件を戻さない

以下はユーザー要望で削除済みです。

- 学歴
- 職業
- 共働き可否
- 子供希望

Copilotが「README要件に学歴や職業があるから戻そう」と判断しないよう注意してください。  
最新要望が優先です。

### 13.4 日本語表記

ユーザーは日本語での対応を希望しています。  
UI、Docs、最終報告は日本語中心で問題ありません。

ただし、コード内の識別子は英語のままで統一してください。

## 14. 手動QAチェックリスト

変更後は最低限以下を確認してください。

```bash
npm run build
npm run build:pages
```

ブラウザ確認:

- 初期表示が女性対象になっている
- 初期年齢が10代後半〜20代前半になっている
- 学歴、職業、共働き可否、子供希望が表示されていない
- 女性対象で外見偏差値/スペ値/カップ数/経験人数が表示される
- 男性対象で年収/身長が表示される
- 条件ON/OFFで推定人数がリアルタイム更新される
- 条件ごとの残存人数カードが崩れていない
- モバイル幅で検索条件が1列になる
- デスクトップ幅で検索条件が2列になる
- 男女比較モードが表示される

公開確認:

```powershell
Invoke-WebRequest -Uri 'https://jim-auto.github.io/konkatsu-fermi-estimator/' -UseBasicParsing
```

## 15. Copilotへの推奨初動

次に作業するなら、以下の順番がおすすめです。

1. `README.md` とこの `PLAN.md` を読む
2. `src/types.ts` で現在の条件モデルを確認
3. `src/data/assumptions.ts` で仮定値を確認
4. `src/utils/estimator.ts` で計算順を確認
5. `src/components/PopulationChart.tsx` と `src/App.css` で可視化UIを確認
6. 小さな変更ごとに `npm run build` を実行

触る可能性が高いファイル:

- コピー修正: `src/App.tsx`, `src/components/ResultSummary.tsx`, `src/components/PopulationChart.tsx`
- 条件追加/削除: `src/types.ts`, `src/data/assumptions.ts`, `src/utils/estimator.ts`, `src/components/FilterPanel.tsx`
- 見た目改善: `src/App.css`
- データ説明: `docs/assumptions.md`, `docs/data-sources.md`, `docs/experiments.md`

## 16. 現時点のプロダクト判断

このアプリは「統計的に厳密な婚活分析」ではなく、「条件を積むと母集団が消える」という体験を作るものです。  
実装判断で迷ったら、以下の優先順位に従ってください。

1. 触って直感的に分かること
2. 仮定値であることが明示されていること
3. 条件追加で母集団が減る体験が強いこと
4. 男女で違う条件・分布を使うこと
5. コードが将来API化しやすいこと
6. 統計の厳密さ

統計の厳密さは重要ですが、最優先ではありません。  
数値の「正しさ」を詰めすぎるより、仮定の透明性とUXの分かりやすさを優先してください。
