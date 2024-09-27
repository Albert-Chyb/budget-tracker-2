import { useEffect, useState } from 'react';
import { useFetcher } from 'react-router-dom';

export function useFetcherWithLifecycle<T = unknown>(
  lifecycle: FetcherLifecycle
) {
  const fetcher = useFetcher<T>();
  const [fetcherPrevState, setFetcherPrevState] = useState<string | null>(null);

  useEffect(() => () => setFetcherPrevState(fetcher.state), [fetcher.state]);

  useEffect(() => {
    if (fetcherPrevState === 'submitting') {
      lifecycle.afterSubmit?.();
    }
  }, [fetcherPrevState, lifecycle]);

  return fetcher;
}

export type FetcherLifecycle = Partial<{
  afterSubmit: () => void;
}>;
