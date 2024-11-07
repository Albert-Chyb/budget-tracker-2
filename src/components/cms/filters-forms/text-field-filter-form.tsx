import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useDebounce } from '@uidotdev/usehooks';
import { useContext, useEffect, useId, useState } from 'react';
import {
  CMSTableFilterContext,
  CMSTableFilterContextValue,
} from '../cms-table-filter-trigger';

export function TextFieldFilterForm() {
  const { setFilterValue, filterValue } = useContext(
    CMSTableFilterContext
  ) as CMSTableFilterContextValue<string>;
  const [searchedTerm, setSearchedTerm] = useState(filterValue ?? '');
  const debouncedTerm = useDebounce(searchedTerm, 300);
  const inputId = useId();

  useEffect(() => {
    setFilterValue(debouncedTerm);
  }, [debouncedTerm, setFilterValue]);

  return (
    <form onSubmit={($event) => $event.preventDefault()}>
      <Label htmlFor={inputId} className='inline-block mb-3'>
        Wpisz szukaną frazę
      </Label>

      <Input
        id={inputId}
        type='text'
        placeholder='Szukana fraza'
        onChange={($event) => setSearchedTerm($event.target.value)}
        value={searchedTerm}
      />
    </form>
  );
}
