import { useState } from 'react';
import { useValidateCredential } from '../hooks/use-validate-credential';
import { useSignUpApi } from '../hooks/use-sign-up-api';
import { useNavigate } from 'react-router-dom';

const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const disabled = !email || !password;
  const navigate = useNavigate();
  const { errorMessage, validateCredential, isValid } = useValidateCredential();
  const { isPending, mutate } = useSignUpApi({
    onSuccess: () => {
      navigate('/sign-up/success');
    },
  });
  console.log('isPending:', isPending);
  if (isPending) {
    return <div data-testid="loader">로딩중..</div>;
  }
  return (
    <main
      style={{
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '48px',
      }}
    >
      <input
        data-testid="email"
        type="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      {errorMessage && <p data-testid="helper-text">{errorMessage}</p>}
      <input
        data-testid="password"
        type="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <button
        type="submit"
        data-testid="submit-button"
        disabled={disabled}
        onClick={() => {
          validateCredential(email, password);
          if (!isValid) {
            return;
          }
          mutate({ email, password });
        }}
      >
        제출
      </button>
    </main>
  );
};

export default SignUpPage;
