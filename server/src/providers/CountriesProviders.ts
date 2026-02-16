import { type countriesAPIResponse } from "../types/api.js";

abstract class CountriesProvider {
    abstract fetchCountriesData(): Promise<countriesAPIResponse[]>
    abstract resolveCity(city: string, country: string): Promise<any>;
}

export class RestCountriesProvider extends CountriesProvider {
    async fetchCountriesData(): Promise<countriesAPIResponse[]> {
        const response = await fetch('https://restcountries.com/v3.1/all');
        if (!response.ok) throw new Error('Failed to fetch countries data from Rest Countries API');
        const countriesData: countriesAPIResponse[] = await response.json();
        return countriesData;
    }

    async resolveCity(city: string, country: string): Promise<any> {
        const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=10&language=en&format=json`;
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch city resolution data');

        const data = await response.json();
        const results = data.results || [];

        // Find a result that matches the country
        const match = results.find((r: any) => r.country.toLowerCase() === country.toLowerCase());
        return match || results[0] || null;
    }
}