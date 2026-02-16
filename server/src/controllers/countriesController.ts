import { type CountryType } from "../types/dbInterface.js"
import {loadCountries} from "../models/Countries.js";
import {fetchAndFilterCountriesData} from "../services/countriesService.js";

type Request = import('express').Request
type Response = import('express').Response

export const populateCountriesController = async (req:Request,res:Response)=>{
    try {
        const countriesData:CountryType[] = await fetchAndFilterCountriesData();
        await loadCountries(countriesData)

        return res.status(200).json({message:'Countries data fetched and stored successfully',count:countriesData.length});
    } catch (error:any) {
        if (error.message.includes('No countries data found from API')) {
            console.warn('No countries data found from API. Attempting to load from database.');
            res.status(200).json({ message: 'No countries data found from API. Attempting to load from database.' });
        }
        console.error("Fetching countries data error:", error);
        return res.status(500).json({ message: 'Failed to fetch countries data', error: error.message });
    }
}