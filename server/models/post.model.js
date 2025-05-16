import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  brand: { type: String, required: false, trim: true },
  year: { type: Number, required: false },
  fuel: { type: String, required: false, enum: ['CNG & Hybrids', 'Diesel', 'Electric', 'LPG', 'Petrol'] },
  transmission: { type: String, required: false, enum: ['Automatic', 'Manual'] },
  kmDriven: { type: Number, required: false, min: 0 },
  owners: { type: String, required: false, enum: ['1st', '2nd', '3rd', '4th', '4+'] },
  adTitle: { type: String, required: true, trim: true, maxlength: 70 },
  description: { type: String, required: true, trim: true, maxlength: 4096 },
  price: { type: Number, required: true, min: 0 },
  location: { type: String, required: true, trim: true },
  phone: { type: String, required: false, trim: true },
  photos: { type: [String], default: [] },
  createdAt: { type: Date, default: Date.now },

  email: { type: String, required: true },
});

export default mongoose.model('Post', postSchema);
