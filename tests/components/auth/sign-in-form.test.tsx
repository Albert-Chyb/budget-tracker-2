import SignInForm, {
  SignInFormServerErrors,
} from '@/components/auth/sign-in-form';
import {
  EMAIL_INVALID_MESSAGE,
  EMAIL_REQUIRED_MESSAGE,
} from '@/lib/form-resolvers/email-field';
import {
  PASSWORD_MIN_LENGTH_MESSAGE,
  PASSWORD_REQUIRED_MESSAGE,
} from '@/lib/form-resolvers/password-field';
import { SignInFormValue } from '@/lib/form-resolvers/sign-in-form';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

const EMAIL_INPUT_ID = 'email-input';
const PASSWORD_INPUT_ID = 'password-input';
const SUBMIT_BTN_ID = 'submit-button';
const EMAIL_MESSAGE_ID = 'email-error-message';
const PASSWORD_MESSAGE_ID = 'password-error-message';

const NO_SERVER_ERRORS: SignInFormServerErrors = {
  invalidCredentials: false,
};

describe('SignInForm', () => {
  it('should render the sign in form', () => {
    render(<SignInForm onSignIn={vi.fn()} serverErrors={NO_SERVER_ERRORS} />);
  });

  it('should call the onSignIn callback after submission of a valid form', async () => {
    const onSignInMock = vi.fn();
    const formValue: SignInFormValue = {
      email: 'a@a.com',
      password: '123456',
    };
    const user = userEvent.setup();

    render(
      <SignInForm onSignIn={onSignInMock} serverErrors={NO_SERVER_ERRORS} />
    );

    const emailInput: HTMLInputElement = screen.getByTestId(EMAIL_INPUT_ID);
    const passwordInput: HTMLInputElement =
      screen.getByTestId(PASSWORD_INPUT_ID);
    const submitButton: HTMLButtonElement = screen.getByTestId(SUBMIT_BTN_ID);

    await user.type(emailInput, formValue.email);
    await user.type(passwordInput, formValue.password);
    await user.click(submitButton);

    expect(onSignInMock).toHaveBeenCalledOnce();
    expect(onSignInMock).toHaveBeenCalledWith(formValue);
  });

  describe('form error messages', () => {
    describe('email', () => {
      it('should display EMAIL_REQUIRED_MESSAGE message if the field is empty', async () => {
        const user = userEvent.setup();
        render(
          <SignInForm onSignIn={vi.fn()} serverErrors={NO_SERVER_ERRORS} />
        );

        await user.clear(screen.getByTestId(EMAIL_INPUT_ID));
        await user.click(screen.getByTestId(SUBMIT_BTN_ID));

        const errorMessageEl = screen.getByTestId(EMAIL_MESSAGE_ID);

        expect(errorMessageEl).toBeTruthy();
        expect(errorMessageEl.textContent).toContain(EMAIL_REQUIRED_MESSAGE);
      });

      it('should display EMAIL_INVALID_MESSAGE message if the field contains an invalid email', async () => {
        const user = userEvent.setup();
        render(
          <SignInForm onSignIn={vi.fn()} serverErrors={NO_SERVER_ERRORS} />
        );

        await user.type(screen.getByTestId(EMAIL_INPUT_ID), 'a@a');
        await user.click(screen.getByTestId(SUBMIT_BTN_ID));

        const errorMessageEl = screen.getByTestId(EMAIL_MESSAGE_ID);
        expect(errorMessageEl).toBeTruthy();
        expect(errorMessageEl.textContent).toContain(EMAIL_INVALID_MESSAGE);
      });
    });

    describe('password', () => {
      it('should display PASSWORD_REQUIRED_MESSAGE message if the field is empty', async () => {
        const user = userEvent.setup();
        render(
          <SignInForm onSignIn={vi.fn()} serverErrors={NO_SERVER_ERRORS} />
        );

        await user.clear(screen.getByTestId(PASSWORD_INPUT_ID));
        await user.click(screen.getByTestId(SUBMIT_BTN_ID));

        const errorMessageEl = screen.getByTestId(PASSWORD_MESSAGE_ID);
        expect(errorMessageEl).toBeTruthy();
        expect(errorMessageEl.textContent).toContain(PASSWORD_REQUIRED_MESSAGE);
      });

      it('should display PASSWORD_MIN_LENGTH_MESSAGE message if the field contains less than 6 characters', async () => {
        const user = userEvent.setup();
        render(
          <SignInForm onSignIn={vi.fn()} serverErrors={NO_SERVER_ERRORS} />
        );

        await user.type(screen.getByTestId(PASSWORD_INPUT_ID), '1');
        await user.click(screen.getByTestId(SUBMIT_BTN_ID));

        const errorMessageEl = screen.getByTestId(PASSWORD_MESSAGE_ID);
        expect(errorMessageEl).toBeTruthy();
        expect(errorMessageEl.textContent).toContain(
          PASSWORD_MIN_LENGTH_MESSAGE
        );
      });
    });
  });
});
