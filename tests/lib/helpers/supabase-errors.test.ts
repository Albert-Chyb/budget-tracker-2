import { userAlreadyExists } from '@lib/helpers/supabase-errors';
import { AuthApiError } from '@supabase/supabase-js';
import { describe, expect, it } from 'vitest';

describe('userAlreadyExists', () => {
  it('should recognize the error if the code is present', () => {
    const error = new AuthApiError(
      'User already registered',
      422,
      'user_already_exists'
    );

    const result = userAlreadyExists(error);

    expect(result).toBe(true);
  });

  it('should recognize the error if the code is undefined', () => {
    const error = new AuthApiError(
      'User already registered',
      422,
      undefined
    );

    const result = userAlreadyExists(error);

    expect(result).toBe(true);
  });
});
