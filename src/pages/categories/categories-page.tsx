import Category from '@/components/categories/category';
import CategoryForm from '@/components/categories/category-form';
import CMS from '@/components/cms/cms';
import { CMSContext } from '@/components/cms/cms-context';
import CMSMobileItem from '@/components/cms/mobile/cms-mobile-item';
import { useCategoriesQuery } from '@/lib/db/categories';
import { useCategoriesColorsQuery } from '@/lib/db/categories-colors';
import { useContext } from 'react';

const CATEGORIES_PAGE_TITLE = 'Kategorie';
const CATEGORIES_PAGE_DESCRIPTION = 'Zarządzaj swoimi kategoriami transakcji';

export default function CategoriesPage() {
  const categoriesColorsQuery = useCategoriesColorsQuery();
  const categoriesQuery = useCategoriesQuery();
  const { submit, isSubmitting } = useContext(CMSContext);

  const categoriesColors = categoriesColorsQuery.data ?? [];
  const categories = categoriesQuery.data ?? [];
  const isLoading =
    categoriesColorsQuery.isLoading || categoriesQuery.isLoading;
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
      showLoadingSkeleton={isLoading}
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
