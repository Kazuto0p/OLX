import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({


    image: {
        type: [String],
        default: 'https://picsum.photos/200/150'
    },
    price: {
        type: String,
        required: true,
        trim: true
    },
    subd: {
        type: String,
        required: true,
        trim: true
    },
    details: {
        type: String,
        required: true,
        trim: true
    },

    place: {
        type: String,
        required: true,
        trim: true
    },

   
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('Posts', postSchema);