import { Country } from "../models/Countries.js";

export interface DetectedLocation{
    country: string;
    city: string
}

abstract class LocationProvider{
    abstract detectLocation():Promise<DetectedLocation>
}

export class IpApiLocationProvider extends LocationProvider{
    async detectLocation(): Promise<DetectedLocation> {
        try{
            const response = await fetch("https://ipapi.co/json/")
            if (!response.ok){
                console.error('Failed to fetch location data. Will default to Berlin, Germany.');
                return {country: 'Germany',city: 'Berlin'}
            }
            const data = await response.json();
            const countryDoc = await Country.findOne({name: data.country_name})

            if(!countryDoc){
                console.error('Country not found defaulting to Berlin');
                return {country: 'Germany',city: 'Berlin'}
            }

            const cityExists = countryDoc.city.includes(data.city);
            return {
                country: data.country_name,
                city: cityExists? data.city : countryDoc.city
            }
        } catch(error){
            console.error("Error while locating IP. Defaulting to berlin", error)
            return {country: 'Germany', city:'Berlin'}
        }
    }
}