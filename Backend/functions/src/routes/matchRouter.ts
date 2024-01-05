import { Router } from "express"
import {
    postMatch,
    getMatches,
    getMatch,
    putMatch,
    deleteMatch
} from "../controllers/match"

const router = Router()

router.post("/", postMatch)
router.get("/", getMatches)
router.get("/:id", getMatch)
router.put("/:id", putMatch)
router.delete("/:id", deleteMatch)

export default router
