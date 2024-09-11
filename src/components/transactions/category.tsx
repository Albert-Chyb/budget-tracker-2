import { TCategory } from '@/lib/db-schemas/category';

export default function Category({ category }: CategoryProps) {
  return (
    <h3 className='font-bold uppercase text-center'>
      {category.name}
    </h3>
  );
}

export type CategoryProps = {
  category: TCategory;
};
