export interface PortfolioPosition {
  id: string;
  portfolioId: string;
  symbol: string;
  shares: number;
  averageBuyPrice: number;
  currentPrice: number;
  totalCost: number;
  currentValue: number;
  unrealizedPnL: number;
  unrealizedPnLPercent: number;
}

export interface PortfolioSummary {
  id: string;
  name: string;
  totalValue: number;
  totalCost: number;
  totalPnL: number;
  totalPnLPercent: number;
  positions: PortfolioPosition[];
}
