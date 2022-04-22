import express from 'express';
import {authenticateToken} from "../AuthMiddleWare/AuthenticateToken";
import {comment_one, comment_get_all, comment_get_one,comment_delete} from '../controllers/commentControllers';

const router = express.Router(); 

//add comment
router.post("/posts/:id/comment", authenticateToken, comment_one)

// get all comment of a post
router.get("/posts/:id/comment", comment_get_all)

// get one comment
router.get("/comments/:id", comment_get_one)

// delete comment 
router.delete("/comments/:id", authenticateToken, comment_delete)



export default router