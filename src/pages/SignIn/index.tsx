import { Navigate, useOutletContext } from 'react-router-dom';

export default function SignInPage() {
  const authState = useOutletContext();

  if (authState) {
    return <Navigate to="/todo" />;
  }
  return <div>로그인페이지</div>;
}
