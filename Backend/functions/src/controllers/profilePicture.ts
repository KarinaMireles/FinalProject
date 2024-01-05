import establishConnection from "../establishConnection"
import ProfilePicture from "../models/ProfilePicture"
import { Request, Response } from "express"

export interface ReqRes {
    (req: Request, res: Response): Promise<void>
}

// CREATE

export const postProfilePicture: ReqRes = async (req, res) => {
    try {
        await establishConnection()
        const imageUrl = req.body.imageUrl;
        const newProfilePicture = await ProfilePicture.create({ imageUrl });
        res.status(201).send(newProfilePicture);
    } catch (err) {
        console.log(err)
        res.status(500).send("Error saving profile picture");
    }
}

// READ

export const getProfilePicture: ReqRes = async (req, res) => {
    try {
        await establishConnection()
        const { id } = req.params;
        const profilePicture = await ProfilePicture.findById(id);
        if (profilePicture) {
            res.status(200).send(profilePicture);
        } else {
            res.status(404).send("Profile Picture not found");
        }
    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error");
    }
}

// UPDATE

export const putProfilePicture: ReqRes = async (req, res) => {
    try {
        await establishConnection()
        const { id } = req.params;
        const updatedProfilePicture = await ProfilePicture.findByIdAndUpdate(id, req.body, { new: true });
        if (updatedProfilePicture) {
            res.status(200).send(updatedProfilePicture);
        } else {
            res.status(404).send("Profile Picture not found");
        }
    } catch (err) {
        console.log(err)
        res.status(500).send("Server Error");
    }
}

// DESTROY

export const deleteProfilePicture: ReqRes = async (req, res) => {
    try {
        await establishConnection()
        const { id } = req.params;
        const profilePicture = await ProfilePicture.findByIdAndDelete(id);
        if (profilePicture) {
            res.status(200).send("Profile Picture deleted");
        } else {
            res.status(404).send("Profile Picture not found");
        }
    } catch (err) {
        console.log(err)
        res.status(500).send("Server Error");
    }
}
