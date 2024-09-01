import { PropsWithChildren } from 'react';
import { ScrollArea } from '../ui/scroll-area';
import { TypographyH2 } from '../ui/typography';

export default function CmsSection({
  children,
  title,
  className,
  renderHeaderContent,
}: CmsSectionProps) {
  let headerContent = <TypographyH2 className='p-0'>{title}</TypographyH2>;

  if (renderHeaderContent) {
    headerContent = renderHeaderContent();
  }

  return (
    <section className={className}>
      <header className='h-14 flex justify-between items-center'>
        {headerContent}
      </header>

      <ScrollArea className='h-[calc(var(--remaining-viewport-height)-theme(height.14))]'>
        {children}
      </ScrollArea>
    </section>
  );
}

export type CmsSectionProps = PropsWithChildren<{
  title?: string;
  className?: string;
  renderHeaderContent?: () => JSX.Element;
}>;
