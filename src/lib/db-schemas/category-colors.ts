import { z } from 'zod';

export const categoryColorsSchema = z.object({
  colorId: z.number(),
  rgb: z.string(),
  name: z.string(),
});

export type TCategoryColor = z.infer<typeof categoryColorsSchema>;
