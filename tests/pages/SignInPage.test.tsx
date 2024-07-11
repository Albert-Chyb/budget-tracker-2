import {
  SignInFormProps,
  SignInFormServerErrors,
} from '@components/SignInForm';
import { signIn } from '@lib/auth/signIn';
import { SignInFormValue } from '@lib/form-resolvers/sign-in-form';
import { invalidCredentials } from '@lib/helpers/supabase-errors';
import SignInPage, { NO_SERVER_ERRORS } from '@pages/SignInPage';
import { User } from '@supabase/supabase-js';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const SIGN_IN_FORM_VALUE: SignInFormValue = {
  email: 'a@a.com',
  password: '123456',
};

// Function that is returned from the useNavigate() hook
const navigateFunctionMock = vi.fn();

vi.mock('@lib/auth/signIn', () => ({
  signIn: vi.fn(),
}));

vi.mock('@components/SignInForm', () => ({
  default: (props: SignInFormProps) => (
    <div
      data-server-errors={JSON.stringify(props.serverErrors)}
      data-is-loading={props.isLoading}
      data-testid='sign-in-form'
      onClick={() => props.onSignIn({ ...SIGN_IN_FORM_VALUE })}
    ></div>
  ),
}));

vi.mock('@lib/helpers/supabase-errors', () => ({
  invalidCredentials: vi.fn(),
}));

vi.mock('react-router-dom', async () => ({
  ...(await vi.importActual('react-router-dom')),
  useNavigate: () => navigateFunctionMock,
}));

describe('SignInPage', () => {
  /** Renders the sign in page wrapped with a router */
  let renderSignInPage: () => void;

  /** Calls the handleSignIn handler of the SignInPage component */
  let callHandleSignIn: () => void;

  /** Gets the server errors that was passed to the SignInForm component via props */
  let getServerErrors: () => SignInFormServerErrors;

  /** Gets the isLoading state value that was passed to the SignInForm component via props */
  let isLoading: () => boolean;

  beforeEach(() => {
    vi.mocked(signIn).mockResolvedValue({} as User);

    renderSignInPage = () => {
      render(<SignInPage />, {
        wrapper: MemoryRouter,
      });

      callHandleSignIn = () => {
        const signInFormMock = screen.getByTestId('sign-in-form');
        fireEvent.click(signInFormMock);
      };

      getServerErrors = () => {
        const signInFormMock = screen.getByTestId('sign-in-form');
        return JSON.parse(signInFormMock.getAttribute('data-server-errors')!);
      };

      isLoading = () => {
        const signInFormMock = screen.getByTestId('sign-in-form');
        return signInFormMock.getAttribute('data-is-loading') === 'true';
      };
    };

    renderSignInPage();
  });

  it('should have isLoading state set to false initially', () => {
    expect(isLoading()).toBe(false);
  });

  it('should start without any server errors', () => {
    expect(getServerErrors()).toEqual(NO_SERVER_ERRORS);
  });

  describe('handleSignIn', () => {
    it('should call the signIn function with form value', () => {
      const { email, password } = SIGN_IN_FORM_VALUE;

      callHandleSignIn();

      expect(signIn).toHaveBeenCalledWith(email, password);
    });

    it('should set the isLoading state to true before calling the signIn function', () => {
      callHandleSignIn();

      expect(isLoading()).toBe(true);
    });

    it('should set the isLoading state to false after the signIn function resolved a value', async () => {
      callHandleSignIn();

      await waitFor(() => expect(isLoading()).toBe(false));
    });

    it('should set the isLoading state to false if the signIn function threw an expected error', async () => {
      vi.mocked(signIn).mockRejectedValue('Error from tests');
      vi.mocked(invalidCredentials).mockReturnValue(true);

      callHandleSignIn();

      await waitFor(() => expect(isLoading()).toBe(false));
    });

    it('should redirect the user to the home page after the signIn function resolved', async () => {
      callHandleSignIn();

      await waitFor(() =>
        expect(navigateFunctionMock).toHaveBeenCalledWith('/')
      );
    });

    it('should clear server errors before the signIn function is called', () => {
      callHandleSignIn();

      expect(getServerErrors()).toEqual(NO_SERVER_ERRORS);
    });

    it('should set invalidCredentials error to true if the signIn function threw such error', async () => {
      vi.mocked(signIn).mockRejectedValue('error from tests');
      vi.mocked(invalidCredentials).mockReturnValue(true);

      callHandleSignIn();

      await waitFor(() =>
        expect(getServerErrors()).toEqual(
          expect.objectContaining({ invalidCredentials: true })
        )
      );
    });
  });
});
