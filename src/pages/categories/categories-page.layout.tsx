import Category from '@/components/categories/category';
import CategoryForm from '@/components/categories/category-form';
import { CMSContext } from '@/components/cms/cms-context';
import CMSMobileItem from '@/components/cms/mobile/cms-mobile-item';
import { TCategory } from '@/lib/db-schemas/category';
import { TCategoryColor } from '@/lib/db-schemas/category-colors';
import {
  useCategoryDeleteMutation,
  useCategoryUpdateMutation,
} from '@/lib/db/categories';
import { useContext } from 'react';

export function CMSCategoryMobileItem(props: {
  category: TCategory;
  colors: TCategoryColor[];
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
