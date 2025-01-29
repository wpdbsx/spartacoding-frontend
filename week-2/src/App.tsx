import { Route, Routes } from 'react-router-dom';

import { useAuthGuard } from './hooks/use-auth-guard';

function App() {
  useAuthGuard();

  return (
    <Routes>
      <Route path="/" element={<>메인</>} />
      <Route path="/sign-up" element={<>sign-up</>} />
    </Routes>
  );
}

export default App;
