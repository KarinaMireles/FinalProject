// spotifyAuthController.ts
import { Request, Response } from "express";
import SpotifyWebApi from "spotify-web-api-node";
import admin from "firebase-admin";

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_SECRET,
  redirectUri: process.env.SPOTIFY_REDIRECT_URI,
});

export const login = (req: Request, res: Response) => {
  const scopes = ["user-read-private", "user-read-email", "user-top-read"];
  const state = "some-state-of-my-choice";
  const showDialog = true;

  const authUrl = spotifyApi.createAuthorizeURL(scopes, state, showDialog);
  res.redirect(authUrl);
};

export const redirect = async (req: Request, res: Response) => {
  const { code } = req.query;
  if (!code || typeof code !== "string") {
    res.status(400).send("Invalid request: code is missing.");
    return;
  }

  try {
    const data = await spotifyApi.authorizationCodeGrant(code);
    const { access_token, refresh_token } = data.body;
    spotifyApi.setAccessToken(access_token);
    spotifyApi.setRefreshToken(refresh_token);

    const me = await spotifyApi.getMe(); // gets spotify account info

    const spotify_id = me.body.uri; // spotify id

    const firebaseToken = await admin.auth().createCustomToken(spotify_id); // ties spotify id to firebase id
    // Redirect to your front-end app with Firebase token as a query parameter
    res.redirect(`YOUR_FRONTEND_URL?token=${firebaseToken}`);
  } catch (error) {
    res.status(400).send(`Error: ${error}`);
  }
};