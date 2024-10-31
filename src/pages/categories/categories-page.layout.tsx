import CategoryForm from '@/components/categories/category-form';
import CMSEditorTrigger, {
  CMSEditorTriggerProps,
} from '@/components/cms/cms-editor-trigger';
import { Button } from '@/components/ui/button';
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
    <>
      <Tooltip>
        <TooltipTrigger asChild>
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
        </TooltipTrigger>

        <TooltipContent>Usuń kategorię</TooltipContent>
      </Tooltip>

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
  colors: TCategoryColor[];
};
