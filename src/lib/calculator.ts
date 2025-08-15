import type { SiteMetrics, UpliftParams, CalculatedMetrics, ROIAnalysis, ROIProjection } from '../types/calculator';
import type { Benchmarks } from '../types/calculator';

export const BENCHMARKS: Record<string, Benchmarks> = {
  retail: { crPct: 2.8, aov: 80 },
  fashion: { crPct: 2.2, aov: 75 },
  luxury: { crPct: 1.6, aov: 350 },
};

export const SCENARIO_PRESETS = {
  conservative: { crGrowthPct: 5, aovIncreasePct: 1 },
  likely: { crGrowthPct: 10, aovIncreasePct: 3 },
  aggressive: { crGrowthPct: 20, aovIncreasePct: 5 },
};

/**
 * Calculate current site performance metrics
 * Formula: Revenue = Sessions × Conversion Rate × AOV
 */
export function calculateCurrentMetrics(metrics: SiteMetrics): CalculatedMetrics {
  const currentMonthlyTransactions = Math.round(metrics.monthlySessions * (metrics.conversionRate / 100));
  const currentMonthlyRevenue = currentMonthlyTransactions * metrics.averageOrderValue;
  const revenuePerVisitor = currentMonthlyRevenue / metrics.monthlySessions;

  // Calculate benchmark metrics
  const benchmark = BENCHMARKS[metrics.industry] || BENCHMARKS.retail;
  const crBench = benchmark.crPct / 100;
  const revAtBenchmarkMo = crBench * metrics.monthlySessions * metrics.averageOrderValue;
  const gapCRPts = benchmark.crPct - metrics.conversionRate;
  const gapRevenueMo = Math.max(0, revAtBenchmarkMo - currentMonthlyRevenue);

  return {
    currentMonthlyRevenue,
    currentMonthlyTransactions,
    revenuePerVisitor,
    potentialMonthlyRevenue: 0,
    potentialRevenueIncrease: 0,
    potentialProfit: 0,
    benchmarkMetrics: {
      benchmarkCR: benchmark.crPct,
      gapCRPts,
      gapRevenueMo,
      revAtBenchmarkMo
    },
    costOfInactionYr: 0,
    marginalImpact: {
      conversion: 0,
      aov: 0,
      traffic: 0
    }
  };
}

/**
 * Calculate potential improvements and uplift scenarios
 * Supports both percentage and absolute value overrides
 */
export function calculateUplift(
  metrics: SiteMetrics, 
  uplift: UpliftParams
): CalculatedMetrics {
  const current = calculateCurrentMetrics(metrics);
  
  // Calculate new metrics using relative multipliers
  const crBase = metrics.conversionRate / 100;
  const aovBase = metrics.averageOrderValue;
  const sessions = metrics.monthlySessions;
  const crGrowth = uplift.conversionRateGrowth / 100;
  const aovGrowth = uplift.aovIncrease / 100;
  
  const crNew = crBase * (1 + crGrowth);
  const aovNew = aovBase * (1 + aovGrowth);
  
  // Current calculations
  const revCurrentMo = crBase * sessions * aovBase;
  const txCurrentMo = Math.round(crBase * sessions);
  
  // New calculations
  const revNewMo = crNew * sessions * aovNew;
  const txNewMo = Math.round(crNew * sessions);
  
  // Uplifts
  const revUpliftMo = revNewMo - revCurrentMo;
  const txUpliftMo = txNewMo - txCurrentMo;
  
  const potentialMonthlyRevenue = revNewMo;
  const potentialRevenueIncrease = revUpliftMo;
  const potentialProfit = potentialRevenueIncrease * (metrics.grossMargin / 100);
  
  // Store additional metrics for UI
  const additionalMetrics = {
    newConversionRate: crNew * 100,
    newAOV: aovNew,
    newMonthlyTransactions: txNewMo,
    transactionUplift: txUpliftMo,
    revenueIncreasePct: revCurrentMo > 0 ? (revUpliftMo / revCurrentMo) * 100 : 0
  };
  
  // Calculate marginal impact of each metric
  const conversionImpact = calculateMarginalImpact('conversion', metrics, uplift);
  const aovImpact = calculateMarginalImpact('aov', metrics, uplift);
  const trafficImpact = calculateMarginalImpact('traffic', metrics, uplift);

  // Calculate cost of inaction
  const costOfInactionYr = Math.max(0, potentialRevenueIncrease) * 12;
  
  return {
    ...current,
    potentialMonthlyRevenue,
    potentialRevenueIncrease,
    potentialProfit,
    costOfInactionYr,
    ...additionalMetrics,
    marginalImpact: {
      conversion: conversionImpact,
      aov: aovImpact,
      traffic: trafficImpact
    }
  };
}

