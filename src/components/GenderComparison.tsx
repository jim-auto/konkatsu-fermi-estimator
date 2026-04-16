import type { EstimationResult } from '../types';
import { formatPeople, formatPercent } from '../utils/estimator';

interface GenderComparisonProps {
  female: EstimationResult;
  male: EstimationResult;
}

export function GenderComparison({ female, male }: GenderComparisonProps) {
  const max = Math.max(female.finalCount, male.finalCount, 1);

  return (
    <section className="panel comparison-panel" aria-label="男女比較">
      <div className="panel-header">
        <div>
          <p className="eyebrow">Compare</p>
          <h2>男女比較</h2>
        </div>
      </div>

      {[
        { label: '女性対象', result: female, color: '#0e7c7b' },
        { label: '男性対象', result: male, color: '#2364aa' },
      ].map((item) => (
        <div className="comparison-row" key={item.label}>
          <div className="comparison-label">
            <strong>{item.label}</strong>
            <span>
              {formatPeople(item.result.finalCount)} / {formatPercent(item.result.targetPopulationRatio)}
            </span>
          </div>
          <div className="comparison-bar" aria-hidden="true">
            <span
              style={{
                width: `${Math.max(3, (item.result.finalCount / max) * 100)}%`,
                backgroundColor: item.color,
              }}
            />
          </div>
          <em>{item.result.rarityLabel}</em>
        </div>
      ))}
    </section>
  );
}
