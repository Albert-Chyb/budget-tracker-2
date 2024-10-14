import { Skeleton } from '@/components/ui/skeleton';
import { ReactNode } from 'react';

const ITEMS_PREVIEW_COUNT = 4;

const ITEMS_PREVIEW: ReactNode = new Array(ITEMS_PREVIEW_COUNT)
  .fill(null)
  .map((_, index) => (
    <div className='border-2 rounded-md p-2 mb-2' key={index}>
      <Skeleton className='w-full h-16' />

      <Skeleton className='w-full h-10 mt-2' />
    </div>
  ));

export default function CMSMobileLoadingSkeleton() {
  return ITEMS_PREVIEW;
}
