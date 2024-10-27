import { ComponentProps } from 'react';

export function pseudoPendingIndicator(isShown: boolean) {
  let className = '';

  if (isShown) {
    className = `
        relative 

        after:content-[''] 
        after:absolute 
        after:top-0 
        after:left-0 
        after:right-0 

        after:bg-orange-500 
        after:h-1

        after:animate-pending-bar 
        after:scale-0 
        after:delay-100
    `;
  }

  return {
    className,
  } satisfies ComponentProps<'base'>;
}
