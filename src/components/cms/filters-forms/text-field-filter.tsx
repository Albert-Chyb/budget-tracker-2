import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useDebounce } from '@uidotdev/usehooks';
import {
  ComponentProps,
  ComponentRef,
  ForwardedRef,
  forwardRef,
  useEffect,
  useId,
  useState,
} from 'react';
import { ColumnFilter, ColumnFilterProps } from '../column-filter';

export const TextInputColumnFilter = forwardRef(
  (
    props: ComponentProps<typeof Input> & ColumnFilterProps,
    forwardedRef: ForwardedRef<ComponentRef<typeof Input>>
  ) => {
    const { column, columnName, ...inputProps } = props;
    const setFilterValue = column.setFilterValue;
    const filterValue = column.getFilterValue();
    const [searchedTerm, setSearchedTerm] = useState(filterValue ?? '');
    const debouncedTerm = useDebounce(searchedTerm, 300);
    const inputId = useId();

    useEffect(() => {
      setFilterValue(debouncedTerm);
    }, [debouncedTerm, setFilterValue]);

    useEffect(() => {
      setSearchedTerm(filterValue ?? '');
    }, [filterValue]);

    const inputValue = typeof searchedTerm === 'string' ? searchedTerm : '';

    return (
      <ColumnFilter column={column} columnName={columnName}>
        <form onSubmit={($event) => $event.preventDefault()}>
          <Label htmlFor={inputId} className='inline-block mb-3'>
            Wpisz szukaną frazę
          </Label>

          <Input
            id={inputId}
            type='text'
            placeholder='Szukana fraza'
            onChange={($event) => setSearchedTerm($event.target.value)}
            value={inputValue}
            ref={forwardedRef}
            {...inputProps}
          />
        </form>
      </ColumnFilter>
    );
  }
);
