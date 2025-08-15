import React from 'react';
import { TrendingUp, ShoppingCart, Users } from 'lucide-react';
import { useCalculatorStore } from '../store/calculatorStore';
import { formatCurrency } from '../lib/calculator';

export function MarginalImpact() {
  const { calculatedMetrics } = useCalculatorStore();
  const { marginalImpact } = calculatedMetrics;
  
  const impacts = [
    {
      label: 'Conversion Rate',
      value: marginalImpact.conversion,
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      label: 'Average Order Value',
      value: marginalImpact.aov,
      icon: ShoppingCart,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      label: 'Traffic Growth',
      value: marginalImpact.traffic,
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];
  
  // Find the highest impact metric
  const maxImpact = Math.max(marginalImpact.conversion, marginalImpact.aov, marginalImpact.traffic);
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Marginal Impact Analysis</h3>
      <p className="text-sm text-gray-600 mb-6">
        Individual contribution of each optimization lever to revenue growth
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {impacts.map((impact) => {
          const isHighest = impact.value === maxImpact && maxImpact > 0;
          const Icon = impact.icon;
          
          return (
            <div
              key={impact.label}
              className={`p-4 rounded-lg border-2 transition-all ${
                isHighest 
                  ? 'border-yellow-300 bg-yellow-50' 
                  : `border-gray-200 ${impact.bgColor}`
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <Icon className={`w-5 h-5 ${impact.color}`} />
                {isHighest && (
                  <span className="text-xs font-medium bg-yellow-200 text-yellow-800 px-2 py-1 rounded-full">
                    Highest Impact
                  </span>
                )}
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-900">{impact.label}</p>
                <p className={`text-lg font-bold ${impact.color}`}>
                  {formatCurrency(impact.value)}
                </p>
                <p className="text-xs text-gray-500">Monthly revenue impact</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}