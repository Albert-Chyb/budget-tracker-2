import { ComponentProps } from 'react';
import { Button } from '../button';

export function TanStackTablePaginatorButton(
  props: TanStackTablePaginatorButtonProps
) {
  const { isActive, ...btnProps } = props;

  return <Button variant={isActive ? 'outline' : 'ghost'} {...btnProps} />;
}

export type TanStackTablePaginatorButtonProps = {
  isActive?: boolean;
} & ComponentProps<'button'>;
