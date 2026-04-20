import type { Dispatch, SetStateAction } from 'react';
import {
  ageBuckets,
  appearanceOptions,
  athleticAbilityOptions,
  cupSizeOptions,
  educationOptions,
  experienceOptions,
  faceScoreOptions,
  heightOptions,
  houseworkSkillOptions,
  incomeOptions,
  iqOptions,
  locationOptions,
  luxuryBrandInterestOptions,
  movedToTokyoOptions,
  nightWorkOptions,
  searchLabels,
  specValueOptions,
} from '../data/assumptions';
import type { ConditionId, FilterState, TargetGender } from '../types';
import { ConditionRow } from './ConditionRow';

function getAgeBucketIndex(ageBucketId: FilterState['common']['ageFrom']): number {
  const index = ageBuckets.findIndex((item) => item.id === ageBucketId);
  return index < 0 ? 0 : index;
}

function getExperienceOptionIndex(experienceId: FilterState['female']['experienceFrom']): number {
  const index = experienceOptions.findIndex((item) => item.id === experienceId);
  return index < 0 ? 0 : index;
}

function getIqOptionIndex(iqRangeId: FilterState['common']['iqFrom']): number {
  const index = iqOptions.findIndex((item) => item.id === iqRangeId);
  return index < 0 ? 0 : index;
}

