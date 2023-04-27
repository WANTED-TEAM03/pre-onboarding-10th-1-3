import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import useCheckAuth from '@/hooks/useCheckAuth';

export default function Layout() {
  const isLoggedIn = useCheckAuth();
  return (
    <Suspense fallback="loading...">
      <Outlet context={isLoggedIn} />
    </Suspense>
  );
}