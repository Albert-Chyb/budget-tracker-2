import {
  SignUpFormProps,
  SignUpFormServerErrors,
} from '@/components/auth/sign-up-form';
import { SignUpMutationVariables, useSignUpMutation } from '@/lib/auth/sign-up';
import { SignUpFormValue } from '@/lib/form-resolvers/sign-up-form';
import { userAlreadyExists } from '@/lib/helpers/supabase-errors';
import SignUpPage from '@/pages/auth/sign-up-page';
import { User } from '@supabase/supabase-js';
import {
  QueryClient,
  QueryClientProvider,
  UseMutationResult,
} from '@tanstack/react-query';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const SIGN_UP_FORM_VALUE: SignUpFormValue = {
  email: 'a@a.com',
  password: '123456',
  confirmPassword: '123456',
};

// Function that is returned from the useNavigate() hook
const navigateFunctionMock = vi.fn();

vi.mock('@/lib/auth/sign-up', () => ({
  useSignUpMutation: vi.fn(),
}));

vi.mock('react-router-dom', async () => ({
  ...(await vi.importActual('react-router-dom')),
  useNavigate: () => navigateFunctionMock,
}));

vi.mock('@/lib/helpers/supabase-errors', () => ({
  userAlreadyExists: vi.fn().mockReturnValue(false),
}));

vi.mock('@/components/auth/sign-up-form', async () => ({
  ...(await vi.importActual('@/components/auth/sign-up-form')),
  default: (props: SignUpFormProps) => (
    <div
      data-server-errors={JSON.stringify(props.serverErrors)}
      data-testid='sign-up-form'
      onClick={() => props.onSignUp({ ...SIGN_UP_FORM_VALUE })}
    />
  ),
}));

describe('SignUpPage', () => {
  // Mock of the 'mutate' function returned from useSignUpMutation hook
  const signUpMutateFnMock = vi.fn();

  let renderSignUpPage: (error?: null | unknown) => void;

  let callHandleSignUp: () => void;

  let getServerErrors: () => SignUpFormServerErrors;

  beforeEach(() => {
    renderSignUpPage = (error = null) => {
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

      vi.mocked(useSignUpMutation).mockReturnValueOnce({
        mutate: signUpMutateFnMock,
        isPending: false,
        error,
      } as unknown as UseMutationResult<User, Error, SignUpMutationVariables, unknown>);

      render(
        <QueryClientProvider client={queryClient}>
          <SignUpPage />
        </QueryClientProvider>,
        { wrapper: MemoryRouter }
      );

      callHandleSignUp = () => {
        const signUpFormMock = screen.getByTestId('sign-up-form');

        fireEvent.click(signUpFormMock);
      };

      getServerErrors = () => {
        const signUpFormMock = screen.getByTestId('sign-up-form');

        return JSON.parse(signUpFormMock.getAttribute('data-server-errors')!);
      };
    };
  });

  it('should set emailAlreadyInUse error to true if the signUp function threw such error', () => {
    vi.mocked(userAlreadyExists).mockReturnValueOnce(true);

    renderSignUpPage(new Error('Expected error from a sign up page test'));

    expect(getServerErrors()).toEqual(
      expect.objectContaining({
        emailAlreadyInUse: true,
      })
    );
  });

  describe('handleSignUp', () => {
    it('should call the mutation function with form value', () => {
      const { email, password } = SIGN_UP_FORM_VALUE;

      renderSignUpPage();
      callHandleSignUp();

      expect(signUpMutateFnMock).toHaveBeenCalledWith(
        expect.objectContaining({ email, password }),
        expect.anything()
      );
    });

    it('should redirect the user to the home page after successful sign up', () => {
      signUpMutateFnMock.mockImplementationOnce(
        (_value: unknown, lifecycle: { onSuccess: () => void }) => {
          lifecycle.onSuccess();
        }
      );

      renderSignUpPage();
      callHandleSignUp();

      expect(navigateFunctionMock).toHaveBeenCalledWith('/');
    });
  });
});
