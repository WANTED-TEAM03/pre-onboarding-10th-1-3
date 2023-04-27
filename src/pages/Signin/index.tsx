import React, { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate, useLocation, useOutletContext } from 'react-router-dom';
import useCheckInput from '@/hooks/useCheckInput';
import useInput from '@/hooks/useInput';
import { SignInAPI } from '@/services/user';
import { Form } from '@/types/form';
import onKeydown from '@/utils/onKeydown';
import styles from './styles.module.scss';

export default function SignInPage() {
  const authState = useOutletContext();
  const navigate = useNavigate();
  const { state } = useLocation();
  const [formDisabled, setFormDisabled] = useState(true);
  const [email, emailHandler] = useInput('');
  const [password, passwordHandler] = useInput('');
  const emailErrorState = useCheckInput(email, /.*@.*/g);
  const passwordErrorState = useCheckInput(password, /^.{8,}$/g);

  const handleSubmit = async () => {
    const form: Form = {
      email,
      password,
    };
    const response = await SignInAPI(form);
    if (response) {
      navigate('/todo');
    }
  };

  // keydown 이벤트가 일어날 때 실행할 핸들러
  const keydownHandler = () => {
    if (formDisabled) return;
    handleSubmit();
  };

  useEffect(() => {
    if (!emailErrorState && !passwordErrorState) {
      setFormDisabled(false);
    } else {
      setFormDisabled(true);
    }
    if (state) {
      setFormDisabled(false);
    }
  }, [emailErrorState, passwordErrorState]);

  if (authState) {
    return <Navigate to="/todo" />;
  }
  return (
    <div className={styles.pageWrapper}>
      <h1 className={styles.title}>로그인</h1>
      <form className={styles.formWrapper}>
        <div className={styles.inputWrapper}>
          <label htmlFor="email">이메일</label>
          <input
            id="email"
            data-testid="email-input"
            type="text"
            placeholder="이메일을 입력하세요."
            value={state ? state.email : email}
            onChange={emailHandler}
          />
          <p className={styles.errorMessage}>{emailErrorState && '@를 포함해야 합니다.'}</p>
        </div>
        <div className={styles.inputWrapper}>
          <label htmlFor="password">패스워드</label>
          <input
            id="password"
            data-testid="password-input"
            type="password"
            placeholder="비밀번호를 입력하세요."
            value={state ? state.password : email}
            onChange={passwordHandler}
            onKeyDown={e => onKeydown(e, keydownHandler)}
          />
          <p className={styles.errorMessage}>{passwordErrorState && '8자 이상이어야 합니다.'}</p>
        </div>
        <button
          className={styles.button}
          type="button"
          data-testid="signin-button"
          onClick={handleSubmit}
          disabled={formDisabled}
        >
          로그인
        </button>
        <span className={styles.subContainer}>
          <p>회원으로 가입하고 싶으신가요?</p>
          <Link to="/signup">회원가입</Link>
        </span>
      </form>
    </div>
  );
}
