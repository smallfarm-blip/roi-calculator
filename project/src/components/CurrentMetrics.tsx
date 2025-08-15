import React from 'react';
import { BarChart3 } from 'lucide-react';
import { useCalculatorStore } from '../store/calculatorStore';
import { formatCurrency, formatNumber, BENCHMARKS } from '../lib/calculator';

export function CurrentMetrics() {
  const { siteMetrics, calculatedMetrics, updateSiteMetrics } = useCalculatorStore();

  const formatInputValue = (value: number): string => {
    return new Intl.NumberFormat('en-US').format(value);
  };

  const parseInputValue = (value: string): number => {
    return parseFloat(value.replace(/,/g, '')) || 0;
  };

  const industryOptions = [
    { value: 'retail', label: 'Retail' },
    { value: 'fashion', label: 'Fashion' },
    { value: 'luxury', label: 'Luxury' }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-[oklch(0.928_0.006_264.531)]">
      <div className="flex items-center gap-2 mb-6">
        <BarChart3 className="w-5 h-5 text-teal-500" />
        <h3 className="text-lg font-semibold text-zinc-900">Your Current Site Metrics</h3>
      </div>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-[oklch(0.446_0.03_256.802)] mb-2">
            Industry
          </label>
          <select
            value={siteMetrics.industry}
            onChange={(e) => updateSiteMetrics({ industry: e.target.value })}
            className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-zinc-900"
          >
            {industryOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-[oklch(0.446_0.03_256.802)] mb-2">
            Conversion Rate (%)
          </label>
          <input
            type="number"
            value={siteMetrics.conversionRate}
            onChange={(e) => updateSiteMetrics({ conversionRate: parseFloat(e.target.value) || 0 })}
            className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-zinc-900"
            step="0.1"
            min="0"
            max="100"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-[oklch(0.446_0.03_256.802)] mb-2">
            Monthly Sessions
          </label>
          <input
            type="text"
            value={formatInputValue(siteMetrics.monthlySessions)}
            onChange={(e) => updateSiteMetrics({ monthlySessions: parseInputValue(e.target.value) })}
            className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-zinc-900"
            placeholder="250,000"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-[oklch(0.446_0.03_256.802)] mb-2">
            Average Order Value ($)
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
            <input
              type="text"
              value={formatInputValue(siteMetrics.averageOrderValue)}
              onChange={(e) => updateSiteMetrics({ averageOrderValue: parseInputValue(e.target.value) })}
              className="w-full pl-8 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-zinc-900"
              placeholder="95"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
          <div className="text-center">
            <p className="text-xs text-[oklch(0.707_0.022_261.325)] mb-1 font-medium">MONTHLY REVENUE</p>
            <p className="text-xl font-bold text-zinc-900">
              {formatCurrency(calculatedMetrics.currentMonthlyRevenue)}
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-[oklch(0.707_0.022_261.325)] mb-1 font-medium">MONTHLY TRANSACTIONS</p>
            <p className="text-xl font-bold text-zinc-900">
              {formatNumber(calculatedMetrics.currentMonthlyTransactions)}
            </p>
          </div>
        </div>
        
        {/* New Monthly Transactions and Orders Added */}
        {calculatedMetrics.newMonthlyTransactions && calculatedMetrics.transactionUplift !== undefined && (
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
            <div className="text-center">
              <p className="text-xs text-[oklch(0.707_0.022_261.325)] mb-1 font-medium">NEW MONTHLY TX</p>
              <p id="stat-new-transactions-mo" className="text-xl font-bold text-teal-500">
                {formatNumber(calculatedMetrics.newMonthlyTransactions)}
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs text-[oklch(0.707_0.022_261.325)] mb-1 font-medium">+ORDERS/MO</p>
              <p id="stat-orders-added-mo" className="text-xl font-bold text-teal-500">
                +{formatNumber(calculatedMetrics.transactionUplift)}
              </p>
            </div>
          </div>
        )}
        
        {/* Benchmark Analysis */}
        <div className="mt-4 rounded-lg border border-gray-200 p-3 bg-gray-50">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs uppercase tracking-wide text-gray-400">
                Benchmark CR ({siteMetrics.industry})
              </span>
              <span id="bench-cr" className="text-sm font-medium text-gray-700">
                {calculatedMetrics.benchmarkMetrics.benchmarkCR.toFixed(1)}%
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-xs uppercase tracking-wide text-gray-400">
                Gap
              </span>
              <span id="bench-gap-pts" className="text-sm font-medium text-gray-700">
                {calculatedMetrics.benchmarkMetrics.gapCRPts > 0 ? '+' : ''}{calculatedMetrics.benchmarkMetrics.gapCRPts.toFixed(1)} pts
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-xs uppercase tracking-wide text-gray-400">
                Value of closing gap
              </span>
              <span id="bench-gap-value" className="text-sm font-medium text-teal-600">
                {formatCurrency(calculatedMetrics.benchmarkMetrics.gapRevenueMo)}/mo
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}