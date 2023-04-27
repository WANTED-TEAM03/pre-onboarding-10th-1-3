import React, { useState } from 'react';
import { Navigate, useOutletContext } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { SignInAPI } from '@/services/auth';
import { AuthForm } from '@/types/authForm';

export default function SignInPage() {
  const [email] = useState('');
  const [password] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async () => {
    const authForm: AuthForm = {
      email,
      password,
    };

    await SignInAPI(authForm).then(response => {
      navigate('/todo');
    });
  };

  const authState = useOutletContext();

  if (authState) {
    return <Navigate to="/todo" />;
  }
  return (
    <div>
      <button type="button" data-testid="signin-button" onClick={handleSubmit}>
        로그인
      </button>
    </div>
  );
}
