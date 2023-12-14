import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import btoa from "btoa";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const clientID = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_SECRET;

async function getSpotifyAccessToken() {
  const tokenEndpoint = "https://accounts.spotify.com/api/token";
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization: "Basic " + btoa(clientID + ":" + clientSecret),
  };
  const body = "grant_type=client_credentials";

  try {
    const response = await fetch(tokenEndpoint, {
      method: "POST",
      headers: headers,
      body: body,
    });
    const data: any = await response.json();
    console.log("Access token:", data.access_token);
    return data.access_token;
  } catch (error) {
    console.error("Error fetching access token:", error);
  }
}

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

app.listen(3000, () => console.log("Server running on port 3000"));