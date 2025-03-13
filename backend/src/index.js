import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import postRoutes from "./routes/posts.js";

dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();

const allowedOrigins = [
  "https://blogg-dun-nine.vercel.app", // Your deployed frontend
  "http://localhost:5173", // If you're testing locally

];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // Allows cookies & authentication tokens
};

app.use(cors({ ...corsOptions, methods: ["GET", "POST", "PUT", "DELETE"] }));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/posts", postRoutes);

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
