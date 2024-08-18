import { LoadingButton } from '@/components/loading-button';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('LoadingButton', () => {
  it('should have disabled button if isLoading prop is set to true', () => {
    render(<LoadingButton isLoading={true}></LoadingButton>);

    const btn = screen.getByTestId('loading-button') as HTMLButtonElement;

    expect(btn.disabled).toBe(true);
  });

  it('should have enabled button if isLoading prop is set to false', () => {
    render(<LoadingButton isLoading={false}></LoadingButton>);

    const btn = screen.getByTestId('loading-button') as HTMLButtonElement;

    expect(btn.disabled).toBe(false);
  });

  it('should show the spinning circle if isLoading prop is set to true', () => {
    render(<LoadingButton isLoading={true}></LoadingButton>);

    const spinningCircle = screen.getByTestId('spinning-circle');

    expect(spinningCircle).toBeTruthy();
  });

  it('should hide the spinning circle if isLoading prop is set to false', () => {
    render(<LoadingButton isLoading={false}></LoadingButton>);

    const spinningCircle = screen.queryByTestId('spinning-circle');

    expect(spinningCircle).toBeFalsy();
  });

  it('should render its children', () => {
    render(
      <LoadingButton isLoading={false}>
        <span data-testid='child'>1</span>
      </LoadingButton>
    );

    const childEl = screen.getByTestId('child');

    expect(childEl).toBeTruthy();
  });
});
