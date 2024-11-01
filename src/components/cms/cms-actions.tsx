import {
  ComponentPropsWithRef,
  ForwardedRef,
  forwardRef,
  PropsWithChildren,
  ReactNode,
  useContext,
} from 'react';
import { twMerge } from 'tailwind-merge';
import { Button } from '../ui/button';
import { CMSContext } from './cms-context';

export const CMSActionsButtons = (props: PropsWithChildren) => {
  const { children } = props;

  return <div className='flex gap-x-2'>{children}</div>;
};

export const CMSActionButton = forwardRef(
  (
    props: CMSActionButtonProps,
    forwardedRef: ForwardedRef<HTMLButtonElement>
  ) => {
    const { icon, children, className, ...otherProps } = props;
    const { isMobile } = useContext(CMSContext);

    return (
      <Button
        size={isMobile ? 'default' : 'icon'}
        className={twMerge(className, 'basis-full')}
        {...otherProps}
        ref={forwardedRef}
      >
        {isMobile ? children : icon}
      </Button>
    );
  }
);

export type CMSActionButtonProps = ComponentPropsWithRef<typeof Button> & {
  icon: ReactNode;
};
