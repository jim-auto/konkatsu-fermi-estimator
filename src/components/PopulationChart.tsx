import type { EstimationResult } from '../types';
import { formatPeople, formatPercent } from '../utils/estimator';

interface PopulationChartProps {
  result: EstimationResult;
}

function formatAxisPeople(value: number): string {
  if (value >= 100_000_000) {
    return `${(value / 100_000_000).toFixed(1)}億`;
  }
  if (value >= 10_000) {
    return `${Math.round(value / 10_000).toLocaleString('ja-JP')}万`;
  }
  return Math.round(value).toLocaleString('ja-JP');
}

function formatAxisLabel(value: string): string {
  return value.length > 8 ? `${value.slice(0, 8)}…` : value;
}

export function PopulationChart({ result }: PopulationChartProps) {
  const chartData = result.steps.map((step, index) => ({
    name: index === 0 ? '母集団' : step.label,
    people: Math.max(1, Math.round(step.remaining)),
    logPeople: Math.log10(Math.max(1, step.remaining)),
  }));
  const stepDetails = result.steps.slice(1).map((step, index) => ({
    step,
    previous: result.steps[index].remaining,
  }));
  const maxLogPeople = Math.max(...chartData.map((item) => item.logPeople), 1);

  return (
    <section className="panel chart-panel" aria-label="条件ごとの残存人数">
      <div className="panel-header">
        <div>
          <p className="eyebrow">Fermi Funnel</p>
          <h2>条件ごとの残存人数</h2>
        </div>
        <span className="chart-note">フェルミ推定 / 対数バー</span>
      </div>

      <div className="fermi-callout">
        <strong>フェルミ推定</strong>
        <span>人口に条件割合を順番に掛けて、残る人数の桁感を見る推定です。</span>
      </div>

      <div className="chart-box">
        <div className="funnel-bars">
          {chartData.map((item, index) => (
            <div className="funnel-bar-row" key={`${item.name}-${index}`}>
              <span className="funnel-bar-label">{formatAxisLabel(item.name)}</span>
              <div className="funnel-bar-track" aria-hidden="true">
                <span style={{ width: `${Math.max(4, (item.logPeople / maxLogPeople) * 100)}%` }} />
              </div>
              <strong>{formatAxisPeople(item.people)}人</strong>
            </div>
          ))}
        </div>
      </div>

      <div className="step-list">
        {stepDetails.map(({ step, previous }, index) => (
          <article key={step.id} className="step-item">
            <div className="step-index">{index + 1}</div>
            <div className="step-main">
              <strong>{step.label}</strong>
              <span>{step.note}</span>
              <div className="step-flow">
                {formatPeople(previous)}
                <b>→</b>
                {formatPeople(step.remaining)}
              </div>
            </div>
            <div className="step-metrics">
              <div className="step-count-line">
                <span>残存人数</span>
                <strong>{formatPeople(step.remaining)}</strong>
              </div>
              <div className="step-bar" aria-hidden="true">
                <span style={{ width: `${Math.max(4, Math.min(100, step.ratio * 100))}%` }} />
              </div>
              <div className="step-ratio">
                <em>残存率 {formatPercent(step.ratio)}</em>
                <span>減少 {formatPercent(1 - step.ratio)}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
