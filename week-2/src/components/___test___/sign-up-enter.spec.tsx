import { render, screen } from '@testing-library/react';
import App from '../../App';
import { Wrapper } from '../../utils/wrapper';
import { LocationDisplay } from './location-dispay';
import { authState } from '../../recoil/atom';

describe('유저는 회원가입 페이지에 진입할 수 있다.', () => {
  it('로그인을 하지 않은 유저는, 회원가입 페이지에 진입할 수 있다.', () => {
    // Given
    const isLogin = false;
    const path = '/sign-up';

    // When
    render(<App />, {
      wrapper: ({ children }) => {
        return (
          <Wrapper
            initialEntry={path}
            initializeState={({ set }) => {
              set(authState, { isLogin });
            }}
          >
            {children}
            <LocationDisplay />
          </Wrapper>
        );
      },
    });

    // Then
    expect(screen.getByTestId('location-display')).toHaveTextContent(path);
  });

  it('로그인을 한 유저는, 회원가입 페이지에 진입할 수 없다.', () => {
    // Given
    const isLogin = true;
    const path = '/sign-up';
    const redirectPath = '/';
    // When
    render(<App />, {
      wrapper: ({ children }) => {
        return (
          <Wrapper
            initialEntry={path}
            initializeState={({ set }) => {
              set(authState, { isLogin });
            }}
          >
            {children}
            <LocationDisplay />
          </Wrapper>
        );
      },
    });

    // Then
    expect(screen.getByTestId('location-display')).toHaveTextContent(
      redirectPath
    );
  });
});
