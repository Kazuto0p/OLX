import Post from '../models/post.model.js';

// Controller for adding a new post
export async function addPost(req, res) {
  try {
    const files = req.files || [];
    if (files.length === 0) {
      return res.status(400).json({ message: 'At least one photo is required.' });
    }

    const {
      brand = '',
      year = '',
      fuel = '',
      transmission = '',
      kmDriven = '',
      owners = '',
      adTitle = '',
      description = '',
      price = '',
      location = '',
      phone = ''
    } = req.body;

    // Basic validation
    if (
      !brand || !year || !fuel || !transmission || !kmDriven || !owners ||
      !adTitle || !description || !price || !location || !phone
    ) {
      return res.status(400).json({ message: 'One or more required fields are missing.' });
    }

    const photos = files.map(file => file.path);

    const newPost = await Post.create({
      brand: brand.trim(),
      year: Number(year),
      fuel,
      transmission,
      kmDriven: Number(kmDriven),
      owners,
      adTitle: adTitle.trim(),
      description: description.trim(),
      price: Number(price),
      location: location.trim(),
      phone: phone.trim(),
      photos
    });

    return res.status(201).json({ message: 'Post created successfully', data: newPost });
  } catch (error) {
    console.error('addPost error:', error.stack || error);
    return res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
}


export async function addPost1(req, res) {
    try {
      const files = req.files || [];
      if (files.length === 0) {
        return res.status(400).json({ message: 'At least one photo is required.' });
      }
  
      const { title = '', description = '', price = '', location = '' } = req.body;
      if (!title || !description || !price || !location) {
        return res.status(400).json({ message: 'Missing title, description, price or location.' });
      }
  
      const photos = files.map(f => f.path);
      const newPost = await Post.create({
        title: title.trim(),
        description: description.trim(),
        price: Number(price),
        location: location.trim(),
        photos
      });
  
      return res.status(201).json({ message: 'Post created successfully', data: newPost });
    } catch (err) {
      console.error('addPost error:', err);
      return res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
  }
  

// Controller for loading posts
export async function loadpost(req, res) {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    console.log('Loading posts:', posts);
    return res.status(200).json({ message: 'Success', data: posts });
  } catch (error) {
    console.error('loadpost error:', error.stack || error);
    return res.status(500).json({ message: 'Server side error', error: error.message });
  }
}
