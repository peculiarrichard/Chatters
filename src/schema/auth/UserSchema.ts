import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "Please provide full name"],
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
  },
  profilePhotoUrl: {
    type: String,
  },
  userName: {
    type: String,
  },
  topicsOfInterest: {
    type: [String],
  },
  website: {
    type: String,
  },
  bio: {
    type: String,
  },
  mainActivity: {
    type: String,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isProfileCompleted: {
    type: Boolean,
    default: false,
  },
  hasOnboarded: {
    type: Boolean,
    default: false,
  },

  // forgotPasswordToken: String,
  // forgotPasswordTokenExpiry: Date,
  // verifyToken: String,
  // verifyTokenExpiry: Date,
});

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
