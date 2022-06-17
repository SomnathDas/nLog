// Imports
import express from "express";
import verifyAuthToken from "../middlewares/verifyAuthToken.js";
import {
  createPosts,
  getPopularPosts,
  getPosts,
  getPostsById,
  getPostsBySearch,
  updateLikes,
} from "../controllers/posts.controller.js";

// Router Config
const router = express.Router();

// Routes
router.get("/", getPosts);
router.get("/search", getPostsBySearch);
router.get("/find/:id", getPostsById);
router.get("/popular", getPopularPosts);
router.post("/", verifyAuthToken, createPosts);
router.put("/likes", updateLikes);

export default router;
