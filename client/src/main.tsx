import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import App from './components/App';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import { store } from './app/store';
import { initializeApp } from './features/weather/weatherThunks';
import './styles/styles.css';

function AppBootstrap() {
  useEffect(() => {
    void store.dispatch(initializeApp());
  }, []);

  return (
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <AppBootstrap />
    </Provider>
  </StrictMode>,
);
