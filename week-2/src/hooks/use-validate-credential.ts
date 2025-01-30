import { useState } from 'react';
import {
  validateEmailPattern,
  validatePasswordPattern,
} from '../utils/validate-format';

export const useValidateCredential = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [isValid, setIsValid] = useState(false);

  const validateCredential = (email: string, password: string) => {
    if (email && !validateEmailPattern(email)) {
      setErrorMessage(ERROR_EMAIL_MSG);
      setIsValid(false);
    }
    if (password && !validatePasswordPattern(password)) {
      setPasswordErrorMessage(ERROR_PASSWORD_MSG);
      setIsValid(false);
    }
    setIsValid(true);
  };
  return {
    errorMessage: errorMessage,
    passwordErrorMessage,
    validateCredential,
    isValid: isValid,
  };
};

export const ERROR_EMAIL_MSG = '이메일 형식이 아닙니다.';
export const ERROR_PASSWORD_MSG =
  '비밀번호는 특수문자,숫자,문자가 포함된 8자리 이상이여야합니다.';
