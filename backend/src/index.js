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
  origin: 'https://blogg-dun-nine.vercel.app', // your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/posts", postRoutes);

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
