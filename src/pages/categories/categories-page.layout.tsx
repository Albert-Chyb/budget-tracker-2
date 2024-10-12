import Category from '@/components/categories/category';
import CategoryForm from '@/components/categories/category-form';
import { CMSContext } from '@/components/cms/cms-context';
import CMSEditorTrigger from '@/components/cms/cms-editor-trigger';
import CMSMobileItem from '@/components/cms/mobile/cms-mobile-item';
import { Button } from '@/components/ui/button';
import { TCategory } from '@/lib/db-schemas/category';
import { Pen, Trash } from 'lucide-react';
import { useContext } from 'react';
import { CategoriesPageResolver } from './categories-page.resolver';

export function CategoryActions(props: CMSCategoryActionsProps) {
  const { category, resolver } = props;

  const cmsContext = useContext(CMSContext);

  const { delete: deleteCategory, isPending: isDeletePending } =
    resolver.useDelete(category.id);

  const { update: updateCategory, isPending: isUpdatePending } =
    resolver.useUpdate(category.id);

  const editorProps = {
    id: String(category.id),
    title: category.name,
    description:
      'Po zakończeniu edycji naciśnij przycisk Zapisz, aby zapisać zmiany.',
    content: (
      <CategoryForm
        colors={resolver.data.categoriesColors}
        category={category}
        onSubmit={(value) =>
          cmsContext.handleEditorMutation(updateCategory(value))
        }
        isLoading={isUpdatePending}
      />
    ),
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
  resolver: CategoriesPageResolver;
};

export function CMSCategoryMobileItem(props: {
  category: TCategory;
  resolver: CategoriesPageResolver;
}) {
  const { category, resolver } = props;
  const cmsContext = useContext(CMSContext);

  const { delete: deleteCategory, isPending: isDeletePending } =
    resolver.useDelete(category.id);

  const { update, isPending: isUpdatePending } = resolver.useUpdate(
    category.id
  );

  return (
    <CMSMobileItem
      editor={{
        id: String(category.id),
        title: category.name,
        description:
          'Po zakończeniu edycji naciśnij przycisk Zapisz, aby zapisać zmiany.',
        content: (
          <CategoryForm
            colors={resolver.data.categoriesColors}
            category={category}
            onSubmit={(value) => cmsContext.handleEditorMutation(update(value))}
            isLoading={isUpdatePending}
          />
        ),
      }}
      isBeingDeleted={isDeletePending}
      onDelete={() => deleteCategory()}
    >
      <Category category={category} />
    </CMSMobileItem>
  );
}
