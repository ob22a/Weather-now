import { Country } from "../models/Countries.js";
import { resolveAndSaveCity } from "../services/countriesService.js";

export interface DetectedLocation {
    country: string;
    city: string
}

abstract class LocationProvider {
    abstract detectLocation(): Promise<DetectedLocation>
}

export class IpApiLocationProvider extends LocationProvider {
    async detectLocation(): Promise<DetectedLocation> {
        try {
            const response = await fetch("https://ipapi.co/json/")
            if (!response.ok) {
                console.error('Failed to fetch location data. Will default to Berlin, Germany.');
                return { country: 'Germany', city: 'Berlin' }
            }
            const data = await response.json();
            const countryDoc = await Country.findOne({ name: data.country_name })

            if (!countryDoc) {
                console.warn(`Country ${data.country_name} not found in DB. Attempting to resolve via Geocoding API.`);
                try {
                    const resolved = await resolveAndSaveCity(data.city, data.country_name);
                    return {
                        country: resolved.name,
                        city: resolved.city
                    };
                } catch (resolveError) {
                    console.error('Failed to resolve location via Geocoding API. Defaulting to Berlin.', resolveError);
                    return { country: 'Germany', city: 'Berlin' };
                }
            }

            const cityExists = countryDoc.city.toLowerCase() === data.city.toLowerCase();
            return {
                country: data.country_name,
                city: cityExists ? data.city : countryDoc.city
            }
        } catch (error: unknown) {
            const err = error as Error;
            console.error("Error while locating IP. Defaulting to berlin", err.message)
            return { country: 'Germany', city: 'Berlin' }
        }
    }
}