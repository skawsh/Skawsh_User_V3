
/**
 * Format decimals to show only one digit after decimal point
 */
export const formatDecimal = (value: number): number => {
  return Math.round(value * 10) / 10;
};
