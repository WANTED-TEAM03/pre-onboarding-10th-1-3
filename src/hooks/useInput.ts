import { useRef, useState } from 'react';

type Validator = {
  isValid: boolean;
  message?: string;
};

type UseInputProps = {
  initValue: string;
  validator?: (value: string) => Validator;
};

type UseInputReturn = [
  {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    setValue: React.Dispatch<React.SetStateAction<string>>;
  },
  Validator,
];

const useInput = ({ initValue, validator }: UseInputProps): UseInputReturn => {
  const [value, setValue] = useState(initValue);
  const validationResult = useRef<Validator>({ isValid: false });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value: InputValue } = e.target;

    if (validator) validationResult.current = validator(InputValue);

    setValue(InputValue);
  };

  return [{ value, onChange, setValue }, validationResult.current];
};

export default useInput;
