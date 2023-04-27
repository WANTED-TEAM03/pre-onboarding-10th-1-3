import { useState } from 'react';
import { Navigate, useOutletContext, useNavigate } from 'react-router-dom';
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

    await SignInAPI(authForm)
      .then(response => {
        localStorage.setItem('access_token', response.data.access_token);
        navigate('/todo');
      })
      .catch(err => {
        localStorage.setItem('access_token', '');
      });
  };

  const isLoggedIn = useOutletContext();

  if (isLoggedIn) {
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
