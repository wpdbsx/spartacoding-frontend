import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { Wrapper } from '../../utils/wrapper';
import { server, SIGN_UP_URL } from '../../utils/test-setup/msw/server';
import { delay, http, HttpResponse } from 'msw';
import App from '../../App';
import { LocationDisplay } from './location-dispay';

describe('입력한 이메일과 비밀번호를 제출을 하면 회원가입이 완료된다.', () => {
  const beforesSubmit = () => {
    const email = 'asdf@asf.com';
    const password = 'asdf123!@#';

    server.use(
      http.post(SIGN_UP_URL, async () => {
        console.log('start');
        await delay(1000);
        console.log('end');
        return HttpResponse.json(
          {
            key: 'test',
          },
          { status: 200 }
        );
      })
    );
    const { getByTestId } = render(<App />, {
      wrapper: ({ children }) => (
        <Wrapper initialEntry="/sign-up">
          {children}
          <LocationDisplay />
        </Wrapper>
      ),
    });
    const emailComponent = getByTestId('email');

    const passwordComponent = getByTestId('password');
    const buttonComponent = getByTestId('submit-button');
    fireEvent.change(emailComponent, { target: { value: email } });
    fireEvent.change(passwordComponent, { target: { value: password } });
    fireEvent.click(buttonComponent);
  };
  it('회원가입 api가 요청되면 로더가 노출된다.', async () => {
    //Given

    beforesSubmit();
    // When

    // Then

    await waitFor(() => {
      const loaderComponent = screen.getByTestId('loader');
      expect(loaderComponent).toBeInTheDocument();
    });
  });
  it('회원가입 api의 status가 200이 내려오면, 회원가입 완료페이지가 노출된다.', async () => {
    //Given
    beforesSubmit();

    const redirectUrl = '/sign-up/success';
    await waitFor(() => {
      expect(screen.getByTestId('location-display')).toHaveTextContent(
        redirectUrl
      );
      expect(screen.getByText('회원가입 완료')).toBeInTheDocument();
    });
  });
  it('회원가입 api의 status가 400이나 500이 내려오면, 실패페이지가 노출된다.', () => {
    //Given
    const invalidEmail = 'wpdbsx@naver.com';
    const validPassword = 'asdf';
  });
});
