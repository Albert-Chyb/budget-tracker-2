import { PropsWithChildren } from 'react';

export function TanStackTablePaginatorPageIndex(
  props: TanStackTablePaginatorIndexProps
) {
  const { pageCount, children } = props;

  const lastIndexCharactersCount = String(pageCount).length;

  return (
    <span
      style={{ minWidth: `${lastIndexCharactersCount}ch` }}
      className='text-center inline-block'
    >
      {children}
    </span>
  );
}
type TanStackTablePaginatorIndexProps = PropsWithChildren<{
  pageCount: number;
}>;
