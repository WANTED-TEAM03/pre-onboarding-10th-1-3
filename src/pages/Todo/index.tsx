import { Navigate, useOutletContext } from 'react-router-dom';
import { ROUTE_PATHS } from '@/constants/config';

export default function TodoPage() {
  const isLoggedIn = useOutletContext();

  if (!isLoggedIn) {
    return <Navigate to={ROUTE_PATHS.signIn} />;
  }
  return <div>투두페이지</div>;
}
