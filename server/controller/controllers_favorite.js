import Favorite from '../models/Favorite.js';
import Post from '../models/post.model.js';

// ✅ Get favorite post IDs
export async function getFavorites(req, res) {
  const userId = req.auth?.payload?.sub;
  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized: user not found in token' });
  }

  try {
    const favorites = await Favorite.find({ userId }).select('postId');
    const favoritePostIds = favorites.map(fav => fav.postId.toString());
    res.status(200).json({ favoritePostIds });
  } catch (err) {
    console.error('Error fetching favorites:', err);
    res.status(500).json({ message: 'Failed to fetch favorites', error: err.message });
  }
}

// ✅ Get full details of favorite posts
export async function getFavoritePosts(req, res) {
  const userId = req.auth?.payload?.sub;
  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized: user not found in token' });
  }

  try {
    const favorites = await Favorite.find({ userId }).select('postId');
    const postIds = favorites.map(fav => fav.postId);
    const posts = await Post.find({ _id: { $in: postIds } }).sort({ createdAt: -1 });
    res.status(200).json({ data: posts });
  } catch (err) {
    console.error('Error fetching favorite posts:', err);
    res.status(500).json({ message: 'Failed to fetch favorite posts', error: err.message });
  }
}

// ✅ Add to favorites
export async function addFavorite(req, res) {
  const { postId } = req.body;
  const userId = req.auth?.payload?.sub;

  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized: user not found in token' });
  }

  if (!postId) {
    return res.status(400).json({ message: 'Post ID is required' });
  }

  try {
    const favorite = new Favorite({ userId, postId });
    await favorite.save();
    return res.status(201).json({ message: 'Added to favorites' });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: 'Post already in favorites' });
    }
    console.error('Error adding favorite:', err);
    return res.status(500).json({ message: 'Failed to add to favorites', error: err.message });
  }
}

// ✅ Remove from favorites
export async function removeFavorite(req, res) {
  const { postId } = req.params;
  const userId = req.auth?.payload?.sub;

  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized: user not found in token' });
  }

  try {
    const result = await Favorite.deleteOne({ userId, postId });
    if (result.deletedCount === 0) {
      res.status(404).json({ message: 'Favorite not found' });
    } else {
      res.status(200).json({ message: 'Removed from favorites' });
    }
  } catch (err) {
    console.error('Error removing favorite:', err);
    res.status(500).json({ message: 'Failed to remove from favorites', error: err.message });
  }
}
