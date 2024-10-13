import { useContext } from 'react';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Skeleton } from '../ui/skeleton';
import { CMSContext } from './cms-context';
import { CMSDesktopLoadingSkeleton } from './desktop/cms-dekstop-loading-skeleton';
import CMSMobileLoadingSkeleton from './mobile/cms-mobile-loading-skeleton';

export function CMSLoadingSkeleton() {
  const { isMobile } = useContext(CMSContext);

  return (
    <Card>
      <CardHeader>
        <div className='flex flex-row gap-x-2'>
          <div className='flex-grow space-y-2'>
            <Skeleton className='w-full h-8' />
            <Skeleton className='w-full h-4' />
          </div>

          <Skeleton className='size-14 flex-shrink-0' />
        </div>
      </CardHeader>

      <CardContent className='space-y-2'>
        {isMobile ? (
          <CMSMobileLoadingSkeleton />
        ) : (
          <CMSDesktopLoadingSkeleton />
        )}
      </CardContent>
    </Card>
  );
}
