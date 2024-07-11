import FormRootMessage from '@components/FormRootMessage';
import { render, screen } from '@testing-library/react';
import { useFormState, UseFormStateReturn } from 'react-hook-form';
import { describe, expect, it, vi } from 'vitest';

const ERROR_ALERT_ID = 'error-alert';
const ERROR_ALERT_MSG_ID = 'error-alert-message';

vi.mock('react-hook-form', () => {
  return {
    useFormState: vi.fn().mockReturnValue({
      errors: {
        root: undefined,
      },
    }),
  };
});

describe('FormRootMessageComponent', () => {
  it('should display nothing if the is no error', async () => {
    const errors = {
      root: undefined,
    };
    const mockedFormState = { errors } as UseFormStateReturn<object>;

    vi.mocked(useFormState).mockReturnValue(mockedFormState);
    render(<FormRootMessage />);

    expect(screen.queryByTestId(ERROR_ALERT_ID)).not.toBeInTheDocument();
    expect(FormRootMessage()).toBe(undefined);
  });

  it('should display the error message if an error is present', async () => {
    const errors = {
      root: {
        message: 'ABC',
        type: 'testing-error',
      },
    };
    const mockedFormState = { errors } as UseFormStateReturn<object>;

    vi.mocked(useFormState).mockReturnValue(mockedFormState);
    render(<FormRootMessage />);

    expect(screen.getByTestId(ERROR_ALERT_MSG_ID).textContent).toContain('ABC');
  });
});
