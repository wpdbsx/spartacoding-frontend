import { renderHook } from '@testing-library/react';
import {
  ERROR_EMAIL_MSG,
  useValidateCredential,
} from '../../hooks/use-validate-credential';
import { act } from 'react';

describe('use-validate-credential', () => {
  it('이메일이 이메일 형식이 아니면 회원가입을 할 수 없다.', () => {
    //Given
    const invalidEmail = 'asdf';
    const validPassword = 'asdf';
    //When
    const { result } = renderHook(useValidateCredential);

    act(() => {
      result.current.validateCredential(invalidEmail, validPassword);
    });
    //**
    // 유효성 검사
    // * 트리거링 싲덤 -> data넘겨서 -> 내부에서 유효한지 검사
    // * validateEmail
    // * * 1. 데이터를받고
    // * * 2. 유효한지 검사
    // * * 3. 유효하면 메시지 없음
    // */

    //Then
    expect(result.current.errorMessage).toBe(ERROR_EMAIL_MSG);
  });
});
