import { z } from 'zod';
import { categorySchema } from '../db-schemas/category';
import { formatStringLengthUnit } from '../helpers/format-string-length-unit';

export const categoryFormErrorMap: z.ZodErrorMap = (error, context) => {
  const field = error.path.at(0);

  if (field === 'name') {
    if (error.code === 'too_small') {
      const { minimum } = error;

      return {
        message: `Nazwa nie może być krótsza niż ${minimum} ${formatStringLengthUnit(
          minimum
        )}`,
      };
    }

    if (error.code === 'too_big') {
      const { maximum } = error;

      return {
        message: `Nazwa nie może być dłuższa niż ${maximum} ${formatStringLengthUnit(
          maximum
        )}`,
      };
    }
  }

  return { message: context.defaultError };
};

export const categoryFormSchema = categorySchema.omit({
  id: true,
  color: true,
});

export type CategoryFormValue = z.infer<typeof categoryFormSchema>;

export function createCategoryFormValue(): CategoryFormValue {
  return {
    name: '',
    colorId: null,
    type: 'expense',
  };
}
