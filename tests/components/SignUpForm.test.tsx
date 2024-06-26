import SignUpForm, { SignUpFormServerErrors } from '@components/SignUpForm';
import { EMAIL_ALREADY_IN_USE_MESSAGE } from '@lib/schemas/forms/email';
import { SignUpFormValue } from '@lib/schemas/forms/signUpForm';
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
});
