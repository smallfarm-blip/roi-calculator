export interface ThemeConfig {
  primary: string;
  secondary: string;
  accent: string;
  success: string;
  warning: string;
  error: string;
  neutral: {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
  };
  fontFamily: {
    heading: string;
    body: string;
  };
  borderRadius: {
    small: string;
    medium: string;
    large: string;
  };
}

export const defaultTheme: ThemeConfig = {
  primary: '#3B82F6',
  secondary: '#14B8A6',
  accent: '#F97316',
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  neutral: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827'
  },
  fontFamily: {
    heading: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif',
    body: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif'
  },
  borderRadius: {
    small: '0.375rem',
    medium: '0.5rem',
    large: '0.75rem'
  }
};

/**
 * Apply custom theme to CSS variables
 * This allows for dynamic theming without rebuilding CSS
 */
export function applyTheme(theme: Partial<ThemeConfig>) {
  const mergedTheme = { ...defaultTheme, ...theme };
  const root = document.documentElement;
  
  // Apply CSS custom properties
  root.style.setProperty('--color-primary', mergedTheme.primary);
  root.style.setProperty('--color-secondary', mergedTheme.secondary);
  root.style.setProperty('--color-accent', mergedTheme.accent);
  root.style.setProperty('--color-success', mergedTheme.success);
  root.style.setProperty('--color-warning', mergedTheme.warning);
  root.style.setProperty('--color-error', mergedTheme.error);
  
  // Apply neutral colors
  Object.entries(mergedTheme.neutral).forEach(([shade, color]) => {
    root.style.setProperty(`--color-neutral-${shade}`, color);
  });
  
  // Apply typography
  root.style.setProperty('--font-heading', mergedTheme.fontFamily.heading);
  root.style.setProperty('--font-body', mergedTheme.fontFamily.body);
  
  // Apply border radius
  root.style.setProperty('--radius-small', mergedTheme.borderRadius.small);
  root.style.setProperty('--radius-medium', mergedTheme.borderRadius.medium);
  root.style.setProperty('--radius-large', mergedTheme.borderRadius.large);
}

/**
 * Example brand theme configurations
 */
export const brandThemes = {
  corporate: {
    primary: '#1E40AF',
    secondary: '#059669',
    accent: '#DC2626'
  },
  startup: {
    primary: '#7C3AED',
    secondary: '#06B6D4',
    accent: '#F59E0B'
  },
  ecommerce: {
    primary: '#EF4444',
    secondary: '#F97316',
    accent: '#10B981'
  }
};