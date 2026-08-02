export interface BacktestConfig {
  symbol: string;
  startDate: string;
  endDate: string;
  initialCapital: number;
  strategyName: string;
  parameters: Record<string, any>;
}

export interface BacktestResult {
  id: string;
  config: BacktestConfig;
  totalReturnPercent: number;
  annualizedReturnPercent: number;
  sharpeRatio: number;
  maxDrawdownPercent: number;
  winRatePercent: number;
  totalTrades: number;
  equityCurve: { date: string; equity: number }[];
  executedAt: string;
}
