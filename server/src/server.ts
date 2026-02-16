import express from 'express';
import cors from 'cors';
import apiRoutes from './routes/index.js';
import connectDB from './config/database.js';

const app = express();
await connectDB();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Allow the frontend (e.g. Vite on 5173 or deployed client) to talk to this API.
app.use(cors({
    origin: '*', // This is temporary for development. In production, specify the frontend URL(s) here for better security.
}));

app.use('/api',apiRoutes)

app.listen(3000,()=>{
    console.log('Server is running on http://localhost:3000');
})