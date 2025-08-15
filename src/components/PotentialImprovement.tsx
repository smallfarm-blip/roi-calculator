import React, { useState } from 'react';
import { TrendingUp, Info, MoreHorizontal } from 'lucide-react';
import { useCalculatorStore } from '../store/calculatorStore';
import { formatCurrency, formatPercentage, SCENARIO_PRESETS } from '../lib/calculator';

export function PotentialImprovement() {
  const { upliftParams, calculatedMetrics, updateUpliftParams, investment } = useCalculatorStore();
  const [crSliderMax, setCrSliderMax] = useState(50);
  const [aovSliderMax, setAovSliderMax] = useState(50);
  const [activePreset, setActivePreset] = useState<string | null>(null);

  const createSliderStyle = (value: number, max: number) => {
    const percentage = Math.min((value / max) * 100, 100);
    return {
      background: `linear-gradient(to right, #14B8A6 0%, #14B8A6 ${percentage}%, #E5E7EB ${percentage}%, #E5E7EB 100%)`
    };
  };

  const handlePresetClick = (type: 'cr' | 'aov', value: number) => {
    if (type === 'cr') {
      updateUpliftParams({ conversionRateGrowth: value });
      setActivePreset(null); // Clear preset when individual values change
    } else {
      updateUpliftParams({ aovIncrease: value });
      setActivePreset(null); // Clear preset when individual values change
    }
  };

  const handleNumericInput = (type: 'cr' | 'aov', value: string) => {
    const numValue = Math.max(0, Math.min(500, parseFloat(value) || 0));
    if (type === 'cr') {
      updateUpliftParams({ conversionRateGrowth: numValue });
    } else {
      updateUpliftParams({ aovIncrease: numValue });
    }
    setActivePreset(null); // Clear preset when values change
  };

  const handleSliderChange = (type: 'cr' | 'aov', value: number) => {
    if (type === 'cr') {
      updateUpliftParams({ conversionRateGrowth: value });
    } else {
      updateUpliftParams({ aovIncrease: value });
    }
    setActivePreset(null); // Clear preset when values change
  };

  const expandSliderRange = (type: 'cr' | 'aov') => {
    if (type === 'cr') {
      setCrSliderMax(500);
    } else {
      setAovSliderMax(500);
    }
  };

  const handlePresetSelect = (presetKey: string) => {
    const preset = SCENARIO_PRESETS[presetKey as keyof typeof SCENARIO_PRESETS];
    updateUpliftParams({
      conversionRateGrowth: preset.crGrowthPct,
      aovIncrease: preset.aovIncreasePct
    });
    setActivePreset(presetKey);
  };

  // Calculate ROI metrics if investment > 0
  const roiRatioMo = investment > 0 && calculatedMetrics.potentialRevenueIncrease > 0 
    ? calculatedMetrics.potentialRevenueIncrease / investment 
    : 0;
  const paybackMonths = calculatedMetrics.potentialRevenueIncrease > 0 
    ? investment / calculatedMetrics.potentialRevenueIncrease 
    : 0;

  const presetValues = [2, 5, 10, 25];
  
  // Calculate chart data
  const maxVal = Math.max(calculatedMetrics.currentMonthlyRevenue, calculatedMetrics.potentialMonthlyRevenue, 1);
  const currentPct = Math.round((calculatedMetrics.currentMonthlyRevenue / maxVal) * 100);
  const newPct = Math.round((calculatedMetrics.potentialMonthlyRevenue / maxVal) * 100);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-[oklch(0.928_0.006_264.531)]">
      <div className="flex items-center gap-2 mb-6">
        <TrendingUp className="w-5 h-5 text-teal-500" />
        <h3 className="text-lg font-semibold text-zinc-900">Potential Improvement</h3>
      </div>
      
      {/* Scenario Presets */}
      <div className="mb-6">
        <p className="text-sm font-medium text-[oklch(0.446_0.03_256.802)] mb-3">Quick Scenarios</p>
        <div className="flex gap-2">
          {Object.entries(SCENARIO_PRESETS).map(([key, preset]) => (
            <button
              key={key}
              id={`preset-${key}`}
              onClick={() => handlePresetSelect(key)}
              className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
                activePreset === key
                  ? 'bg-emerald-100 border-emerald-300 text-emerald-700'
                  : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
              }`}
            >
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </button>
          ))}
        </div>
      </div>
      
      <div className="space-y-8">
        {/* Conversion Rate Growth */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-[oklch(0.446_0.03_256.802)]">
                Conversion Rate Growth
              </label>
              <div className="group relative">
                <Info className="w-3 h-3 text-gray-400 cursor-help" />
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none w-48 text-center z-10">
                  CR growth is relative to your current CR. 5% growth on 2.0% = 2.1%.
                </div>
              </div>
            </div>
            {calculatedMetrics.newConversionRate && (
              <span id="chip-new-cr" className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs bg-emerald-50 text-emerald-700">
                New CR: {calculatedMetrics.newConversionRate.toFixed(1)}%
              </span>
            )}
          </div>

          {/* Preset Chips */}
          <div className="flex gap-2 mb-3">
            {presetValues.map(value => (
              <button
                key={value}
                onClick={() => handlePresetClick('cr', value)}
                className={`px-2 py-1 text-xs rounded-full border transition-colors ${
                  upliftParams.conversionRateGrowth === value
                    ? 'bg-teal-500 text-white border-teal-500'
                    : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-teal-300'
                }`}
              >
                +{value}%
              </button>
            ))}
          </div>

          {/* Number Input */}
          <div className="mb-3">
            <div className="relative">
              <input
                type="number"
                min="0"
                max="500"
                step="0.1"
                value={upliftParams.conversionRateGrowth}
                onChange={(e) => handleNumericInput('cr', e.target.value)}
                className="w-full px-3 py-2 pr-8 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-zinc-900"
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">%</span>
            </div>
          </div>

          {/* Slider */}
          <div className="relative">
            <input
              type="range"
              min="0"
              max={crSliderMax}
              step="0.1"
              value={Math.min(upliftParams.conversionRateGrowth, crSliderMax)}
              onChange={(e) => handleSliderChange('cr', parseFloat(e.target.value))}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer slider-teal"
              style={createSliderStyle(Math.min(upliftParams.conversionRateGrowth, crSliderMax), crSliderMax)}
            />
            <div className="flex justify-between text-xs text-[oklch(0.707_0.022_261.325)] mt-1">
              <span>0%</span>
              <span>{crSliderMax}%</span>
            </div>
          </div>

          {/* Slider Range Controls */}
          {upliftParams.conversionRateGrowth > crSliderMax && (
            <div className="text-xs text-gray-500 mt-1">
              Slider capped at {crSliderMax}%. Use input for higher values.
              <button
                onClick={() => expandSliderRange('cr')}
                className="ml-2 text-teal-500 hover:text-teal-600 underline"
              >
                Expand to 500%
              </button>
            </div>
          )}
          {crSliderMax === 50 && (
            <div className="text-right mt-1">
              <button
                onClick={() => expandSliderRange('cr')}
                className="text-xs text-gray-400 hover:text-teal-500 flex items-center gap-1 ml-auto"
              >
                <MoreHorizontal className="w-3 h-3" />
                More range
              </button>
            </div>
          )}
        </div>

        {/* AOV Increase */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-[oklch(0.446_0.03_256.802)]">
                AOV Increase
              </label>
              <div className="group relative">
                <Info className="w-3 h-3 text-gray-400 cursor-help" />
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none w-48 text-center z-10">
                  AOV increase is relative. 2% on $95 = $96.90.
                </div>
              </div>
            </div>
            {calculatedMetrics.newAOV && (
              <span id="chip-new-aov" className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs bg-emerald-50 text-emerald-700">
                New AOV: ${calculatedMetrics.newAOV.toFixed(0)}
              </span>
            )}
          </div>

          {/* Preset Chips */}
          <div className="flex gap-2 mb-3">
            {presetValues.map(value => (
              <button
                key={value}
                onClick={() => handlePresetClick('aov', value)}
                className={`px-2 py-1 text-xs rounded-full border transition-colors ${
                  upliftParams.aovIncrease === value
                    ? 'bg-teal-500 text-white border-teal-500'
                    : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-teal-300'
                }`}
              >
                +{value}%
              </button>
            ))}
          </div>

          {/* Number Input */}
          <div className="mb-3">
            <div className="relative">
              <input
                type="number"
                min="0"
                max="500"
                step="0.1"
                value={upliftParams.aovIncrease}
                onChange={(e) => handleNumericInput('aov', e.target.value)}
                className="w-full px-3 py-2 pr-8 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-zinc-900"
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">%</span>
            </div>
          </div>

          {/* Slider */}
          <div className="relative">
            <input
              type="range"
              min="0"
              max={aovSliderMax}
              step="0.1"
              value={Math.min(upliftParams.aovIncrease, aovSliderMax)}
              onChange={(e) => handleSliderChange('aov', parseFloat(e.target.value))}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer slider-teal"
              style={createSliderStyle(Math.min(upliftParams.aovIncrease, aovSliderMax), aovSliderMax)}
            />
            <div className="flex justify-between text-xs text-[oklch(0.707_0.022_261.325)] mt-1">
              <span>0%</span>
              <span>{aovSliderMax}%</span>
            </div>
          </div>

          {/* Slider Range Controls */}
          {upliftParams.aovIncrease > aovSliderMax && (
            <div className="text-xs text-gray-500 mt-1">
              Slider capped at {aovSliderMax}%. Use input for higher values.
              <button
                onClick={() => expandSliderRange('aov')}
                className="ml-2 text-teal-500 hover:text-teal-600 underline"
              >
                Expand to 500%
              </button>
            </div>
          )}
          {aovSliderMax === 50 && (
            <div className="text-right mt-1">
              <button
                onClick={() => expandSliderRange('aov')}
                className="text-xs text-gray-400 hover:text-teal-500 flex items-center gap-1 ml-auto"
              >
                <MoreHorizontal className="w-3 h-3" />
                More range
              </button>
            </div>
          )}
        </div>
        
        {/* New Monthly Revenue and Revenue Increase % */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
          <div className="text-center">
            <p className="text-xs text-[oklch(0.707_0.022_261.325)] mb-1 font-medium">NEW MONTHLY REVENUE</p>
            <p id="stat-new-revenue-mo" className="text-xl font-semibold text-zinc-900">
              {formatCurrency(calculatedMetrics.potentialMonthlyRevenue)}
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-[oklch(0.707_0.022_261.325)] mb-1 font-medium">REVENUE INCREASE %</p>
            <p id="stat-rev-increase-pct" className="text-xl font-semibold text-teal-500">
              +{calculatedMetrics.revenueIncreasePct?.toFixed(1) || '0.0'}%
            </p>
          </div>
        </div>
        
        <div className="bg-[oklab(0.774687_-0.149085_0.0218564_/_0.05)] border border-[oklab(0.774687_-0.149085_0.0218564_/_0.2)] rounded-lg p-4 text-center">
          <p className="text-xs text-teal-500 mb-1 font-medium tracking-wide">POTENTIAL REVENUE INCREASE</p>
          <p className="text-2xl font-bold text-teal-500">
            {formatCurrency(calculatedMetrics.potentialRevenueIncrease)}
            <span className="text-sm font-normal text-[oklch(0.707_0.022_261.325)]">/month</span>
          </p>
        </div>
        
        {/* Investment-aware ROI metrics */}
        {investment > 0 && calculatedMetrics.potentialRevenueIncrease > 0 && (
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
            <div className="text-center">
              <p className="text-xs text-[oklch(0.707_0.022_261.325)] mb-1 font-medium">ROI RATIO (MONTHLY)</p>
              <p id="stat-roi-ratio-mo" className="text-xl font-semibold text-teal-500">
                {roiRatioMo.toFixed(2)}x
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs text-[oklch(0.707_0.022_261.325)] mb-1 font-medium">PAYBACK PERIOD</p>
              <p id="stat-payback-months" className="text-xl font-semibold text-teal-500">
                {paybackMonths.toFixed(1)} months
              </p>
            </div>
          </div>
        )}
        
        {/* Visual Impact Chart */}
        <div className="mt-6">
          <h4 className="text-sm font-medium text-[oklch(0.446_0.03_256.802)] mb-4">
            Current vs New Monthly Revenue
          </h4>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>Current</span>
              <span id="chart-current-val">{formatCurrency(calculatedMetrics.currentMonthlyRevenue)}</span>
            </div>
            <div className="h-3 bg-gray-200 rounded">
              <div 
                id="chart-current-bar" 
                className="h-3 bg-gray-400 rounded transition-all duration-300" 
                style={{ width: currentPct + '%' }} 
              />
            </div>

            <div className="flex items-center justify-between text-xs text-gray-500 mt-3">
              <span>New</span>
              <span id="chart-new-val">{formatCurrency(calculatedMetrics.potentialMonthlyRevenue)}</span>
            </div>
            <div className="h-3 bg-emerald-100 rounded">
              <div 
                id="chart-new-bar" 
                className="h-3 bg-emerald-500 rounded transition-all duration-300" 
                style={{ width: newPct + '%' }} 
              />
            </div>
            <div className="text-xs text-emerald-700 mt-2" id="chart-increase-pct">
              +{calculatedMetrics.revenueIncreasePct?.toFixed(1) || '0.0'}% vs current
            </div>
          </div>
        </div>
        
        {/* Cost of Inaction */}
        {calculatedMetrics.costOfInactionYr > 0 && (
          <div className="mt-4 rounded-lg border border-amber-300 bg-amber-50 text-amber-800 p-3 text-sm">
            <p id="cost-of-inaction-yr">
              If you do nothing, you will miss out on <strong>{formatCurrency(calculatedMetrics.costOfInactionYr)}</strong> over the next 12 months.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}