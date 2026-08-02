import { StockQuote } from './stock.types.js';

export enum SocketEvent {
  SUBSCRIBE_TICKER = 'subscribe_ticker',
  UNSUBSCRIBE_TICKER = 'unsubscribe_ticker',
  STOCK_QUOTE_UPDATE = 'stock_quote_update',
  ALERT_TRIGGERED = 'alert_triggered',
  PORTFOLIO_PNL_UPDATE = 'portfolio_pnl_update'
}

export interface StockQuoteUpdatePayload {
  symbol: string;
  quote: StockQuote;
}

export interface AlertTriggeredPayload {
  alertId: string;
  symbol: string;
  condition: string;
  triggeredValue: number;
  message: string;
  triggeredAt: string;
}
