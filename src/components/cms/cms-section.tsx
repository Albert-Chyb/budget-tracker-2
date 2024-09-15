import { PropsWithChildren } from 'react';
import { ScrollArea } from '../ui/scroll-area';
import { TypographyH2 } from '../ui/typography';

export default function CmsSection({
  children,
  title,
  className,
  header = <TypographyH2 className='p-0'>{title}</TypographyH2>,
  withScrollArea = true,
}: CmsSectionProps) {
  return (
    <section className={className}>
      <header className='h-14 flex justify-between items-center'>
        {header}
      </header>

      {withScrollArea ? (
        <ScrollArea className='h-[calc(var(--remaining-viewport-height)-theme(height.14))]'>
          <div className='px-1'>{children}</div>
        </ScrollArea>
      ) : (
        <>{children}</>
      )}
    </section>
  );
}

export type CmsSectionProps = PropsWithChildren<{
  title?: string;
  className?: string;
  header?: JSX.Element;
  withScrollArea?: boolean;
}>;
