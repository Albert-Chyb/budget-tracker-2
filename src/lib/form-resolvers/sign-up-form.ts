import { z } from 'zod';
import { emailSchema } from './email-field';
import { passwordSchema } from './password-field';

export const PASSWORDS_DOES_NOT_MATCH_MESSAGE = 'Hasła nie są identyczne';

export const signUpFormSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine((value) => value.password === value.confirmPassword, {
    message: PASSWORDS_DOES_NOT_MATCH_MESSAGE,
    path: ['confirmPassword'],
  });

export type SignUpFormValue = z.infer<typeof signUpFormSchema>;
