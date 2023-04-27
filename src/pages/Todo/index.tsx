import { Navigate, useOutletContext } from 'react-router-dom';

export default function TodoPage() {
  const isLoggedIn = useOutletContext();

  if (!isLoggedIn) {
    return <Navigate to="/signin" />;
  }
  return <div>투두페이지</div>;
}
