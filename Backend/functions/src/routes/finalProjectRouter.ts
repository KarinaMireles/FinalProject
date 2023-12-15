import { Router } from "express"
import { 
    test,
    postFinalProject,
    getFinalProjects,
    getFinalProject,
    // putFinalProject,
    // deleteFinalProject
} from "../controllers/finalProject"

const router = Router()

router.get("/", test)
router.post("/", postFinalProject)
router.get("/", getFinalProjects)
router.get("/:id", getFinalProject)
// router.put("/:id", putFinalProject)
// router.delete("/:id", deleteFinalProject)

export default router
