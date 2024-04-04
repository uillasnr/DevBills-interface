import { ReactNode } from 'react';
import { FetchAPIProvider } from './useFetchApi';

type AppProviderProps = {
  children: ReactNode;
};

export function AppProvider({ children }: AppProviderProps) {
  return <FetchAPIProvider>{children}</FetchAPIProvider>;
}
