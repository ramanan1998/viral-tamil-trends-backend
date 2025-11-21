import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  age: {
    type: Number,
    min: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
}, { timestamps: true });

const userModel = mongoose.model("user", userSchema);

export default userModel;
