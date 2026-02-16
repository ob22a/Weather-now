import { Schema, model, type HydratedDocument } from "mongoose";
import { type WeatherType } from "../types/dbInterface.js";
import {type OptionalExcept} from '../types/customUtility.js';

const weatherSchema = new Schema<WeatherType>({
    countryId:{
        type: Schema.Types.ObjectId,
        ref: 'Country',
        required: true
    },

    date:{
        type: Date,
        required: true
    },

    dailyForecast:[{
        day:{
            type: String,
            required: true
        },

        currentTemperature:{
            type: Number,
            required: true
        },

        highTemperature:{
            type: Number,
            required: true
        },

        lowTemperature:{
            type: Number,
            required: true
        },

        weatherDescription:{
            type: String,
            required: true
        }
    }],

    hourlyForecast:[
        {
            time:{
                type: String,
                required: true
            },

            apparentTemperature:{
                type: Number,
                required: true
            },
        
            humidity:{
                type: Number,
                required: true
            },
        
            windSpeed:{
                type: Number,
                required: true
            },
        
            precipitation:{
                type: Number,
                required: true
            },

            temperature:{
                type: Number,
                required: true
            },

            weatherDescription:{
                type: String,
                required: true
            }
        }
    ]

})

export const Weather = model<WeatherType>('Weather',weatherSchema);
export type IWeatherDocument = HydratedDocument<WeatherType>;

// Weather Schema Models DB changes
/*
    1. Update weather -> change all the fields from cur to future temperature in one week range
*/

export const upsertWeather = async(newData:Partial<OptionalExcept<WeatherType,'countryId' & 'date'>>  )=>{
    const {countryId,date} = newData;
    if(!countryId || !date) throw new Error('Country ID and date are required to update weather data');

    let weatherDoc = await Weather.findOne({countryId,date});
    
    // If weather document doesn't exist, create a new one

    if(!weatherDoc){
        const newWeather = new Weather(newData);
        await newWeather.save();
        return newWeather;
    }

    // Update existing document
    Object.assign(weatherDoc,newData);
    await weatherDoc.save();
    return weatherDoc;

}