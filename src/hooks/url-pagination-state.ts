import { PaginationState, Updater } from '@tanstack/react-table';
import { useSearchParams } from 'react-router-dom';

export function useURLPaginationState(defaults: PaginationState) {
  const { pageIndex: defaultPageIndex, pageSize: defaultPageSize } = defaults;

  const [queryParams, setQueryParams] = useSearchParams({
    pageIndex: String(defaultPageIndex),
    pageSize: String(defaultPageSize),
  });

  const pageIndex = Number(queryParams.get('pageIndex'));
  const pageSize = Number(queryParams.get('pageSize'));
  const paginationState: PaginationState = {
    pageIndex,
    pageSize,
  };

  const updateQueryParams = (newPagination: PaginationState) => {
    const { pageIndex, pageSize } = newPagination;

    setQueryParams({
      pageIndex: String(pageIndex),
      pageSize: String(pageSize),
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
