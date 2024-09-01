import { PropsWithChildren } from 'react';
import { ClassNameValue, twMerge } from 'tailwind-merge';

export function TypographyH2({
  children,
  className = '',
}: PropsWithChildren<{ className?: ClassNameValue }>) {
  return (
    <h2
      className={twMerge(
        'pb-2 text-3xl font-semibold tracking-tight first:mt-0',
        className
      )}
    >
      {children}
    </h2>
  );
}

export function TypographyH3({
  children,
  className = '',
}: PropsWithChildren<{ className?: ClassNameValue }>) {
  return (
    <h3 className={twMerge('text-2xl font-semibold tracking-tight', className)}>
      {children}
    </h3>
  );
}
