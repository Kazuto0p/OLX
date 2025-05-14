import express from "express";
import upload from "../multer/multer.config.js";
import { addPost,getPostById,loadpost } from "../controller/post.js";


const router = express.Router();

router.post('/posts',upload.array('photos', 20),  addPost);

router.get('/loadposts',loadpost)
router.get('/post/:id',getPostById)

export default router;