import express from "express";
import upload from "../multer/multer.config.js";
import { addPost,loadpost } from "../controller/post.js";


const router = express.Router();

router.post('/posts',upload.array('photos', 20),  addPost);
// router.post('/posts1',upload.array('photos', 12),  addPost1);
router.get('/loadposts',loadpost)


export default router;