/**
 * Calculate marginal impact of individual metrics
 * Isolates the effect of changing one metric while keeping others constant
 */
function calculateMarginalImpact(
  metric: 'conversion' | 'aov' | 'traffic',
  baseMetrics: SiteMetrics,
  uplift: UpliftParams
): number {
  const baseline = calculateCurrentMetrics(baseMetrics).currentMonthlyRevenue;
  
  // Calculate isolated impact directly without calling calculateUplift to avoid recursion
  let newConversionRate = baseMetrics.conversionRate;
  let newAOV = baseMetrics.averageOrderValue;
  let newSessions = baseMetrics.monthlySessions;
  
  // Apply only the specific metric change
  if (metric === 'conversion') {
    newConversionRate = baseMetrics.conversionRate * (1 + uplift.conversionRateGrowth / 100);
  } else if (metric === 'aov') {
    newAOV = baseMetrics.averageOrderValue * (1 + uplift.aovIncrease / 100);
  } else if (metric === 'traffic') {
    newSessions = baseMetrics.monthlySessions * (1 + (uplift.trafficIncrease || 0) / 100);
  }
  
  const isolatedTransactions = Math.round(newSessions * (newConversionRate / 100));
  const isolatedRevenue = isolatedTransactions * newAOV;
  
  return isolatedRevenue - baseline;
}

/**
 * Calculate ROI projections over multiple time periods
 * Includes compounding effects and payback analysis
 */
export function calculateROI(
  metrics: SiteMetrics,
  uplift: UpliftParams,
  investment: number
): ROIAnalysis {
  const upliftMetrics = calculateUplift(metrics, uplift);
  const monthlyProfitIncrease = upliftMetrics.potentialProfit;
  
  const periods = [
    { period: '6 Months', months: 6 },
    { period: '1 Year', months: 12 },
    { period: '3 Years', months: 36 }
  ];
  
  const projections: ROIProjection[] = periods.map(({ period, months }) => {
    // Calculate cumulative revenue growth over time period
    const revenueGrowth = upliftMetrics.potentialRevenueIncrease * months;
    
    // Calculate total profit over the period (revenue increase * gross margin)
    const totalProfit = revenueGrowth * (metrics.grossMargin / 100);
    
    // ROI ratio = total profit / investment
    const roiRatio = investment > 0 ? totalProfit / investment : 0;
    const paybackMonths = monthlyProfitIncrease > 0 ? investment / monthlyProfitIncrease : Infinity;
    
    return {
      period,
      months,
      roiRatio,
      revenueGrowth,
      totalProfit,
      paybackMonths
    };
  });
  
  const breakEvenPoint = monthlyProfitIncrease > 0 ? investment / monthlyProfitIncrease : Infinity;
  const totalLifetimeValue = projections[2]?.totalProfit || 0; // 3-year LTV
  
  return {
    investment,
    projections,
    breakEvenPoint,
    totalLifetimeValue
  };
}

/**
 * Format currency values for display
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
}

/**
 * Format percentage values for display
 */
export function formatPercentage(value: number, decimals: number = 1): string {
  return `${value.toFixed(decimals)}%`;
}

/**
 * Format large numbers with commas
 */
export function formatNumber(value: number): string {
  return new Intl.NumberFormat('en-US').format(Math.round(value));
}

/**
 * Validate input metrics to prevent invalid calculations
 */
export function validateMetrics(metrics: SiteMetrics): string[] {
  const errors: string[] = [];
  
  if (metrics.conversionRate <= 0 || metrics.conversionRate > 100) {
    errors.push('Conversion rate must be between 0.01% and 100%');
  }
  
  if (metrics.monthlySessions <= 0) {
    errors.push('Monthly sessions must be greater than 0');
  }
  
  if (metrics.averageOrderValue <= 0) {
    errors.push('Average order value must be greater than 0');
  }
  
  if (metrics.grossMargin < 0 || metrics.grossMargin > 100) {
    errors.push('Gross margin must be between 0% and 100%');
  }
  
  return errors;
}