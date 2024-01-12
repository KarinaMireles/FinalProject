import establishConnection from "../establishConnection";
import UserProfile from "../models/UserProfile";
import { Request, Response } from "express";

export interface ReqRes {
  (req: Request, res: Response): Promise<void>;
}

// CREATE new User

export const postUser: ReqRes = async (req, res) => {
  try {
    await establishConnection();
    const user = await UserProfile.create(req.body);
    res.status(201).send(user);
  } catch (err) {
    console.log(err);
    res.status(401).send("Bad Request");
  }
};

// READ ALL

export const getUsers: ReqRes = async (req, res) => {
  try {
    await establishConnection();
    const { myId } = req.query;
    const me = await UserProfile.findById(myId);
    if (!me) throw new Error("User not found");
    const referenceArtists = me.topArtists.map((artist) => artist.name);
    const referenceGenres = me.topArtists.flatMap((artist) => artist.genres);

    const users = await UserProfile.find({ _id: { $ne: myId } });
    users.sort((a, b) => {
      const aArtistMatch = a.topArtists.some((artist) => referenceArtists.includes(artist.name));
      const bArtistMatch = b.topArtists.some((artist) => referenceArtists.includes(artist.name));

      if (aArtistMatch && !bArtistMatch) return -1;
      if (!aArtistMatch && bArtistMatch) return 1;

      const aGenreMatch = a.topArtists.some((artist) => artist.genres.some((genre) => referenceGenres.includes(genre)));
      const bGenreMatch = b.topArtists.some((artist) => artist.genres.some((genre) => referenceGenres.includes(genre)));

      if (aGenreMatch && !bGenreMatch) return -1;
      if (!aGenreMatch && bGenreMatch) return 1;

      return 0;
    });
    res.status(200).send(users);
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

// READ

export const getUser: ReqRes = async (req, res) => {
  try {
    await establishConnection();
    const user = await UserProfile.findById(req.params.id);
    res.status(200).send(user);
  } catch (err) {
    res.status(500).send("User not found");
  }
};

// UPDATE

export const putUser: ReqRes = async (req, res) => {
  try {
    await establishConnection();
    const { id } = req.params;
    const user = await UserProfile.findByIdAndUpdate(id, req.body);
    res.status(204).send(user);
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

// DESTROY

export const deleteUser: ReqRes = async (req, res) => {
  try {
    await establishConnection();
    const { id } = req.params;
    await UserProfile.findByIdAndDelete(id);
    res.status(204).send();
  } catch (err) {
    res.status(404).send("User not found");
  }
};

export const findOrCreateUser: ReqRes = async (req, res) => {
  try {
    await establishConnection();
    console.log(req.params);
    const { spotifyUserId, displayName } = req.params;
    //const spotifyUserId = req.body.spotifyUserId; // Get Spotify User ID from the request body

    // Check if user already exists
    let user = await UserProfile.findOne({ spotifyUserId });

    if (!user) {
      // User does not exist, so create a new user profile
      user = await UserProfile.create({ spotifyUserId, displayName });
    }

    res.status(200).send(user); // Send back the user data
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};
