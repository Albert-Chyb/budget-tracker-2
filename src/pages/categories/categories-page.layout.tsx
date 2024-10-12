import Category from '@/components/categories/category';
import CategoryForm from '@/components/categories/category-form';
import { CMSContext } from '@/components/cms/cms-context';
import CMSEditorTrigger from '@/components/cms/cms-editor-trigger';
import CMSMobileItem from '@/components/cms/mobile/cms-mobile-item';
import { Button } from '@/components/ui/button';
import { TCategory } from '@/lib/db-schemas/category';
import { Pen, Trash } from 'lucide-react';
import { useContext } from 'react';
import { CategoriesPageStore } from './categories-page.store';

export function CategoryActions(props: CMSCategoryActionsProps) {
  const { category, store: resolver } = props;

  const { delete: deleteCategory, isPending: isDeletePending } =
    resolver.useDelete(category.id);

  const editorProps = {
    id: String(category.id),
    title: category.name,
    description:
      'Po zakończeniu edycji naciśnij przycisk Zapisz, aby zapisać zmiany.',
    content: <CMSCategoryEditForm store={resolver} category={category} />,
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

  return (
    <CMSMobileItem
      editor={{
        id: String(category.id),
        title: category.name,
        description:
          'Po zakończeniu edycji naciśnij przycisk Zapisz, aby zapisać zmiany.',
        content: <CMSCategoryEditForm store={store} category={category} />,
      }}
      isBeingDeleted={isDeletePending}
      onDelete={() => deleteCategory()}
    >
      <Category category={category} />
    </CMSMobileItem>
  );
}

export function CMSCategoryCreateForm(props: CMSCategoryCreateFormProps) {
  const { store } = props;

  const { handleEditorMutation } = useContext(CMSContext);
  const { create, isPending: isCreatePending } = store.useCreate();

  return (
    <CategoryForm
      colors={store.data.categoriesColors}
      onSubmit={(value) => handleEditorMutation(create(value))}
      isLoading={isCreatePending}
    />
  );
}

export type CMSCategoryCreateFormProps = {
  store: CategoriesPageStore;
};

export function CMSCategoryEditForm(props: CMSCategoryEditFormProps) {
  const { store, category } = props;

  const { handleEditorMutation } = useContext(CMSContext);
  const { update: updateCategory, isPending: isUpdatePending } =
    store.useUpdate(category.id);

  return (
    <CategoryForm
      colors={store.data.categoriesColors}
      category={category}
      onSubmit={(value) => handleEditorMutation(updateCategory(value))}
      isLoading={isUpdatePending}
    />
  );
}

export type CMSCategoryEditFormProps = {
  category: TCategory;
  store: CategoriesPageStore;
};
