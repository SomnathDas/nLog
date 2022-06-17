import sanitize from "mongo-sanitize";
import User from "../models/User.model.js";

const getUser = async (req, res) => {
  const cleanUsername = sanitize(req.query.uname);
  const user = await User.findOne({ username: cleanUsername });
  if (!user) return res.json({ error: true, data: "User not found" });

  return res.json({
    error: false,
    data: { _id: user._id, username: user.username },
  });
};

const getEmail = async (req, res) => {
  const cleanEmail = sanitize(req.query.email);
  const user = await User.findOne({ email: cleanEmail });
  if (!user) return res.json({ error: true, data: "Email not found" });

  return res.json({
    error: false,
    data: {
      _id: user._id,
      email: user.email,
    },
  });
};
export { getUser, getEmail };
