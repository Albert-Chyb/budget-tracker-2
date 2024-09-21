import Category from '@/components/categories/category';
import CategoryForm from '@/components/categories/category-form';
import CMS from '@/components/cms/cms';
import CMSMobileItem from '@/components/cms/mobile/cms-mobile-item';
import { TCategory } from '@/lib/db-schemas/category';
import { CategoryFormValue } from '@/lib/form-resolvers/category-form';
import { CategoriesPageLoaderData } from '@/loaders/categories-page-loader';
import { useLoaderData } from 'react-router-dom';

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

const CATEGORIES_PAGE_TITLE = 'Kategorie';
const CATEGORIES_PAGE_DESCRIPTION = 'Zarządzaj swoimi kategoriami transakcji';

export default function CategoriesPage() {
  const { categoriesColors } = useLoaderData() as CategoriesPageLoaderData;

  function handleCategoryDelete(category: TCategory) {
    console.log(`Deleted category with name: "${category.name}"`);
  }

  function handleCategoryEdit(category: CategoryFormValue) {
    console.log(`Edited category: ${category.name}`);
  }

  function handleCategoryCreate(category: CategoryFormValue) {
    console.log(`Created category: ${category.name}`);
  }

  const mobileCategoriesItems = DUMMY_CATEGORIES.map((category) => (
    <CMSMobileItem
      key={category.id}
      editElement={
        <CategoryForm
          colors={categoriesColors}
          category={category}
          onSubmit={handleCategoryEdit}
        />
      }
      title={category.name}
      description='Po zakończeniu edycji naciśnij przycisk Zapisz, aby zapisać zmiany.'
      onDelete={() => handleCategoryDelete(category)}
    >
      <Category category={category} />
    </CMSMobileItem>
  ));

  return (
    <CMS
      title={CATEGORIES_PAGE_TITLE}
      description={CATEGORIES_PAGE_DESCRIPTION}
      mobileItems={mobileCategoriesItems}
      createArea={{
        editElement: (
          <CategoryForm
            colors={categoriesColors}
            onSubmit={handleCategoryCreate}
          />
        ),
        title: 'Nowa kategoria',
        description:
          'Po wypełnieniu formularza naciśnij przycisk Zapisz, aby stworzyć nową kategorię.',
      }}
    />
  );
}
