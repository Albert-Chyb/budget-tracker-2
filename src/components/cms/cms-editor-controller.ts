import { useSearchParams } from 'react-router-dom';

export const CMS_EDITOR_OPEN_STATE_QUERY_PARAM_KEY = 'cms-open-editor-id';

export function useCMSEditorController() {
  const [searchParams, setSearchParams] = useSearchParams();

  return {
    open(id: string) {
      setSearchParams(
        (params) => {
          params.set(CMS_EDITOR_OPEN_STATE_QUERY_PARAM_KEY, id);

          return params;
        },
        { replace: true }
      );
    },

    close() {
      setSearchParams(
        (params) => {
          params.delete(CMS_EDITOR_OPEN_STATE_QUERY_PARAM_KEY);

          return params;
        },
        { replace: true }
      );
    },

    current: searchParams.get(CMS_EDITOR_OPEN_STATE_QUERY_PARAM_KEY),
  };
}
