import express from "express";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import cors from "cors";

import userRoute from "./routes/userRoute.js";
import gameRoute from "./routes/gameRoute.js";

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

const app = express();
app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
  return res.status(200).send("Welcome to memory game");
});

app.use("/api/auth", userRoute);
app.use("/api/game", gameRoute);

async function startServer() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("MongoDB Connected");

    app.listen(PORT, () => {
      console.log(`Server is running on PORT:${PORT}`);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

startServer();
