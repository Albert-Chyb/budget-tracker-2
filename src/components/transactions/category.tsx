import { TCategory } from '@/lib/types/category';

export default function Category({ category }: CategoryProps) {
  return (
    <h3 className='p-5 text-3xl font-bold uppercase text-center'>
      {category.name}
    </h3>
  );
}

export type CategoryProps = {
  category: TCategory;
};
