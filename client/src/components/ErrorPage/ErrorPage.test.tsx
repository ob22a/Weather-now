import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import ErrorPage from './ErrorPage';

const renderWithStore = (ui: React.ReactElement) => {
  const store = configureStore({ reducer: { dummy: () => ({}) } });
  return render(<Provider store={store}>{ui}</Provider>);
};

describe('ErrorPage', () => {
  it('renders the error message and retry action', () => {
    const onRetry = jest.fn();

    renderWithStore(
      <ErrorPage message="Unable to load weather data." onRetry={onRetry} />,
    );

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(screen.getByText('Unable to load weather data.')).toBeInTheDocument();

    screen.getByRole('button', { name: /try again/i }).click();
    expect(onRetry).toHaveBeenCalledTimes(1);
  });
});
