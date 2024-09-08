import { z } from 'zod';

export const categoryColorSchema = z.object({
  id: z.number().int().positive(),
  rgb: z.string().length(9),
  name: z.string(),
});

export type TCategoryColor = z.infer<typeof categoryColorSchema>;
