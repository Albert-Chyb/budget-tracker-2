import { zodResolver } from '@hookform/resolvers/zod';
import {
  EMAIL_INVALID_MESSAGE,
  EMAIL_REQUIRED_MESSAGE,
  emailSchema,
} from '@lib/form-resolvers/email-field';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@shadcn/components/ui/form';
import { Input } from '@shadcn/components/ui/input';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useForm } from 'react-hook-form';
import { describe, expect, it } from 'vitest';
import { z } from 'zod';

function FormWithEmailField() {
  const form = useForm({
    resolver: zodResolver(
      z.object({
        email: emailSchema,
      })
    ),
    defaultValues: {
      email: '',
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(() => {})}>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input data-testid='input' type='email' {...field} />
              </FormControl>

              <FormMessage data-testid='input-errors' />
            </FormItem>
          )}
        />
        <button type='submit' data-testid='submit-btn'>
          Submit
        </button>
      </form>
    </Form>
  );
}

describe('email field', () => {
  it('should render the EMAIL_REQUIRED_MESSAGE message if the email field contains an empty string', async () => {
    const user = userEvent.setup();

    render(<FormWithEmailField />);

    await user.clear(screen.getByTestId('input'));
    await user.click(screen.getByTestId('submit-btn'));

    expect(screen.getByTestId('input-errors').textContent).toContain(
      EMAIL_REQUIRED_MESSAGE
    );
  });

  it('should render the EMAIL_INVALID_MESSAGE message if the email field contains an invalid email', async () => {
    const user = userEvent.setup();

    render(<FormWithEmailField />);

    await user.type(screen.getByTestId('input'), 'a@com');
    await user.click(screen.getByTestId('submit-btn'));

    expect(screen.getByTestId('input-errors').textContent).toContain(
      EMAIL_INVALID_MESSAGE
    );
  });
});
