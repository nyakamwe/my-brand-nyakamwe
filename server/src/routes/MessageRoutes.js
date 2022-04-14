import express from 'express';
const router = express.Router();

import {messages_get_all, message_create} from "../controllers/messageControllers"


//Contact or Messages
router.get("/messages", messages_get_all)

router.post("/messages", message_create)

export default router