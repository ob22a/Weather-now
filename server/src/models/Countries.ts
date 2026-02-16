import { Schema, model,type HydratedDocument} from "mongoose";
import { type CountryType } from "../types/dbInterface.js";

const countrySchema = new Schema<CountryType>({
    name:{
        type: String,
        required: true,
    },
    
    city:{
        type: String,
        required: true
    },

    latitude:{
        type: Number,
        required: true
    },

    longitude:{
        type: Number,
        required: true
    }
})

countrySchema.index({ name: 1, city: 1 }, { unique: true });

export const Country = model<CountryType>('Country',countrySchema);
export type ICountry = HydratedDocument<CountryType>;

// Countries Logic for loading countries

export const loadCountries = async (
  allCountries: Array<CountryType>
): Promise<void> => {

  await Country.bulkWrite(
    allCountries.map((country) => ({
      updateOne: {
        filter: { 
          name: country.name, 
          city: country.city 
        },
        update: { $set: country },
        upsert: true,
      },
    }))
  );

  console.log('Countries upserted successfully');
};
