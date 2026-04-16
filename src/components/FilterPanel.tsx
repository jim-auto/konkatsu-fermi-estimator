import type { Dispatch, SetStateAction } from 'react';
import {
  ageRanges,
  appearanceOptions,
  childrenOptions,
  cupSizeOptions,
  dualIncomeOptions,
  educationOptions,
  experienceOptions,
  femaleEducationOptions,
  femaleEmploymentOptions,
  heightOptions,
  incomeOptions,
  locationOptions,
  maleOccupationOptions,
  searchLabels,
  specValueOptions,
} from '../data/assumptions';
import type { ConditionId, FilterState, TargetGender } from '../types';
import { ConditionRow } from './ConditionRow';

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
          description="対象性別の人口から指定年齢だけを残す"
          value={filters.common.ageRange}
          options={ageRanges.map((item) => ({
            id: item.id,
            label: item.label,
            ratio: item.counts[filters.targetGender],
            note: item.note,
          }))}
          onToggle={toggleCondition}
          onChange={(ageRange) =>
            setFilters((current) => ({
              ...current,
              common: { ...current.common, ageRange },
            }))
          }
        />
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
            title="外見レベル"
            description="主観評価を上位割合として扱う"
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
            conditionId="femaleEducation"
            enabled={filters.enabled.femaleEducation}
            title="学歴"
            description="女性対象にも学歴条件を加える"
            value={filters.female.education}
            options={femaleEducationOptions}
            onToggle={toggleCondition}
            onChange={(education) =>
              setFilters((current) => ({
                ...current,
                female: { ...current.female, education },
              }))
            }
          />
          <ConditionRow
            conditionId="employment"
            enabled={filters.enabled.employment}
            title="職業"
            description="就業形態または専門性で絞る"
            value={filters.female.employment}
            options={femaleEmploymentOptions}
            onToggle={toggleCondition}
            onChange={(employment) =>
              setFilters((current) => ({
                ...current,
                female: { ...current.female, employment },
              }))
            }
          />
          <ConditionRow
            conditionId="dualIncome"
            enabled={filters.enabled.dualIncome}
            title="共働き可否"
            description="結婚後の働き方の希望を加える"
            value={filters.female.dualIncome}
            options={dualIncomeOptions}
            onToggle={toggleCondition}
            onChange={(dualIncome) =>
              setFilters((current) => ({
                ...current,
                female: { ...current.female, dualIncome },
              }))
            }
          />
          <ConditionRow
            conditionId="children"
            enabled={filters.enabled.children}
            title="子供希望"
            description="家族観の条件を追加する"
            value={filters.female.children}
            options={childrenOptions}
            onToggle={toggleCondition}
            onChange={(children) =>
              setFilters((current) => ({
                ...current,
                female: { ...current.female, children },
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
          <ConditionRow
            conditionId="education"
            enabled={filters.enabled.education}
            title="学歴"
            description="学歴条件でさらに絞る"
            value={filters.male.education}
            options={educationOptions}
            onToggle={toggleCondition}
            onChange={(education) =>
              setFilters((current) => ({
                ...current,
                male: { ...current.male, education },
              }))
            }
          />
          <ConditionRow
            conditionId="occupation"
            enabled={filters.enabled.occupation}
            title="職業"
            description="雇用安定性や職種で絞る"
            value={filters.male.occupation}
            options={maleOccupationOptions}
            onToggle={toggleCondition}
            onChange={(occupation) =>
              setFilters((current) => ({
                ...current,
                male: { ...current.male, occupation },
              }))
            }
          />
        </div>
      )}
    </section>
  );
}
