import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const useCheckAuth = (): boolean => {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const accessToken = localStorage.getItem('access_token');

  useEffect(() => {
    if (accessToken) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [location.pathname]);
  return isLoggedIn;
};

export default useCheckAuth;
