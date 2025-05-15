import express from "express";
import upload from "../multer/multer.config.js";
import { addPost, getPostById, loadpost, userlog } from "../controller/post.js";
import {
  getWishlist,
  getWishlistIds,
  addToWishlist,
  removeFromWishlist,
  toggleWishlist
} from "../controller/post.js";

const router = express.Router();

// Post routes
router.post('/posts', upload.array('photos', 20), addPost);
router.get('/loadposts', loadpost);
router.post('/signin', userlog);
router.get('/post/:id', getPostById);

// Wishlist routes - all protected by authentication
router.get('/wishlist', getWishlist);
router.get('/wishlist/ids/:userId', getWishlistIds);
router.post('/wishlist/add', addToWishlist);
router.delete('/wishlist/remove/:postId', removeFromWishlist);
router.post('/wishlist/toggle/:postId/:uid', toggleWishlist);

export default router;