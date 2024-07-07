import FormRootMessage from '@components/FormRootMessage';
import { render, screen } from '@testing-library/react';
import { UseFormStateReturn } from 'react-hook-form';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const ERROR_ALERT_ID = 'error-alert';
const ERROR_ALERT_MSG_ID = 'error-alert-message';

describe('FormRootMessageComponent', () => {
  beforeEach(() => {
    vi.mock('react-hook-form', () => {
      return {
        useFormState: vi.fn().mockReturnValue({
          errors: {
            root: undefined,
          },
        }),
      };
    });
  });

  it('should display nothing if the is no error', async () => {
    const module = await import('react-hook-form');
    const errors = {
      root: undefined,
    };
    const mockedFormState = { errors } as UseFormStateReturn<object>;

    vi.mocked(module.useFormState).mockReturnValue(mockedFormState);
    render(<FormRootMessage />);

    expect(screen.queryByTestId(ERROR_ALERT_ID)).not.toBeInTheDocument();
    expect(FormRootMessage()).toBe(undefined);
  });

  it('should display the error message if an error is present', async () => {
    const module = await import('react-hook-form');
    const errors = {
      root: {
        message: 'ABC',
        type: 'testing-error',
      },
    };
    const mockedFormState = { errors } as UseFormStateReturn<object>;

    vi.mocked(module.useFormState).mockReturnValue(mockedFormState);
    render(<FormRootMessage />);

    expect(screen.getByTestId(ERROR_ALERT_MSG_ID).textContent).toContain('ABC');
  });
});
