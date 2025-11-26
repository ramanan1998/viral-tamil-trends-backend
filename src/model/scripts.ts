import mongoose from "mongoose";
import { UserType } from "../types";

const userSchema = new mongoose.Schema<UserType>({
  username: {
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
  password: { type: String, required: true },
  credits: { type: Number, required: true },
  isActive: {
    type: Boolean,
    default: true
  },
}, { timestamps: true });

const userModel = mongoose.model<UserType>("user", userSchema);

export default userModel;