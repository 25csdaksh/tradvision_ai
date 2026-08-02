import { z } from 'zod';

export const RunBacktestSchema = z.object({
  symbol: z.string().min(1, 'Symbol is required').transform((val) => val.toUpperCase()),
  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Start date must be YYYY-MM-DD'),
  endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'End date must be YYYY-MM-DD'),
  initialCapital: z.number().min(100, 'Initial capital must be at least 100'),
  strategyName: z.string().min(1, 'Strategy name is required'),
  parameters: z.record(z.any()).default({})
});

export type RunBacktestInput = z.infer<typeof RunBacktestSchema>;
