import { useMemo, useState } from 'react';
import type { AsideProps } from '../../types/AsideProps';
import { getWeatherIcon } from '../../types/IconMatch';
import type { HourlyForecast } from '../../types/APIdata';
import { useAppSelector } from '../../app/hooks';
import { formatTemperature } from '../../utils/conversions';
import { formatTimeLabel } from '../../utils/formatters';

const getDayOptions = (weather: AsideProps['weather']) =>
  weather?.dailyForecast.slice(0, 7) ?? [];

const getHoursForDay = (weather: AsideProps['weather'], dayIndex: number) => {
  if (!weather) return [];
  const start = dayIndex * 24;
  const end = start + 24;
  return weather.hourlyForecast.slice(start, end);
};

const Aside = ({ icons, weather, isLoading }: AsideProps) => {
  const tempUnit = useAppSelector((state) => state.units.tempUnit);
  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(0);

  const dayOptions = useMemo(() => getDayOptions(weather), [weather]);

  const hours: HourlyForecast[] = useMemo(
    () => getHoursForDay(weather, selectedDayIndex),
    [weather, selectedDayIndex],
  );

  const handleDayChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDayIndex(Number(event.target.value));
  };

  return (
    <aside>
      <div className="aside-header">
        <p>Hourly forecast</p>
        <select name="date" value={selectedDayIndex} onChange={handleDayChange}>
          {dayOptions.length === 0 && <option value={0}>Today</option>}
          {dayOptions.map((day, index) => {
            const date = new Date(day.day);
            const label = date.toLocaleDateString(undefined, { weekday: 'long' });
            return (
              <option key={day.day} value={index}>
                {label}
              </option>
            );
          })}
        </select>
      </div>
      <div className="aside-content">
        {isLoading && hours.length === 0 && (
          <>
            {[...Array(12)].map((_, i) => (
              <div className="aside-card skeleton" key={i}>
                <div>
                  <p>Loading...</p>
                </div>
                <p>--</p>
              </div>
            ))}
          </>
        )}

        {!isLoading &&
          hours.map((hour) => (
            <div className={`aside-card ${isLoading ? 'skeleton' : ''}`} key={hour.time}>
              <div>
                <img
                  src={getWeatherIcon(hour.weatherDescription, icons)}
                  alt={hour.weatherDescription}
                />
                <p>{formatTimeLabel(hour.time)}</p>
              </div>
              <p>{formatTemperature(hour.temperature, tempUnit)}</p>
            </div>
          ))}
      </div>
    </aside>
  );
};

export default Aside;
