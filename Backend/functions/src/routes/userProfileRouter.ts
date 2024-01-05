import { Router } from "express";
import { postUser, getUsers, getUser, putUser, deleteUser } from "../controllers/userProfile";

const router = Router();

router.post("/", postUser);
router.get("/", getUsers);
router.get("/:id", getUser);
router.put("/:id", putUser);
router.delete("/:id", deleteUser);

export default router;
