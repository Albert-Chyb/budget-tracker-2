import { categoryTypeLabel, TCategoryType } from '@/lib/db-schemas/category';
import { SquareMinus, SquarePlus } from 'lucide-react';

export function CategoryTypeLabel(props: CategoryTypeLabelProps) {
  const { type } = props;

  return (
    <div className='flex gap-x-2 items-center'>
      <span aria-hidden="true">{type === 'expense' ? <SquareMinus /> : <SquarePlus />}</span>
      <span>{categoryTypeLabel[type]}</span>
    </div>
  );
}

export type CategoryTypeLabelProps = {
  type: TCategoryType;
};
