import Category from '@/components/categories/category';
import CategoryForm from '@/components/categories/category-form';
import CMSEditorTrigger, {
  CMSEditorTriggerProps,
} from '@/components/cms/cms-editor-trigger';
import CMSMobileItem from '@/components/cms/mobile/cms-mobile-item';
import { Button } from '@/components/ui/button';
import { TCategory } from '@/lib/db-schemas/category';
import { Pen, Trash } from 'lucide-react';
import { CategoriesPageStore } from './categories-page.store';

export function CategoryActions(props: CMSCategoryActionsProps) {
  const { category, store } = props;

  const { delete: deleteCategory, isPending: isDeletePending } =
    store.useDelete(category.id);
  const { update: updateCategory, isPending: isUpdatePending } =
    store.useUpdate(category.id);

  const editorProps: CMSEditorTriggerProps = {
    id: String(category.id),
    title: category.name,
    description:
      'Po zakończeniu edycji naciśnij przycisk Zapisz, aby zapisać zmiany.',
    content: (
      <CategoryForm
        colors={store.data.categoriesColors}
        category={category}
        onSubmit={(value) => updateCategory(value)}
        isLoading={isUpdatePending}
      />
    ),
    isDismissible: !isUpdatePending,
  };

  return (
    <>
      <Button
        type='button'
        size='icon'
        variant='ghost'
        aria-label={`Usuń kategorię: ${category.name}`}
        onClick={() => deleteCategory()}
        disabled={isDeletePending}
      >
        <Trash className='size-4' />
      </Button>

      <CMSEditorTrigger {...editorProps}>
        <Button
          disabled={isDeletePending}
          type='button'
          size='icon'
          variant='ghost'
          aria-label={`Edytuj kategorię: ${category.name}`}
        >
          <Pen className='size-4' />
        </Button>
      </CMSEditorTrigger>
    </>
  );
}

export type CMSCategoryActionsProps = {
  category: TCategory;
  store: CategoriesPageStore;
};

export function CMSCategoryMobileItem(props: {
  category: TCategory;
  store: CategoriesPageStore;
}) {
  const { category, store } = props;

  const { delete: deleteCategory, isPending: isDeletePending } =
    store.useDelete(category.id);
  const { update: updateCategory, isPending: isUpdatePending } =
    store.useUpdate(category.id);

  return (
    <CMSMobileItem
      editor={{
        id: String(category.id),
        title: category.name,
        description:
          'Po zakończeniu edycji naciśnij przycisk Zapisz, aby zapisać zmiany.',
        content: (
          <CategoryForm
            colors={store.data.categoriesColors}
            category={category}
            onSubmit={(value) => updateCategory(value)}
            isLoading={isUpdatePending}
          />
        ),
        isDismissible: !isUpdatePending,
      }}
      isBeingDeleted={isDeletePending}
      onDelete={() => deleteCategory()}
    >
      <Category category={category} />
    </CMSMobileItem>
  );
}
