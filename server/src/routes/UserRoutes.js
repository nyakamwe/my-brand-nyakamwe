import express from 'express';

const router = express.Router();

import { users_get_all, user_create, user_get_token } from '../controllers/userControllers'






//users//
router.get("/users", users_get_all)

router.post("/users", user_create)

//login user
router.post("/users/login", user_get_token)

export default router
