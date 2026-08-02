# TradeVision AI - Master REST API Specification

Refer to the master REST API Architecture Blueprint for complete endpoint definitions, payload schemas, Zod validation logic, Socket.IO real-time channels, and rate-limiting policies:
📄 [tradevision_ai_api_architecture.md](file:///C:/Users/daksh/.gemini/antigravity-ide/brain/59695fe6-0a79-40b5-9335-a1fdd5f10bd9/tradevision_ai_api_architecture.md)

## Base URL
`/api/v1`

## Standard Response Format
```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": {},
  "meta": {},
  "timestamp": "2026-08-02T14:30:00.000Z",
  "requestId": "req_8f9a2b1c-4d3e-2f1a"
}
```

## Complete Module Route Mapping (`/api/v1/`)

| Module | Route Prefix | Primary Controller | Services | Access Level |
|---|---|---|---|---|
| **Auth** | `/api/v1/auth` | `auth.controller.ts` | `auth.service.ts` | Public / Protected |
| **Users & Profile** | `/api/v1/users` | `user.controller.ts` | `user.service.ts` | Protected |
| **Dashboard** | `/api/v1/dashboard` | `dashboard.controller.ts` | `dashboard.service.ts` | Protected |
| **Market** | `/api/v1/market` | `market.controller.ts` | `market.service.ts` | Public |
| **Stocks & Pricing** | `/api/v1/stocks` | `stock.controller.ts` | `stock.service.ts` | Public |
| **AI Intelligence** | `/api/v1/ai` | `ai.controller.ts` | `ai.service.ts` | Premium / Pro+ |
| **Watchlists** | `/api/v1/watchlists` | `watchlist.controller.ts` | `watchlist.service.ts` | Protected |
| **Portfolios** | `/api/v1/portfolios` | `portfolio.controller.ts` | `portfolio.service.ts` | Protected |
| **Alerts Engine** | `/api/v1/alerts` | `alert.controller.ts` | `alert.service.ts` | Protected |
| **News & Sentiment** | `/api/v1/news` | `news.controller.ts` | `news.service.ts` | Public |
| **Stock Screener** | `/api/v1/screener` | `screener.controller.ts` | `screener.service.ts` | Public / Protected |
| **Backtesting** | `/api/v1/backtest` | `backtest.controller.ts` | `backtest.service.ts` | Pro+ |
| **Payments** | `/api/v1/payments` | `payment.controller.ts` | `payment.service.ts` | Protected / Webhook |
| **Notifications** | `/api/v1/notifications` | `notification.controller.ts` | `notification.service.ts` | Protected |
| **Settings** | `/api/v1/settings` | `settings.controller.ts` | `settings.service.ts` | Protected |
| **Admin Panel** | `/api/v1/admin` | `admin.controller.ts` | `admin.service.ts` | Admin / Super Admin |

## WebSocket Real-Time Channels
Socket.IO Connection URL: `ws://localhost:5000` (or `wss://api.tradevision.ai`)

- `subscribe_ticker`: Join room for live quotes on specific ticker.
- `stock_quote_update`: Low-latency real-time quote broadcast.
- `alert_triggered`: Push price & technical alert notification.
