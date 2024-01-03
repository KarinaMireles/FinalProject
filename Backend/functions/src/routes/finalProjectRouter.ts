import { Router } from "express"
import { 
    test
} from "../controllers/finalProject"

const router = Router()

router.get("/", test)

export default router
