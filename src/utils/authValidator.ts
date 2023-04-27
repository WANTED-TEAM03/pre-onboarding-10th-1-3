import { ERROR_MESSAGES, VALIDATE_PATTERNS } from '@/constants/auth';

export const authValidator = {
  email: (value: string) => {
    const isValid = VALIDATE_PATTERNS.email.test(value);
    return {
      isValid,
      message: isValid ? '' : ERROR_MESSAGES.email,
    };
  },
  password: (value: string) => {
    const isValid = VALIDATE_PATTERNS.password.test(value);
    return {
      isValid,
      message: isValid ? '' : ERROR_MESSAGES.password,
    };
  },
};
