import Aside from '../Aside/Aside';
import type { MainPageProps } from '../../types/MainPageProps';
import { getWeatherIcon } from '../../types/IconMatch';
import type { DailyForecast, HourlyForecast } from '../../types/APIdata';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  celsiusToFahrenheit,
  formatPrecipitation,
  formatTemperature,
  formatWindSpeed,
} from '../../utils/conversions';
import { formatDate, formatDayLabel } from '../../utils/formatters';
import iconCheckmark from '../../assets/images/icon-checkmark.svg';
import errorIcon from '../../assets/images/icon-error.svg';
import retryIcon from '../../assets/images/icon-retry.svg';
import { refreshCurrentWeather } from '../../features/weather/weatherThunks';

const getTodayForecast = (
  daily: DailyForecast[] | undefined,
): DailyForecast | null => (daily && daily.length > 0 ? daily[0] : null);

const getCurrentHour = (hourly: HourlyForecast[] | undefined): HourlyForecast | null =>
  hourly && hourly.length > 0 ? hourly[0] : null;

const MainPage = ({ icons, weather, location, isLoading, isError }: MainPageProps) => {
  const dispatch = useAppDispatch();
  const { tempUnit, windUnit, precipUnit } = useAppSelector((state) => state.units);
  const today = getTodayForecast(weather?.dailyForecast);
  const currentHour = getCurrentHour(weather?.hourlyForecast);

  const locationLabel =
    location != null ? `${location.city}, ${location.country}` : 'Loading location...';

  const dateLabel = weather != null ? formatDate(weather.date) : 'Fetching date...';

  const mainIcon =
    today != null ? getWeatherIcon(today.weatherDescription, icons) : icons.sunny;

  const currentTemp =
    today != null ? formatTemperature(today.currentTemperature, tempUnit) : isLoading ? '--' : 'N/A';

  const feelsLike =
    currentHour != null
      ? formatTemperature(currentHour.apparentTemperature, tempUnit)
      : isLoading
        ? '--'
        : 'N/A';

  const humidity =
    currentHour != null ? `${Math.round(currentHour.humidity)}%` : isLoading ? '--' : 'N/A';

  const windSpeed =
    currentHour != null
      ? formatWindSpeed(currentHour.windSpeed, windUnit)
      : isLoading
        ? '--'
        : 'N/A';

  const precipitation =
    currentHour != null
      ? formatPrecipitation(currentHour.precipitation, precipUnit)
      : isLoading
        ? '--'
        : 'N/A';

  const hasDailyForecast = weather?.dailyForecast && weather.dailyForecast.length > 0;

  const handleRetry = () => {
    void dispatch(refreshCurrentWeather());
  };

  return (
    <main>
      <div className="forcast-dashboard">
        <div className={`large-card ${isLoading ? 'skeleton skeleton-text' : ''}`}>
          <div>
            <p>{locationLabel}</p>
            <p>{dateLabel}</p>
          </div>
          <div>
            <img src={mainIcon} alt="Current weather icon" />
            <p>{currentTemp}</p>
          </div>
        </div>
        <div className="temp-cards">
          <div className={`temp-card ${isLoading ? 'skeleton' : ''}`}>
            <p>Feels Like</p>
            <p>{feelsLike}</p>
          </div>
          <div className={`temp-card ${isLoading ? 'skeleton' : ''}`}>
            <p>Humidity</p>
            <p>{humidity}</p>
          </div>
          <div className={`temp-card ${isLoading ? 'skeleton' : ''}`}>
            <p>Wind</p>
            <p>{windSpeed}</p>
          </div>
          <div className={`temp-card ${isLoading ? 'skeleton' : ''}`}>
            <p>Precipitation</p>
            <p>{precipitation}</p>
          </div>
        </div>
        <p>Daily Forecast</p>
        <div className="daily-forecast">
          {isLoading && !hasDailyForecast && (
            <>
              {[...Array(7)].map((_, i) => (
                <div className="daily-temp-card skeleton" key={i}>
                  <div className="daily-temp-card-info">
                    <p>Loading</p>
                    <img src={iconCheckmark} alt="Loading indicator" />
                  </div>
                  <div className="daily-temp">
                    <p>--</p>
                    <p>--</p>
                  </div>
                </div>
              ))}
            </>
          )}

          {!isLoading && isError && (
            <div className="daily-temp-card">
              <div className="daily-temp-card-info">
                <p>Error</p>
                <img src={errorIcon} alt="Error icon" />
              </div>
              <div className="daily-temp">
                <p>Unable to load forecast</p>
                <button type="button" onClick={handleRetry}>
                  <img src={retryIcon} alt="Retry icon" />
                  Retry
                </button>
              </div>
            </div>
          )}

          {hasDailyForecast &&
            weather!.dailyForecast.slice(0, 7).map((day) => (
              <div className={`daily-temp-card ${isLoading ? 'skeleton' : ''}`} key={day.day}>
                <div className="daily-temp-card-info">
                  <p>{formatDayLabel(day.day)}</p>
                  <img
                    src={getWeatherIcon(day.weatherDescription, icons)}
                    alt={day.weatherDescription}
                  />
                </div>
                <div className="daily-temp">
                  <p>
                    {Math.round(
                      tempUnit === 'C'
                        ? day.highTemperature
                        : celsiusToFahrenheit(day.highTemperature),
                    )}{' '}
                    °{tempUnit}
                  </p>
                  <p>
                    {Math.round(
                      tempUnit === 'C'
                        ? day.lowTemperature
                        : celsiusToFahrenheit(day.lowTemperature),
                    )}{' '}
                    °{tempUnit}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
      <Aside icons={icons} weather={weather} isLoading={isLoading} />
    </main>
  );
};

export default MainPage;
