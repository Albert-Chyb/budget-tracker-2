import { useMediaQuery } from '@uidotdev/usehooks';
import { createContext, PropsWithChildren } from 'react';

type CMSContextValue = {
  isMobile: boolean;
};

type CMSContextProps = PropsWithChildren;

const CMS_CONTEXT_VALUE: CMSContextValue = {
  isMobile: false,
};

export const CMSContext = createContext<CMSContextValue>(CMS_CONTEXT_VALUE);

export function CMSContextProvider(props: CMSContextProps) {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const { children } = props;

  return (
    <CMSContext.Provider
      value={{
        isMobile,
      }}
    >
      {children}
    </CMSContext.Provider>
  );
}
