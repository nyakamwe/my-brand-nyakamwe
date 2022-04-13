import express from 'express';

const router = express.Router();

import upload from '../uploadConfig';

import {post_get_all, post_create, post_get_one, post_update, post_delete,comment_one, 
        messages_get_all,message_create, authenticateToken,post_like,post_unlike, users_get_all, user_create, user_get_token} from '../controllers/postControllers'

// Get all posts
router.get("/posts", post_get_all);

// create post
router.post("/posts", upload.single('poster'), post_create);

// getting individual post
router.get("/posts/:id", post_get_one)

// updating post
router.patch("/posts/:id", upload.single('poster'), post_update)

// delete post
router.delete("/posts/:id", post_delete)

//comment
router.post("/posts/:id/comment", authenticateToken, comment_one)

//Contact or Messages
router.get("/messages/", messages_get_all)

router.post("/messages/", message_create)

//like a post
router.put("/posts/like", authenticateToken, post_like)

//unlike a post
router.put("/posts/:id/unlike", authenticateToken, post_unlike)

//users//
router.get("/users", users_get_all)

router.post("/users", user_create)

//login user
router.post("/users/login", user_get_token)

export default router
