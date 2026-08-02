# TradeVision AI - Coding Standards & Guidelines

## Architecture Principles
1. **Vertical Slice (Frontend)**: Group files by feature (`features/portfolio`, `features/market`) rather than global tech stack folders.
2. **Layered Architecture (Backend)**: Enforce strict separation: `Routes -> Controllers -> Services -> Repositories -> Database`.
3. **No Cross-Layer Contamination**: Controllers handling Express `req/res` must never touch database models directly. Services contain 100% of business calculations.

## Naming Conventions
- **React Components**: `PascalCase.tsx`
- **Hooks**: `kebab-case.ts` starting with `use-`
- **Backend Modules**: `kebab-case` (`user.controller.ts`, `user.service.ts`)
- **Shared Types & Schemas**: Suffix with `.types.ts` or `.schema.ts`
