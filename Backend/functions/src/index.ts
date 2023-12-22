// index.ts or app.ts
import * as functions from "firebase-functions";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import admin from "firebase-admin";
import spotifyAuthRoutes from "./routes/spotifyAuthRouter";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

admin.initializeApp({
  credential: admin.credential.cert(require("../serviceAccountKey.json")),
});

// Use the Spotify authentication routes
app.use("/", spotifyAuthRoutes);

export const api = functions.https.onRequest(app);
