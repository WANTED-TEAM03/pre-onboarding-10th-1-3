import React from 'react';
import { Navigate, useOutletContext } from 'react-router-dom';

export default function SignUpPage() {
  const authState = useOutletContext();

  if (authState) {
    return <Navigate to="/todo" />;
  }
  return <div>회원가입페이지</div>;
}
