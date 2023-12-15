import establishConnection from "../establishConnection"
import FinalProject from "../models/FinalProject"
import { Request, Response } from "express"

export interface ReqRes {
    (req: Request, res: Response): Promise<void>
}

export const test: ReqRes = async (req, res) => {
    await establishConnection()
    res.status(200).send("Hello World")
}

// CREATE

export const postFinalProject: ReqRes = async (req, res) => {
    try {
        await establishConnection()
        const finalProject = await FinalProject.create(req.body)
        console.log(finalProject)
        res.status(201).send(finalProject)
    } catch (err) {
        console.log(err)
        res.status(401).send("Bad Request")
    }
}

// READ ALL

export const getFinalProjects: ReqRes = async (req, res) => {
    try {
        await establishConnection()
        const finalProjects = await FinalProject.find()
        res.status(200).send(finalProjects)
    } catch (err) {
        res.status(500).send("Server Error")
    }
}

// READ

export const getFinalProject: ReqRes = async (req, res) => {
    try {
        await establishConnection()
        const finalProject = await FinalProject.find()
        res.status(200).send(finalProject)
    } catch (err) {
        res.status(500).send("Not found")
    }
}
