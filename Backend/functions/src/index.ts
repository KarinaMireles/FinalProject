import * as functions from "firebase-functions";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import admin from "firebase-admin";
import spotifyAuthRoutes from "./routes/spotifyAuthRouter";
import mongoose from "mongoose";
import finalProjectRouter from "./routes/finalProjectRouter";
// import userProfileRouter from "./routes/userProfileRouter"

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

admin.initializeApp({
  credential: admin.credential.cert(require("../serviceAccountKey.json")),
});

// Use the Spotify authentication routes
app.use("/", spotifyAuthRoutes);

// app.use("/test", spotifyAuthRoutes);

// TEST
app.use("/test", finalProjectRouter);

// USER
// app.use("/user", userProfileRouter);

app.get("/health", async (req, res) => {
  if (mongoose.connection.readyState === 1) {
    res.status(200).send("Connected to MongoDB");
  } else {
    res.status(500).send("MongoDB connection error");
  }
});

export const api = functions.https.onRequest(app);
