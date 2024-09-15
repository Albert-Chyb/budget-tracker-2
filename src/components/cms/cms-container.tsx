import { useMediaQuery } from '@uidotdev/usehooks';
import { Plus } from 'lucide-react';
import { PropsWithChildren } from 'react';
import { Link, Outlet, To, useNavigate, useOutlet } from 'react-router-dom';
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
  const outlet = useOutlet();
  const isDesktop = useMediaQuery(`(min-width: 1024px)`);
  const navigate = useNavigate();

  function handleDrawerOpen(isOpen: boolean) {
    if (!isOpen) {
      navigate(cmsLink);
    }
  }

  const editingSection = isDesktop ? (
    <CmsSection title={editingAreaTitle} className='col-span-2'>
      <Outlet />
    </CmsSection>
  ) : (
    <CmsDrawer
      open={!!outlet}
      onOpenChange={handleDrawerOpen}
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
