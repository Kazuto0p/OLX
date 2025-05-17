import mongoose from 'mongoose';
import Post from '../models/post.model.js';
import User from '../models/user.model.js';
// import Offer from '../models/offer.model.js';
import nodemailer from 'nodemailer';

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: "b19044a9377399",
    pass: "07ea9fa4d6583b",
  },
});




// Create user
export async function userlog(req, res) {
  try {
    console.log(req.body);
    
    const { username, email } = req.body;
    const useralreadyexist = await User.findOne({email});

    if(useralreadyexist){
      console.log("data alrdy exist so returnd");
      return res.status(200).send(useralreadyexist);
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

// Update user
export async function updateUser(req, res) {
  console.log("hello upda");
  let profilePic = req.body.profilePic;
  try {
    const { email, username, phone, about } = req.body;
    let profilePic = req.body.profilePic;

    if (req.file) {
      profilePic = `/uploads/${req.file.filename}`; 
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.username = username || user.username;
    user.phone = phone || user.phone;
    user.about = about || user.about;
    user.profilePic = profilePic || user.profilePic;

    await user.save();
    res.status(200).json(user);
  } catch (err) {
    console.error('updateUser error:', err);
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

    if (!postId || !mongoose.Types.ObjectId.isValid(postId)) {
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

    if (!postId || !mongoose.Types.ObjectId.isValid(postId)) {
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
    const { postId, uid } = req.params;

    if (!postId || !uid) return res.status(400).json({ message: 'Post ID and User Id required' });

    const user = await User.findById(uid);
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

  console.log(req.body);
  try {
    const files = req.files || [];
    

    const {
      adTitle, description, price, location,
      phone = '', brand = '', year,
      fuel = '', transmission = '', kmDriven, owners = '',email,category
    } = req.body;

    console.log(email);

    // if (!adTitle || !description || !price || !location || !userId) {
    //   return res.status(400).json({ message: 'Missing required fields' });
    // }

    // const validFuel = ['CNG & Hybrids', 'Diesel', 'Electric', 'LPG', 'Petrol'];
    // const validTransmission = ['Automatic', 'Manual'];
    // const validOwners = ['1st', '2nd', '3rd', '4th', '4+'];

    // const finalFuel = validFuel.includes(fuel) ? fuel : null;
    // const finalTransmission = validTransmission.includes(transmission) ? transmission : null;
    // const finalOwners = validOwners.includes(owners) ? owners : null;

    const photos = files.map(file => file.path);

    console.log("jun de fdsfsd");

    const newPost = await Post.create({
      adTitle: adTitle.trim(),
      description: description.trim(),
      price: Number(price),
      location: location.trim(),

      phone: phone.trim(),
      brand: brand.trim(),
      year: year ? Number(year) : undefined,
      fuel: fuel,
      transmission: transmission,
      kmDriven: kmDriven ? Number(kmDriven) : undefined,
      owners: owners,
      photos,
      category,
      email
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


// controllers/postController.js
// post.js
// export async function loadpostByCategory(req, res) {
//   try {
//     const { category } = req.query;
//     console.log("Received category:", category);
//     if (!category) {
//       return res.status(200).json({ message: "No category provided", data: [] });
//     }
//     // Normalize 'cars' to 'car' for consistency with database
//     const normalizedCategory = category.toLowerCase() === "cars" ? "car" : category.toLowerCase();
//     const filter = { category: { $regex: new RegExp(`^${normalizedCategory}$`, "i") } };
//     console.log("Filter:", filter);
//     const posts = await Post.find(filter).sort({ createdAt: -1 });
//     console.log("Found posts:", posts);
//     res.status(200).json({
//       message: posts.length ? "Success" : `No posts found for category '${category}'`,
//       data: posts
//     });
//   } catch (err) {
//     console.error("loadpostByCategory error:", err);
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// }


// Get single post by ID
export async function getPostById(req, res) {
  console.log("inside load post");
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    res.status(200).json({ message: 'Success', data: post });
  } catch (err) {
    console.error('getPostById error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}

// Submit offer and send emails
export async function submitOffer(req, res) {
  try {
    const { postId, userId, amount } = req.body;

    if (!postId || !userId || !amount) {
      return res.status(400).json({ message: 'Post ID, User ID, and amount are required' });
    }

    if (!mongoose.Types.ObjectId.isValid(postId) || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid Post ID or User ID' });
    }

    // Fetch post and validate
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Fetch buyer and seller
    const buyer = await User.findById(userId);
    if (!buyer) {
      return res.status(404).json({ message: 'Buyer not found' });
    }
    const seller = await User.findById(post.userId);
    if (!seller) {
      return res.status(404).json({ message: 'Seller not found' });
    }

    // Validate offer amount
    const minimumBid = post.price * 0.9;
    if (amount < minimumBid) {
      return res.status(400).json({ message: `Offer must be at least ₹${Math.floor(minimumBid).toLocaleString()}` });
    }

    // Save the offer
    const newOffer = await Offer.create({
      postId,
      userId,
      amount,
    });

    // Prepare email content
    const productDetails = `
      Product: ${post.adTitle}
      Description: ${post.description}
      Original Price: ₹${post.price.toLocaleString()}
      Offer Amount: ₹${amount.toLocaleString()}
      Location: ${post.location}
    `;

    // Email to buyer (from seller)
    const mailToBuyer = {
      from: `"${seller.username}" <${process.env.EMAIL_USER}>`, // Appears as from seller, but uses your Gmail
      to: buyer.email,
      subject: `Offer Received for ${post.adTitle}`,
      text: `
        Hello ${buyer.username},

        Thank you for your offer on my product! Here are the details:

        ${productDetails}

        Seller Contact:
        Name: ${seller.username}
        Email: ${seller.email}
        ${seller.phone ? `Phone: ${seller.phone}` : ''}

        I'll review your offer and get back to you soon.

        Best regards,
        ${seller.username}
      `,
    };

    // Email to seller (from buyer)
    const mailToSeller = {
      from: `"${buyer.username}" <${process.env.EMAIL_USER}>`, // Appears as from buyer, but uses your Gmail
      to: seller.email,
      subject: `New Offer for ${post.adTitle}`,
      text: `
        Hello ${seller.username},

        I've made an offer for your product. Here are the details:

        ${productDetails}

        Buyer Contact:
        Name: ${buyer.username}
        Email: ${buyer.email}
        ${buyer.phone ? `Phone: ${buyer.phone}` : ''}

        Please review my offer and let me know your decision.

        Best regards,
        ${buyer.username}
      `,
    };

    // Send emails
    await Promise.all([
      transporter.sendMail(mailToBuyer),
      transporter.sendMail(mailToSeller),
    ]);

    res.status(201).json({ message: 'Offer submitted successfully', data: newOffer });
  } catch (err) {
    console.error('submitOffer error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}



// Create user
export async function loadProfile(req, res) {


  // console.log("inide load profile");
  // console.log(req.query.email);
  try {
    console.log(req.params);
    
    const email = req.query.email
    const useralreadyexist = await User.findOne({email});

    if(useralreadyexist){
      console.log("data alrdy exist so returnd");
      return res.status(200).send(useralreadyexist);
    }

    

    

   
    res.status(200).json(useralreadyexist);
  } catch (err) {
    console.error('userlog error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}




export async function offer(req,res){


  console.log('Inisde offer');
  const {buyerMail, sellerMail, name, price, offerPrice, location} = req.query;

  const info1 = await transporter.sendMail({
    from: sellerMail, // Sender's email
    to: buyerMail, // Receiver's email
    subject: 'OLX Offer Acceptance Confirmation', // Subject 
    text: `Thank you for your offer on OLX. Your offer for "${name}" has been accepted.`, // Plain text 
    html: `
      <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 640px; margin: 0 auto; padding: 24px; background-color: #f5f5f5; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
        <!-- Header -->
        <div style="background: linear-gradient(90deg, #1e3a8a, #3b82f6); color: #ffffff; padding: 20px; text-align: center; border-radius: 12px 12px 0 0;">
          <h1 style="margin: 0; font-size: 28px; font-weight: 600;">Offer Accepted on OLX</h1>
        </div>
  
        <!-- Body -->
        <div style="padding: 24px; background-color: #ffffff; border-radius: 0 0 12px 12px;">
          <p style="font-size: 16px; color: #1f2937; line-height: 1.5;">
            Hello <strong>${buyerMail.split("@")[0]}</strong>,
          </p>
          <p style="font-size: 16px; color: #1f2937; line-height: 1.5;">
            We're thrilled to share that your offer for the product listed on OLX has been accepted by the seller.
          </p>
  
          <!-- Product Details -->
          <h2 style="font-size: 20px; color: #1f2937; margin-top: 24px; font-weight: 600;">Product Details</h2>
          <table style="width: 100%; border-collapse: separate; border-spacing: 0; margin-top: 12px;">
            <tr>
              <td style="padding: 12px; font-size: 14px; color: #1f2937; background-color: #f9fafb; border-bottom: 1px solid #e5e7eb; border-left: 1px solid #e5e7eb;"><strong>Product Name</strong></td>
              <td style="padding: 12px; font-size: 14px; color: #1f2937; background-color: #f9fafb; border-bottom: 1px solid #e5e7eb; border-right: 1px solid #e5e7eb;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 12px; font-size: 14px; color: #1f2937; background-color: #ffffff; border-bottom: 1px solid #e5e7eb; border-left: 1px solid #e5e7eb;"><strong>Original Price</strong></td>
              <td style="padding: 12px; font-size: 14px; color: #1f2937; background-color: #ffffff; border-bottom: 1px solid #e5e7eb; border-right: 1px solid #e5e7eb;">₹${price.toLocaleString()}</td>
            </tr>
            <tr>
              <td style="padding: 12px; font-size: 14px; color: #1f2937; background-color: #f9fafb; border-bottom: 1px solid #e5e7eb; border-left: 1px solid #e5e7eb;"><strong>Offer Price</strong></td>
              <td style="padding: 12px; font-size: 14px; color: #1f2937; background-color: #f9fafb; border-bottom: 1px solid #e5e7eb; border-right: 1px solid #e5e7eb;">₹${offerPrice.toLocaleString()}</td>
            </tr>
            <tr>
              <td style="padding: 12px; font-size: 14px; color: #1f2937; background-color: #ffffff; border-bottom: 1px solid #e5e7eb; border-left: 1px solid #e5e7eb;"><strong>Location</strong></td>
              <td style="padding: 12px; font-size: 14px; color: #1f2937; background-color: #ffffff; border-bottom: 1px solid #e5e7eb; border-right: 1px solid #e5e7eb;">${location}</td>
            </tr>
          </table>
  
          <p style="font-size: 16px; color: #1f2937; margin-top: 24px; line-height: 1.5;">
            Please contact the seller at <a href="mailto:${sellerMail}" style="color: #3b82f6; text-decoration: none; font-weight: 500;">${sellerMail}</a> to finalize the transaction details.
          </p>
        </div>
  
        <!-- Footer -->
        <div style="padding: 20px; text-align: center; background-color: #e5e7eb; border-radius: 0 0 12px 12px; margin-top: 8px;">
          <p style="font-size: 14px; color: #4b5563; margin: 0;">
            This is an automated message from OLX. Please do not reply directly to this email.
          </p>
          <p style="font-size: 14px; color: #4b5563; margin: 8px 0;">
            © ${new Date().getFullYear()} OLX. All rights reserved.
          </p>
        </div>
      </div>
    `, // HTML body
  });
  
  console.log("Message sent: %s", info1.messageId);
  
  const info2 = await transporter.sendMail({
    from: buyerMail, // Sender's email (buyer's email)
    to: sellerMail, // Receiver's email (seller's email)
    subject: 'New Offer for Your Product on OLX', // Subject line
    text: `Hello, I have made an offer for your product "${name}" on OLX. Please contact me at ${buyerMail} to discuss further.`, // Plain text fallback
    html: `
      <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 640px; margin: 0 auto; padding: 24px; background-color: #f5f5f5; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
        <!-- Header -->
        <div style="background: linear-gradient(90deg, #1e3a8a, #3b82f6); color: #ffffff; padding: 20px; text-align: center; border-radius: 12px 12px 0 0;">
          <h1 style="margin: 0; font-size: 28px; font-weight: 600;">New Offer on OLX</h1>
        </div>
  
        <!-- Body -->
        <div style="padding: 24px; background-color: #ffffff; border-radius: 0 0 12px 12px;">
          <p style="font-size: 16px; color: #1f2937; line-height: 1.5;">
            Hello Seller,
          </p>
          <p style="font-size: 16px; color: #1f2937; line-height: 1.5;">
            I’m excited about your product listed on OLX and have submitted an offer. Let’s discuss the next steps!
          </p>
  
          <!-- Product Details -->
          <h2 style="font-size: 20px; color: #1f2937; margin-top: 24px; font-weight: 600;">Product Details</h2>
          <table style="width: 100%; border-collapse: separate; border-spacing: 0; margin-top: 12px;">
            <tr>
              <td style="padding: 12px; font-size: 14px; color: #1f2937; background-color: #f9fafb; border-bottom: 1px solid #e5e7eb; border-left: 1px solid #e5e7eb;"><strong>Product Name</strong></td>
              <td style="padding: 12px; font-size: 14px; color: #1f2937; background-color: #f9fafb; border-bottom: 1px solid #e5e7eb; border-right: 1px solid #e5e7eb;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 12px; font-size: 14px; color: #1f2937; background-color: #ffffff; border-bottom: 1px solid #e5e7eb; border-left: 1px solid #e5e7eb;"><strong>Original Price</strong></td>
              <td style="padding: 12px; font-size: 14px; color: #1f2937; background-color: #ffffff; border-bottom: 1px solid #e5e7eb; border-right: 1px solid #e5e7eb;">₹${price.toLocaleString()}</td>
            </tr>
            <tr>
              <td style="padding: 12px; font-size: 14px; color: #1f2937; background-color: #f9fafb; border-bottom: 1px solid #e5e7eb; border-left: 1px solid #e5e7eb;"><strong>Offer Price</strong></td>
              <td style="padding: 12px; font-size: 14px; color: #1f2937; background-color: #f9fafb; border-bottom: 1px solid #e5e7eb; border-right: 1px solid #e5e7eb;">₹${offerPrice.toLocaleString()}</td>
            </tr>
            <tr>
              <td style="padding: 12px; font-size: 14px; color: #1f2937; background-color: #ffffff; border-bottom: 1px solid #e5e7eb; border-left: 1px solid #e5e7eb;"><strong>Location</strong></td>
              <td style="padding: 12px; font-size: 14px; color: #1f2937; background-color: #ffffff; border-bottom: 1px solid #e5e7eb; border-right: 1px solid #e5e7eb;">${location}</td>
            </tr>
          </table>
  
          <!-- Contact Details -->
          <p style="font-size: 16px; color: #1f2937; margin-top: 24px; line-height: 1.5;">
            Please contact me at <a href="mailto:${buyerMail}" style="color: #3b82f6; text-decoration: none; font-weight: 500;">${buyerMail}</a> to finalize the transaction or discuss further.
          </p>
        </div>
  
        <!-- Footer -->
        <div style="padding: 20px; text-align: center; background-color: #e5e7eb; border-radius: 0 0 12px 12px; margin-top: 8px;">
          <p style="font-size: 14px; color: #4b5563; margin: 0;">
            This is an automated message from OLX. Please do not reply directly to this email.
          </p>
          <p style="font-size: 14px; color: #4b5563; margin: 8px 0;">
            © ${new Date().getFullYear()} OLX. All rights reserved.
          </p>
        </div>
      </div>
    `, // HTML body
  });

  console.log("Message sent: %s", info2.messageId);
  
}


export const loadUserPosts = async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }
    const posts = await Post.find({ email }).sort({ createdAt: -1 });
    res.status(200).json({ data: posts });
  } catch (error) {
    console.error('Error loading user posts:', error);
    res.status(500).json({ message: 'Server error' });
  }
};