import { useFetcherWithLifecycle } from '@/hooks/fetcher-with-lifecycle';
import { useMediaQuery } from '@uidotdev/usehooks';
import { createContext, PropsWithChildren, Suspense, useCallback } from 'react';
import { Await, useLoaderData } from 'react-router-dom';
import { SubmitTarget } from 'react-router-dom/dist/dom';
import { useCMSEditorController } from './cms-editor-controller';
import CMSMobileLoadingSkeleton from './mobile/cms-mobile-loading-skeleton';

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
  const { data } = useLoaderData() as {
    data: Promise<Record<string, unknown>>;
  };

  const editor = useCMSEditorController();
  const fetcher = useFetcherWithLifecycle({
    afterSubmit() {
      editor.close();
    },
  });
  const isMobile = useMediaQuery('(max-width: 768px)');
  const { children } = props;

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
      <Suspense fallback={<CMSMobileLoadingSkeleton />}>
        <Await resolve={data}>{children}</Await>
      </Suspense>
    </CMSContext.Provider>
  );
}
