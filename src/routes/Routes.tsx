import { lazy } from 'react';
import { ROUTE_PATHS } from '@/constants/config';
import GlobalLayout from './_layout';

const SignUpPage = lazy(() => import('@/pages/SignUp'));
const SignInPage = lazy(() => import('@/pages/SignIn'));
const TodoPage = lazy(() => import('@/pages/Todo'));
const WelcomePage = lazy(() => import('@/pages/Welcome'));

export const routes = [
  {
    path: '/',
    element: <GlobalLayout />,
    children: [
      { index: true, element: <WelcomePage /> },
      { path: ROUTE_PATHS.signUp, element: <SignUpPage /> },
      { path: ROUTE_PATHS.signIn, element: <SignInPage /> },
      { path: ROUTE_PATHS.todo, element: <TodoPage /> },
    ],
  },
];
