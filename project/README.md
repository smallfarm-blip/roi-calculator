# E-commerce ROI & Uplift Calculator

A comprehensive web-based calculator for analyzing potential revenue increases and return on investment from e-commerce optimization initiatives. Built with React, TypeScript, and Tailwind CSS.

## Features

### Core Functionality
- **Two-column input layout** mirroring industry-standard calculators
- **Real-time calculations** with instant visual feedback
- **Flexible input methods** supporting both percentage and absolute value uplifts
- **Comprehensive ROI analysis** with multi-year projections and compounding effects
- **Marginal impact analysis** showing individual contribution of each optimization lever

### Advanced Capabilities
- **Interactive sliders and number inputs** for conversion rate, AOV, and traffic optimization
- **Dynamic ROI table** showing 6-month, 1-year, and 3-year projections
- **Share functionality** to copy key metrics to clipboard
- **Responsive design** optimized for desktop and mobile
- **Modular theming system** for brand customization
- **Comprehensive validation** and error handling

## Business Logic & Formulas

### Core Calculations

**Current Metrics:**
```
Monthly Transactions = Monthly Sessions × (Conversion Rate / 100)
Monthly Revenue = Monthly Transactions × Average Order Value
Revenue per Visitor = Monthly Revenue / Monthly Sessions
```

**Uplift Calculations:**
```
New Conversion Rate = Base CR × (1 + CR Growth % / 100)
New AOV = Base AOV × (1 + AOV Increase % / 100)
New Sessions = Base Sessions × (1 + Traffic Increase % / 100)

Potential Revenue = New Sessions × New CR × New AOV
Revenue Increase = Potential Revenue - Current Revenue
Profit = Revenue Increase × (Gross Margin / 100)
```

**ROI Projections with Compounding:**
```
Monthly Profit = Revenue Increase × Gross Margin
Compounding Factor = (1.02)^(months-1)  // 2% monthly improvement retention
Total Profit = Monthly Profit × Months × Compounding Factor
ROI Ratio = Total Profit / Investment
Payback Period = Investment / Monthly Profit
```

### Key Assumptions
- **Compounding Effect**: 2% monthly improvement retention over time
- **Gross Margin**: Applied to calculate net profit from revenue increases
- **Marginal Impact**: Isolated effect of individual optimization levers
- **Time Horizons**: 6 months, 1 year, and 3 years for strategic planning

## Technical Architecture

### File Structure
```
src/
├── components/           # React components
│   ├── CurrentMetrics.tsx
│   ├── PotentialImprovement.tsx
│   ├── ROITable.tsx
│   ├── MarginalImpact.tsx
│   ├── InputCard.tsx
│   └── ActionButtons.tsx
├── lib/                 # Business logic
│   ├── calculator.ts    # Pure calculation functions
│   └── theming.ts      # Theme configuration
├── store/              # State management
│   └── calculatorStore.ts
├── types/              # TypeScript definitions
│   └── calculator.ts
└── __tests__/          # Test suites
    └── calculator.test.ts
```

### State Management
Uses Zustand for lightweight, performant state management:
- Centralized calculation state
- Reactive updates across components
- Optimized re-renders

### Testing
Comprehensive test coverage including:
- Unit tests for all calculation functions
- Edge case validation (extreme values, zero scenarios)
- Input validation testing
- Formatting function verification

## Usage

### Basic Setup
```bash
npm install
npm run dev
```

### Running Tests
```bash
npm run test
```

### Building for Production
```bash
npm run build
```

### Customization

#### Brand Theming
```typescript
import { applyTheme, brandThemes } from './src/lib/theming';

// Apply predefined theme
applyTheme(brandThemes.corporate);

// Or custom theme
applyTheme({
  primary: '#Your-Brand-Color',
  fontFamily: {
    heading: 'Your-Custom-Font'
  }
});
```

#### Embedding
The calculator can be embedded as an iframe or React component:

```html
<!-- iframe embedding -->
<iframe src="/calculator" width="100%" height="800px"></iframe>
```

```tsx
// React component
import Calculator from './Calculator';
<Calculator theme={customTheme} />
```

## Configuration Options

### Default Ranges
- **Conversion Rate Growth**: 0-50%
- **AOV Increase**: 0-50%
- **Traffic Increase**: 0-100%
- **Investment**: $0-$1,000,000+

### Responsive Breakpoints
- **Desktop**: ≥1024px (side-by-side layout)
- **Tablet**: 768-1024px (adaptive layout)
- **Mobile**: <768px (stacked layout)

## Performance Optimizations

- **Pure calculation functions** for predictable performance
- **Memoized components** to prevent unnecessary re-renders
- **Optimized bundle size** with tree-shaking
- **Lazy loading** for non-critical components

## Accessibility Features

- **Keyboard navigation** support
- **Screen reader** compatible
- **High contrast** color schemes
- **Focus management** for interactive elements

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Run tests: `npm test`
4. Commit changes: `git commit -m 'Add amazing feature'`
5. Push to branch: `git push origin feature/amazing-feature`
6. Open a Pull Request

## License

MIT License - see LICENSE file for details.

## Support

For questions or support, please open an issue on the GitHub repository.