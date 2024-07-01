import { isAuthApiError } from '@supabase/supabase-js';

/*
  For some reason supabase error codes are always undefined.
  To work around this, this file contains helper functions that try to determine the error type.
  https://github.com/supabase/supabase-js/issues/1023#issue-2255211658
*/

export function userAlreadyExists(error: unknown): boolean {
  return (
    (isAuthApiError(error) && error.code === 'user_already_exists') ||
    (isAuthApiError(error) &&
      error.status === 422 &&
      error.message === 'User already registered')
  );
}
