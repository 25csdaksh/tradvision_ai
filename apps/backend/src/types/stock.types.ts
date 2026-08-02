export interface IStockSummary {
  id: string;
  symbol: string;
  name: string;
  exchange: string;
  sector?: string | null;
  industry?: string | null;
  country: string;
  currency: string;
  isActive: boolean;
  latestPrice?: number;
  changePercent?: number;
}

export interface ICandlestickBar {
  timestamp: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface IStockQueryFilter {
  query?: string;
  sector?: string;
  exchange?: string;
  page?: number;
  limit?: number;
}
