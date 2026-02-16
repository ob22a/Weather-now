import {Country} from '../models/Countries.js';
import { IpApiLocationProvider } from '../providers/LocationProviders.js';
import { type DetectedLocation } from '../providers/LocationProviders.js';

const locationProvider = new IpApiLocationProvider();

export const userLocation = async (): Promise<DetectedLocation> => {
    return await locationProvider.detectLocation();
}

export const searchLocations = async (text: string) => {
    const regex = new RegExp(`^${text}`, 'i');
    const [countries, cities] = await Promise.all([
        Country.find({ name: regex }).limit(10),
        Country.find({ city: regex }).limit(10)
    ]);
    return [...countries, ...cities].map(item => ({
        name: item.name,
        city: item.city
    }));
};