function getHeightOptionIndex(heightId: FilterState['male']['heightFrom']): number {
  const index = heightOptions.findIndex((item) => item.id === heightId);
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
  const experienceFromIndex = getExperienceOptionIndex(filters.female.experienceFrom);
  const experienceToIndex = getExperienceOptionIndex(filters.female.experienceTo);
  const iqFromIndex = getIqOptionIndex(filters.common.iqFrom);
  const iqToIndex = getIqOptionIndex(filters.common.iqTo);
  const heightFromIndex = getHeightOptionIndex(filters.male.heightFrom);
  const heightToIndex = getHeightOptionIndex(filters.male.heightTo);

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
          <div className="range-control">
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
          {ageFromIndex > ageToIndex ? <span className="range-hint">範囲を自動補正します</span> : null}
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
        <ConditionRow
          conditionId="iq"
          enabled={filters.enabled.iq}
          title="IQレンジ"
          description="最小と最大のIQ帯ではさんで割合を合算する"
          onToggle={toggleCondition}
        >
          <div className="range-control">
            <label>
              <span>最小</span>
              <select
                value={filters.common.iqFrom}
                disabled={!filters.enabled.iq}
                onChange={(event) => {
                  const iqFrom = event.target.value as FilterState['common']['iqFrom'];
                  setFilters((current) => {
                    const nextFromIndex = getIqOptionIndex(iqFrom);
                    const currentToIndex = getIqOptionIndex(current.common.iqTo);
                    return {
                      ...current,
                      common: {
                        ...current.common,
                        iqFrom,
                        iqTo: currentToIndex < nextFromIndex ? iqFrom : current.common.iqTo,
                      },
                    };
                  });
                }}
              >
                {iqOptions.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.shortLabel}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <span>最大</span>
              <select
                value={filters.common.iqTo}
                disabled={!filters.enabled.iq}
                onChange={(event) => {
                  const iqTo = event.target.value as FilterState['common']['iqTo'];
                  setFilters((current) => {
                    const currentFromIndex = getIqOptionIndex(current.common.iqFrom);
                    const nextToIndex = getIqOptionIndex(iqTo);
                    return {
                      ...current,
                      common: {
                        ...current.common,
                        iqFrom: nextToIndex < currentFromIndex ? iqTo : current.common.iqFrom,
                        iqTo,
                      },
                    };
                  });
                }}
              >
                {iqOptions.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.shortLabel}
                  </option>
                ))}
              </select>
            </label>
          </div>
          {iqFromIndex > iqToIndex ? <span className="range-hint">範囲を自動補正します</span> : null}
        </ConditionRow>
        <ConditionRow
          conditionId="houseworkSkill"
          enabled={filters.enabled.houseworkSkill}
          title="家事スキル"
          description="料理・掃除・洗濯などの自己申告スキルで絞る"
          value={filters.common.houseworkSkill}
          options={houseworkSkillOptions}
          onToggle={toggleCondition}
          onChange={(houseworkSkill) =>
            setFilters((current) => ({
              ...current,
              common: { ...current.common, houseworkSkill },
            }))
          }
        />
        <ConditionRow
          conditionId="athleticAbility"
          enabled={filters.enabled.athleticAbility}
          title="運動神経"
          description="身体操作やスポーツ適性の自己申告スキルで絞る"
          value={filters.common.athleticAbility}
          options={athleticAbilityOptions}
          onToggle={toggleCondition}
          onChange={(athleticAbility) =>
            setFilters((current) => ({
              ...current,
              common: { ...current.common, athleticAbility },
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
            description="最小と最大の経験人数レンジではさんで割合を合算する"
            onToggle={toggleCondition}
          >
            <div className="range-control">
              <label>
                <span>最小</span>
                <select
                  value={filters.female.experienceFrom}
                  disabled={!filters.enabled.experience}
                  onChange={(event) => {
                    const experienceFrom = event.target.value as FilterState['female']['experienceFrom'];
                    setFilters((current) => {
                      const nextFromIndex = getExperienceOptionIndex(experienceFrom);
                      const currentToIndex = getExperienceOptionIndex(current.female.experienceTo);
                      return {
                        ...current,
                        female: {
                          ...current.female,
                          experienceFrom,
                          experienceTo:
                            currentToIndex < nextFromIndex ? experienceFrom : current.female.experienceTo,
                        },
                      };
                    });
                  }}
                >
                  {experienceOptions.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.shortLabel}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                <span>最大</span>
                <select
                  value={filters.female.experienceTo}
                  disabled={!filters.enabled.experience}
                  onChange={(event) => {
                    const experienceTo = event.target.value as FilterState['female']['experienceTo'];
                    setFilters((current) => {
                      const currentFromIndex = getExperienceOptionIndex(current.female.experienceFrom);
                      const nextToIndex = getExperienceOptionIndex(experienceTo);
                      return {
                        ...current,
                        female: {
                          ...current.female,
                          experienceFrom:
                            nextToIndex < currentFromIndex ? experienceTo : current.female.experienceFrom,
                          experienceTo,
                        },
                      };
                    });
                  }}
                >
                  {experienceOptions.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.shortLabel}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            {experienceFromIndex > experienceToIndex ? (
              <span className="range-hint">範囲を自動補正します</span>
            ) : null}
          </ConditionRow>
          <ConditionRow
            conditionId="nightWork"
            enabled={filters.enabled.nightWork}
            title="夜職経験"
            description="自己申告前提のセンシティブ条件として扱う"
            value={filters.female.nightWork}
            options={nightWorkOptions}
            onToggle={toggleCondition}
            onChange={(nightWork) =>
              setFilters((current) => ({
                ...current,
                female: { ...current.female, nightWork },
              }))
            }
          />
          <ConditionRow
            conditionId="luxuryBrandInterest"
            enabled={filters.enabled.luxuryBrandInterest}
            title="ハイブラ興味"
            description="ブランド志向の自己申告条件としてざっくり扱う"
            value={filters.female.luxuryBrandInterest}
            options={luxuryBrandInterestOptions}
            onToggle={toggleCondition}
            onChange={(luxuryBrandInterest) =>
              setFilters((current) => ({
                ...current,
                female: { ...current.female, luxuryBrandInterest },
              }))
            }
          />
          <ConditionRow
            conditionId="movedToTokyo"
            enabled={filters.enabled.movedToTokyo}
            title="上京経験"
            description="東京圏への移住経験を仮定条件として扱う"
            value={filters.female.movedToTokyo}
            options={movedToTokyoOptions}
            onToggle={toggleCondition}
            onChange={(movedToTokyo) =>
              setFilters((current) => ({
                ...current,
                female: { ...current.female, movedToTokyo },
              }))
            }
          />
        </div>
      ) : (
        <div className="condition-group">
          <h3>男性対象の条件</h3>
          <ConditionRow
            conditionId="appearance"
            enabled={filters.enabled.appearance}
            title="顔面偏差値"
            description="主観評価を偏差値風に換算して絞る"
            value={filters.male.appearance}
            options={faceScoreOptions}
            onToggle={toggleCondition}
            onChange={(appearance) =>
              setFilters((current) => ({
                ...current,
                male: { ...current.male, appearance },
              }))
            }
          />
          <ConditionRow
            conditionId="specValue"
            enabled={filters.enabled.specValue}
            title="スペ値"
            description="身長(cm) - 体重(kg) の値で絞る"
            value={filters.male.specValue}
            options={specValueOptions}
            onToggle={toggleCondition}
            onChange={(specValue) =>
              setFilters((current) => ({
                ...current,
                male: { ...current.male, specValue },
              }))
            }
          />
          <ConditionRow
            conditionId="education"
            enabled={filters.enabled.education}
            title="学歴"
            description="最終学歴や学校群をざっくり仮定して絞る"
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
            description="最小と最大の身長レンジではさんで割合を合算する"
            onToggle={toggleCondition}
          >
            <div className="range-control">
              <label>
                <span>最小</span>
                <select
                  value={filters.male.heightFrom}
                  disabled={!filters.enabled.height}
                  onChange={(event) => {
                    const heightFrom = event.target.value as FilterState['male']['heightFrom'];
                    setFilters((current) => {
                      const nextFromIndex = getHeightOptionIndex(heightFrom);
                      const currentToIndex = getHeightOptionIndex(current.male.heightTo);
                      return {
                        ...current,
                        male: {
                          ...current.male,
                          heightFrom,
                          heightTo: currentToIndex < nextFromIndex ? heightFrom : current.male.heightTo,
                        },
                      };
                    });
                  }}
                >
                  {heightOptions.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.shortLabel}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                <span>最大</span>
                <select
                  value={filters.male.heightTo}
                  disabled={!filters.enabled.height}
                  onChange={(event) => {
                    const heightTo = event.target.value as FilterState['male']['heightTo'];
                    setFilters((current) => {
                      const currentFromIndex = getHeightOptionIndex(current.male.heightFrom);
                      const nextToIndex = getHeightOptionIndex(heightTo);
                      return {
                        ...current,
                        male: {
                          ...current.male,
                          heightFrom: nextToIndex < currentFromIndex ? heightTo : current.male.heightFrom,
                          heightTo,
                        },
                      };
                    });
                  }}
                >
                  {heightOptions.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.shortLabel}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            {heightFromIndex > heightToIndex ? <span className="range-hint">範囲を自動補正します</span> : null}
          </ConditionRow>
        </div>
      )}
    </section>
  );
}
