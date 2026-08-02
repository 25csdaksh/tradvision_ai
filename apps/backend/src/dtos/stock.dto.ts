import { IStockSummary, ICandlestickBar } from '../types/stock.types.js';

export interface CreateStockDTO {
  symbol: string;
  name: string;
  exchange: string;
  sector?: string;
  industry?: string;
  country?: string;
  currency?: string;
}

export interface StockDetailResponseDTO {
  stock: IStockSummary;
  recentPrices: ICandlestickBar[];
  metrics: {
    peRatio?: number;
    marketCap?: string;
    fiftyTwoWeekHigh?: number;
    fiftyTwoWeekLow?: number;
  };
}
