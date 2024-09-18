import Category from '@/components/categories/category';
import { TCategory } from '@/lib/db-schemas/category';

const DUMMY_CATEGORIES: TCategory[] = [
  {
    id: 1,
    name: 'Paliwo',
    colorId: 3,
    type: 'expense',
  },
  {
    id: 2,
    name: 'Codzienne zakupy',
    colorId: 3,
    type: 'expense',
  },
  {
    id: 3,
    name: 'Elektronika',
    colorId: 3,
    type: 'expense',
  },
  {
    id: 4,
    name: 'Kosmetyki',
    colorId: 3,
    type: 'expense',
  },
  {
    id: 5,
    name: 'Kieszonkowe',
    colorId: 3,
    type: 'income',
  },
  {
    id: 6,
    name: 'Inne',
    colorId: 3,
    type: 'expense',
  },
];

export default function CategoriesPage() {
  const categoriesListItems = DUMMY_CATEGORIES.map((category) => (
    <Category key={category.id} category={category} />
  ));

  return categoriesListItems;
}
