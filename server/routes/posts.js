// Imports
import express from "express";
import verifyAuthToken from "../middlewares/verifyAuthToken.js";
import {
  createPosts,
  getPosts,
  getPostsById,
  getPostsBySearch,
} from "../controllers/posts.controller.js";

// Router Config
const router = express.Router();

// Routes
router.post("/", verifyAuthToken, createPosts);
router.get("/", getPosts);
router.get("/search", getPostsBySearch);
router.get("/find/:id", getPostsById);
export default router;
