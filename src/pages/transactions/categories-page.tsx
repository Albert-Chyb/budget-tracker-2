import CmsContainer from '@/components/cms/cms-container';
import CmsListItem from '@/components/cms/cms-list-item';
import Category from '@/components/transactions/category';
import { TCategory } from '@/lib/types/category';

const DUMMY_CATEGORIES: TCategory[] = [
  {
    id: 1,
    name: 'Paliwo',
    rgb: '255255255',
    type: 'expense',
  },
  {
    id: 2,
    name: 'Codzienne zakupy',
    rgb: '123123123',
    type: 'expense',
  },
  {
    id: 3,
    name: 'Elektronika',
    rgb: '321321312',
    type: 'expense',
  },
  {
    id: 4,
    name: 'Kosmetyki',
    rgb: '255255255',
    type: 'expense',
  },
  {
    id: 5,
    name: 'Kieszonkowe',
    rgb: '123123123',
    type: 'income',
  },
  {
    id: 6,
    name: 'Inne',
    rgb: '321321312',
    type: 'expense',
  },
];

export default function CategoriesPage() {
  function handleCategoryDelete(id: number) {
    console.log('Deleted category: ', id);
  }

  const categoriesListItems = DUMMY_CATEGORIES.map((category) => (
    <CmsListItem
      key={category.id}
      deleteBtnText='Usuń kategorię'
      onDelete={() => handleCategoryDelete(category.id)}
      to={String(category.id)}
    >
      <Category category={category} />
    </CmsListItem>
  ));

  return (
    <CmsContainer
      listTitle='Kategoria'
      editingAreaTitle='Edytuj kategorie'
      newItemLink='new-category'
      addBtnDescription='Dodaj nową kategorię'
    >
      {categoriesListItems}
    </CmsContainer>
  );
}
