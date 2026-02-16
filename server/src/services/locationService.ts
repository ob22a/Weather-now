import { Country } from '../models/Countries.js';
import { IpApiLocationProvider } from '../providers/LocationProviders.js';
import { type DetectedLocation } from '../providers/LocationProviders.js';
import { GeoCodingCountriesProvider } from '../providers/CountriesProviders.js';

const locationProvider = new IpApiLocationProvider();
const countriesProvider = new GeoCodingCountriesProvider();

export const userLocation = async (): Promise<DetectedLocation> => {
    return await locationProvider.detectLocation();
}

export const searchLocations = async (text: string) => {
    const regex = new RegExp(`^${text}`, 'i');
    const [countries, cities] = await Promise.all([
        Country.find({ name: regex }).limit(10),
        Country.find({ city: regex }).limit(10)
    ]);

    const localResults = [...countries, ...cities].map(item => ({
        name: item.name,
        city: item.city
    }));

    if (localResults.length === 0) {
        const externalResults = await countriesProvider.searchCity(text);
        return externalResults.map(r => ({
            name: r.country,
            city: r.name
        }));
    }

    return localResults;
};