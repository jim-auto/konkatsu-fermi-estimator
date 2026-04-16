import { useMemo, useState } from 'react';
import type { ConditionId, FilterState, TargetGender } from '../types';
import {
  estimatePopulation,
  getAverageScenario,
  getExtremeFemaleScenario,
  getExtremeMaleScenario,
} from '../utils/estimator';

export function useEstimator() {
  const [filters, setFilters] = useState<FilterState>(() => getExtremeFemaleScenario());

  const result = useMemo(() => estimatePopulation(filters), [filters]);
  const averageResult = useMemo(
    () => estimatePopulation(getAverageScenario(filters), filters.targetGender),
    [filters],
  );
  const comparisonResults = useMemo(
    () => ({
      female: estimatePopulation({ ...filters, targetGender: 'female' }, 'female'),
      male: estimatePopulation({ ...filters, targetGender: 'male' }, 'male'),
    }),
    [filters],
  );

  const setTargetGender = (targetGender: TargetGender) => {
    setFilters((current) => ({ ...current, targetGender }));
  };

  const setCompareMode = (compareMode: boolean) => {
    setFilters((current) => ({ ...current, compareMode }));
  };

  const toggleCondition = (conditionId: ConditionId) => {
    setFilters((current) => ({
      ...current,
      enabled: {
        ...current.enabled,
        [conditionId]: !current.enabled[conditionId],
      },
    }));
  };

  const applyAveragePreset = () => {
    setFilters((current) => getAverageScenario(current));
  };

  return {
    filters,
    result,
    averageResult,
    comparisonResults,
    setFilters,
    setTargetGender,
    setCompareMode,
    toggleCondition,
    applyAveragePreset,
    applyExtremeMalePreset: () => setFilters(getExtremeMaleScenario()),
    applyExtremeFemalePreset: () => setFilters(getExtremeFemaleScenario()),
  };
}
