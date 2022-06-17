import dotenv from "dotenv";
dotenv.config();

const credentials = (req, res, next) => {
  const origin = req.headers.origin;
  if (process.env.ALLOWED_ORIGIN === origin) {
    res.header("Access-Control-Allow-Credentials", true);
  }
  next();
};

export default credentials;
