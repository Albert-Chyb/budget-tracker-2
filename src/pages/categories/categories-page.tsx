import Category from '@/components/categories/category';
import CategoryForm from '@/components/categories/category-form';
import CMS from '@/components/cms/cms';
import { CMSContext } from '@/components/cms/cms-context';
import CMSMobileItem from '@/components/cms/mobile/cms-mobile-item';
import { TCategory } from '@/lib/db-schemas/category';
import {
  useCategoriesQuery,
  useCategoryCreateMutation,
  useCategoryDeleteMutation,
  useCategoryUpdateMutation,
} from '@/lib/db/categories';
import { useCategoriesColorsQuery } from '@/lib/db/categories-colors';
import { Tables } from '@/lib/db/database.types';
import { useContext } from 'react';

const CATEGORIES_PAGE_TITLE = 'Kategorie';
const CATEGORIES_PAGE_DESCRIPTION = 'Zarządzaj swoimi kategoriami transakcji';

function CMSCategoryMobileItem(props: {
  category: TCategory;
  colors: Tables<'categories_colors'>[];
}) {
  const cmsContext = useContext(CMSContext);
  const { category, colors } = props;
  const { mutate: deleteCategory, isPending: isDeletePending } =
    useCategoryDeleteMutation();
  const { mutateAsync: updateCategory, isPending: isUpdatePending } =
    useCategoryUpdateMutation();

  return (
    <CMSMobileItem
      editor={{
        id: String(category.id),
        title: category.name,
        description:
          'Po zakończeniu edycji naciśnij przycisk Zapisz, aby zapisać zmiany.',
        content: (
          <CategoryForm
            colors={colors}
            category={category}
            onSubmit={(value) =>
              cmsContext.handleEditorMutation(
                updateCategory({ id: category.id, category: value })
              )
            }
            isLoading={isUpdatePending}
          />
        ),
      }}
      isBeingDeleted={isDeletePending}
      onDelete={() => deleteCategory({ id: category.id })}
    >
      <Category category={category} />
    </CMSMobileItem>
  );
}

function useCategoriesCMSQuery(): {
  isLoading: boolean;
  data: {
    categories: TCategory[];
    categoriesColors: Tables<'categories_colors'>[];
  };
} {
  const { isLoading: isColorsLoading, data: categoriesColors } =
    useCategoriesColorsQuery();
  const { isLoading: isCategoriesLoading, data: categories } =
    useCategoriesQuery();

  return {
    isLoading: isColorsLoading || isCategoriesLoading,
    data: {
      categoriesColors: categoriesColors ?? [],
      categories: categories ?? [],
    },
  };
}

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
