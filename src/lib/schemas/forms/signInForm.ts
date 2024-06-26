import { z } from 'zod';
import { emailSchema } from './email';
import { passwordSchema } from './password';

export const signInFormSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export type SignInFormValue = z.infer<typeof signInFormSchema>;
