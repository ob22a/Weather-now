import { Country } from "../models/Countries.js";
import { resolveAndSaveCity } from "../services/countriesService.js";

export const getId = async (country: string, city: string) => {
    // 1. Try local lookup first (case-insensitive)
    let location = await Country.findOne({
        name: { $regex: new RegExp(`^${country}$`, "i") },
        city: { $regex: new RegExp(`^${city}$`, "i") }
    });

    if (location) return location._id;

    // 2. Fallback to dynamic resolution if not found
    const newLocation = await resolveAndSaveCity(city, country);

    return newLocation._id;
};