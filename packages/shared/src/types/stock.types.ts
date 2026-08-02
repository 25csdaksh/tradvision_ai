export interface StockQuote {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  high: number;
  low: number;
  open: number;
  previousClose: number;
  volume: number;
  marketCap?: number;
  peRatio?: number;
  updatedAt: string;
}

export interface CandlestickData {
  time: string | number; // YYYY-MM-DD or UNIX timestamp
  open: number;
  high: number;
  low: number;
  close: number;
  volume?: number;
}
