import Category from '@/components/categories/category';
import CategoryForm from '@/components/categories/category-form';
import CMS from '@/components/cms/cms';
import { CMSContext } from '@/components/cms/cms-context';
import CMSMobileItem from '@/components/cms/mobile/cms-mobile-item';
import { CategoriesPageLoaderData } from '@/loaders/categories-page-loader';
import { useContext } from 'react';
import { useAsyncValue } from 'react-router-dom';

const CATEGORIES_PAGE_TITLE = 'Kategorie';
const CATEGORIES_PAGE_DESCRIPTION = 'Zarządzaj swoimi kategoriami transakcji';

export default function CategoriesPage() {
  const { submit, isSubmitting } = useContext(CMSContext);
  const { categoriesColors, categories } =
    useAsyncValue() as CategoriesPageLoaderData;

  const mobileCategoriesItems = categories.map((category) => (
    <CMSMobileItem
      key={category.id}
      id={String(category.id)}
      editorContentElement={
        <CategoryForm
          colors={categoriesColors}
          category={category}
          method='put'
          onSubmit={(_value, target) => submit(target)}
          isLoading={isSubmitting}
        />
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
          <CategoryForm
            colors={categoriesColors}
            method='post'
            onSubmit={(_value, target) => submit(target)}
            isLoading={isSubmitting}
          />
        ),
        title: 'Nowa kategoria',
        description:
          'Po wypełnieniu formularza naciśnij przycisk Zapisz, aby stworzyć nową kategorię.',
      }}
    />
  );
}
