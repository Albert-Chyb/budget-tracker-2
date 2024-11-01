import CategoryForm from '@/components/categories/category-form';
import {
  CMSActionButton,
  CMSActionsButtons,
} from '@/components/cms/cms-actions';
import CMSEditorTrigger, {
  CMSEditorTriggerProps,
} from '@/components/cms/cms-editor-trigger';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { TCategory } from '@/lib/db-schemas/category';
import { TCategoryColor } from '@/lib/db-schemas/category-colors';
import { Pen, Trash } from 'lucide-react';
import { useCategoryDelete, useCategoryUpdate } from './categories-page.hooks';

export function CategoryActions(props: CMSCategoryActionsProps) {
  const { category, colors } = props;

  const { delete: deleteCategory, isPending: isDeletePending } =
    useCategoryDelete(category.id);
  const { update: updateCategory, isPending: isUpdatePending } =
    useCategoryUpdate(category.id);

  const editorProps: CMSEditorTriggerProps = {
    id: String(category.id),
    title: category.name,
    description:
      'Po zakończeniu edycji naciśnij przycisk Zapisz, aby zapisać zmiany.',
    content: (
      <CategoryForm
        colors={colors}
        category={category}
        onSubmit={(value) => updateCategory(value)}
        isLoading={isUpdatePending}
      />
    ),
    isDismissible: !isUpdatePending,
    tooltip: 'Edytuj kategorię',
  };

  return (
    <CMSActionsButtons>
      <Tooltip>
        <TooltipTrigger asChild>
          <CMSActionButton
            icon={<Trash className='size-4' />}
            type='button'
            variant='outline'
            aria-label={`Usuń kategorię: ${category.name}`}
            onClick={() => deleteCategory()}
            disabled={isDeletePending}
          >
            Usuń
          </CMSActionButton>
        </TooltipTrigger>

        <TooltipContent>Usuń kategorię</TooltipContent>
      </Tooltip>

      <CMSEditorTrigger {...editorProps}>
        <CMSActionButton
          icon={<Pen className='size-4' />}
          disabled={isDeletePending}
          type='button'
          variant='outline'
          aria-label={`Edytuj kategorię: ${category.name}`}
        >
          Edytuj
        </CMSActionButton>
      </CMSEditorTrigger>
    </CMSActionsButtons>
  );
}

export type CMSCategoryActionsProps = {
  category: TCategory;
  colors: TCategoryColor[];
};
