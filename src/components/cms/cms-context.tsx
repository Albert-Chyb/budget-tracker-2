import { useMediaQuery } from '@uidotdev/usehooks';
import { createContext, PropsWithChildren } from 'react';

type CMSContextValue = {
  isMobile: boolean;
  onSubmit: () => void;
};

type CMSContextProps = PropsWithChildren<{
  onSubmit: () => void;
}>;

const CMS_CONTEXT_VALUE: CMSContextValue = {
  isMobile: false,
  onSubmit() {},
};

export const CMSContext = createContext<CMSContextValue>(CMS_CONTEXT_VALUE);

export function CMSContextProvider(props: CMSContextProps) {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const { children, onSubmit } = props;

  return (
    <CMSContext.Provider
      value={{
        isMobile,
        onSubmit,
      }}
    >
      {children}
    </CMSContext.Provider>
  );
}
