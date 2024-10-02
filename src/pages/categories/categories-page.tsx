import CategoryForm from '@/components/categories/category-form';
import CMS from '@/components/cms/cms';
import { CMSContext } from '@/components/cms/cms-context';
import { useCategoryCreateMutation } from '@/lib/db/categories';
import { useContext } from 'react';
import { useCategoriesCMSQuery } from './categories-page.hooks';
import { CMSCategoryMobileItem } from './categories-page.layout';

const CATEGORIES_PAGE_TITLE = 'Kategorie';
const CATEGORIES_PAGE_DESCRIPTION = 'Zarządzaj swoimi kategoriami transakcji';

export default function CategoriesPage() {
  const cmsContext = useContext(CMSContext);
  const {
    isLoading,
    data: { categories, categoriesColors },
  } = useCategoriesCMSQuery();
  const { mutateAsync: createCategory, isPending: isCreatePending } =
    useCategoryCreateMutation();

  const mobileCategoriesItems = categories.map((category) => (
    <CMSCategoryMobileItem
      category={category}
      colors={categoriesColors}
      key={category.id}
    />
  ));

  return (
    <CMS
      isLoading={isLoading}
      title={CATEGORIES_PAGE_TITLE}
      description={CATEGORIES_PAGE_DESCRIPTION}
      mobileItems={mobileCategoriesItems}
      newItemEditor={{
        id: 'editor',
        content: (
          <CategoryForm
            colors={categoriesColors}
            onSubmit={(value) =>
              cmsContext.handleEditorMutation(
                createCategory({ category: value })
              )
            }
            isLoading={isCreatePending}
          />
        ),
        title: 'Nowa kategoria',
        description:
          'Po wypełnieniu formularza naciśnij przycisk Zapisz, aby stworzyć nową kategorię.',
      }}
    />
  );
}
