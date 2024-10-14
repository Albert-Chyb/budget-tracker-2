import { TCategoryType } from '@/lib/db-schemas/category';
import { SquareMinus, SquarePlus } from 'lucide-react';

export function CategoryTypeLabel(props: CategoryTypeLabelProps) {
  const { type } = props;

  return (
    <div className='flex gap-x-2 items-center'>
      <span>{type === 'expense' ? <SquareMinus /> : <SquarePlus />}</span>
      <span>{type === 'expense' ? 'Wydatek' : 'Przychód'}</span>
    </div>
  );
}

export type CategoryTypeLabelProps = {
  type: TCategoryType;
};
