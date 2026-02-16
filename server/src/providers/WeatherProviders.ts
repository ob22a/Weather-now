import { type WeatherType } from "../types/dbInterface.js";
import { Types } from "mongoose";
import { type weatherAPIResponse } from "../types/api.js";
import { weatherCodeConvertor } from "../utils/status.js";

abstract class WeatherProvider{
    abstract fetchWeather(latitude:number,longitude:number,countryId:Types.ObjectId):Promise<WeatherType>
}

export class OpenMeteoProvider extends WeatherProvider{
    async fetchWeather(latitude: number, longitude: number, countryId: Types.ObjectId): Promise<WeatherType> {
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,precipitation&daily=temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum,wind_speed_10m_max,relative_humidity_2m_max&timezone=auto`);

        if(!response.ok) throw new Error('Open-Meteo fetch failed');

         const weatherJSON:weatherAPIResponse = await response.json();
         return {
                countryId,
                date: new Date(),
                dailyForecast: weatherJSON.daily.time.map((date,index)=>{
                    return {
                        day: date,
                        currentTemperature: weatherJSON.hourly.temperature_2m.slice(index*24,index*24+24).reduce((prev,cur)=>prev+cur,0)/24,
                        highTemperature: weatherJSON.daily.temperature_2m_max[index] as number,
                        lowTemperature: weatherJSON.daily.temperature_2m_min[index] as number,
                        weatherDescription: weatherCodeConvertor(weatherJSON.daily.weather_code[index] as number),
                    }
                }),

                hourlyForecast: weatherJSON.hourly.time.map((time,index)=>{
                    return{
                        time: time,
                        apparentTemperature: weatherJSON.hourly.apparent_temperature[index] ?? 0,
                        humidity: weatherJSON.hourly.relative_humidity_2m[index] ?? 0,
                        windSpeed: weatherJSON.hourly.wind_speed_10m[index] ?? 0,
                        precipitation: weatherJSON.hourly.precipitation[index] ?? 0,
                        temperature: weatherJSON.hourly.temperature_2m[index] ?? 0,
                        weatherDescription: weatherCodeConvertor(weatherJSON.hourly.weather_code[index] as number),
                    }
                })
            }

    }
}