import { PropsWithChildren } from 'react';
import { buttonVariants } from '../button';

export function TanStackTablePaginatorPlaceholderBtn(props: PropsWithChildren) {
  const { children } = props;

  return (
    <div
      className={buttonVariants({
        variant: 'ghost',
        className: 'pointer-events-none',
      })}
    >
      {children}
    </div>
  );
}
