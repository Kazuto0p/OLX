import express from "express";
import upload from "../multer/multer.config.js";
import { addPost, loadpost } from "../controller/post.js";


const router = express.Router();

router.post('/posts',upload.single('file'),addPost);
router.get('/loadposts',loadpost)


export default router;