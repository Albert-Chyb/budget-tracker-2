import { useMediaQuery } from '@uidotdev/usehooks';
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useFetcher } from 'react-router-dom';
import { SubmitTarget } from 'react-router-dom/dist/dom';
import { useCMSEditorController } from './cms-editor-controller';

type CMSContextValue = {
  isMobile: boolean;
  submit: (target: SubmitTarget | null) => void;
  isSubmitting: boolean;
};

type CMSContextProps = PropsWithChildren;

const CMS_CONTEXT_VALUE: CMSContextValue = {
  isMobile: false,
  submit() {},
  isSubmitting: false,
};

export const CMSContext = createContext<CMSContextValue>(CMS_CONTEXT_VALUE);

export function CMSContextProvider(props: CMSContextProps) {
  const editor = useCMSEditorController();
  const fetcher = useFetcher();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const { children } = props;
  const [fetcherPrevState, setFetcherPrevState] = useState<string | null>(null);

  useEffect(() => () => setFetcherPrevState(fetcher.state), [fetcher.state]);

  useEffect(() => {
    // Automatically close the editor after fetcher finished request

    if (fetcherPrevState === 'submitting') {
      editor.close();
    }
  }, [editor, fetcherPrevState]);

  const handleEditorSubmit = useCallback(
    (target) => {
      if (target) {
        fetcher.submit(target);
      }
    },
    [fetcher]
  ) satisfies CMSContextValue['submit'];

  return (
    <CMSContext.Provider
      value={{
        isMobile,
        submit: handleEditorSubmit,
        isSubmitting: fetcher.state === 'submitting',
      }}
    >
      {children}
    </CMSContext.Provider>
  );
}
