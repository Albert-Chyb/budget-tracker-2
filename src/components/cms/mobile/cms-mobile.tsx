import { PropsWithChildren } from 'react';

export function CMSMobile(props: PropsWithChildren) {
  const { children } = props;

  return <ul className='space-y-2'>{children}</ul>;
}
