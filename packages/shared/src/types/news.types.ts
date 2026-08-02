import { SentimentRating } from './ai.types.js';

export interface MarketNewsItem {
  id: string;
  title: string;
  source: string;
  url: string;
  publishedAt: string;
  summary: string;
  relatedSymbols: string[];
  sentiment: SentimentRating;
}
