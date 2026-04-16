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
import { formatPeople } from '../utils/estimator';

interface PopulationChartProps {
  result: EstimationResult;
}

export function PopulationChart({ result }: PopulationChartProps) {
  const chartData = result.steps.map((step, index) => ({
    name: index === 0 ? '母集団' : step.label,
    people: Math.max(1, Math.round(step.remaining)),
  }));

  return (
    <section className="panel chart-panel" aria-label="条件ごとの残存人数">
      <div className="panel-header">
        <div>
          <p className="eyebrow">Funnel</p>
          <h2>条件ごとの残存人数</h2>
        </div>
        <span className="chart-note">対数スケール</span>
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
        {result.steps.slice(1).map((step) => (
          <div key={step.id} className="step-item">
            <div>
              <strong>{step.label}</strong>
              <span>{step.note}</span>
            </div>
            <em>x{step.ratio.toFixed(3)}</em>
            <b>{formatPeople(step.remaining)}</b>
          </div>
        ))}
      </div>
    </section>
  );
}
