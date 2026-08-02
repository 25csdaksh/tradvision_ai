# TradeVision AI - API Documentation

## Base URL
`/api/v1`

## Authentication
Pass Bearer Token in HTTP Authorization Header:
`Authorization: Bearer <JWT_TOKEN>`

## Key Endpoints Overview

| Method | Endpoint | Description | Access |
|---|---|---|---|
| POST | `/api/v1/auth/login` | User Authentication | Public |
| GET | `/api/v1/stocks/:symbol` | Fetch real-time stock quote & metrics | User |
| GET | `/api/v1/ai/analysis/:symbol` | Gemini AI stock analysis & sentiment | Pro+ |
| GET | `/api/v1/portfolio` | Get user portfolio holdings & live PnL | User |
| POST | `/api/v1/backtest/run` | Execute trading strategy backtest | Pro+ |
