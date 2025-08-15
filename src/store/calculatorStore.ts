import { create } from 'zustand';
import type { SiteMetrics, UpliftParams, CalculatedMetrics, ROIAnalysis } from '../types/calculator';
import { calculateUplift, calculateROI } from '../lib/calculator';

interface CalculatorState {
  // Input state
  siteMetrics: SiteMetrics;
  upliftParams: UpliftParams;
  investment: number;
  
  // Calculated state
  calculatedMetrics: CalculatedMetrics;
  roiAnalysis: ROIAnalysis;
  
  // Actions
  updateSiteMetrics: (metrics: Partial<SiteMetrics>) => void;
  updateUpliftParams: (params: Partial<UpliftParams>) => void;
  updateInvestment: (investment: number) => void;
  recalculate: () => void;
  reset: () => void;
  shareResults: () => void;
}

const initialSiteMetrics: SiteMetrics = {
  conversionRate: 2.0,
  monthlySessions: 250000,
  averageOrderValue: 95,
  grossMargin: 25,
  costPerClick: 2.50,
  industry: 'retail'
};

const initialUpliftParams: UpliftParams = {
  conversionRateGrowth: 5,
  aovIncrease: 2,
  additionalTransactions: 0,
  additionalAOV: 0,
  trafficIncrease: 0
};

export const useCalculatorStore = create<CalculatorState>((set, get) => ({
  siteMetrics: initialSiteMetrics,
  upliftParams: initialUpliftParams,
  investment: 50000,
  calculatedMetrics: calculateUplift(initialSiteMetrics, initialUpliftParams),
  roiAnalysis: calculateROI(initialSiteMetrics, initialUpliftParams, 50000),
  
  updateSiteMetrics: (metrics) => {
    const newMetrics = { ...get().siteMetrics, ...metrics };
    set({ siteMetrics: newMetrics });
    get().recalculate();
  },
  
  updateUpliftParams: (params) => {
    const newParams = { ...get().upliftParams, ...params };
    set({ upliftParams: newParams });
    get().recalculate();
  },
  
  updateInvestment: (investment) => {
    set({ investment });
    get().recalculate();
  },
  
  recalculate: () => {
    const { siteMetrics, upliftParams, investment } = get();
    const calculatedMetrics = calculateUplift(siteMetrics, upliftParams);
    const roiAnalysis = calculateROI(siteMetrics, upliftParams, investment);
    set({ calculatedMetrics, roiAnalysis });
  },
  
  reset: () => {
    set({
      siteMetrics: initialSiteMetrics,
      upliftParams: initialUpliftParams,
      investment: 50000
    });
    get().recalculate();
  },
  
  shareResults: () => {
    const { calculatedMetrics, roiAnalysis } = get();
    const summary = `
E-commerce ROI Calculator Results:
• Current Monthly Revenue: $${calculatedMetrics.currentMonthlyRevenue.toLocaleString()}
• Potential Revenue Increase: +$${calculatedMetrics.potentialRevenueIncrease.toLocaleString()}
• Investment: $${roiAnalysis.investment.toLocaleString()}
• 1-Year ROI: ${(roiAnalysis.projections[1]?.roiRatio || 0).toFixed(1)}:1
• Payback Period: ${(roiAnalysis.breakEvenPoint || 0).toFixed(1)} months
    `.trim();
    
    navigator.clipboard.writeText(summary);
  }
}));