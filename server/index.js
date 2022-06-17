// Imports
import express, { urlencoded } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import paginate from "express-paginate";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import rateLimit from "express-rate-limit";

// Dotenv Config
dotenv.config();

// Constant Assignments
const PORT = process.env.PORT || 5000;
const DB_URI = process.env.DB_URL;
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Express setup
const app = express();

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

app.use(limiter);
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);
app.use(credentials);
app.use(
  cors({
    origin: ALLOWED_ORIGIN,
  })
);
app.use(urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

// Import Routers
import authRouter from "./routes/auth.js";
import postsRouter from "./routes/posts.js";
import userRouter from "./routes/user.js";
import morgan from "morgan";
import credentials from "./middlewares/credentials.js";

// Use Routers
app.use("/api", authRouter);
app.use("/api/user", userRouter);

// Paginate
app.use(paginate.middleware(10, 50));
app.use("/api/posts", postsRouter);

// Database Config
console.log("Connecting to the database...");
mongoose.connect(DB_URI, (error) => {
  if (error) throw error;
  console.log("Database connected");
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.resolve(__dirname, "../client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client", "build", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server is now listening on port ${PORT}...`);
  console.log(`CORS Allowed Origin: ${ALLOWED_ORIGIN}`);
});
