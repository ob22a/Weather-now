import {populateCountriesController} from "../controllers/countriesController.js";
import { Router } from "express";

const router = Router();

router.post('/populate', populateCountriesController);

export default router;