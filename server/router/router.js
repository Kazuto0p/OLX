// import express from "express";
// import upload from "../multer/multer.config.js";
// import { addPost,getPostById,loadpost } from "../controller/post.js";
// import { getFavorites, getFavoritePosts, addFavorite, removeFavorite  } from "../controller/controllers_favorite.js";

// const router = express.Router();

// router.post('/posts',upload.array('photos', 20),  addPost);

// router.get('/loadposts',loadpost)
// router.get('/post/:id',getPostById)
// router.get('/favourites',getFavourites)

// export default router;


// routes/postRoutes.js or similar

import express from "express";
import upload from "../multer/multer.config.js";
import { addPost, getPostById, loadpost } from "../controller/post.js";
import {
  getFavorites,
  getFavoritePosts,
  addFavorite,
  removeFavorite,
} from "../controller/controllers_favorite.js";

const router = express.Router();

router.post('/posts', upload.array('photos', 20), addPost);
router.get('/loadposts', loadpost);
router.get('/post/:id', getPostById);

router.get('/favorites', getFavorites);
router.get('/favorites/posts', getFavoritePosts);
router.post('/favorites', addFavorite);
router.delete('/favorites/:postId', removeFavorite);

export default router;
