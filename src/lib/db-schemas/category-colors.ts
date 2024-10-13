import { z } from 'zod';

export const categoryColorsSchema = z.object({
  colorId: z.number(),
  rgb: z
    .string()
    .transform(
      (rgb) =>
        [
          Number(rgb.substring(0, 3)),
          Number(rgb.substring(3, 6)),
          Number(rgb.substring(6, 9)),
        ] as const
    ),
  name: z.string(),
});

export type TCategoryColor = z.infer<typeof categoryColorsSchema>;
