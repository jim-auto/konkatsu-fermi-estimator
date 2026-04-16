import type { Dispatch, SetStateAction } from 'react';
import {
  ageBuckets,
  appearanceOptions,
  cupSizeOptions,
  experienceOptions,
  heightOptions,
  incomeOptions,
  locationOptions,
  searchLabels,
  specValueOptions,
} from '../data/assumptions';
import type { ConditionId, FilterState, TargetGender } from '../types';
import { ConditionRow } from './ConditionRow';

function getAgeBucketIndex(ageBucketId: FilterState['common']['ageFrom']): number {
  const index = ageBuckets.findIndex((item) => item.id === ageBucketId);
  return index < 0 ? 0 : index;
}

interface FilterPanelProps {
  filters: FilterState;
  setFilters: Dispatch<SetStateAction<FilterState>>;
  setTargetGender: (targetGender: TargetGender) => void;
  toggleCondition: (conditionId: ConditionId) => void;
  setCompareMode: (enabled: boolean) => void;
  applyExtremeMalePreset: () => void;
  applyExtremeFemalePreset: () => void;
  applyAveragePreset: () => void;
}

export function FilterPanel({
  filters,
  setFilters,
  setTargetGender,
  toggleCondition,
  setCompareMode,
  applyExtremeMalePreset,
  applyExtremeFemalePreset,
  applyAveragePreset,
}: FilterPanelProps) {
  const ageFromIndex = getAgeBucketIndex(filters.common.ageFrom);
  const ageToIndex = getAgeBucketIndex(filters.common.ageTo);

  return (
    <section className="panel control-panel" aria-label="条件入力">
      <div className="panel-header">
        <div>
          <p className="eyebrow">Estimator</p>
          <h2>検索条件</h2>
        </div>
        <label className="compare-toggle">
          <input
            type="checkbox"
            checked={filters.compareMode}
            onChange={(event) => setCompareMode(event.target.checked)}
          />
          男女比較
        </label>
      </div>

      <div className="segmented" role="group" aria-label="検索対象">
        {(['female', 'male'] as const).map((gender) => (
          <button
            key={gender}
            className={filters.targetGender === gender ? 'active' : ''}
            type="button"
            onClick={() => setTargetGender(gender)}
          >
            {searchLabels[gender]}
          </button>
        ))}
      </div>

      <div className="preset-grid" aria-label="プリセット">
        <button type="button" onClick={applyExtremeMalePreset}>
          極端: 男性
        </button>
        <button type="button" onClick={applyExtremeFemalePreset}>
          極端: 女性
        </button>
        <button type="button" onClick={applyAveragePreset}>
          平均条件
        </button>
      </div>

      <div className="condition-group">
        <h3>共通条件</h3>
        <ConditionRow
          conditionId="age"
          enabled={filters.enabled.age}
          title="年齢レンジ"
          description="最小と最大の年齢帯ではさんで対象人口を残す"
          onToggle={toggleCondition}
        >
          <div className="age-range-control">
            <label>
              <span>最小</span>
              <select
                value={filters.common.ageFrom}
                disabled={!filters.enabled.age}
                onChange={(event) => {
                  const ageFrom = event.target.value as FilterState['common']['ageFrom'];
                  setFilters((current) => {
                    const nextFromIndex = getAgeBucketIndex(ageFrom);
                    const currentToIndex = getAgeBucketIndex(current.common.ageTo);
                    return {
                      ...current,
                      common: {
                        ...current.common,
                        ageFrom,
                        ageTo: currentToIndex < nextFromIndex ? ageFrom : current.common.ageTo,
                      },
                    };
                  });
                }}
              >
                {ageBuckets.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.label}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <span>最大</span>
              <select
                value={filters.common.ageTo}
                disabled={!filters.enabled.age}
                onChange={(event) => {
                  const ageTo = event.target.value as FilterState['common']['ageTo'];
                  setFilters((current) => {
                    const currentFromIndex = getAgeBucketIndex(current.common.ageFrom);
                    const nextToIndex = getAgeBucketIndex(ageTo);
                    return {
                      ...current,
                      common: {
                        ...current.common,
                        ageFrom: nextToIndex < currentFromIndex ? ageTo : current.common.ageFrom,
                        ageTo,
                      },
                    };
                  });
                }}
              >
                {ageBuckets.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
          {ageFromIndex > ageToIndex ? <span className="age-range-hint">範囲を自動補正します</span> : null}
        </ConditionRow>
        <ConditionRow
          conditionId="unmarried"
          enabled={filters.enabled.unmarried}
          title="未婚"
          description="年齢レンジ別の未婚率を掛ける"
          onToggle={toggleCondition}
        >
          <span className="static-pill">未婚のみ</span>
        </ConditionRow>
        <ConditionRow
          conditionId="location"
          enabled={filters.enabled.location}
          title="居住地"
          description="都市部または地方に居住する人だけを残す"
          value={filters.common.location}
          options={locationOptions}
          onToggle={toggleCondition}
          onChange={(location) =>
            setFilters((current) => ({
              ...current,
              common: { ...current.common, location },
            }))
          }
        />
      </div>

      {filters.targetGender === 'female' ? (
        <div className="condition-group">
          <h3>女性対象の条件</h3>
          <ConditionRow
            conditionId="appearance"
            enabled={filters.enabled.appearance}
            title="外見偏差値"
            description="主観評価を偏差値風に換算して絞る"
            value={filters.female.appearance}
            options={appearanceOptions}
            onToggle={toggleCondition}
            onChange={(appearance) =>
              setFilters((current) => ({
                ...current,
                female: { ...current.female, appearance },
              }))
            }
          />
          <ConditionRow
            conditionId="specValue"
            enabled={filters.enabled.specValue}
            title="スペ値"
            description="身長(cm) - 体重(kg) の値で絞る"
            value={filters.female.specValue}
            options={specValueOptions}
            onToggle={toggleCondition}
            onChange={(specValue) =>
              setFilters((current) => ({
                ...current,
                female: { ...current.female, specValue },
              }))
            }
          />
          <ConditionRow
            conditionId="cupSize"
            enabled={filters.enabled.cupSize}
            title="カップ数"
            description="自己申告前提の身体条件としてざっくり絞る"
            value={filters.female.cupSize}
            options={cupSizeOptions}
            onToggle={toggleCondition}
            onChange={(cupSize) =>
              setFilters((current) => ({
                ...current,
                female: { ...current.female, cupSize },
              }))
            }
          />
          <ConditionRow
            conditionId="experience"
            enabled={filters.enabled.experience}
            title="経験人数"
            description="自己申告前提のセンシティブ条件として扱う"
            value={filters.female.experience}
            options={experienceOptions}
            onToggle={toggleCondition}
            onChange={(experience) =>
              setFilters((current) => ({
                ...current,
                female: { ...current.female, experience },
              }))
            }
          />
        </div>
      ) : (
        <div className="condition-group">
          <h3>男性対象の条件</h3>
          <ConditionRow
            conditionId="income"
            enabled={filters.enabled.income}
            title="年収レンジ"
            description="年収条件の上位割合を掛ける"
            value={filters.male.income}
            options={incomeOptions}
            onToggle={toggleCondition}
            onChange={(income) =>
              setFilters((current) => ({
                ...current,
                male: { ...current.male, income },
              }))
            }
          />
          <ConditionRow
            conditionId="height"
            enabled={filters.enabled.height}
            title="身長"
            description="身長分布から指定以上だけを残す"
            value={filters.male.height}
            options={heightOptions}
            onToggle={toggleCondition}
            onChange={(height) =>
              setFilters((current) => ({
                ...current,
                male: { ...current.male, height },
              }))
            }
          />
        </div>
      )}
    </section>
  );
}
