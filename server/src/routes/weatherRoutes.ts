import { getWeather } from "../controllers/weatherController.js";
import { Router } from "express";

const router = Router();

router.get('/', getWeather);

export default router;