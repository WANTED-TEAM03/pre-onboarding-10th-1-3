import { useState } from 'react';
import { Navigate, useOutletContext, useNavigate } from 'react-router-dom';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { SignInAPI } from '@/services/auth';
import { AuthForm } from '@/types/authForm';

export default function SignInPage() {
  const [email] = useState('');
  const [password] = useState('');
  const [, setAccessToken] = useLocalStorage<string>('access_token');

  const navigate = useNavigate();

  const handleSubmit = async () => {
    const authForm: AuthForm = {
      email,
      password,
    };

    await SignInAPI(authForm)
      .then(response => {
        setAccessToken(response.data.access_token);
        navigate('/todo');
      })
      .catch(err => {
        setAccessToken('');
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
