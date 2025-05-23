import express from "express";
import upload from "../multer/multer.config.js";
import { addPost, getPostById, loadpost, updateUser, userlog,loadProfile,offer, loadUserPosts, } from "../controller/post.js";
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
router.put('/user', upload.single('profilePic'), updateUser);

// Wishlist routes - all protected by authentication
router.get('/wishlist', getWishlist);
router.get('/wishlist/ids/:userId', getWishlistIds);
router.post('/wishlist/add', addToWishlist);
router.delete('/wishlist/remove/:postId', removeFromWishlist);
router.post('/wishlist/toggle/:postId/:uid', toggleWishlist);

router.get('/loadProfile',loadProfile)
// router.get('/loadpostByCategory',loadpostByCategory)
router.get("/offer",offer)
router.get('/loadUserPosts', loadUserPosts);

export default router;