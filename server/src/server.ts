import express from 'express';
import cors from 'cors';
import apiRoutes from './routes/index.js';
import connectDB from './config/database.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';
import { fileURLToPath } from 'url';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN ?? '*',
  }),
);

app.use('/api', apiRoutes);
app.use(notFoundHandler);
app.use(errorHandler);

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