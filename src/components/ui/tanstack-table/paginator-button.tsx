import { ComponentProps } from 'react';
import { Button } from '../button';
import { Tooltip, TooltipContent, TooltipTrigger } from '../tooltip';

export function TanStackTablePaginatorButton(
  props: TanStackTablePaginatorButtonProps
) {
  const { isActive, ...btnProps } = props;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant={isActive ? 'outline' : 'ghost'} {...btnProps} />
      </TooltipTrigger>

      <TooltipContent>{btnProps['aria-label']}</TooltipContent>
    </Tooltip>
  );
}

export type TanStackTablePaginatorButtonProps = {
  isActive?: boolean;
} & ComponentProps<'button'>;
