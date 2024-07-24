import { z } from 'zod';
import { emailSchema } from './email-field';

export const resetPasswordFormSchema = z.object({
  email: emailSchema,
});

export type ResetPasswordFormValue = z.infer<typeof resetPasswordFormSchema>;
