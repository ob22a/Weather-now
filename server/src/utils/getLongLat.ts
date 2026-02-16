import { Country } from "../models/Countries.js";
import { type Types } from "mongoose";

export const getLongitudeLatitude = async (documentId:Types.ObjectId)=>{
    const doc = await Country.findById(documentId);
    if(!doc){
        throw new Error("Country info not found")
    }
    return [doc.longitude,doc.latitude];
}