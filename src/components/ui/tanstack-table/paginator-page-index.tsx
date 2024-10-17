import { PropsWithChildren } from 'react';

export function TanStackTablePaginatorPageIndex(
  props: TanStackTablePaginatorIndexProps
) {
  const { pageCount, children } = props;

  const lastIndexCharactersCount = String(pageCount).length;

  return (
    <div
      style={{ minWidth: `${lastIndexCharactersCount}ch` }}
      className='text-center'
    >
      {children}
    </div>
  );
}
type TanStackTablePaginatorIndexProps = PropsWithChildren<{
  pageCount: number;
}>;
