import {searchController, myLocationController} from "../controllers/locationController.js";
import { Router } from "express";

const router = Router();

router.get('/my-location', myLocationController);
router.get('/search/:text', searchController);

export default router;