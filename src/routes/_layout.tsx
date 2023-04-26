import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <Suspense fallback="loading...">
      <Outlet />
    </Suspense>
  );
}
