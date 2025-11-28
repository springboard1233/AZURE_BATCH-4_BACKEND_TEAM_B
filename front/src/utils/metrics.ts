export type NumericLike = number | string | null | undefined;

export const toNumber = (value: NumericLike, fallback = 0): number => {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value;
  }
  if (typeof value === 'string') {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : fallback;
  }
  return fallback;
};

export const formatPercent = (value: NumericLike, digits = 1): string => {
  if (value == null) return '—';
  const numericValue = toNumber(value);
  return Number.isFinite(numericValue) ? `${numericValue.toFixed(digits)}%` : '—';
};

export const mean = (values: NumericLike[], fallback = 0): number => {
  const numeric = values
    .map((value) => toNumber(value, NaN))
    .filter((value) => Number.isFinite(value)) as number[];

  if (!numeric.length) return fallback;
  const total = numeric.reduce((sum, value) => sum + value, 0);
  return total / numeric.length;
};

export const standardDeviation = (values: NumericLike[]): number => {
  const numeric = values
    .map((value) => toNumber(value, NaN))
    .filter((value) => Number.isFinite(value)) as number[];

  if (numeric.length <= 1) return 0;
  const avg = mean(numeric);
  const variance =
    numeric.reduce((sum, value) => sum + Math.pow(value - avg, 2), 0) /
    (numeric.length - 1);
  return Math.sqrt(variance);
};

