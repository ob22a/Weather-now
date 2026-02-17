export const celsiusToFahrenheit = (celsius: number): number => (celsius * 9) / 5 + 32;

export const kmhToMph = (kmh: number): number => kmh * 0.621371;

export const mmToInches = (mm: number): number => mm * 0.0393701;

export const formatTemperature = (temp: number, unit: 'C' | 'F'): string => {
    const value = unit === 'C' ? temp : celsiusToFahrenheit(temp);
    return `${Math.round(value)}°${unit}`;
};

export const formatWindSpeed = (speed: number, unit: 'kmh' | 'mph'): string => {
    const value = unit === 'kmh' ? speed : kmhToMph(speed);
    return `${Math.round(value)} ${unit === 'kmh' ? 'km/h' : 'mph'}`;
};

export const formatPrecipitation = (mm: number, unit: 'mm' | 'in'): string => {
    const value = unit === 'mm' ? mm : mmToInches(mm);
    return `${value.toFixed(unit === 'mm' ? 1 : 2)} ${unit}`;
};
