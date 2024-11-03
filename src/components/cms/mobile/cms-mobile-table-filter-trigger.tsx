import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { TypographyLarge, TypographyMuted } from '@/components/ui/typography';
import { CMSChildTableFilterTriggerProps } from '../cms-table-filter-trigger';

export const CMSMobileTableFilterTrigger = (
  props: CMSChildTableFilterTriggerProps
) => {
  const { columnName, children, column } = props;

  function handleColumnFiltersReset() {
    column.setFilterValue(undefined);
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

      <Separator className='my-4' />
    </>
  );
};
