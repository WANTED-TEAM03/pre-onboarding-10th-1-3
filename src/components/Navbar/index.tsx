import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTE_PATHS } from '@/constants/config';
import styles from './styles.module.scss';

type NavbarProps = {
  isLoggedIn: boolean;
};

function BeforeLogin() {
  return (
    <div className={styles.buttonWrapper}>
      <Link to={ROUTE_PATHS.signIn}>로그인</Link>
      <Link to={ROUTE_PATHS.signUp}>회원가입</Link>
    </div>
  );
}
function AfterLogin() {
  const navigate = useNavigate();
  const onLogout = () => {
    localStorage.removeItem('access_token');
    navigate(ROUTE_PATHS.signIn);
  };
  return (
    <div className={styles.buttonWrapper}>
      <Link to={ROUTE_PATHS.todo}>투두</Link>
      <button type="button" className={styles.logoutButton} onClick={onLogout}>
        로그아웃
      </button>
    </div>
  );
}

export function Navbar({ isLoggedIn }: NavbarProps) {
  return (
    <div className={styles.componentWrapper}>
      <div className={styles.innerWrapper}>
        <Link to={ROUTE_PATHS.welcome}>
          <h1 className={styles.title}>TODO</h1>
        </Link>
        {isLoggedIn ? <AfterLogin /> : <BeforeLogin />}
      </div>
    </div>
  );
}

export default React.memo(Navbar);
