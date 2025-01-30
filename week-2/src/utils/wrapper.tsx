import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';
import { MutableSnapshot, RecoilRoot } from 'recoil';

export const Wrapper = ({
  children,
  initialEntry = '/',
  initializeState,
}: {
  children: React.ReactNode;
  initialEntry?: string;
  initializeState?: (mutableSnapshot: MutableSnapshot) => void;
}) => {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <RecoilRoot initializeState={initializeState}>
        <MemoryRouter initialEntries={[initialEntry]}>{children}</MemoryRouter>
      </RecoilRoot>
    </QueryClientProvider>
  );
};
