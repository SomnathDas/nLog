import mongoose from "mongoose";

// Schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 64,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 128,
  },
  password: {
    type: String,
    required: true,
    minlength: 18,
  },
  refreshToken: {
    type: [String],
  },
});

// Model the schema
const User = mongoose.model("User", userSchema);

export default User;
