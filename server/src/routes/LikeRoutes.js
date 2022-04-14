import express from 'express';

const router = express.Router();

import {post_like,post_unlike} from '../controllers/likeControllers'

import {authenticateToken} from "../AuthMiddleWare/AuthenticateToken"


//like a post
router.put("/posts/like", authenticateToken, post_like)

//unlike a post
router.put("/posts/:id/unlike", authenticateToken, post_unlike)


export default router