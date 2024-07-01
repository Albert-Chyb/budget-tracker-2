import { Button, ButtonProps } from '@shadcn/components/ui/button';
import { Loader2 } from 'lucide-react';
import { PropsWithChildren } from 'react';

export function LoadingButton({
  isLoading = false,
  children,
  ...props
}: LoadingButtonProps) {
  return (
    <Button disabled={isLoading} {...props} data-testid='loading-button'>
      {isLoading && (
        <Loader2
          className='mr-2 h-4 w-4 animate-spin'
          data-testid='spinning-circle'
        />
      )}
      {children}
    </Button>
  );
}

export type LoadingButtonProps = PropsWithChildren<{
  isLoading?: boolean;
}> &
  ButtonProps;
