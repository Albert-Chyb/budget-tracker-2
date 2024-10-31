import { PropsWithChildren } from 'react';

export const CMSMobileCardTitle = (props: PropsWithChildren) => {
  return (
    <caption className='text-start p-3 text-lg border-b-2'>
      {props.children}
    </caption>
  );
};
