import establishConnection from "../establishConnection"
import UserProfile from "../models/UserProfile"
import { Request, Response } from "express"

export interface ReqRes {
    (req: Request, res: Response): Promise<void>
}

// CREATE new User

export const postUser: ReqRes = async (req, res) => {
    try {
        await establishConnection()
        const user = await UserProfile.create(req.body)
        res.status(201).send(user)
    } catch (err) {
        console.log(err)
        res.status(401).send("Bad Request")
    }
}

// READ ALL

export const getUsers: ReqRes = async (req, res) => {
    try {
        await establishConnection()
        const users = await UserProfile.find()
        res.status(200).send(users)
    } catch (err) {
        res.status(500).send("Server Error")
    }
}

// READ

export const getUser: ReqRes = async (req, res) => {
    try {
        await establishConnection()
        const users = await UserProfile.find()
        res.status(200).send(users)
    } catch (err) {
        res.status(500).send("User not found")
    }
}

// UPDATE

export const putUser: ReqRes = async (req, res) => {
    try {
        await establishConnection()
        const { id } = req.params
        const user = await UserProfile.findByIdAndUpdate(id, req.body)
        res.status(204).send(user)
    } catch (err) {
        res.status(500).send("Server Error")
    }
}

// DESTROY

export const deleteUser: ReqRes = async (req, res) => {
	try {
		await establishConnection()
		const { id } = req.params
		await UserProfile.findByIdAndDelete(id)
		res.status(204).send()
	} catch (err) {
		res.status(404).send("User not found")
	}
}
