import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async ()=>{
    const mongoURI = process.env.MONGODB_URI;
    if(!mongoURI){
        console.error("MONGO_URI is not defined in environment variables");
        process.exit(1);
    }

    try{
        const connect = await mongoose.connect(mongoURI);
        console.log(`MongoDB connected: ${connect.connection.host}`);
    }catch(error){
        console.log(`Error: DB connection Failed \n ${error}`);
        process.exit(1);
    }
}

export default connectDB; 