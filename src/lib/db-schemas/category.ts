import { z } from 'zod';

export const categoryTypeSchema = z.enum(['income', 'expense']);

export const categorySchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(3).max(32),
  colorId: z.number().int().positive().nullable(),
  type: categoryTypeSchema,
});

export type TCategory = z.infer<typeof categorySchema>;
export type TCategoryType = z.infer<typeof categoryTypeSchema>;
