<div align="center">

# 🚀 TradeVision AI

### *Enterprise-Grade, AI-Powered Stock Market SaaS Platform*

[![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue.svg?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![React 19](https://img.shields.io/badge/React-19.0-61DAFB.svg?style=for-the-badge&logo=react)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-20.x-339933.svg?style=for-the-badge&logo=nodedotjs)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.19-000000.svg?style=for-the-badge&logo=express)](https://expressjs.com/)
[![Prisma](https://img.shields.io/badge/Prisma-5.14-2D3748.svg?style=for-the-badge&logo=prisma)](https://www.prisma.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC.svg?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![Turborepo](https://img.shields.io/badge/Turborepo-2.0-EF4444.svg?style=for-the-badge&logo=turborepo)](https://turbo.build/)
[![License: UNLICENSED](https://img.shields.io/badge/License-UNLICENSED-red.svg?style=for-the-badge)](LICENSE)

[Architecture Blueprint](docs/ARCHITECTURE.md) • [API Documentation](docs/API-DOCUMENTATION.md) • [Coding Standards](docs/CODING-STANDARDS.md)

</div>

---

## 📌 Executive Overview

**TradeVision AI** is an advanced, production-ready, AI-driven stock market analysis and algorithmic strategy backtesting SaaS platform. Engineered for low-latency market streaming, high-throughput financial calculations, and seamless multi-developer scalability, the platform provides institutional-grade tools to retail investors and traders.

Built from the ground up as a **Monorepo** managed via **pnpm Workspaces** and **Turborepo**, TradeVision AI isolates frontend user interfaces, backend REST API services, and shared contract packages to ensure zero type drift and effortless horizontal scaling.

---

## ✨ Key Platform Features

- ⚡ **Real-Time Market Data & Streaming**: Bi-directional Socket.IO channels broadcasting live ticker quotes, index movements, and real-time trade updates.
- 🤖 **Gemini AI Predictive Analysis**: Automated sentiment generation, pattern recognition, key catalyst extraction, and structured trading reports powered by Google Gemini AI.
- 📊 **Interactive Technical Charting**: Seamless integration of TradingView Lightweight Charts & Recharts with dynamic overlays for SMA, EMA, RSI, MACD, and Bollinger Bands.
- 🧪 **Strategy Backtesting Engine**: Vectorized and event-driven strategy simulation supporting multi-year historical backtesting, Sharpe ratio calculations, equity curve rendering, and max drawdown analytics.
- ⚙️ **Compute Offloading Queue**: Asynchronous background queue architecture powered by **BullMQ** and **Redis** for executing long-running AI sentiment tasks, alert evaluations, and backtest jobs without blocking the main event loop.
- 🔔 **Real-Time Price & Indicator Alerts**: Automated trigger engine delivering instantaneous push notifications and emails when stocks meet target technical conditions.
- 💼 **Portfolio Tracking & Analytics**: Comprehensive holdings dashboard with auto-calculated unrealized PnL, asset allocation breakdowns, and historical performance tracking.

---

## 🛠️ Technology Stack & Architecture

### **Monorepo Workspaces Layout**

| Workspace | Technology Stack | Role & Purpose |
|---|---|---|
| **`apps/frontend`** | React 19, TypeScript, Vite, Tailwind CSS, TanStack Query, Zustand, TradingView Lightweight Charts, Recharts, Framer Motion | Modern, dynamic Single-Page Application (SPA) designed with vertical slice feature architecture. |
| **`apps/backend`** | Node.js, Express.js, TypeScript, Prisma ORM, PostgreSQL (Supabase), Redis, BullMQ, Socket.IO, Gemini API, Winston | High-performance 5-Tier REST & WebSocket API engine handling calculations, AI pipelines, and data access. |
| **`packages/shared`** | TypeScript, Zod | `@tradevision/shared` workspace package supplying cross-app DTOs, Zod schemas, constants, and math utilities. |
| **`docs/`** | Markdown, OpenAPI Specs | Enterprise technical blueprints, database ERDs, API references, deployment runbooks, and coding standards. |
| **`infrastructure/`** | Docker, NGINX, GitHub Actions | Containerization setups, NGINX reverse proxy definitions, and automated CI/CD deployment pipelines. |

---

## 📁 Repository Directory Structure

```
tradevision-ai/
│
├── .github/                       # GitHub Actions CI/CD workflows
│   └── workflows/
│       └── ci-cd-backend.yml
│
├── apps/                          # Deployable Applications
│   │
│   ├── frontend/                  # React 19 Single Page Application
│   │   ├── public/
│   │   ├── src/
│   │   │   ├── config/            # Environment & chart settings
│   │   │   ├── providers/         # TanStack Query, Auth, Socket providers
│   │   │   ├── routes/            # Router setup & ProtectedRoute guards
│   │   │   ├── layouts/           # Page containers & navigation wrappers
│   │   │   ├── components/        # Design System UI primitives & chart wrappers
│   │   │   ├── features/          # Domain Feature Slices (Vertical Slice)
│   │   │   │   ├── auth/          # Authentication page & logic
│   │   │   │   ├── dashboard/     # Overview metrics & AI summaries
│   │   │   │   ├── market/        # Heatmaps & index summaries
│   │   │   │   ├── stocks/        # Detailed technical charting view
│   │   │   │   ├── ai-analysis/   # Gemini AI sentiment reports
│   │   │   │   ├── portfolio/     # Holdings & asset allocation
│   │   │   │   ├── watchlist/     # Multi-list ticker tracking
│   │   │   │   ├── alerts/        # Price & indicator trigger rules
│   │   │   │   ├── news/          # Market news feed & sentiment
│   │   │   │   ├── screener/      # Stock filter & query engine
│   │   │   │   ├── backtesting/   # Sandbox strategy simulator
│   │   │   │   ├── settings/      # Account & subscription management
│   │   │   │   ├── premium/       # Pricing plans & Stripe checkout
│   │   │   │   └── admin/         # Platform health & user metrics
│   │   │   ├── hooks/             # Shared React hooks
│   │   │   ├── api/               # Axios instance & interceptors
│   │   │   ├── store/             # Zustand UI state store
│   │   │   └── styles/            # Tailwind base directives
│   │   ├── package.json
│   │   ├── vite.config.ts
│   │   └── tailwind.config.js
│   │
│   └── backend/                   # Node.js / Express API Service
│       ├── src/
│       │   ├── server.ts          # Server bootstrap entry point
│       │   ├── app.ts             # Express app setup & middleware
│       │   ├── routes/            # REST API endpoints (/api/v1)
│       │   ├── controllers/       # HTTP request & response handlers
│       │   ├── middleware/        # JWT auth, RBAC, Zod validation, Rate limiting
│       │   ├── services/          # Pure business logic & AI processing
│       │   ├── repositories/      # Prisma DB query abstraction layer
│       │   ├── queues/            # BullMQ background job instantiators
│       │   ├── jobs/              # Background worker thread consumers
│       │   ├── sockets/           # Socket.IO real-time event handlers
│       │   └── database/          # Singleton Prisma client instance
│       ├── prisma/                # PostgreSQL schema & SQL migrations
│       │   └── schema.prisma
│       ├── package.json
│       └── tsconfig.json
│
├── packages/                      # Cross-Cutting Shared Packages
│   └── shared/                    # `@tradevision/shared` workspace package
│       ├── src/
│       │   ├── index.ts           # Barrel exporter
│       │   ├── types/             # Shared TypeScript DTOs
│       │   ├── schemas/           # Shared Zod validation schemas
│       │   ├── constants/         # System constants & tier limits
│       │   ├── interfaces/        # API response & pagination models
│       │   └── utils/             # Financial & text utilities
│       └── package.json
│
├── docs/                          # Enterprise Documentation
│   ├── API-DOCUMENTATION.md       # REST & WebSocket endpoint specs
│   └── CODING-STANDARDS.md        # Architecture rules & conventions
│
├── infrastructure/                # DevOps & Provisioning
│   ├── docker/                    # Dockerfiles & docker-compose.dev.yml
│   └── nginx/                     # Reverse proxy configuration
│
├── .prettierrc                    # Prettier code formatting rules
├── .gitignore
├── pnpm-workspace.yaml            # Monorepo workspace configuration
├── turbo.json                     # Turborepo task pipeline configuration
├── package.json                   # Root monorepo package manifest
└── README.md                      # Workspace documentation
```

---

## ⚡ Getting Started (Local Development)

### **Prerequisites**
Ensure you have the following installed on your developer machine:
- **Node.js**: `v20.x` or higher
- **pnpm**: `v9.x` or higher (`npm install -g pnpm`)
- **Docker Desktop**: (Optional, for local PostgreSQL & Redis instances)

### **1. Clone the Repository**
```bash
git clone https://github.com/25csdaksh/tradvision_ai.git
cd tradvision_ai
```

### **2. Install Dependencies**
Install all workspace dependencies concurrently using PNPM:
```bash
pnpm install
```

### **3. Environment Variables Setup**
Create `.env` files in both application workspaces:

**Backend (`apps/backend/.env`)**:
```env
PORT=5000
NODE_ENV=development
DATABASE_URL="postgresql://postgres:postgrespassword@localhost:5432/tradevision_dev?schema=public"
REDIS_URL="redis://localhost:6379"
JWT_SECRET="your-super-secret-jwt-key"
SUPABASE_URL="https://your-supabase-project.supabase.co"
SUPABASE_ANON_KEY="your-supabase-anon-key"
GEMINI_API_KEY="your-google-gemini-api-key"
```

**Frontend (`apps/frontend/.env`)**:
```env
VITE_API_BASE_URL="http://localhost:5000/api/v1"
VITE_SOCKET_URL="http://localhost:5000"
```

### **4. Database Setup & Seeding**
Start the local PostgreSQL and Redis containers, then run Prisma migrations:
```bash
# Start local Postgres & Redis via Docker
pnpm --filter @tradevision/backend exec docker-compose -f infrastructure/docker/docker-compose.dev.yml up -d

# Generate Prisma Client & apply schema
pnpm --filter @tradevision/backend prisma:generate
pnpm --filter @tradevision/backend prisma:migrate
```

### **5. Run Applications in Development Mode**
Start both the Frontend SPA and Backend API concurrently using Turborepo:
```bash
pnpm dev
```
- **Frontend App**: `http://localhost:3000`
- **Backend API**: `http://localhost:5000/api/v1`

---

## 🛡️ Enterprise Architectural Boundaries

To ensure clean domain boundaries and prevent spaghetti dependencies, the repository enforces the following strict rules:

```text
HTTP Request ➔ Route ➔ Middleware ➔ Controller ➔ Service ➔ Repository ➔ Prisma / Database
```

1. **Frontend Components ❌ Backend Files**: Frontend applications communicate with the backend exclusively via HTTP endpoints and WebSocket channels using shared `@tradevision/shared` contracts.
2. **Controllers ❌ Repositories**: Express controllers must never query Prisma repositories directly. All request handling flows through business logic Services.
3. **Isomorphic Type Alignment**: Both Frontend React Hook Forms and Backend Express Request Validators share the exact same Zod schemas defined in `packages/shared/src/schemas`.

---

## 🤝 Contributing & Guidelines

1. Follow the feature branch workflow: `feat/feature-name` or `fix/bug-fix`.
2. Format code using `pnpm format` before opening a Pull Request.
3. Ensure type-checking passes cleanly across all workspaces via `pnpm build`.
4. Review [CODING-STANDARDS.md](docs/CODING-STANDARDS.md) for full style conventions.

---

## 📄 License

This repository is private and proprietary. All rights reserved by **TradeVision AI**.