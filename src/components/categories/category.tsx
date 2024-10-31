import { TCategory } from '@/lib/db-schemas/category';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { Table, TableBody, TableCell, TableHead, TableRow } from '../ui/table';

export default function Category({ category }: CategoryProps) {
  const listItems = [
    {
      key: 'Nazwa',
      value: category.name,
    },
    {
      key: 'Typ transakcji',
      value: category.type,
    },
    {
      key: 'Kolor',
      value: category.color?.name ?? 'Brak koloru',
    },
  ];

  return (
    <Table className='caption-top'>
      <caption className='p-4 font-semibold text-xl text-left border-b'>
        <VisuallyHidden>Szczegóły kategorii:</VisuallyHidden> {category.name}
      </caption>

      <TableBody>
        {listItems.map(({ key, value }) => (
          <TableRow key={key}>
            <TableHead>{key}</TableHead>
            <TableCell>{value}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export type CategoryProps = {
  category: TCategory;
};
