import { z } from 'zod';

export const StockQuerySchema = z.object({
  query: z.string().optional(),
  sector: z.string().optional(),
  exchange: z.string().optional(),
  page: z.string().optional().transform(val => (val ? parseInt(val, 10) : 1)),
  limit: z.string().optional().transform(val => (val ? parseInt(val, 10) : 20))
});

export const SymbolParamSchema = z.object({
  symbol: z.string().min(1, 'Symbol is required').max(20).transform(val => val.toUpperCase())
});

export const CreateStockSchema = z.object({
  symbol: z.string().min(1, 'Symbol is required').max(20).transform(val => val.toUpperCase()),
  name: z.string().min(1, 'Company name is required'),
  exchange: z.string().min(1, 'Exchange name is required'),
  sector: z.string().optional(),
  industry: z.string().optional(),
  country: z.string().default('US'),
  currency: z.string().default('USD')
});
