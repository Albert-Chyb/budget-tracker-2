import { z } from 'zod';

export const EMAIL_REQUIRED_MESSAGE = 'Email jest wymagany';
export const EMAIL_INVALID_MESSAGE = 'To nie jest poprawny email';
export const EMAIL_NOT_FOUND_MESSAGE =
  'Nie istnieje konto powiązane z podanym adresem email';

export const emailSchema = z
  .string()
  .min(1, { message: EMAIL_REQUIRED_MESSAGE })
  .email({
    message: EMAIL_INVALID_MESSAGE,
  });
