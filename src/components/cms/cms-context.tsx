import { useMediaQuery } from '@uidotdev/usehooks';
import { createContext, PropsWithChildren, useState } from 'react';
import { useCMSEditorController } from './cms-editor-controller';

type CMSContextValue = {
  isMobile: boolean;
  handleEditorMutation: <T>(mutation: Promise<T>) => Promise<T>;
  isDismissible: boolean;
};

type CMSContextProps = PropsWithChildren;

const CMS_CONTEXT_VALUE: CMSContextValue = {
  isMobile: false,
  handleEditorMutation(m) {
    return m;
  },
  isDismissible: true,
};

export const CMSContext = createContext<CMSContextValue>(CMS_CONTEXT_VALUE);

export function CMSContextProvider(props: CMSContextProps) {
  const editor = useCMSEditorController();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [isDismissible, setIsDismissible] = useState(true);
  const { children } = props;

  async function handleEditorMutation<T>(mutation: Promise<T>) {
    setIsDismissible(false);

    try {
      return await mutation;
    } finally {
      setIsDismissible(true);
      editor.close();
    }
  }

  return (
    <CMSContext.Provider
      value={{
        isMobile,
        handleEditorMutation,
        isDismissible,
      }}
    >
      {children}
    </CMSContext.Provider>
  );
}
