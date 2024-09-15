import { useDrawerWithOutlet } from '@/hooks/drawer-with-outlet';
import { useMediaQuery } from '@uidotdev/usehooks';
import { Plus } from 'lucide-react';
import { PropsWithChildren } from 'react';
import { Link, Outlet, To } from 'react-router-dom';
import { Button } from '../ui/button';
import { TypographyH2 } from '../ui/typography';
import CmsDrawer from './cms-drawer';
import CmsList from './cms-list';
import CmsSection from './cms-section';

export default function CmsContainer({
  listTitle,
  editingAreaTitle,
  children,
  newItemLink: newItemTo,
  addBtnDescription,
  editingAreaDescription,
  cmsLink,
}: CmsContainerProps) {
  const isDesktop = useMediaQuery(`(min-width: 1024px)`);
  const drawer = useDrawerWithOutlet(500, cmsLink);

  const editingSection = isDesktop ? (
    <CmsSection title={editingAreaTitle} className='col-span-2'>
      <Outlet />
    </CmsSection>
  ) : (
    <CmsDrawer
      open={drawer.open}
      onOpenChange={drawer.onOpenChange}
      onClose={drawer.onClose}
      title={editingAreaTitle}
      description={editingAreaDescription}
    >
      <Outlet />
    </CmsDrawer>
  );

  return (
    <div className='lg:grid lg:grid-cols-3 space-x-8'>
      <CmsSection
        withScrollArea={isDesktop}
        header={
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
        }
      >
        <CmsList>{children}</CmsList>
      </CmsSection>

      {editingSection}
    </div>
  );
}

export type CmsContainerProps = PropsWithChildren<{
  listTitle: string;
  editingAreaTitle: string;
  editingAreaDescription: string;
  newItemLink: To;
  cmsLink: To;
  addBtnDescription: string;
}>;
