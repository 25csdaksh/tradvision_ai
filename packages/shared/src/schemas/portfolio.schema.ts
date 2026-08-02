import { z } from 'zod';

export const AddPositionSchema = z.object({
  portfolioId: z.string().uuid('Invalid portfolio ID'),
  symbol: z.string().min(1, 'Symbol is required').transform((val) => val.toUpperCase()),
  shares: z.number().positive('Shares must be greater than 0'),
  averageBuyPrice: z.number().positive('Average buy price must be greater than 0')
});

export type AddPositionInput = z.infer<typeof AddPositionSchema>;
