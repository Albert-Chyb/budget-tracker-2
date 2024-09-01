import { Plus } from 'lucide-react';
import { PropsWithChildren } from 'react';
import { Link, Outlet, To } from 'react-router-dom';
import { Button } from '../ui/button';
import { TypographyH2 } from '../ui/typography';
import CmsList from './cms-list';
import CmsSection from './cms-section';

export default function CmsContainer({
  listTitle,
  editingAreaTitle,
  children,
  newItemLink: newItemTo,
  addBtnDescription,
}: CmsContainerProps) {
  return (
    <div className='grid grid-cols-3 space-x-8'>
      <CmsSection
        renderHeaderContent={() => (
          <>
            <TypographyH2 className='p-0'>{listTitle}</TypographyH2>

            <Button
              size='icon'
              variant='ghost'
              aria-label={addBtnDescription}
              asChild
            >
              <Link to={newItemTo}>
                <Plus />
              </Link>
            </Button>
          </>
        )}
      >
        <CmsList>{children}</CmsList>
      </CmsSection>

      <CmsSection title={editingAreaTitle} className='col-span-2'>
        <Outlet />
      </CmsSection>
    </div>
  );
}

export type CmsContainerProps = PropsWithChildren<{
  listTitle: string;
  editingAreaTitle: string;
  newItemLink: To;
  addBtnDescription: string;
}>;
