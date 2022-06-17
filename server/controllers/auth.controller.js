import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.model.js";
import {
  validateRegisterData,
  validateLoginData,
} from "../validation/userDataValidation.js";
import sanitize from "mongo-sanitize";
import dotenv from "dotenv";
dotenv.config();

const IS_SECURE = process.env.NODE_ENV === "production" ? true : false;

const postRegister = async (req, res) => {
  const cleanUsername = sanitize(req.body.username);
  const cleanEmail = sanitize(req.body.email);
  const cleanPassword = sanitize(req.body.password);

  // Validation of data provided in the body
  const { error } = validateRegisterData(req.body);
  if (error) {
    return res
      .status(400)
      .json({ error: true, data: error.details[0].message });
  }

  // If username exists
  const usernameExists = await User.findOne({ username: cleanUsername });
  if (usernameExists) {
    return res
      .status(400)
      .json({ error: true, data: "Username already exists" });
  }

  // If email exists
  const emailExists = await User.findOne({ email: cleanEmail });
  if (emailExists) {
    return res.status(400).json({ error: true, data: "Email already exists" });
  }

  // Hashing
  const salt = await bcrypt.genSalt(12);
  const hashedPass = await bcrypt.hash(cleanPassword, salt);

  // Providing Data to the Database Collection Schema
  const user = new User({
    username: cleanUsername,
    email: cleanEmail,
    password: hashedPass,
  });

  // Trying to save the user
  try {
    const savedUser = await user.save();
    res.json({ error: false, user: user._id });
  } catch (err) {
    res.status(400).json({ error: true, data: err });
  }
};

const postLogin = async (req, res) => {
  const cleanEmail = sanitize(req.body.email);
  const cleanPassword = sanitize(req.body.password);

  const cookies = sanitize(req.cookies);
  // Validation of data provided in the body
  const { error } = validateLoginData(req.body);
  if (error) {
    return res
      .status(400)
      .json({ error: true, data: error.details[0].message });
  }

  // If user exists
  const user = await User.findOne({ email: cleanEmail });
  if (!user) {
    return res
      .status(400)
      .json({ error: true, data: "Email or Password is wrong" });
  }

  // Comparison of hashed password
  const validPass = await bcrypt.compare(cleanPassword, user.password);
  if (!validPass) {
    return res.status(400).send("Invalid Password");
  }

  // Create and Assign JWToken
  const accessToken = jwt.sign(
    { _id: user._id.toString() },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "1h" }
  );
  const newRefreshToken = jwt.sign(
    { _id: user._id.toString() },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "1h" }
  );

  let newRefreshTokenArray = !cookies?.jwt
    ? user.refreshToken
    : user.refreshToken.filter((rt) => rt !== cookies.jwt);

  if (cookies?.jwt) {
    const refreshToken = cookies.jwt;
    const foundToken = await User.findOne({ refreshToken });

    // Detected refresh token reuse!
    if (!foundToken) {
      // Clear out ALL previous refresh tokens
      newRefreshTokenArray = [];
    }

    res.clearCookie("jwt", {
      httpOnly: true,
      sameSite: "None",
      secure: IS_SECURE,
    });
  }

  // Saving refreshToken with current user
  user.refreshToken = [...newRefreshTokenArray, newRefreshToken];
  const result = await user.save();
  res.cookie("jwt", newRefreshToken, {
    httpOnly: true,
    secure: IS_SECURE,
    sameSite: "None",
    maxAge: 24 * 60 * 60 * 1000,
  });
  res.json({
    error: false,
    token: accessToken,
    username: user.username,
    id: user._id,
  });
};

const postLogout = async (req, res) => {
  // On client, also delete the accessToken
  const cookies = sanitize(req.cookies);

  if (!cookies?.jwt) return res.sendStatus(204);
  const refreshToken = cookies.jwt;

  // Is refreshToken in database?
  const user = await User.findOne({ refreshToken });
  if (!user) {
    res.clearCookie("jwt", {
      httpOnly: true,
      sameSite: "None",
      secure: IS_SECURE,
    });
    return res.sendStatus(204);
  }

  // Delete refreshToken in database
  user.refreshToken = user.refreshToken.filter((rt) => rt !== refreshToken);
  const result = await user.save();

  res.clearCookie("jwt", {
    httpOnly: true,
    sameSite: "None",
    secure: IS_SECURE,
  });
  res.sendStatus(204);
};

export { postRegister, postLogin, postLogout };
