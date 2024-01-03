import establishConnection from "../establishConnection"
import { Request, Response } from "express"

export interface ReqRes {
    (req: Request, res: Response): Promise<void>
}

export const test: ReqRes = async (req, res) => {
    await establishConnection()
    res.status(200).send("Hello World")
}
