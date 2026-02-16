import { Weather, upsertWeather } from "../models/Weather.js";
import { getId } from "../utils/getId.js";
import { getLongitudeLatitude } from "../utils/getLongLat.js";
import { isExpired } from "../utils/status.js";
import { OpenMeteoProvider } from "../providers/WeatherProviders.js";

const weatherProvider = new OpenMeteoProvider()

export const getWeatherData = async (country:  string, city:string)=>{
    const id = await getId(country,city)
    const weatherData = await Weather.findOne({countryId:id})

    const [longitude,latitude] = await getLongitudeLatitude(id)

    if (!longitude || !latitude){
        throw Error("Location not found")
    }

    if(!weatherData || isExpired(weatherData.date)){
        const freshWeather = await weatherProvider.fetchWeather(latitude,longitude,id);

        await upsertWeather(freshWeather)
        console.log(`Fetched fresh weather data from provider. Country: ${country}, City: ${city}`);

        return freshWeather;
    }
    console.log(`Using cached weather data. Country: ${country}, City: ${city}`);
    return weatherData;
}