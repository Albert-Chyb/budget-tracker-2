import ResetPasswordForm, {
  ResetPasswordFormProps,
} from '@/components/auth/reset-password-form';
import { ResetPasswordFormValue } from '@/lib/form-resolvers/reset-password-form';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const VALID_FORM_VALUE: ResetPasswordFormValue = {
  email: 'a@a.com',
};

describe('ResetPasswordForm', () => {
  let renderResetPasswordForm: (props: ResetPasswordFormProps) => void;
  let submitForm: (formValue?: ResetPasswordFormValue) => Promise<void>;

  beforeEach(() => {
    const user = userEvent.setup();

    renderResetPasswordForm = (props: ResetPasswordFormProps) => {
      render(<ResetPasswordForm {...props} />);
    };

    submitForm = async (value: ResetPasswordFormValue = VALID_FORM_VALUE) => {
      await user.type(screen.getByTestId('email-input'), value.email);
      await user.click(screen.getByTestId('submit-btn'));
    };
  });

  it('should call the onResetPassword callback after a valid form was submitted', async () => {
    const spy = vi.fn();

    renderResetPasswordForm({ onResetPassword: spy });
    await submitForm();

    expect(spy).toHaveBeenCalledWith(VALID_FORM_VALUE);
  });
});
