import CmsContainer from '@/components/cms/cms-container';
import CmsListItem from '@/components/cms/cms-list-item';
import Category from '@/components/transactions/category';
import { TCategory } from '@/lib/db-schemas/category';

const DUMMY_CATEGORIES: TCategory[] = [
  {
    id: 1,
    name: 'Paliwo',
    colorId: '255255255',
    type: 'expense',
  },
  {
    id: 2,
    name: 'Codzienne zakupy',
    colorId: '123123123',
    type: 'expense',
  },
  {
    id: 3,
    name: 'Elektronika',
    colorId: '321321312',
    type: 'expense',
  },
  {
    id: 4,
    name: 'Kosmetyki',
    colorId: '255255255',
    type: 'expense',
  },
  {
    id: 5,
    name: 'Kieszonkowe',
    colorId: '123123123',
    type: 'income',
  },
  {
    id: 6,
    name: 'Inne',
    colorId: '321321312',
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
      to={`${category.id}/edit`}
    >
      <Category category={category} />
    </CmsListItem>
  ));

  return (
    <CmsContainer
      listTitle='Kategoria'
      editingAreaTitle='Edytuj kategorie'
      newItemLink='create'
      addBtnDescription='Dodaj nową kategorię'
    >
      {categoriesListItems}
    </CmsContainer>
  );
}
