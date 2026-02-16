import { Router } from 'express';
import weatherRoutes from './weatherRoutes.js';
import locationRoutes from './locationRoutes.js';
import countriesRoutes from './countriesRoutes.js';

const router = Router();

router.use('/weather', weatherRoutes);
router.use('/location', locationRoutes); // Or split into /my-location and /search
router.use('/countries', countriesRoutes);

export default router;
