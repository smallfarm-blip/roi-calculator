export interface SiteMetrics {
  conversionRate: number; // %
  monthlySessions: number;
  averageOrderValue: number; // $
  grossMargin: number; // %
  costPerClick?: number; // $ optional
  industry: string;
}

export interface UpliftParams {
  conversionRateGrowth: number; // %
  aovIncrease: number; // %
  additionalTransactions?: number; // absolute
  additionalAOV?: number; // $ absolute
  trafficIncrease?: number; // %
}

export interface CalculatedMetrics {
  currentMonthlyRevenue: number;
  currentMonthlyTransactions: number;
  revenuePerVisitor: number;
  potentialMonthlyRevenue: number;
  potentialRevenueIncrease: number;
  potentialProfit: number;
  newConversionRate?: number;
  newAOV?: number;
  newMonthlyTransactions?: number;
  transactionUplift?: number;
  revenueIncreasePct?: number;
  marginalImpact: {
    conversion: number;
    aov: number;
    traffic: number;
  };
  benchmarkMetrics: {
    benchmarkCR: number;
    gapCRPts: number;
    gapRevenueMo: number;
    revAtBenchmarkMo: number;
  };
  costOfInactionYr: number;
}

export interface ROIProjection {
  period: string;
  months: number;
  roiRatio: number;
  revenueGrowth: number;
  totalProfit: number;
  paybackMonths: number;
}

export interface ROIAnalysis {
  investment: number;
  projections: ROIProjection[];
  breakEvenPoint: number;
  totalLifetimeValue: number;
}

export interface Benchmarks {
  crPct: number;
  aov: number;
}

export interface ScenarioPreset {
  crGrowthPct: number;
  aovIncreasePct: number;
}