import { RestCountriesProvider } from "../providers/CountriesProviders.js";
import type { CountryType } from "../types/dbInterface.js";


const countriesProvider = new RestCountriesProvider();

// Legacy  code initially fetched and recorded the countries data in the database. Now we fetch and filter the countries data on demand, and store it in the database for future use. This way we can ensure we have the most up-to-date data without relying on a separate population step. The populateCountriesController is kept for backward compatibility and can be used to manually trigger a refresh of the countries data if needed.
export const fetchAndFilterCountriesData = async () => {
    const countriesData = await countriesProvider.fetchCountriesData();

    if (!countriesData || countriesData.length === 0) {
        throw new Error('No countries data found from API');
    }

    const countries: CountryType[] = countriesData.filter(c => c.capital?.length > 0 && c.latlng?.length === 2).map((country => {
        return {
            name: country.name.common,
            city: country.capital?.[0] ?? 'N/A',
            latitude: country.latlng[0] as number,
            longitude: country.latlng[1] as number
        }
    }))

    return countries;
}

export const resolveAndSaveCity = async (city: string, country: string) => {
    const resolved = await countriesProvider.resolveCity(city, country);

    if (!resolved) {
        throw new Error(`Could not resolve coordinates for ${city}, ${country}`);
    }

    const { Country } = await import("../models/Countries.js");

    const newLocation = await Country.findOneAndUpdate(
        { name: resolved.country, city: resolved.name },
        {
            name: resolved.country,
            city: resolved.name,
            latitude: resolved.latitude,
            longitude: resolved.longitude
        },
        { upsert: true, new: true }
    );

    return newLocation;
};