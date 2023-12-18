import * as functions from "firebase-functions";
import express from "express";
import cors from "cors";
import finalProjectRouter from "./routes/finalProjectRouter";
import dotenv from "dotenv";
import admin from "firebase-admin";
import SpotifyWebApi from "spotify-web-api-node";

// CONFIG

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

admin.initializeApp();

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_SECRET,
  redirectUri: process.env.SPOTIFY_REDIRECT_URI,
});

async function getSpotifyAccessToken(): Promise<string | undefined> {
  try {
    const data = await spotifyApi.clientCredentialsGrant();
    console.log("Access token:", data.body["access_token"]);
    return data.body["access_token"];
  } catch (error) {
    console.error("Error fetching access token:", error);
    return undefined;
  }
}
// ROUTES

app.use("/test", finalProjectRouter);

app.use("/", async (req, res) => {
  const resp = await fetch("https://api.spotify.com/v1/users/1278567651/playlists", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + (await getSpotifyAccessToken()),
      "Content-Type": "application/json",
    },
  });
  const data = await resp.json();
  res.send(data);
});

// spotify longin route
app.get("/login", (req, res) => {
  const authorizeURL = spotifyApi.createAuthorizeURL(["user-read-private", "user-read-email"], "");
  res.redirect(authorizeURL);
});
//spotify login route

app.get("/callback", async (req, res) => {
  const { code } = req.query;
  if (!code || typeof code !== "string") {
    res.status(400).send("Invalid request: code is missing.");
    return;
  }

  try {
    const firebaseToken = await admin.auth().createCustomToken("working uri");

    // Redirect to your front-end app with Firebase token as a query parameter
    res.redirect(`YOUR_FRONTEND_URL?token=${firebaseToken}`);
  } catch (error) {
    res.status(400).send(`Error: ${error}`);
  }
});

// Test route to fetch Spotify playlists
app.use("/", async (req, res) => {
  const accessToken = await getSpotifyAccessToken();
  const response = await fetch("https://api.spotify.com/v1/users/1278567651/playlists", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + accessToken,
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  res.send(data);
});

// EXPORT API

export const api = functions.https.onRequest(app);
