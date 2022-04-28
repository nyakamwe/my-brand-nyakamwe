import express from 'express';
import {authenticateToken} from "../AuthMiddleWare/AuthenticateToken"
const router = express.Router();

import {messages_get_all, message_create, message_get_one, message_delete_one} from "../controllers/messageControllers"


//Contact or Messages
router.get("/messages", authenticateToken, messages_get_all)

router.get("/messages/:messageId", authenticateToken, message_get_one)

router.post("/messages", message_create)

router.delete("/messages/:messageId", authenticateToken, message_delete_one)
export default router