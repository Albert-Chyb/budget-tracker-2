import { z } from 'zod';
import { categoryColorsSchema } from './category-colors';

export const categoryTypeSchema = z.enum(['income', 'expense']);

export const categorySchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(3).max(32),
  colorId: z.number().int().positive().nullable(),
  type: categoryTypeSchema,
  color: categoryColorsSchema.nullable(),
});

export const createCategorySchema = categorySchema.omit({
  id: true,
  color: true,
});

export const updateCategorySchema = categorySchema
  .omit({ id: true, color: true })
  .partial();

export type TCategory = z.infer<typeof categorySchema>;
export type TCreateCategory = z.infer<typeof createCategorySchema>;
export type TUpdateCategory = z.infer<typeof updateCategorySchema>;

export type TCategoryType = z.infer<typeof categoryTypeSchema>;
