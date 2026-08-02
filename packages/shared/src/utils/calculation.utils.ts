export function calculatePercentageChange(current: number, previous: number): number {
  if (previous === 0) return 0;
  return Number((((current - previous) / previous) * 100).toFixed(2));
}

export function calculateSharpeRatio(returns: number[], riskFreeRate = 0.02): number {
  if (returns.length === 0) return 0;
  const avgReturn = returns.reduce((sum, r) => sum + r, 0) / returns.length;
  const variance = returns.reduce((sum, r) => sum + Math.pow(r - avgReturn, 2), 0) / returns.length;
  const stdDev = Math.sqrt(variance);
  if (stdDev === 0) return 0;
  return Number(((avgReturn - riskFreeRate) / stdDev).toFixed(2));
}
