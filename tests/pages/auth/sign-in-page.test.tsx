import {
  SignInFormProps,
  SignInFormServerErrors,
} from '@/components/auth/sign-in-form';
import { SignInMutationVariables, useSignInMutation } from '@/lib/auth/sign-in';
import { SignInFormValue } from '@/lib/form-resolvers/sign-in-form';
import { invalidCredentials } from '@/lib/helpers/supabase-errors';
import SignInPage from '@/pages/auth/sign-in-page';
import { User } from '@supabase/supabase-js';
import {
  QueryClient,
  QueryClientProvider,
  UseMutationResult,
} from '@tanstack/react-query';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const SIGN_IN_FORM_VALUE: SignInFormValue = {
  email: 'a@a.com',
  password: '123456',
};

// Function that is returned from the useNavigate() hook
const navigateFunctionMock = vi.fn();

vi.mock('@/lib/auth/sign-in', () => ({
  useSignInMutation: vi.fn(),
}));

vi.mock('@/components/auth/sign-in-form', () => ({
  default: (props: SignInFormProps) => (
    <div
      data-server-errors={JSON.stringify(props.serverErrors)}
      data-testid='sign-in-form'
      onClick={() => props.onSignIn({ ...SIGN_IN_FORM_VALUE })}
    />
  ),
}));

vi.mock('@/lib/helpers/supabase-errors', () => ({
  invalidCredentials: vi.fn(),
}));

vi.mock('react-router-dom', async () => ({
  ...(await vi.importActual('react-router-dom')),
  useNavigate: () => navigateFunctionMock,
}));

describe('SignInPage', () => {
  /** Mock of the `mutate()` function returned from useSignInMutation hook */
  const useSignInMutateFn = vi.fn();

  /** Renders the sign in page wrapped with a router */
  let renderSignInPage: (error?: unknown | null) => void;

  /** Calls the handleSignIn handler of the SignInPage component */
  let callHandleSignIn: () => void;

  /** Gets the server errors that was passed to the SignInForm component via props */
  let getServerErrors: () => SignInFormServerErrors;

  beforeEach(() => {
    renderSignInPage = (error = null) => {
      // Fake state that is returned from useMutation hook.
      // We mock only selected properties that the page depends on.
      const fakeUseMutationResult = {
        error,
        mutate: useSignInMutateFn,
        isPending: false,
      } as unknown as UseMutationResult<
        User,
        Error,
        SignInMutationVariables,
        unknown
      >;
      vi.mocked(useSignInMutation).mockReturnValueOnce(fakeUseMutationResult);

      // Query client with disabled retries
      const queryClient = new QueryClient({
        defaultOptions: {
          queries: {
            retry: 0,
          },
          mutations: {
            retry: 0,
          },
        },
      });

      // Render the sign in page with nesesery providers
      render(
        <QueryClientProvider client={queryClient}>
          <SignInPage />
        </QueryClientProvider>,
        {
          wrapper: MemoryRouter,
        }
      );

      callHandleSignIn = () => {
        const signInFormMock = screen.getByTestId('sign-in-form');
        fireEvent.click(signInFormMock);
      };

      getServerErrors = () => {
        const signInFormMock = screen.getByTestId('sign-in-form');
        return JSON.parse(signInFormMock.getAttribute('data-server-errors')!);
      };
    };
  });

  describe('handleSignIn', () => {
    it('should call the signIn function with form value', () => {
      const { email, password } = SIGN_IN_FORM_VALUE;

      renderSignInPage();
      callHandleSignIn();

      expect(useSignInMutateFn).toHaveBeenCalledWith(
        { email, password },
        expect.anything()
      );
    });

    it('should redirect the user to the home page after successful sign in', () => {
      useSignInMutateFn.mockImplementationOnce(
        (_formValue, lifecycle: { onSuccess: () => void }) => {
          lifecycle.onSuccess();
        }
      );

      renderSignInPage();
      callHandleSignIn();

      expect(navigateFunctionMock).toHaveBeenCalledWith('/');
    });

    it('should set invalidCredentials error to true if the mutation threw such error', () => {
      vi.mocked(invalidCredentials).mockReturnValue(true);

      renderSignInPage(new Error('Expected error from a sign in page test'));
      callHandleSignIn();

      expect(getServerErrors()).toEqual(
        expect.objectContaining({ invalidCredentials: true })
      );
    });
  });
});
