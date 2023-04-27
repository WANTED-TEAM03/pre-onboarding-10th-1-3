import { Navigate, useOutletContext } from 'react-router-dom';
import AuthForm from '@/components/AuthForm';

export default function SignInPage() {
  const isLoggedIn = useOutletContext();

  if (isLoggedIn) {
    return <Navigate to="/todo" />;
  }
  return <AuthForm formtype="signin" />;
}
