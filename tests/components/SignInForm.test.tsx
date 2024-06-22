import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import SignInForm, {
  FormValue as SignInFormValue,
} from '../../src/components/SignInForm';

describe('SignInForm', () => {
  it('should render the sign in form', () => {
    render(<SignInForm onSignIn={vi.fn()} />);
  });

  it('should call the onSignIn callback after submission of a valid form', async () => {
    const onSignInMock = vi.fn();
    const formValue: SignInFormValue = {
      email: 'a@a.com',
      password: '123456',
    };
    const user = userEvent.setup();

    render(<SignInForm onSignIn={onSignInMock} />);

    const emailInput: HTMLInputElement = screen.getByTestId('email-input');
    const passwordInput: HTMLInputElement =
      screen.getByTestId('password-input');
    const submitButton: HTMLButtonElement = screen.getByTestId('submit-button');

    await user.type(emailInput, formValue.email);
    await user.type(passwordInput, formValue.password);
    await user.click(submitButton);

    expect(onSignInMock).toHaveBeenCalledOnce();
    expect(onSignInMock).toHaveBeenCalledWith(formValue);
  });
});
