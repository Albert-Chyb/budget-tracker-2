import RootLayout from '@/components/layout/root-layout';
import { Outlet } from 'react-router-dom';

export default function RootPage() {
  return (
    <RootLayout>
      <Outlet />
    </RootLayout>
  );
}
