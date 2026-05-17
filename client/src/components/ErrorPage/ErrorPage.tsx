import errorIcon from '../../assets/images/icon-error.svg';
import logo from '../../assets/images/logo.svg';
import type { AppErrorKind } from '../../utils/apiErrors';

interface ErrorPageProps {
  message: string;
  kind?: AppErrorKind | null;
  showRetry?: boolean;
  isRetrying?: boolean;
  onRetry?: () => void;
}

const ERROR_COPY: Record<AppErrorKind, { title: string; hint: string }> = {
  connection: {
    title: 'Unable to connect',
    hint: 'The app could not reach the backend service. Start the server and try again.',
  },
  server: {
    title: 'Service unavailable',
    hint: 'The server responded with an error while loading your weather data.',
  },
  location: {
    title: 'Location unavailable',
    hint: 'We could not detect your location automatically. You can search for a city after reconnecting.',
  },
  general: {
    title: 'Something went wrong',
    hint: 'An unexpected problem occurred while loading the app.',
  },
};

const ErrorPage = ({
  message,
  kind = 'general',
  showRetry = true,
  isRetrying = false,
  onRetry,
}: ErrorPageProps) => {
  const copy = ERROR_COPY[kind ?? 'general'];

  return (
    <div className="error-page">
      <header className="error-page__header">
        <img className="logo" src={logo} alt="WeatherNow logo" />
      </header>

      <section className="error-page__panel" aria-live="polite">
        <div className="error-page__icon-wrap">
          <img className="error-page__icon" src={errorIcon} alt="" aria-hidden="true" />
        </div>

        <p className="error-page__eyebrow">Error</p>
        <h2 className="error-page__title">{copy.title}</h2>
        <p className="error-page__message">{message}</p>
        <p className="error-page__hint">{copy.hint}</p>

        {showRetry && onRetry && (
          <button
            className="error-page__retry"
            type="button"
            onClick={onRetry}
            disabled={isRetrying}
          >
            {isRetrying ? 'Reconnecting...' : 'Retry connection'}
          </button>
        )}
      </section>
    </div>
  );
};

export default ErrorPage;
