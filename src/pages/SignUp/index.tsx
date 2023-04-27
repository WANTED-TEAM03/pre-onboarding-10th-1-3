import { Navigate, useOutletContext } from 'react-router-dom';

export default function SignUpPage() {
  const isLoggedIn = useOutletContext();

  if (isLoggedIn) {
    return <Navigate to="/todo" />;
  }
  return <div>회원가입페이지</div>;
}
