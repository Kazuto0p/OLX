import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    profilepicture:{type:String, default: null},
    username:{type:String, required:true},
    email:{type:String, required:true},
    phone:{type:String, default: null},
    password:{type:String, deafult: null},
    about: { type: String, default: '' },
    profilePic: { type: String, default: '' },
    wishlist:{type:[{ type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true }], default: []},
    otp:{type:Number, default:null}
})

export default mongoose.model.Users || mongoose.model("User",userSchema)