import mongoose from 'mongoose';
import Post from '../models/post.model.js';
import User from '../models/user.model.js';

// Helper: Validate ObjectId
// const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// // Helper: Handle user fetch
// const findUserById = async (userId, res) => {
//   const user = await User.findById(userId);
//   if (!user) {
//     res.status(404).json({ message: 'User not found' });
//     return null;
//   }
//   return user;
// }

// Create user
export async function userlog(req, res) {
  try {
    console.log(req.body);
    
    const { username, email } = req.body;
    const useralreadyexist = await User.findOne({email})

    if(useralreadyexist){
      console.log("data alrdy exist so returnd");
      return res.status(200).send(useralreadyexist)
    }


    console.log("new data created");

    if (!username || !email) return res.status(400).json({ message: 'Username and email are required' });

    const newUser = await User.create({ username, email });
    res.status(201).json(newUser);
  } catch (err) {
    console.error('userlog error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}

// Get user's full wishlist
export async function getWishlist(req, res) {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).populate('wishlist');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ message: 'Wishlist fetched', wishlist: user.wishlist });
  } catch (err) {
    console.error('getWishlist error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}

// Get wishlist post IDs only
export async function getWishlistIds(req, res) {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).select('wishlist');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ message: 'Wishlist IDs fetched', wishlistIds: user.wishlist });
  } catch (err) {
    console.error('getWishlistIds error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}

// Add post to wishlist
export async function addToWishlist(req, res) {
  try {
    const { postId } = req.body;
    const userId = req.user.id;

    if (!postId || !isValidObjectId(postId)) {
      return res.status(400).json({ message: 'Invalid or missing post ID' });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { wishlist: postId } },
      { new: true }
    );

    if (!updatedUser) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ message: 'Post added to wishlist', wishlist: updatedUser.wishlist });
  } catch (err) {
    console.error('addToWishlist error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}

// Remove post from wishlist
export async function removeFromWishlist(req, res) {
  try {
    const { postId } = req.params;
    const userId = req.user.id;

    if (!postId || !isValidObjectId(postId)) {
      return res.status(400).json({ message: 'Invalid or missing post ID' });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $pull: { wishlist: postId } },
      { new: true }
    );

    if (!updatedUser) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ message: 'Post removed from wishlist', wishlist: updatedUser.wishlist });
  } catch (err) {
    console.error('removeFromWishlist error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}

// Toggle wishlist
export async function toggleWishlist(req, res) {
  try {

    const { postId, uid } = req.params

    if (!postId || !uid) return res.status(400).json({ message: 'Post ID and User Id required' })

    const user = await User.findById( uid );
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isInWishlist = user.wishlist.includes(postId);
    const operation = isInWishlist
      ? { $pull: { wishlist: postId } }
      : { $addToSet: { wishlist: postId } };

    const updatedUser = await User.findByIdAndUpdate(user._id, operation, { new: true });

    res.status(200).json({
      message: isInWishlist ? 'Removed from wishlist' : 'Added to wishlist',
      wishlist: updatedUser.wishlist,
      added: !isInWishlist
    });
  } catch (err) {
    console.error('toggleWishlist error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}

// Add a new post
export async function addPost(req, res) {
  try {
    const files = req.files || [];
    if (files.length === 0) return res.status(400).json({ message: 'At least one photo is required.' });

    const {
      adTitle, description, price, location,
      phone = '', brand = '', year,
      fuel = '', transmission = '', kmDriven, owners = ''
    } = req.body;

    // Validate required fields
    if (!adTitle || !description || !price || !location) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Normalize enums
    const validFuel = ['CNG & Hybrids', 'Diesel', 'Electric', 'LPG', 'Petrol'];
    const validTransmission = ['Automatic', 'Manual'];
    const validOwners = ['1st', '2nd', '3rd', '4th', '4+'];

    const finalFuel = validFuel.includes(fuel) ? fuel : null;
    const finalTransmission = validTransmission.includes(transmission) ? transmission : null;
    const finalOwners = validOwners.includes(owners) ? owners : null;

    const photos = files.map(file => file.path);

    const newPost = await Post.create({
      adTitle: adTitle.trim(),
      description: description.trim(),
      price: Number(price),
      location: location.trim(),
      phone: phone.trim(),
      brand: brand.trim(),
      year: year ? Number(year) : undefined,
      fuel: finalFuel,
      transmission: finalTransmission,
      kmDriven: kmDriven ? Number(kmDriven) : undefined,
      owners: finalOwners,
      photos
    });

    res.status(201).json({ message: 'Post created successfully', data: newPost });
  } catch (err) {
    console.error('addPost error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}

// Load all posts
export async function loadpost(req, res) {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.status(200).json({ message: 'Success', data: posts });
  } catch (err) {
    console.error('loadpost error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}

// Get single post by ID
export async function getPostById(req, res) {

  console.log("inside load post");

  //    const { id } = req.params;
  //    console.log(id);
  try {
    const { id } = req.params;
    // if (!isValidObjectId(id)) return res.status(400).json({ message: 'Invalid post ID' });

    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    res.status(200).json({ message: 'Success', data: post });
  } catch (err) {
    console.error('getPostById error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}
