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
          <p className="eyebrow">フェルミ推定で母集団を可視化</p>
          <h1>恋人条件シミュレーター</h1>
        </div>
        <p>
          条件を重ねるほど、候補は何人残るのか。日本人口を起点に、フェルミ推定で恋人候補の母集団を可視化します。
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
