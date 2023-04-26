import { useMemo, useState } from 'react';
import useInput from '@/hooks/useInput';
import { authValidator } from '@/utils/authValidator';
import styles from './styles.module.scss';
import { Link } from 'react-router-dom';

type AuthFormProps = {
  formtype: 'signin' | 'signup';
};

export default function AuthForm({ formtype }: AuthFormProps) {
  const isSignIn = formtype === 'signin';
  const [emailInput, emailValidationResult] = useInput({
    initValue: '',
    validator: authValidator.email,
  });
  const [passwordInput, passwordValidatioResult] = useInput({
    initValue: '',
    validator: authValidator.password,
  });

  const isDisabled = useMemo(
    () =>
      ![emailValidationResult.isValid, passwordValidatioResult.isValid].every(isValid => isValid),
    [emailValidationResult.isValid, passwordValidatioResult.isValid],
  );

  return (
    <div className={styles.pageWrapper}>
      <h1 className={styles.title}>{isSignIn ? '로그인' : '회원가입'}</h1>
      <form className={styles.formWrapper}>
        <div className={styles.inputWrapper}>
          <label htmlFor="email">이메일</label>
          <input
            id="email"
            data-testid="email-input"
            type="text"
            placeholder="이메일을 입력하세요."
            value={emailInput.value}
            onChange={emailInput.onChange}
          />
          <p className={styles.errorMessage}>{emailValidationResult.message}</p>
        </div>
        <div className={styles.inputWrapper}>
          <label htmlFor="password">패스워드</label>
          <input
            id="password"
            data-testid="password-input"
            type="password"
            placeholder="비밀번호를 입력하세요."
            value={passwordInput.value}
            onChange={passwordInput.onChange}
          />
          <p className={styles.errorMessage}>{passwordValidatioResult.message}</p>
        </div>
        <button
          className={styles.button}
          type="button"
          data-testid={isSignIn ? 'signin-button' : 'signup-button'}
          disabled={isDisabled}
        >
          {isSignIn ? '로그인' : '회원가입'}
        </button>
        {isSignIn ? (
          <>
            <span className={styles.subContainer}>
              <p>회원으로 가입하고 싶으신가요?</p>
              <Link to="/signup">회원가입</Link>
            </span>
          </>
        ) : (
          <></>
        )}
      </form>
    </div>
  );
}
