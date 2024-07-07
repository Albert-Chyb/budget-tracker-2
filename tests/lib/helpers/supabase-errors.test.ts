import {
  invalidCredentials,
  userAlreadyExists,
} from '@lib/helpers/supabase-errors';
import { AuthApiError } from '@supabase/supabase-js';
import { beforeEach, describe, expect, it, vi } from 'vitest';

describe('userAlreadyExists', () => {
  beforeEach(() => {
    vi.mock('@supabase/supabase-js', async () => {
      const originalModule = await vi.importActual('@supabase/supabase-js');

      return {
        ...originalModule,
        isAuthApiError: vi.fn().mockReturnValue(true),
      };
    });
  });

  it('should recognize the error if the code is present', () => {
    const error = {
      message: 'User already registered',
      code: 'user_already_exists',
      status: 422,
    } as AuthApiError;

    const result = userAlreadyExists(error);

    expect(result).toBe(true);
  });

  it('should recognize the error if the code is undefined', () => {
    const error = {
      message: 'User already registered',
      status: 422,
      code: undefined,
    } as AuthApiError;

    const result = userAlreadyExists(error);

    expect(result).toBe(true);
  });
});

describe('invalidCredentials', () => {
  it('should recognize the error if the code is present', () => {
    const error = {
      message: 'Invalid login credentials',
      status: 400,
      code: 'invalid_grant',
    } as AuthApiError;

    const result = invalidCredentials(error);

    expect(result).toBe(true);
  });

  it('should recognize the error if the code is not present', () => {
    const error = {
      message: 'Invalid login credentials',
      status: 400,
      code: undefined,
    } as AuthApiError;

    const result = invalidCredentials(error);

    expect(result).toBe(true);
  });
});
