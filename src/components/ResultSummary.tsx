import type { EstimationResult } from '../types';
import { formatPeople, formatPercent } from '../utils/estimator';

interface ResultSummaryProps {
  result: EstimationResult;
  averageResult: EstimationResult;
}

export function ResultSummary({ result, averageResult }: ResultSummaryProps) {
  const averageRatio = averageResult.finalCount > 0 ? result.finalCount / averageResult.finalCount : 0;
  const averageText =
    averageRatio < 1
      ? `${Math.max(0.01, averageRatio * 100).toFixed(2)}%`
      : `${averageRatio.toFixed(1)}倍`;

  return (
    <section className={`panel result-panel tone-${result.rarityTone}`} aria-label="推定結果">
      <div className="result-topline">
        <span>{result.enabledConditionCount}条件で推定</span>
        <strong>{result.rarityLabel}</strong>
      </div>

      <div className="hero-number">
        <span className="hero-label">推定人数</span>
        <strong>{formatPeople(result.finalCount)}</strong>
      </div>

      <div className="ratio-grid">
        <div>
          <span>対象性別人口に対する割合</span>
          <strong>{formatPercent(result.targetPopulationRatio)}</strong>
        </div>
        <div>
          <span>日本人口に対する割合</span>
          <strong>{formatPercent(result.japanPopulationRatio)}</strong>
        </div>
      </div>

      <div className="average-comparison">
        <div>
          <span>平均条件</span>
          <strong>{formatPeople(averageResult.finalCount)}</strong>
        </div>
        <div className="comparison-meter" aria-hidden="true">
          <span style={{ width: `${Math.max(4, Math.min(100, averageRatio * 100))}%` }} />
        </div>
        <p>
          平均条件の<strong>{averageText}</strong>の母集団です。
        </p>
      </div>
    </section>
  );
}
