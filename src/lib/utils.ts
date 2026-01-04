import { type ClassValue, clsx } from 'clsx';

// Utility for merging class names
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

// Format currency
export function formatCurrency(amount: number, currency: string = 'ZAR'): string {
  return new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}

// Get current week number (1-52)
export function getCurrentWeek(): number {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 1);
  const diff = now.getTime() - start.getTime();
  const oneWeek = 1000 * 60 * 60 * 24 * 7;
  return Math.ceil(diff / oneWeek);
}

// Get sprint week (1-12 for 90 days)
export function getSprintWeek(startDate: Date): number {
  const now = new Date();
  const diff = now.getTime() - startDate.getTime();
  const oneWeek = 1000 * 60 * 60 * 24 * 7;
  const week = Math.ceil(diff / oneWeek);
  return Math.min(Math.max(week, 1), 12);
}

// Calculate percentage
export function calculatePercentage(value: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((value / total) * 100);
}

// Generate UUID (simple version)
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// Format date
export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-ZA', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

// Get month name
export function getMonthName(date: Date = new Date()): string {
  return date.toLocaleDateString('en-ZA', { month: 'long', year: 'numeric' });
}

// Calculate tithe (10% of amount)
export function calculateTithe(amount: number): number {
  return amount * 0.1;
}

// Check if diversification is healthy (no stream should be >50%)
export function checkDiversification(breakdown: Record<string, number>): {
  isHealthy: boolean;
  warnings: string[];
} {
  const warnings: string[] = [];
  const total = Object.values(breakdown).reduce((sum, val) => sum + val, 0);

  Object.entries(breakdown).forEach(([stream, amount]) => {
    const percentage = (amount / total) * 100;
    if (percentage > 50) {
      warnings.push(`${stream} represents ${percentage.toFixed(0)}% of revenue - consider diversifying`);
    }
  });

  return {
    isHealthy: warnings.length === 0,
    warnings,
  };
}
