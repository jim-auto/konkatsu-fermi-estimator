import { FilterPanel } from './components/FilterPanel';
import { GenderComparison } from './components/GenderComparison';
import { PopulationChart } from './components/PopulationChart';
import { ResultSummary } from './components/ResultSummary';
import { useEstimator } from './hooks/useEstimator';

export default function App() {
  const {
    filters,
    result,
    averageResult,
    comparisonResults,
    setFilters,
    setTargetGender,
    setCompareMode,
    toggleCondition,
    applyAveragePreset,
    applyExtremeMalePreset,
    applyExtremeFemalePreset,
  } = useEstimator();

  return (
    <main className="app-shell">
      <header className="app-header">
        <div>
          <p className="eyebrow">Konkatsu Fermi Estimator</p>
          <h1>フェルミ推定で理想の相手は何人いるのか</h1>
        </div>
        <p>
          日本人口を起点に、条件ごとの割合を掛け合わせるフェルミ推定です。数値は統計の厳密値ではなく、母集団が減る感覚をつかむための仮定です。
        </p>
      </header>

      <div className="workspace">
        <FilterPanel
          filters={filters}
          setFilters={setFilters}
          setTargetGender={setTargetGender}
          toggleCondition={toggleCondition}
          setCompareMode={setCompareMode}
          applyAveragePreset={applyAveragePreset}
          applyExtremeMalePreset={applyExtremeMalePreset}
          applyExtremeFemalePreset={applyExtremeFemalePreset}
        />

        <div className="insight-stack">
          <ResultSummary result={result} averageResult={averageResult} />
          <PopulationChart result={result} />
          {filters.compareMode ? (
            <GenderComparison female={comparisonResults.female} male={comparisonResults.male} />
          ) : null}
        </div>
      </div>
    </main>
  );
}
