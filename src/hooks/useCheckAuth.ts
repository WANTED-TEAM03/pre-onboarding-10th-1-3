import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useLocalStorage } from './useLocalStorage';

const useCheckAuth = (): boolean => {
  const location = useLocation();
  const [authState, setAuthState] = useState(false);
  const [accessToken] = useLocalStorage('access_token');
  useEffect(() => {
    if (accessToken) {
      setAuthState(true);
    } else {
      setAuthState(false);
    }
  }, [location.pathname]);
  return authState;
};

export default useCheckAuth;
