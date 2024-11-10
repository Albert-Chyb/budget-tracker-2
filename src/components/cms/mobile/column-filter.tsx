import { Button } from '@/components/ui/button';
import { TypographyLarge, TypographyMuted } from '@/components/ui/typography';
import { ChildColumnFilterProps } from '../column-filter';

export const MobileColumnFilter = (props: ChildColumnFilterProps) => {
  const { columnName, children, column, inWrapper } = props;

  function handleColumnFiltersReset() {
    column.setFilterValue(undefined);
  }

  if (!inWrapper) {
    return children;
  }

  return (
    <>
      <section>
        <header className='mb-2'>
          <TypographyLarge>
            <h2>Filtry kolumny: {columnName}</h2>
          </TypographyLarge>

          <TypographyMuted>
            Wypełnij poniższy formularz, aby zastosować filtr.
          </TypographyMuted>
        </header>

        {children}

        <Button
          type='button'
          variant='secondary'
          className='mt-2 w-full'
          onClick={handleColumnFiltersReset}
        >
          Wyczyść
        </Button>
      </section>
    </>
  );
};
