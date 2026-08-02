export enum SentimentRating {
  BULLISH = 'BULLISH',
  NEUTRAL = 'NEUTRAL',
  BEARISH = 'BEARISH'
}

export interface AIAnalysisReport {
  symbol: string;
  sentiment: SentimentRating;
  confidenceScore: number; // 0 to 100
  summary: string;
  keyDrivers: string[];
  riskFactors: string[];
  suggestedAction: 'BUY' | 'HOLD' | 'SELL';
  generatedAt: string;
}
