import { z } from 'zod';
import { passwordSchema } from './password-field';
import { PASSWORDS_DOES_NOT_MATCH_MESSAGE } from './sign-up-form';

export const changePasswordFormSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine((value) => value.password === value.confirmPassword, {
    message: PASSWORDS_DOES_NOT_MATCH_MESSAGE,
    path: ['confirmPassword'],
  });

export type ChangePasswordFormValue = z.infer<typeof changePasswordFormSchema>;
