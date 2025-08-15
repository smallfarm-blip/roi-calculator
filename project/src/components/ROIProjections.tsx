import React from 'react';
import { useCalculatorStore } from '../store/calculatorStore';
import { formatCurrency } from '../lib/calculator';

export function ROIProjections() {
  const { roiAnalysis } = useCalculatorStore();

  return (
    <section className="bg-teal-500 py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Your ROI Projections</h2>
          <p className="text-[oklab(0.999994_0.0000455677_0.0000200868_/_0.8)]">See how your investment grows over time</p>
        </div>
        
        <div className="bg-black rounded-lg p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {roiAnalysis.projections.map((projection, index) => (
              <div
                key={projection.period}
                className={`rounded-lg p-6 text-center ${
                  index === 1 
                    ? 'bg-[oklch(0.21_0.034_264.665)] border-2 border-teal-500' 
                    : 'bg-stone-900'
                }`}
              >
                <div className="mb-4">
                  <p className="text-[oklch(0.872_0.01_258.338)] text-sm mb-1 font-medium">
                    {projection.period.toUpperCase()}
                  </p>
                  <p className="text-[oklch(0.707_0.022_261.325)] text-xs">ROI RATIO</p>
                </div>
                
                <div className="mb-6">
                  <p className={`text-4xl font-bold ${
                    index === 1 ? 'text-teal-500' : 'text-white'
                  }`}>
                    {projection.roiRatio.toFixed(1)}x
                  </p>
                </div>
                
                <div>
                  <p className="text-[oklch(0.707_0.022_261.325)] text-xs mb-1">Revenue Growth</p>
                  <p className="text-white font-semibold">
                    {formatCurrency(projection.revenueGrowth)}
                  </p>
                </div>
                
                {index === 1 && (
                  <div className="mt-4">
                    <span className="bg-teal-500 text-black text-xs font-bold px-3 py-1 rounded-full">
                      RECOMMENDED
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}