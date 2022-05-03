import express from 'express';

const router = express.Router();

import upload from '../uploadConfig';

import {authenticateToken} from "../AuthMiddleWare/AuthenticateToken"

import {post_get_all, post_create, post_get_one, post_update, post_delete} from '../controllers/postControllers'


// Get all posts
router.get("/posts",  post_get_all);

// create post
router.post("/posts", authenticateToken, upload.single('poster'),  post_create);

// getting individual post
router.get("/posts/:id",  post_get_one)

// updating post
router.patch("/posts/:id", authenticateToken, upload.single('poster'), post_update)

// delete post
router.delete("/posts/:id", authenticateToken, post_delete)




export default router
