import CategoryForm from '@/components/categories/category-form';
import {
  CMSActionButton,
  CMSActionsButtons,
} from '@/components/cms/cms-actions';
import { Editor } from '@/components/cms/editor';
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

      <Editor
        id={String(category.id)}
        title={category.name}
        description='Po zakończeniu edycji naciśnij przycisk Zapisz, aby zapisać zmiany.'
        isDismissible={!isUpdatePending}
        tooltip={'Edytuj kategorię'}
        trigger={
          <CMSActionButton
            icon={<Pen className='size-4' />}
            disabled={isDeletePending}
            type='button'
            variant='outline'
            aria-label={`Edytuj kategorię: ${category.name}`}
          >
            Edytuj
          </CMSActionButton>
        }
        content={
          <CategoryForm
            colors={colors}
            category={category}
            onSubmit={(value) => updateCategory(value)}
            isLoading={isUpdatePending}
          />
        }
      />
    </CMSActionsButtons>
  );
}

export type CMSCategoryActionsProps = {
  category: TCategory;
  colors: TCategoryColor[];
};
