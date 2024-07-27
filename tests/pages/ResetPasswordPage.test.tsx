import { ResetPasswordFormProps } from '@components/ResetPasswordForm';
import { resetPassword } from '@lib/auth/reset-password';
import { ResetPasswordFormValue } from '@lib/form-resolvers/reset-password-form';
import { ResetPasswordPage } from '@pages/ResetPasswordPage';
import { DialogProps } from '@radix-ui/react-dialog';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const RESET_PASSWORD_FORM_VALUE: ResetPasswordFormValue = {
  email: 'a@a.com',
};

vi.mock('@shadcn/components/ui/dialog', async () => ({
  ...(await vi.importActual('@shadcn/components/ui/dialog')),
  Dialog: (props: DialogProps) => (
    <div data-testid='dialog' data-is-opened={props.open ?? false}></div>
  ),
}));

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
  let isDialogOpened: () => boolean;

  beforeEach(() => {
    renderResetPasswordPage = () => {
      render(<ResetPasswordPage />, { wrapper: MemoryRouter });

      invokeResetPasswordFunction = () =>
        fireEvent.click(screen.getByTestId('reset-password-form'));

      isLoading = () =>
        screen
          .getByTestId('reset-password-form')
          .getAttribute('data-is-loading') === 'true';

      isDialogOpened = () =>
        screen.getByTestId('dialog').getAttribute('data-is-opened') === 'true';
    };
  });

  it('should start with isLoading state set to false', () => {
    renderResetPasswordPage();

    expect(isLoading()).toBe(false);
  });

  it('should start with isDialogOpened state set to false', () => {
    renderResetPasswordPage();

    expect(isDialogOpened()).toBe(false);
  });

  describe('handleResetPassword', () => {
    it('should set isDialogOpened state to false before resetPassword() function is called', () => {
      renderResetPasswordPage();
      invokeResetPasswordFunction();

      expect(isDialogOpened()).toBe(false);
    });

    it('should set isDialogOpened state to true after resetPassword() function resolved the promise', async () => {
      renderResetPasswordPage();
      invokeResetPasswordFunction();

      await waitFor(() => expect(isDialogOpened()).toBe(true));
    });

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
