import { useMediaQuery } from '@uidotdev/usehooks';
import { createContext, PropsWithChildren, useState } from 'react';
import { useCMSEditorController } from './cms-editor-controller';

type CMSContextValue = {
  isMobile: boolean;
  handleEditorMutation: <T>(mutation: Promise<T>) => Promise<T>;
  isSubmitting: boolean;
};

type CMSContextProps = PropsWithChildren;

const CMS_CONTEXT_VALUE: CMSContextValue = {
  isMobile: false,
  handleEditorMutation(m) {
    return m;
  },
  isSubmitting: false,
};

export const CMSContext = createContext<CMSContextValue>(CMS_CONTEXT_VALUE);

export function CMSContextProvider(props: CMSContextProps) {
  const editor = useCMSEditorController();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { children } = props;

  async function handleEditorMutation<T>(mutation: Promise<T>) {
    setIsSubmitting(true);

    try {
      return await mutation;
    } finally {
      setIsSubmitting(false);
      editor.close();
    }
  }

  return (
    <CMSContext.Provider
      value={{
        isMobile,
        handleEditorMutation,
        isSubmitting,
      }}
    >
      {children}
    </CMSContext.Provider>
  );
}
