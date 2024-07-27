import { ResetPasswordFormProps } from '@components/ResetPasswordForm';
import { resetPassword } from '@lib/auth/reset-password';
import { ResetPasswordFormValue } from '@lib/form-resolvers/reset-password-form';
import { ResetPasswordPage } from '@pages/ResetPasswordPage';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const RESET_PASSWORD_FORM_VALUE: ResetPasswordFormValue = {
  email: 'a@a.com',
};

vi.mock('@components/ResetPasswordForm', async () => ({
  ...(await vi.importActual('@components/ResetPasswordForm')),
  default: (props: ResetPasswordFormProps) => (
    <div
      data-is-loading={props.isLoading ?? false}
      data-testid='reset-password-form'
      onClick={() => props.onResetPassword?.({ ...RESET_PASSWORD_FORM_VALUE })}
    ></div>
  ),
}));

vi.mock('@lib/auth/reset-password', async () => ({
  ...(await vi.importActual('@lib/auth/reset-password')),
  resetPassword: vi.fn(),
}));

describe('ResetPasswordPage', () => {
  let renderResetPasswordPage: () => void;
  let invokeResetPasswordFunction: () => void;
  let isLoading: () => boolean;

  beforeEach(() => {
    renderResetPasswordPage = () => {
      render(<ResetPasswordPage />, { wrapper: MemoryRouter });

      invokeResetPasswordFunction = () =>
        fireEvent.click(screen.getByTestId('reset-password-form'));

      isLoading = () =>
        screen
          .getByTestId('reset-password-form')
          .getAttribute('data-is-loading') === 'true';
    };
  });

  it('should start with isLoading state set to false', () => {
    renderResetPasswordPage();

    expect(isLoading()).toBe(false);
  });

  describe('handleResetPassword', () => {
    it('should set isLoading state to true before resetPassword() function in called', () => {
      renderResetPasswordPage();
      invokeResetPasswordFunction();

      expect(isLoading()).toBe(true);
    });

    it('should set isLoading state to true after resetPassword() resolved the promise', async () => {
      renderResetPasswordPage();
      invokeResetPasswordFunction();

      await waitFor(() => expect(isLoading()).toBe(false));
    });

    it('should call the resetPassword() function with email from the form', () => {
      renderResetPasswordPage();
      invokeResetPasswordFunction();

      expect(resetPassword).toHaveBeenCalledWith(
        RESET_PASSWORD_FORM_VALUE.email
      );
    });
  });
});
