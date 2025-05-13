import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import session from "express-session";
import authController from "./src/controllers/authController.js";
import blogController from "./src/controllers/blogController.js";
import interactionController from "./src/controllers/interactionController.js";
import countryController from "./src/controllers/countryController.js";
import sessionMiddleware from "./src/middleware/sessionMiddleware.js";
import { getDashboardContentService } from "./src/services/interactionService.js";
import { searchBlogPostsService } from "./src/services/blogService.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

const PORT = process.env.PORT;
const app = express();

app.use(helmet());

const authLimiter = rateLimit({
  windowMs: 60,
  max: 100,
  message: "Too many attempts. Please try again later.",
});

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, //https only or http and https
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      domain: "localhost",
      sameSite: "lax",
    },
  })
);

app.use("/auth", authLimiter, authController);
app.use("/blog", authLimiter, sessionMiddleware, blogController);
app.use("/interaction", authLimiter, sessionMiddleware, interactionController);
app.use("/country", authLimiter, sessionMiddleware, countryController);

app.get("/dashboard/:start", async (req, res) => {
  const result = await getDashboardContentService(req);
  if (!result.success) {
    return res.status(403).json({
      error: result.data,
    });
  }
  res.json(result);
});

app.get("/posts/search", async (req, res) => {
  const result = await searchBlogPostsService(req);
  if (!result.success) {
    return res.status(403).json({
      error: result.data,
    });
  }
  res.json(result);
});

app.listen(PORT, () => console.log(`Backend is listening on port ${PORT}!`));

export default app;
