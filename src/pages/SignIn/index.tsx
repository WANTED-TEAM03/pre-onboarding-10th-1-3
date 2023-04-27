import { Navigate, useOutletContext } from 'react-router-dom';
import AuthForm from '@/components/AuthForm';
import { ROUTE_PATHS } from '@/constants/config';

export default function SignInPage() {
  const isLoggedIn = useOutletContext();

  if (isLoggedIn) {
    return <Navigate to={ROUTE_PATHS.todo} />;
  }
  return <AuthForm formtype="signin" />;
}
