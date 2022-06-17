// Imports
import express from "express";
import {
  postLogin,
  postRegister,
  postLogout,
} from "../controllers/auth.controller.js";
import { getRefreshToken } from "../controllers/refreshToken.controller.js";

// Router Config
const router = express.Router();

// Routes
router.post("/register", postRegister);
router.post("/login", postLogin);
router.post("/logout", postLogout);
router.get("/refresh", getRefreshToken);

export default router;
