import { Navigate, useOutletContext } from 'react-router-dom';
import AuthForm from '@/components/AuthForm';
import { ROUTE_PATHS } from '@/constants/config';

export default function SignUpPage() {
  const isLoggedIn = useOutletContext();

  if (isLoggedIn) {
    return <Navigate to={ROUTE_PATHS.todo} />;
  }
  return <AuthForm formtype="signup" />;
}
