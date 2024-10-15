import { PaginationState, Updater } from '@tanstack/react-table';
import { useSearchParams } from 'react-router-dom';

export function useURLPaginationState(initialState: PaginationState) {
  const [queryParams, setQueryParams] = useSearchParams();

  const pageIndex = Number(
    queryParams.get('pageIndex') ?? initialState.pageIndex
  );
  const pageSize = Number(queryParams.get('pageSize') ?? initialState.pageSize);
  const paginationState: PaginationState = {
    pageIndex,
    pageSize,
  };

  const updateQueryParams = (newPagination: PaginationState) => {
    const { pageIndex, pageSize } = newPagination;

    setQueryParams((params) => {
      params.set('pageIndex', String(pageIndex));
      params.set('pageSize', String(pageSize));

      return params;
    });
  };

  function handleNewPaginationState(updaterOrValue: Updater<PaginationState>) {
    if (typeof updaterOrValue === 'function') {
      updateQueryParams(updaterOrValue(paginationState));
    } else {
      updateQueryParams(updaterOrValue);
    }
  }

  return [paginationState, handleNewPaginationState] as const;
}
