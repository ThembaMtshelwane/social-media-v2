import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import userRoutes from "./routes/user.route.js";
import tweetRoutes from "./routes/tweet.route.js";
import path from "path";
import helmet from "helmet";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 9000;
const __dirname = path.resolve();
const corsOptions = {
  origin: "http://localhost:3000",
  methods: "GET,POST,PUT,DELETE,PATCH",
  allowedHeaders: "Content-Type,Authorization",
  credentials: true,
};

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "https://vercel.live"], // Allow Vercel Live scripts
      styleSrc: ["'self'", "'unsafe-inline'"], // Add other sources as needed
      imgSrc: ["'self'", "data:", "https:"], // Allow images from secure sources
      connectSrc: ["'self'", "https://vercel.live"], // Allow API and live connections
    },
  })
);
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use("/api/users", userRoutes);
app.use("/api/tweets", tweetRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/views/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "views", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  connectDB();
  console.log(`Server started at http://localhost:${PORT}`);
});
