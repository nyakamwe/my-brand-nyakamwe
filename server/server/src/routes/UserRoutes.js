import express from 'express';
import {authenticateToken} from "../AuthMiddleWare/AuthenticateToken";

import { users_get_all, user_create, user_get_token } from '../controllers/userControllers'

const router = express.Router();




//users//
router.get("/users", authenticateToken, users_get_all)

router.post("/users/register", user_create)

//login user
router.post("/users/login", user_get_token)

export default router
