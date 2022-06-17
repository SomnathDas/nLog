import jwt from "jsonwebtoken";
import User from "../models/User.model.js";
import sanitize from "mongo-sanitize";

const getRefreshToken = async (req, res) => {
  const cookies = sanitize(req.cookies);

  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;

  // If user exists
  const user = await User.findOne({ refreshToken });
  if (!user) {
    return res.status(400).json({ error: true, data: "Invalid Token" });
  }

  // Detect refresh token reuse
  if (!user) {
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      async (err, decoded) => {
        if (err) return res.sendStatus(403); //Forbidden
        // Delete refresh tokens of hacked user
        const hackedUser = await User.findOne({
          _id: decoded._id,
        });
        hackedUser.refreshToken = [];
        const result = await hackedUser.save();
      }
    );
    return res.sendStatus(403); //Forbidden
  }

  const newRefreshTokenArray = user.refreshToken.filter(
    (rt) => rt !== refreshToken
  );

  // Refresh Token Verification and generation of access token
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    async (err, decoded) => {
      if (err) {
        return res.status(500).send({
          message: err.message,
        });
      }
      if (err) {
        // expired refresh token
        user.refreshToken = [...newRefreshTokenArray];
        const result = await user.save();
      }
      if (err || user._id.toString() !== decoded._id.toString())
        return res.sendStatus(403);
      const accessToken = jwt.sign(
        { _id: user._id },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1h" }
      );
      res.json({
        error: false,
        token: accessToken,
        username: user.username,
        id: user._id,
      });
    }
  );
};

export { getRefreshToken };
