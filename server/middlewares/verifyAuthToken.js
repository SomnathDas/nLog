import jwt from "jsonwebtoken";

const verifyAuthToken = (req, res, next) => {
  const authHeader = req.header("authorization");
  if (!authHeader) return res.status(401).send("Access Denied");
  const token = authHeader.split(" ")[1];

  const verified = jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    (err, decoded) => {
      if (err) return res.sendStatus(403);
      req.user = decoded._id;
      next();
    }
  );
};

export default verifyAuthToken;
