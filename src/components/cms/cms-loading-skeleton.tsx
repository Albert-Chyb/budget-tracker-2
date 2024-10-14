import { useContext } from 'react';
import { CMSContext } from './cms-context';
import { CMSDesktopLoadingSkeleton } from './desktop/cms-desktop-loading-skeleton';
import CMSMobileLoadingSkeleton from './mobile/cms-mobile-loading-skeleton';

export function CMSLoadingSkeleton() {
  const { isMobile } = useContext(CMSContext);

  return isMobile ? (
    <CMSMobileLoadingSkeleton />
  ) : (
    <CMSDesktopLoadingSkeleton />
  );
}
