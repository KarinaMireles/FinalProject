import establishConnection from "../establishConnection"
import Match from "../models/Match"
import { Request, Response } from "express"

export interface ReqRes {
    (req: Request, res: Response): Promise<void>
}

// CREATE new Match

export const postMatch: ReqRes = async (req, res) => {
    try {
        await establishConnection()
        const match = await Match.create(req.body)
        res.status(201).send(match)
    } catch (err) {
        console.log(err)
        res.status(400).send("Bad Request")
    }
}

// READ ALL Matches

export const getMatches: ReqRes = async (req, res) => {
    try {
        await establishConnection()
        const matches = await Match.find()
        res.status(200).send(matches)
    } catch (err) {
        res.status(500).send("Server Error")
    }
}

// READ a single Match

export const getMatch: ReqRes = async (req, res) => {
    try {
        await establishConnection()
        const { id } = req.params
        const match = await Match.findById(id)
        if (match) {
            res.status(200).send(match)
        } else {
            res.status(404).send("Match not found")
        }
    } catch (err) {
        res.status(500).send("Server Error")
    }
}

// UPDATE a Match

export const putMatch: ReqRes = async (req, res) => {
    try {
        await establishConnection()
        const { id } = req.params
        const match = await Match.findByIdAndUpdate(id, req.body, { new: true })
        if (match) {
            res.status(200).send(match)
        } else {
            res.status(404).send("Match not found")
        }
    } catch (err) {
        res.status(500).send("Server Error")
    }
}

// DELETE a Match

export const deleteMatch: ReqRes = async (req, res) => {
	try {
		await establishConnection()
		const { id } = req.params
		const match = await Match.findByIdAndDelete(id)
        if (match) {
		    res.status(200).send("Match deleted")
        } else {
            res.status(404).send("Match not found")
        }
	} catch (err) {
		res.status(500).send("Server Error")
	}
}
