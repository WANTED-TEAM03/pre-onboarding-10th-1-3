import { Navigate, useOutletContext } from 'react-router-dom';

export default function TodoPage() {
  const authState = useOutletContext();

  if (!authState) {
    return <Navigate to="/signin" />;
  }
  return <div>투두페이지</div>;
}
