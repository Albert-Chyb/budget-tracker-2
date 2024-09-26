import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

export const CMS_EDITOR_OPEN_STATE_QUERY_PARAM_KEY = 'cms-open-editor-id';

export function useCMSEditorController() {
  const [searchParams, setSearchParams] = useSearchParams();

  const open = useCallback(
    (id: string) => {
      setSearchParams(
        (params) => {
          params.set(CMS_EDITOR_OPEN_STATE_QUERY_PARAM_KEY, id);

          return params;
        },
        { replace: true }
      );
    },
    [setSearchParams]
  );

  const close = useCallback(() => {
    setSearchParams(
      (params) => {
        params.delete(CMS_EDITOR_OPEN_STATE_QUERY_PARAM_KEY);

        return params;
      },
      { replace: true }
    );
  }, [setSearchParams]);

  const current = searchParams.get(CMS_EDITOR_OPEN_STATE_QUERY_PARAM_KEY);

  const controller = useMemo(
    () => ({
      open,
      close,
      current,
    }),
    [close, current, open]
  );

  return controller;
}
