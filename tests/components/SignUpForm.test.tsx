import SignUpForm, { SignUpFormServerErrors } from '@components/SignUpForm';
import {
  EMAIL_ALREADY_IN_USE_MESSAGE,
  EMAIL_INVALID_MESSAGE,
  EMAIL_REQUIRED_MESSAGE,
} from '@lib/form-resolvers/email';
import {
  PASSWORD_MIN_LENGTH_MESSAGE,
  PASSWORD_REQUIRED_MESSAGE,
} from '@lib/form-resolvers/password-field';
import { SignUpFormValue } from '@lib/form-resolvers/sign-up-form';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

const NO_SERVER_ERRORS: Readonly<SignUpFormServerErrors> = Object.freeze({
  emailAlreadyInUse: false,
});

const SUBMIT_BTN_ID = 'submit-btn';
const EMAIL_INPUT_ID = 'email-input';
const PASSWORD_INPUT_ID = 'password-input';
const CONFIRM_PASSWORD_INPUT_ID = 'confirm-password-input';
const EMAIL_ERROR_MESSAGES_ID = 'email-errors';
const PASSWORD_ERROR_MESSAGES_ID = 'password-errors';

describe('SignUpForm', () => {
  it('should render sign up form', () => {
    render(<SignUpForm onSignUp={vi.fn()} serverErrors={NO_SERVER_ERRORS} />);
  });

  it('should call onSignUp callback after a valid form was submitted', async () => {
    const onSignUpMock = vi.fn();
    const formValue: SignUpFormValue = {
      email: 'a@domain.com',
      password: '123456',
      confirmPassword: '123456',
    };
    const user = userEvent.setup();

    render(
      <SignUpForm onSignUp={onSignUpMock} serverErrors={NO_SERVER_ERRORS} />
    );
    await user.type(screen.getByTestId(EMAIL_INPUT_ID), formValue.email);
    await user.type(screen.getByTestId(PASSWORD_INPUT_ID), formValue.password);
    await user.type(
      screen.getByTestId(CONFIRM_PASSWORD_INPUT_ID),
      formValue.confirmPassword
    );
    await user.click(screen.getByTestId(SUBMIT_BTN_ID));

    expect(onSignUpMock).toHaveBeenCalledOnce();
    expect(onSignUpMock).toHaveBeenCalledWith(formValue);
  });

  it('should display EMAIL_ALREADY_IN_USE_MESSAGE when serverErrors.emailAlreadyInUse is set to true', () => {
    render(
      <SignUpForm
        onSignUp={vi.fn()}
        serverErrors={{
          ...NO_SERVER_ERRORS,
          emailAlreadyInUse: true,
        }}
      />
    );

    const errorsEl = screen.getByTestId(EMAIL_ERROR_MESSAGES_ID);

    expect(errorsEl).toBeTruthy();
    expect(errorsEl.textContent).toContain(EMAIL_ALREADY_IN_USE_MESSAGE);
  });

  it('should display EMAIL_REQUIRED_MESSAGE if the user submitted the form with an empty email field', async () => {
    const user = userEvent.setup();

    render(<SignUpForm onSignUp={vi.fn()} serverErrors={NO_SERVER_ERRORS} />);

    await user.clear(screen.getByTestId(EMAIL_INPUT_ID));
    await user.click(screen.getByTestId(SUBMIT_BTN_ID));
    const errorsEl = screen.getByTestId(EMAIL_ERROR_MESSAGES_ID);

    expect(errorsEl).toBeTruthy();
    expect(errorsEl.textContent).toContain(EMAIL_REQUIRED_MESSAGE);
  });

  it('should display EMAIL_INVALID_MESSAGE if the user submitted form with an invalid email', async () => {
    const user = userEvent.setup();

    render(<SignUpForm onSignUp={vi.fn()} serverErrors={NO_SERVER_ERRORS} />);

    await user.type(screen.getByTestId(EMAIL_INPUT_ID), 'invalid_email@d');
    await user.click(screen.getByTestId(SUBMIT_BTN_ID));
    const errorsEl = screen.getByTestId(EMAIL_ERROR_MESSAGES_ID);

    expect(errorsEl).toBeTruthy();
    expect(errorsEl.textContent).toContain(EMAIL_INVALID_MESSAGE);
  });

  it('should display PASSWORD_REQUIRED_MESSAGE if the user submitted form without a password', async () => {
    const user = userEvent.setup();

    render(<SignUpForm onSignUp={vi.fn()} serverErrors={NO_SERVER_ERRORS} />);

    await user.clear(screen.getByTestId(PASSWORD_INPUT_ID));
    await user.click(screen.getByTestId(SUBMIT_BTN_ID));
    const errorsEl = screen.getByTestId(PASSWORD_ERROR_MESSAGES_ID);

    expect(errorsEl).toBeTruthy();
    expect(errorsEl.textContent).toContain(PASSWORD_REQUIRED_MESSAGE);
  });

  it('should display PASSWORD_MIN_LENGTH_MESSAGE if the user submitted form with a password less than 6 characters', async () => {
    const user = userEvent.setup();

    render(<SignUpForm onSignUp={vi.fn()} serverErrors={NO_SERVER_ERRORS} />);

    await user.type(screen.getByTestId(PASSWORD_INPUT_ID), '12345');
    await user.click(screen.getByTestId(SUBMIT_BTN_ID));
    const errorsEl = screen.getByTestId(PASSWORD_ERROR_MESSAGES_ID);

    expect(errorsEl).toBeTruthy();
    expect(errorsEl.textContent).toContain(PASSWORD_MIN_LENGTH_MESSAGE);
  });
});
