import express from "express";
import {
    getUsersByRole,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} from "../controllers/Users.js";
import { verifyUser,adminOnly } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/users',verifyUser,adminOnly,getUsersByRole);
router.get('/users/:id',verifyUser,adminOnly,getUserById);
router.post('/users',verifyUser,adminOnly,createUser);
router.patch('/users/:id',verifyUser,updateUser);
router.delete('/users/:id',verifyUser,adminOnly,deleteUser);

export default router;