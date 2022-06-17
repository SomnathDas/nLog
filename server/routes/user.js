// Imports
import express from "express";
import { getEmail, getUser } from "../controllers/user.controller.js";

// Config
const router = express.Router();

// Routes
router.get("/", getUser);
router.get("/email", getEmail);

export default router;
