import { Route, Routes } from 'react-router-dom';

import { useAuthGuard } from './hooks/use-auth-guard';
import SignUpPage from './page/SignUpPage';

function App() {
  useAuthGuard();

  return (
    <Routes>
      <Route path="/" element={<>메인</>} />
      <Route path="/sign-up" element={<SignUpPage />} />
      <Route path="/sign-up/success" element={<>회원가입 완료</>} />
    </Routes>
  );
}

export default App;
