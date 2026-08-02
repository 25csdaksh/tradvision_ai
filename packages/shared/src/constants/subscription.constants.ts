import { SubscriptionTier } from '../types/user.types.js';

export const TIER_LIMITS = {
  [SubscriptionTier.FREE]: {
    maxWatchlists: 2,
    maxAlerts: 5,
    aiAnalysisPerDay: 3,
    backtestingHistoryYears: 1
  },
  [SubscriptionTier.PRO]: {
    maxWatchlists: 10,
    maxAlerts: 50,
    aiAnalysisPerDay: 50,
    backtestingHistoryYears: 5
  },
  [SubscriptionTier.ENTERPRISE]: {
    maxWatchlists: 100,
    maxAlerts: 500,
    aiAnalysisPerDay: 1000,
    backtestingHistoryYears: 20
  }
};
