import express from "express";
import { getWeathers } from "../controllers/Weathers.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/weathers',verifyUser,getWeathers);

export default router;