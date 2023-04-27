import { useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTE_PATHS } from '@/constants/config';
import useInput from '@/hooks/useInput';
import { SignInAPI, SignUpAPI } from '@/services/auth';
import { AuthFormType } from '@/types/authForm';
import { authValidator } from '@/utils/authValidator';
import onKeydown from '@/utils/onKeydown';
import styles from './styles.module.scss';

type AuthFormProps = {
  formtype: 'signin' | 'signup';
};

export default function AuthForm({ formtype }: AuthFormProps) {
  const navigate = useNavigate();
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

  const handleSubmit = async () => {
    const authForm: AuthFormType = {
      email: emailInput.value,
      password: passwordInput.value,
    };

    if (isSignIn) {
      await SignInAPI(authForm)
        .then(response => {
          localStorage.setItem('access_token', response.data.access_token);
          navigate(ROUTE_PATHS.todo);
        })
        .catch(err => {
          localStorage.setItem('access_token', '');
        });
    } else {
      await SignUpAPI(authForm)
        .then(() => navigate(ROUTE_PATHS.signIn))
        .catch(err => console.log(err));
    }
  };

  const handleKeyDown = () => {
    if (isDisabled) return;
    handleSubmit();
  };

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
            onKeyDown={e => onKeydown(e, handleKeyDown)}
          />
          <p className={styles.errorMessage}>{passwordValidatioResult.message}</p>
        </div>
        <button
          className={styles.button}
          type="button"
          data-testid={isSignIn ? 'signin-button' : 'signup-button'}
          disabled={isDisabled}
          onClick={handleSubmit}
        >
          {isSignIn ? '로그인' : '회원가입'}
        </button>
        {isSignIn ? (
          <span className={styles.subContainer}>
            <p>회원으로 가입하고 싶으신가요?</p>
            <Link to="/signup">회원가입</Link>
          </span>
        ) : (
          <span className={styles.subContainer}>
            <p>이미 가입하신 회원이신가요?</p>
            <Link to="/signin">로그인</Link>
          </span>
        )}
      </form>
    </div>
  );
}
