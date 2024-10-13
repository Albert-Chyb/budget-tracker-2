import { TCategoryColor } from '@/lib/db-schemas/category-colors';
import { Badge } from '../ui/badge';

export function CategoryColorBadge(props: CategoryColorBadgeProps) {
  const { color } = props;

  return (
    <Badge
      variant='outline'
      style={{
        borderColor: `rgb(${color.rgb.join(',')})`,
      }}
      className='border-2'
    >
      {color.name}
    </Badge>
  );
}

export type CategoryColorBadgeProps = {
  color: TCategoryColor;
};
