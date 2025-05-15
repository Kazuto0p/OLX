import Post from '../models/post.model.js';

export async function addPost(req, res) {
  try {
    const files = req.files || [];
    if (files.length === 0) {
      return res.status(400).json({ message: 'At least one photo is required.' });
    }

    const {
      adTitle,
      description,
      price,
      location,
      phone = '',
      brand = '',
      year,
      fuel = '',
      transmission = '',
      kmDriven,
      owners = ''
    } = req.body;

    // Validate required fields
    if (!adTitle || !description || !price || !location) {
      return res.status(400).json({ message: 'adTitle, description, price, and location are required.' });
    }

    // Handle invalid enum values by setting them to `null` or a valid default
    const validFuelValues = ['CNG & Hybrids', 'Diesel', 'Electric', 'LPG', 'Petrol'];
    const validTransmissionValues = ['Automatic', 'Manual'];
    const validOwnersValues = ['1st', '2nd', '3rd', '4th', '4+'];

    const finalFuel = validFuelValues.includes(fuel) ? fuel : null;
    const finalTransmission = validTransmissionValues.includes(transmission) ? transmission : null;
    const finalOwners = validOwnersValues.includes(owners) ? owners : null;

    const photos = files.map(file => file.path);

    const newPost = await Post.create({
      adTitle: adTitle.trim(),
      description: description.trim(),
      price: Number(price),
      location: location.trim(),
      phone: phone.trim(),
      brand: brand.trim(),
      year: year ? Number(year) : undefined,
      fuel: finalFuel,  // Fuel should now either be valid or null
      transmission: finalTransmission,  // Transmission should either be valid or null
      kmDriven: kmDriven ? Number(kmDriven) : undefined,
      owners: finalOwners,  // Owners should either be valid or null
      photos
    });

    return res.status(201).json({ message: 'Post created successfully', data: newPost });

  } catch (error) {
    console.error('Error adding post:', error);
    return res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
}


export async function loadpost(req, res) {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    console.log('Loading posts:', posts);
    return res.status(200).json({ message: 'Success', data: posts });
  } catch (error) {
    console.error('Error loading posts:', error);
    return res.status(500).json({ message: 'Server error while loading posts', error: error.message });
  }
}



export async function getPostById(req, res) {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    return res.status(200).json({ message: 'Success', data: post });
  } catch (error) {
    console.error('getPostById error:', error.stack || error);
    return res.status(500).json({ message: 'Server side error', error: error.message });
  }
}