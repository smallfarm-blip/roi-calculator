import {
  calculateCurrentMetrics,
  calculateUplift,
  calculateROI,
  validateMetrics,
  formatCurrency,
  formatPercentage
} from '../lib/calculator';
import type { SiteMetrics, UpliftParams } from '../types/calculator';

describe('Calculator Functions', () => {
  const baseSiteMetrics: SiteMetrics = {
    conversionRate: 2.0,
    monthlySessions: 100000,
    averageOrderValue: 100,
    grossMargin: 25
  };

  describe('calculateCurrentMetrics', () => {
    it('should calculate current metrics correctly', () => {
      const result = calculateCurrentMetrics(baseSiteMetrics);
      
      expect(result.currentMonthlyTransactions).toBe(2000);
      expect(result.currentMonthlyRevenue).toBe(200000);
      expect(result.revenuePerVisitor).toBe(2.0);
    });
  });

  describe('calculateUplift', () => {
    it('should handle no uplift scenario', () => {
      const noUplift: UpliftParams = {
        conversionRateGrowth: 0,
        aovIncrease: 0
      };
      
      const result = calculateUplift(baseSiteMetrics, noUplift);
      
      expect(result.potentialRevenueIncrease).toBe(0);
      expect(result.potentialProfit).toBe(0);
    });

    it('should calculate conversion rate uplift correctly', () => {
      const uplift: UpliftParams = {
        conversionRateGrowth: 10, // 10% increase
        aovIncrease: 0
      };
      
      const result = calculateUplift(baseSiteMetrics, uplift);
      
      // 10% increase in CR should result in 10% increase in revenue
      expect(result.potentialRevenueIncrease).toBe(20000);
      expect(result.potentialProfit).toBe(5000); // 25% margin
    });

    it('should calculate AOV uplift correctly', () => {
      const uplift: UpliftParams = {
        conversionRateGrowth: 0,
        aovIncrease: 20 // 20% increase
      };
      
      const result = calculateUplift(baseSiteMetrics, uplift);
      
      // 20% increase in AOV should result in 20% increase in revenue
      expect(result.potentialRevenueIncrease).toBe(40000);
      expect(result.potentialProfit).toBe(10000);
    });

    it('should handle combined uplifts', () => {
      const uplift: UpliftParams = {
        conversionRateGrowth: 10,
        aovIncrease: 10,
        trafficIncrease: 10
      };
      
      const result = calculateUplift(baseSiteMetrics, uplift);
      
      // Should compound: 1.1 * 1.1 * 1.1 = 1.331 (33.1% increase)
      expect(result.potentialRevenueIncrease).toBeCloseTo(66200, 0);
    });

    it('should handle absolute overrides', () => {
      const uplift: UpliftParams = {
        conversionRateGrowth: 0,
        aovIncrease: 0,
        additionalTransactions: 500,
        additionalAOV: 10
      };
      
      const result = calculateUplift(baseSiteMetrics, uplift);
      
      // 500 additional transactions at $110 AOV = $55,000
      // Plus existing 2000 transactions get $10 AOV boost = $20,000
      // Total increase = $75,000
      expect(result.potentialRevenueIncrease).toBe(75000);
    });
  });

  describe('calculateROI', () => {
    it('should calculate ROI projections correctly', () => {
      const uplift: UpliftParams = {
        conversionRateGrowth: 10,
        aovIncrease: 0
      };
      
      const result = calculateROI(baseSiteMetrics, uplift, 50000);
      
      expect(result.investment).toBe(50000);
      expect(result.projections).toHaveLength(3);
      expect(result.projections[0].period).toBe('6 Months');
      expect(result.projections[1].period).toBe('1 Year');
      expect(result.projections[2].period).toBe('3 Years');
      
      // Check that ROI improves over time due to compounding
      expect(result.projections[2].roiRatio).toBeGreaterThan(result.projections[0].roiRatio);
    });

    it('should handle zero investment', () => {
      const uplift: UpliftParams = {
        conversionRateGrowth: 10,
        aovIncrease: 0
      };
      
      const result = calculateROI(baseSiteMetrics, uplift, 0);
      
      expect(result.projections[0].roiRatio).toBe(0);
    });
  });

  describe('validateMetrics', () => {
    it('should pass validation for valid metrics', () => {
      const errors = validateMetrics(baseSiteMetrics);
      expect(errors).toHaveLength(0);
    });

    it('should fail validation for invalid conversion rate', () => {
      const invalidMetrics = { ...baseSiteMetrics, conversionRate: -1 };
      const errors = validateMetrics(invalidMetrics);
      expect(errors).toContain('Conversion rate must be between 0.01% and 100%');
    });

    it('should fail validation for zero sessions', () => {
      const invalidMetrics = { ...baseSiteMetrics, monthlySessions: 0 };
      const errors = validateMetrics(invalidMetrics);
      expect(errors).toContain('Monthly sessions must be greater than 0');
    });

    it('should fail validation for negative AOV', () => {
      const invalidMetrics = { ...baseSiteMetrics, averageOrderValue: -10 };
      const errors = validateMetrics(invalidMetrics);
      expect(errors).toContain('Average order value must be greater than 0');
    });
  });

  describe('formatCurrency', () => {
    it('should format currency correctly', () => {
      expect(formatCurrency(1234.56)).toBe('$1,235');
      expect(formatCurrency(0)).toBe('$0');
      expect(formatCurrency(1000000)).toBe('$1,000,000');
    });
  });

  describe('formatPercentage', () => {
    it('should format percentage correctly', () => {
      expect(formatPercentage(12.345)).toBe('12.3%');
      expect(formatPercentage(0)).toBe('0.0%');
      expect(formatPercentage(100, 0)).toBe('100%');
    });
  });

  describe('edge cases', () => {
    it('should handle extreme values', () => {
      const extremeMetrics: SiteMetrics = {
        conversionRate: 50,
        monthlySessions: 10000000,
        averageOrderValue: 10000,
        grossMargin: 90
      };
      
      const result = calculateCurrentMetrics(extremeMetrics);
      expect(result.currentMonthlyRevenue).toBe(50000000000);
    });

    it('should handle very small values', () => {
      const smallMetrics: SiteMetrics = {
        conversionRate: 0.01,
        monthlySessions: 100,
        averageOrderValue: 1,
        grossMargin: 1
      };
      
      const result = calculateCurrentMetrics(smallMetrics);
      expect(result.currentMonthlyTransactions).toBe(0); // Rounds to 0
      expect(result.currentMonthlyRevenue).toBe(0);
    });
  });
});