import express from 'express';
import cors from 'cors';
import apiRoutes from './routes/index.js';
import connectDB from './config/database.js';
import { fileURLToPath } from 'url';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Allow the frontend (e.g. Vite on 5173 or deployed client) to talk to this API.
app.use(cors({
    origin: '*', // This is temporary for development. In production, specify the frontend URL(s) here for better security.
}));

app.use('/api', apiRoutes);

const startServer = async () => {
    await connectDB();
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
};

// Only start the server if this file is run directly
if (process.argv[1] === fileURLToPath(import.meta.url)) {
    startServer();
}

export default app;