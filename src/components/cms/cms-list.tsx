import { PropsWithChildren } from 'react';

export default function CmsList({ children }: PropsWithChildren) {
  return <ul className='flex flex-col space-y-2'>{children}</ul>;
}
