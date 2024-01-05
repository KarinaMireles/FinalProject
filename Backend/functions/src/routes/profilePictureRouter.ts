import { Router } from "express"
import {
    postProfilePicture,
    getProfilePicture,
    putProfilePicture,
    deleteProfilePicture,
} from "../controllers/profilePicture"

const router = Router()

router.post("/", postProfilePicture)
router.get("/:id", getProfilePicture)
router.put("/:id", putProfilePicture)
router.delete("/:id", deleteProfilePicture)

export default router
