import React from 'react';
import { useCalculatorStore } from '../store/calculatorStore';

export function ROITable() {
  const { investment, updateInvestment } = useCalculatorStore();

  const formatInputValue = (value: number): string => {
    return new Intl.NumberFormat('en-US').format(value);
  };

  const parseInputValue = (value: string): number => {
    return parseFloat(value.replace(/,/g, '')) || 0;
  };
  return (
    <div className="bg-white rounded-lg shadow-sm p-8 border border-[oklch(0.928_0.006_264.531)]">
      <div className="text-center mb-8">
        <h3 className="text-xl font-semibold text-zinc-900 mb-2">Investment Required</h3>
        <p className="text-[oklch(0.707_0.022_261.325)]">How much will you invest in A/B testing and optimization?</p>
      </div>
      
      <div className="max-w-md mx-auto">
        <div className="relative">
          <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[oklch(0.707_0.022_261.325)] text-lg">$</span>
          <input
            type="text"
            value={formatInputValue(investment)}
            onChange={(e) => updateInvestment(parseInputValue(e.target.value))}
            className="w-full pl-8 pr-4 py-3 text-center text-xl font-semibold bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-zinc-900"
            placeholder="50,000"
          />
        </div>
      </div>
    </div>
  );
}