import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: 3,
    },
    content: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 10000,
    },
    username: {
      type: String,
      required: true,
      minlength: 1,
    },
    tags: {
      type: [String],
      required: true,
      minlength: 1,
    },
    likes: {
      type: [String],
      required: true,
      minlength: 1,
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
