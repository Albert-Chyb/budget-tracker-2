import {
  SignUpFormProps,
  SignUpFormServerErrors,
} from '@/components/auth/sign-up-form';
import { signUp } from '@/lib/auth/sign-up';
import { SignUpFormValue } from '@/lib/form-resolvers/sign-up-form';
import { userAlreadyExists } from '@/lib/helpers/supabase-errors';
import SignUpPage, { NO_SERVER_ERRORS } from '@/pages/auth/sign-up-page';
import { User } from '@supabase/supabase-js';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
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
  signUp: vi.fn(),
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
      data-is-loading={props.isLoading}
      data-server-errors={JSON.stringify(props.serverErrors)}
      data-testid='sign-up-form'
      onClick={() => props.onSignUp({ ...SIGN_UP_FORM_VALUE })}
    ></div>
  ),
}));

describe('SignUpPage', () => {
  let renderSignUpPage: () => void;

  let callHandleSignUp: () => void;

  let getServerErrors: () => SignUpFormServerErrors;

  let isLoading: () => boolean;

  beforeEach(() => {
    vi.mocked(signUp).mockResolvedValue({} as User);

    renderSignUpPage = () => {
      render(<SignUpPage />, { wrapper: MemoryRouter });

      callHandleSignUp = () => {
        const signUpFormMock = screen.getByTestId('sign-up-form');

        fireEvent.click(signUpFormMock);
      };

      getServerErrors = () => {
        const signUpFormMock = screen.getByTestId('sign-up-form');

        return JSON.parse(signUpFormMock.getAttribute('data-server-errors')!);
      };

      isLoading = () => {
        const signUpFormMock = screen.getByTestId('sign-up-form');

        return signUpFormMock.getAttribute('data-is-loading') === 'true';
      };
    };

    renderSignUpPage();
  });

  it('should have isLoading state set to false initially', () => {
    expect(isLoading()).toBe(false);
  });

  it('should be initialized without any server errors', () => {
    expect(getServerErrors()).toEqual(NO_SERVER_ERRORS);
  });

  describe('handleSignUp', () => {
    it('should call the signUp function with form value', () => {
      const { email, password } = SIGN_UP_FORM_VALUE;

      callHandleSignUp();

      expect(signUp).toHaveBeenCalledWith(email, password);
    });

    it('should set the isLoading state to true before calling the signUp function', () => {
      callHandleSignUp();

      expect(isLoading()).toBe(true);
    });

    it('should set the isLoading state to false after the signUp function resolved a value', async () => {
      callHandleSignUp();

      await waitFor(() => expect(isLoading()).toBe(false));
    });

    it('should set the isLoading state to false if the signUp threw an expected error', async () => {
      vi.mocked(signUp).mockRejectedValue('error from tests');
      vi.mocked(userAlreadyExists).mockReturnValue(true);

      callHandleSignUp();

      await waitFor(() => expect(isLoading()).toBe(false));
    });

    it('should redirect the user to the home page after the signUp function resolver', async () => {
      callHandleSignUp();

      await waitFor(() =>
        expect(navigateFunctionMock).toHaveBeenCalledWith('/')
      );
    });

    it('should clear server errors before the signUp function is called', () => {
      callHandleSignUp();

      expect(getServerErrors()).toEqual(NO_SERVER_ERRORS);
    });

    it('should set emailAlreadyInUse error to true if the signUp function threw such error', async () => {
      vi.mocked(signUp).mockRejectedValue('error from tests');
      vi.mocked(userAlreadyExists).mockReturnValue(true);

      callHandleSignUp();

      await waitFor(() =>
        expect(getServerErrors()).toEqual(
          expect.objectContaining({
            emailAlreadyInUse: true,
          })
        )
      );
    });
  });
});
