import express from "express";
import {
    getEdata,
    getEdataById,
    createEdata,
    deleteEdata

} from "../controllers/Edata.js";
import { verifyUser,adminOnly,verifyDevice  } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/edata',verifyUser,getEdata);
router.get('/edata/:id',verifyUser,getEdataById);
router.post('/edata',verifyDevice,createEdata);
router.delete('/edata/:userId',verifyUser,adminOnly,deleteEdata);

export default router;