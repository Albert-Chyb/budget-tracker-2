import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { ReactNode } from 'react';

const ITEMS_PREVIEW_COUNT = 4;

const ITEMS_PREVIEW: ReactNode = new Array(ITEMS_PREVIEW_COUNT)
  .fill(null)
  .map((_, index) => (
    <div className='border-2 rounded-md p-2' key={index}>
      <Skeleton className='w-full h-16' />

      <Skeleton className='w-full h-10 mt-2' />
    </div>
  ));

export default function CMSMobileLoadingSkeleton() {
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

      <CardContent className='space-y-2'>{ITEMS_PREVIEW}</CardContent>
    </Card>
  );
}
