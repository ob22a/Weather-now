import errorIcon from '../../assets/images/icon-error.svg';
import retryIcon from '../../assets/images/icon-retry.svg';

interface ErrorPageProps {
  message: string;
  title?: string;
  showRetry?: boolean;
  onRetry?: () => void;
}

const ErrorPage = ({
  message,
  title = 'Something went wrong',
  showRetry = true,
  onRetry,
}: ErrorPageProps) => {
  return (
    <main>
      <div className="forcast-dashboard">
        <div className="large-card" style={{ alignItems: 'center', justifyContent: 'center' }}>
          <div
            style={{
              width: '100%',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '16px',
            }}
          >
            <img
              src={errorIcon}
              alt="Error icon"
              style={{ width: '96px', height: '96px' }}
            />
            <h2 style={{ fontSize: '2rem' }}>{title}</h2>
            <p style={{ fontSize: '1.2rem', maxWidth: '480px' }}>{message}</p>
            {showRetry && onRetry && (
              <button type="button" onClick={onRetry}>
                <img src={retryIcon} alt="Retry icon" />
                Try again
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default ErrorPage;
