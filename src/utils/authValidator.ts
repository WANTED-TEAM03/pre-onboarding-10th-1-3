const VALIDATE_PATTERNS = {
  email: /.*@.*/g,
  password: /^.{8,}$/,
};

export const ERROR_MESSAGES = {
  email: '@를 포함하여 입력해주세요.',
  password: '8자리 이상 입력해주세요.',
};

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
