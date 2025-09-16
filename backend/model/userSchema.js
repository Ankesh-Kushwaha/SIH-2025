import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  clerkId:{type:String,required:true},
  email: { type: String, unique: true, required: true },
  role:{type:String,required:true,default:"user"},
  school: { type: Schema.Types.ObjectId, ref: "School" },
  ecoPoints: { type: Number, default: 0 },
  badges: [{ type: Schema.Types.ObjectId, ref: "Badge" }],
  submissions: [{ type: Schema.Types.ObjectId, ref: "Submission" }],
  gameProgress: [{ type: Schema.Types.ObjectId, ref: "UserGameProgress" }],
  posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  createdAt: { type: Date, default: Date.now }
})




const User = mongoose.model('User', UserSchema);
export default User;