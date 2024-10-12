import Category from '@/components/categories/category';
import CategoryForm from '@/components/categories/category-form';
import { CMSContext } from '@/components/cms/cms-context';
import CMSEditorTrigger from '@/components/cms/cms-editor-trigger';
import CMSMobileItem from '@/components/cms/mobile/cms-mobile-item';
import { Button } from '@/components/ui/button';
import { UserContext } from '@/contexts/user-context';
import { TCategory } from '@/lib/db-schemas/category';
import { TCategoryColor } from '@/lib/db-schemas/category-colors';
import {
  useCategoryDeleteMutation,
  useCategoryUpdateMutation,
} from '@/lib/db/categories';
import { Pen, Trash } from 'lucide-react';
import { useContext } from 'react';

export function CMSCategoryActions(props: CMSCategoryActionsProps) {
  const { category, colors } = props;

  const { getTrustedUser } = useContext(UserContext);
  const cmsContext = useContext(CMSContext);
  const { mutate: deleteCategory, isPending: isDeletePending } =
    useCategoryDeleteMutation();
  const { mutateAsync: updateCategory, isPending: isUpdatePending } =
    useCategoryUpdateMutation();

  const { id: userId } = getTrustedUser();

  const editorProps = {
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
            updateCategory({
              id: category.id,
              category: value,
              userId,
            })
          )
        }
        isLoading={isUpdatePending}
      />
    ),
  };

  function handleDeleteButtonClick() {
    deleteCategory({ userId, id: category.id });
  }

  return (
    <>
      <Button
        type='button'
        size='icon'
        variant='ghost'
        aria-label={`Usuń kategorię: ${category.name}`}
        onClick={() => handleDeleteButtonClick()}
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
  colors: TCategoryColor[];
};

export function CMSCategoryMobileItem(props: {
  category: TCategory;
  colors: TCategoryColor[];
}) {
  const { getTrustedUser } = useContext(UserContext);
  const cmsContext = useContext(CMSContext);
  const { category, colors } = props;
  const { mutate: deleteCategory, isPending: isDeletePending } =
    useCategoryDeleteMutation();
  const { mutateAsync: updateCategory, isPending: isUpdatePending } =
    useCategoryUpdateMutation();

  const { id: userId } = getTrustedUser();

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
                updateCategory({
                  id: category.id,
                  category: value,
                  userId,
                })
              )
            }
            isLoading={isUpdatePending}
          />
        ),
      }}
      isBeingDeleted={isDeletePending}
      onDelete={() => deleteCategory({ id: category.id, userId })}
    >
      <Category category={category} />
    </CMSMobileItem>
  );
}
