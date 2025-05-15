// models/Favorite.js
import mongoose from 'mongoose';

const favoriteSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
}, { timestamps: true });

favoriteSchema.index({ userId: 1, postId: 1 }, { unique: true });

export default mongoose.model('Favorite', favoriteSchema);
