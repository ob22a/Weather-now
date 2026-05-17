import Header from './Header/Header';
import MainPage from './MainPage/MainPage';
import Search from './Search/Search';
import { WEATHER_ICONS } from '../constants/weatherIcons';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import ErrorPage from './ErrorPage/ErrorPage';
import { initializeApp, refreshCurrentWeather } from '../features/weather/weatherThunks';

function App() {
  const dispatch = useAppDispatch();
  const location = useAppSelector((state) => state.location.current);
  const weather = useAppSelector((state) => state.weather.data);
  const isLoadingWeather = useAppSelector((state) => state.weather.isLoading);
  const weatherError = useAppSelector((state) => state.weather.error);
  const errorKind = useAppSelector((state) => state.weather.errorKind);

  const isConnectionError = errorKind === 'connection';
  const showErrorPage =
    Boolean(weatherError) && (isConnectionError || !weather);

  const handleRetry = () => {
    if (location) {
      void dispatch(refreshCurrentWeather());
    } else {
      void dispatch(initializeApp());
    }
  };

  if (showErrorPage) {
    return (
      <ErrorPage
        message={weatherError!}
        kind={errorKind}
        onRetry={handleRetry}
        isRetrying={isLoadingWeather}
      />
    );
  }

  return (
    <>
      <Header />
      <h1>How&apos;s the sky looking today?</h1>
      <Search />
      <MainPage
        icons={WEATHER_ICONS}
        weather={weather}
        location={location}
        isLoading={isLoadingWeather}
        isError={Boolean(weatherError)}
      />
    </>
  );
}

export default App;
