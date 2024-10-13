import { Skeleton } from '@/components/ui/skeleton';

export function CMSDesktopLoadingSkeleton() {
  return (
    <>
      <div className='flex flex-row h-12 gap-2 mb-4'>
        <Skeleton className='w-1/4'></Skeleton>
        <Skeleton className='w-1/4'></Skeleton>
        <Skeleton className='w-1/4'></Skeleton>
        <Skeleton className='w-1/4'></Skeleton>
      </div>

      <div className='flex flex-row h-12 gap-2'>
        <Skeleton className='w-1/4'></Skeleton>
        <Skeleton className='w-1/4'></Skeleton>
        <Skeleton className='w-1/4'></Skeleton>
        <Skeleton className='w-1/4'></Skeleton>
      </div>

      <div className='flex flex-row h-12 gap-2'>
        <Skeleton className='w-1/4'></Skeleton>
        <Skeleton className='w-1/4'></Skeleton>
        <Skeleton className='w-1/4'></Skeleton>
        <Skeleton className='w-1/4'></Skeleton>
      </div>

      <div className='flex flex-row h-12 gap-2'>
        <Skeleton className='w-1/4'></Skeleton>
        <Skeleton className='w-1/4'></Skeleton>
        <Skeleton className='w-1/4'></Skeleton>
        <Skeleton className='w-1/4'></Skeleton>
      </div>
    </>
  );
}
