# TradeVision AI - Enterprise Database Architecture Specification

Refer to the master database blueprint artifact for complete DBML ER diagrams, table definitions, indexing strategies, Supabase RLS policies, audit triggers, and scaling blueprints.

- Master Architecture Blueprint: [tradevision_ai_database_architecture.md](file:///C:/Users/daksh/.gemini/antigravity-ide/brain/59695fe6-0a79-40b5-9335-a1fdd5f10bd9/tradevision_ai_database_architecture.md)
- Prisma ORM Schema File: [schema.prisma](file:///e:/tradevision_ai/apps/backend/prisma/schema.prisma)

## Summary of 29 Tables
1. `users` - Core identity & role management
2. `profiles` - Personal metadata & settings
3. `user_sessions` - Session tokens & IP audit
4. `api_keys` - Enterprise developer API keys
5. `stocks` - Master ticker directory
6. `stock_prices` - Time-series OHLCV history
7. `technical_indicators` - Precomputed technical overlay math (RSI, MACD, Moving Averages)
8. `market_indices` - Real-time market benchmarks (S&P 500, Nifty, Nasdaq)
9. `watchlists` - User custom watchlist containers
10. `watchlist_items` - Watchlist stock mappings
11. `portfolios` - Investment portfolio containers
12. `portfolio_holdings` - Position balances per portfolio
13. `portfolio_transactions` - Buy/Sell trade execution logs
14. `alerts` - Price & technical condition triggers
15. `alert_logs` - Trigger execution history
16. `news` - Market news articles
17. `news_sentiment` - Sentiment scores per news item
18. `ai_analysis` - Gemini AI reports & signals
19. `ai_chat_history` - User prompt history
20. `screener_presets` - Saved stock filter presets
21. `strategies` - Strategy rule definitions
22. `backtests` - Backtest simulation runs
23. `backtest_results` - Backtest metrics & equity curves
24. `subscriptions` - Stripe subscription states
25. `payments` - Billing invoice history
26. `notifications` - In-app user notifications
27. `settings` - App UI preferences
28. `audit_logs` - Audit trail (WHO/WHEN/WHAT)
29. `activity_logs` - User product telemetry
