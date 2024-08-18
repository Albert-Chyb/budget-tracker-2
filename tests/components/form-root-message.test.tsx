import FormRootMessage from '@/components/form-root-message';
import { render, screen } from '@testing-library/react';
import { useFormState, UseFormStateReturn } from 'react-hook-form';
import { describe, expect, it, vi } from 'vitest';

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
    const { container } = render(<FormRootMessage />);

    expect(container.querySelector('*')).toBeNull();
  });

  it('should display the error message if an error is present', async () => {
    const message = vi.hoisted(() => 'Some error message !');
    const errors = {
      root: {
        message,
        type: 'testing-error',
      },
    };
    const mockedFormState = { errors } as UseFormStateReturn<object>;

    vi.mocked(useFormState).mockReturnValue(mockedFormState);
    render(<FormRootMessage />);

    expect(screen.queryByText(message)).toBeInTheDocument();
  });
});
