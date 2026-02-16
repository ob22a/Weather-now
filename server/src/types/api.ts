export interface countriesAPIResponse {
    name: {
        common: string;
        official: string;
        nativeName: {
            [key: string]: {
                official: string;
                common: string;
            }
        }
    };
    capital: string[];
    latlng: number[];
}

export interface weatherAPIResponse {
    latitude: number;
    longitude: number;
    timezone_abbreviation: string;
    hourly_units: {
        time: string;
        temperature_2m: string;
        apparent_temperature: string;
        relative_humidity_2m: string;
        wind_speed_10m: string;
        precipitation: string;
        weather_code: string
    };

    hourly: {
        time: string[];
        temperature_2m: number[];
        apparent_temperature: number[];
        relative_humidity_2m: number[];
        wind_speed_10m: number[];
        precipitation: number[];
        weather_code: number[]
    };

    daily_units: {
        time: string;
        temperature_2m: string;
        apparent_temperature: string;
        relative_humidity_2m: string;
        wind_speed_10m: string;
        precipitation: string;
        weather_code: string
    };

    daily: {
        time: string[];
        temperature_2m_max: number[];
        temperature_2m_min: number[];
        apparent_temperature_max: number[];
        apparent_temperature_min: number[];
        precipitation_sum: number[];
        wind_speed_10m_max: number[];
        relative_humidity_2m_max: number[];
        weather_code: number[]
    };
}

export interface GeocodingResult {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    elevation: number;
    feature_code: string;
    country_code: string;
    admin1_id?: number;
    timezone: string;
    population?: number;
    postcodes?: string[];
    country_id: number;
    country: string;
    admin1?: string;
}

export interface GeocodingAPIResponse {
    results?: GeocodingResult[];
    generationtime_ms: number;
}