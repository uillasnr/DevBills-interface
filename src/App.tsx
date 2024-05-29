import { AppProvider } from './hooks';
import GlobalStyles from './Styles/global';

import Router from './routes/route';

export function App() {
  return (
    <AppProvider>
      <GlobalStyles />
      <Router />
    </AppProvider>
  );
}
