import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import type { EstimationResult } from '../types';
import { formatPeople, formatPercent } from '../utils/estimator';

interface PopulationChartProps {
  result: EstimationResult;
}

export function PopulationChart({ result }: PopulationChartProps) {
  const chartData = result.steps.map((step, index) => ({
    name: index === 0 ? '母集団' : step.label,
    people: Math.max(1, Math.round(step.remaining)),
  }));
  const stepDetails = result.steps.slice(1).map((step, index) => ({
    step,
    previous: result.steps[index].remaining,
  }));

  return (
    <section className="panel chart-panel" aria-label="条件ごとの残存人数">
      <div className="panel-header">
        <div>
          <p className="eyebrow">Fermi Funnel</p>
          <h2>条件ごとの残存人数</h2>
        </div>
        <span className="chart-note">フェルミ推定 / 対数スケール</span>
      </div>

      <div className="fermi-callout">
        <strong>フェルミ推定</strong>
        <span>人口に条件割合を順番に掛けて、残る人数の桁感を見る推定です。</span>
      </div>

      <div className="chart-box">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 16, right: 20, left: 8, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#d8dee8" />
            <XAxis
              dataKey="name"
              tick={{ fill: '#4b5563', fontSize: 12 }}
              interval={0}
              angle={-18}
              textAnchor="end"
              height={70}
            />
            <YAxis
              scale="log"
              domain={[1, 'dataMax']}
              tickFormatter={(value) => `${Number(value).toLocaleString('ja-JP')}`}
              tick={{ fill: '#4b5563', fontSize: 12 }}
              width={74}
            />
            <Tooltip
              formatter={(value) => [formatPeople(Number(value)), '残存人数']}
              labelStyle={{ color: '#111827' }}
              contentStyle={{ borderRadius: 8, border: '1px solid #d8dee8' }}
            />
            <Line
              type="monotone"
              dataKey="people"
              stroke="#d1495b"
              strokeWidth={3}
              dot={{ r: 4, strokeWidth: 2, fill: '#ffffff' }}
              activeDot={{ r: 7 }}
            />
          </LineChart>
        </ResponsiveContainer>
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
