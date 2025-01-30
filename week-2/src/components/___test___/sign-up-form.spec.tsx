import { fireEvent, render } from '@testing-library/react';
import SignUpPage from '../../page/SignUpPage';
import { act } from 'react';
import { ERROR_EMAIL_MSG } from '../../hooks/use-validate-credential';
import { Wrapper } from '../../utils/wrapper';

describe('이메일, 비밀번호를 입력하지 않으면 회원가입 할 수 없다.', () => {
  it('이메일, 비밀번호를 모두 한글자 이상 입력하면, 버튼은 활성화된다.', () => {
    // Given
    const email = '1234';
    const password = '1234';

    // When
    const { getByTestId } = render(<SignUpPage />, {
      wrapper: ({ children }) => (
        <Wrapper initialEntry="/sign-up">{children}</Wrapper>
      ),
    });

    const emailComponent = getByTestId('email');

    const passwordComponent = getByTestId('password');
    fireEvent.change(emailComponent, { target: { value: email } });
    fireEvent.change(passwordComponent, { target: { value: password } });
    // Then
    const buttonComponent = getByTestId('submit-button');
    expect(buttonComponent).not.toBeDisabled();
  });
});
describe('이메일은 이메일 형식이 아니면 회원가입을 할 수 없다.', () => {
  it('형식에 맞지 않은 이메일을 입력하고 제출버튼을 누르면, "이메일 형식이 아닙니다." 문구가 출력된다.', () => {
    // Given
    const invalidEmail = 'asd';
    const validPassword = 'asdf123';
    // When
    const { getByTestId } = render(<SignUpPage />, {
      wrapper: ({ children }) => (
        <Wrapper initialEntry="/sign-up">{children}</Wrapper>
      ),
    });

    const emailComponent = getByTestId('email');
    fireEvent.change(emailComponent, { target: { value: invalidEmail } });

    const passwordComponent = getByTestId('password');
    fireEvent.change(passwordComponent, { target: { value: validPassword } });

    act(() => {
      const buttonComponent = getByTestId('submit-button');
      fireEvent.click(buttonComponent);
    });

    // Then
    const helperText = getByTestId('helper-text');
    expect(helperText).toHaveTextContent(ERROR_EMAIL_MSG);
  });
});
