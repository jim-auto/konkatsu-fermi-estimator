import type { ChangeEvent, ReactNode } from 'react';
import type { ConditionId, RatioOption } from '../types';

interface ConditionRowProps<TId extends string> {
  conditionId: ConditionId;
  enabled: boolean;
  title: string;
  description: string;
  value?: TId;
  options?: RatioOption<TId>[];
  onToggle: (conditionId: ConditionId) => void;
  onChange?: (value: TId) => void;
  children?: ReactNode;
}

export function ConditionRow<TId extends string>({
  conditionId,
  enabled,
  title,
  description,
  value,
  options,
  onToggle,
  onChange,
  children,
}: ConditionRowProps<TId>) {
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onChange?.(event.target.value as TId);
  };

  return (
    <div className={`condition-row ${enabled ? 'is-enabled' : ''}`}>
      <label className="toggle" aria-label={`${title}を条件に含める`}>
        <input type="checkbox" checked={enabled} onChange={() => onToggle(conditionId)} />
        <span />
      </label>
      <div className="condition-copy">
        <div className="condition-title">{title}</div>
        <div className="condition-description">{description}</div>
      </div>
      <div className="condition-control">
        {options && value ? (
          <select value={value} onChange={handleChange} disabled={!enabled}>
            {options.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
        ) : (
          children
        )}
      </div>
    </div>
  );
}
