import express from 'express';

const router = express.Router();

import {post_like} from '../controllers/likeControllers'

import {authenticateToken} from "../AuthMiddleWare/AuthenticateToken"


//like a post
router.put("/posts/:id/like", authenticateToken, post_like)


//unlike a post
// router.put("/posts/:id/unlike", authenticateToken, post_unlike)


export default router