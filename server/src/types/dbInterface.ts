import { type Types } from "mongoose";
import { type WeatherDescription } from "../utils/status.js";

export interface CountryType{
    name: string;
    city: string;
    latitude: number;
    longitude: number;
}

export interface WeatherType{
    countryId:Types.ObjectId;
    date: Date;
    dailyForecast: Array<{
        day: string;
        currentTemperature: number;
        highTemperature: number;
        lowTemperature: number;
        weatherDescription: WeatherDescription;
    }>
    hourlyForecast: Array<{
        time: string;
        apparentTemperature: number;
        humidity: number;
        windSpeed: number;
        precipitation: number;
        temperature: number;
        weatherDescription: WeatherDescription;
    }>
}