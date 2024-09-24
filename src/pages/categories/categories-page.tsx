import Category from '@/components/categories/category';
import CategoryForm from '@/components/categories/category-form';
import CMS from '@/components/cms/cms';
import { CMSContext } from '@/components/cms/cms-context';
import CMSMobileItem from '@/components/cms/mobile/cms-mobile-item';
import { CategoriesPageLoaderData } from '@/loaders/categories-page-loader';
import { useLoaderData } from 'react-router-dom';

const CATEGORIES_PAGE_TITLE = 'Kategorie';
const CATEGORIES_PAGE_DESCRIPTION = 'Zarządzaj swoimi kategoriami transakcji';

export default function CategoriesPage() {
  const { categoriesColors, categories } =
    useLoaderData() as CategoriesPageLoaderData;

  const mobileCategoriesItems = categories.map((category) => (
    <CMSMobileItem
      key={category.id}
      id={String(category.id)}
      editorContentElement={
        <CMSContext.Consumer>
          {({ onSubmit }) => (
            <CategoryForm
              colors={categoriesColors}
              category={category}
              method='put'
              onSubmit={onSubmit}
            />
          )}
        </CMSContext.Consumer>
      }
      title={category.name}
      description='Po zakończeniu edycji naciśnij przycisk Zapisz, aby zapisać zmiany.'
    >
      <Category category={category} />
    </CMSMobileItem>
  ));

  return (
    <CMS
      title={CATEGORIES_PAGE_TITLE}
      description={CATEGORIES_PAGE_DESCRIPTION}
      mobileItems={mobileCategoriesItems}
      newItemEditor={{
        id: 'editor',
        editorContentElement: (
          <CMSContext.Consumer>
            {({ onSubmit }) => (
              <CategoryForm
                colors={categoriesColors}
                method='post'
                onSubmit={onSubmit}
              />
            )}
          </CMSContext.Consumer>
        ),
        title: 'Nowa kategoria',
        description:
          'Po wypełnieniu formularza naciśnij przycisk Zapisz, aby stworzyć nową kategorię.',
      }}
    />
  );
}
