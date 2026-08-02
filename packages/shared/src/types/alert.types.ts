export enum AlertCondition {
  PRICE_ABOVE = 'PRICE_ABOVE',
  PRICE_BELOW = 'PRICE_BELOW',
  PERCENT_CHANGE_ABOVE = 'PERCENT_CHANGE_ABOVE',
  PERCENT_CHANGE_BELOW = 'PERCENT_CHANGE_BELOW',
  RSI_OVERBOUGHT = 'RSI_OVERBOUGHT',
  RSI_OVERSOLD = 'RSI_OVERSOLD'
}

export interface StockAlertRule {
  id: string;
  userId: string;
  symbol: string;
  condition: AlertCondition;
  targetValue: number;
  isActive: boolean;
  lastTriggeredAt?: string;
  createdAt: string;
}
