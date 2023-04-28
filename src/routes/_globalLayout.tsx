import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Loading from '@/components/Loading';
import { Navbar } from '@/components/Navbar';
import useCheckAuth from '@/hooks/useCheckAuth';

export default function Layout() {
  const isLoggedIn = useCheckAuth();
  return (
    <Suspense fallback={<Loading />}>
      <Navbar isLoggedIn={isLoggedIn} />
      <Outlet context={isLoggedIn} />
    </Suspense>
  );
}
