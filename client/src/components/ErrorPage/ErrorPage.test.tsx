import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import ErrorPage from './ErrorPage';

const renderWithStore = (ui: React.ReactElement) => {
  const store = configureStore({ reducer: { dummy: () => ({}) } });
  return render(<Provider store={store}>{ui}</Provider>);
};

describe('ErrorPage', () => {
  it('renders connection error content and retry action', () => {
    const onRetry = jest.fn();

    renderWithStore(
      <ErrorPage
        message="Unable to reach the WeatherNow server."
        kind="connection"
        onRetry={onRetry}
      />,
    );

    expect(screen.getByText('Unable to connect')).toBeInTheDocument();
    expect(screen.getByText('Unable to reach the WeatherNow server.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /retry connection/i })).toBeInTheDocument();

    screen.getByRole('button', { name: /retry connection/i }).click();
    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it('shows reconnecting state while retry is in progress', () => {
    renderWithStore(
      <ErrorPage
        message="Unable to reach the WeatherNow server."
        kind="connection"
        onRetry={jest.fn()}
        isRetrying
      />,
    );

    expect(screen.getByRole('button', { name: /reconnecting/i })).toBeDisabled();
  });
});
