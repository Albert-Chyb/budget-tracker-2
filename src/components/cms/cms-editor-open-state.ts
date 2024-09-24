import { useSearchParams } from 'react-router-dom';

export const CMS_EDITOR_OPEN_STATE_QUERY_PARAM_KEY = 'cms-open-editor-id';

export function useCMSEditorOpenState(id: CMSEditorOpenStateId) {
  const [searchParams, setSearchParams] = useSearchParams();

  function handleOpenChange(open: boolean) {
    if (!open) {
      setSearchParams(
        (params) => {
          params.delete(CMS_EDITOR_OPEN_STATE_QUERY_PARAM_KEY);

          return params;
        },
        { replace: true }
      );
    } else {
      setSearchParams(
        (params) => {
          params.set(CMS_EDITOR_OPEN_STATE_QUERY_PARAM_KEY, id);

          return params;
        },
        { replace: true }
      );
    }
  }

  const isOpened: boolean =
    searchParams.get(CMS_EDITOR_OPEN_STATE_QUERY_PARAM_KEY) === id;

  return [isOpened, handleOpenChange] as const;
}

export type CMSEditorOpenStateId = string | 'editor';
