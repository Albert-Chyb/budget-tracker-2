import { PropsWithChildren } from 'react';
import { Header } from './header';

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Header />

      <main
        className={
          'mt-[calc(var(--header-height)+var(--main-content-top-spacing))] container'
        }
      >
        {children}
      </main>
    </>
  );
}
