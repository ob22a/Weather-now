type Request = import('express').Request
type Response = import('express').Response
import { userLocation, searchLocations } from '../services/locationService.js';
import { type CountryType } from "../types/dbInterface.js";

export const myLocationController = async (req: Request, res: Response) => {
    try {
        const location = await userLocation();
        return res.status(200).json({ message: 'Location data fetched successfully', location });
    } catch (error) {
        console.error('Error in myLocationController:', error);
        console.error('Failed to fetch location data. Will default to Berlin, Germany.');
        return res.status(200).json({ message: 'Location data fetched successfully', location: { country: 'Germany', city: 'Berlin' } });
    }
}

export const searchController = async (req: Request, res: Response) => {
    const { text } = req.params;
    const searchText = Array.isArray(text) ? text[0] : text;
    if (!searchText) {
        return res.status(400).json({ message: 'Search text is required' });
    }

    try {
        const countriesAndCities: Partial<CountryType>[] = await searchLocations(searchText);

        if (countriesAndCities.length === 0) {
            return res.status(404).json({ message: 'No matching countries or cities found' });
        }
        res.status(200).json({ message: 'Search results fetched successfully', results: countriesAndCities });

    } catch (error: unknown) {
        const err = error as Error;
        res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
}