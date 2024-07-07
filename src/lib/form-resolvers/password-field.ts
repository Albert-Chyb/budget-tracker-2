import { z } from 'zod';

export const PASSWORD_MIN_LENGTH_MESSAGE =
  'Hasło musi zawierać co najmniej 6 znaków';
export const PASSWORD_REQUIRED_MESSAGE = 'Hasło jest wymagane';
export const PASSWORD_INVALID_MESSAGE = 'Hasło jest niepoprawne';

export const passwordSchema = z
  .string()
  .min(1, {
    message: PASSWORD_REQUIRED_MESSAGE,
  })
  .min(6, { message: PASSWORD_MIN_LENGTH_MESSAGE });
