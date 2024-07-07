import { z } from 'zod';
import { emailSchema } from './email-field';
import { passwordSchema } from './password-field';

export const INVALID_CREDENTIALS_MESSAGE = 'Email lub hasło jest niepoprawne';

export const signInFormSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export type SignInFormValue = z.infer<typeof signInFormSchema>;
