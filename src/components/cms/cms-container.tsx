import { useMediaQuery } from '@uidotdev/usehooks';
import { Plus } from 'lucide-react';
import { PropsWithChildren } from 'react';
import { Link, Outlet, To, useNavigate, useOutlet } from 'react-router-dom';
import { Button } from '../ui/button';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from '../ui/drawer';
import { TypographyH2 } from '../ui/typography';
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
    <Drawer open={!!outlet} onOpenChange={handleDrawerOpen}>
      <DrawerContent>
        <DrawerHeader className='px-[var(--screen-edge-spacing)]'>
          <DrawerTitle>{editingAreaTitle}</DrawerTitle>
          <DrawerDescription>{editingAreaDescription}</DrawerDescription>
        </DrawerHeader>

        <div className='mx-[var(--screen-edge-spacing)]'>
          <Outlet />
        </div>
      </DrawerContent>
    </Drawer>
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
