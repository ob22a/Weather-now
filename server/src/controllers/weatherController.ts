import { type WeatherType } from "../types/dbInterface.js";
import { getWeatherData } from "../services/weatherService.js";

type Request = import('express').Request
type Response = import('express').Response

export const getWeather = async (req: Request, res: Response) => {
    try {
        // Expect country and city via query string to match the compiled server and frontend client.
        const { country, city } = req.query;
        if (!country || !city) {
            return res.status(400).json({ message: 'Country and city are required' });
        }
        const weather: WeatherType = await getWeatherData(country as string, city as string) as WeatherType;

        return res.status(200).json({ message: 'Weather data fetched successfully', weather });
    } catch (error: unknown) {
        const err = error as Error;
        res.status(500).json({ message: 'Internal Server Error', error: err.message });
        console.error('Error in weatherController:', err);
    }
}