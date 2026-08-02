import { z } from 'zod';
import { AlertCondition } from '../types/alert.types.js';

export const CreateAlertSchema = z.object({
  symbol: z.string().min(1, 'Symbol is required').transform((val) => val.toUpperCase()),
  condition: z.nativeEnum(AlertCondition),
  targetValue: z.number().positive('Target value must be positive')
});

export type CreateAlertInput = z.infer<typeof CreateAlertSchema>;
