// spotifyAuthRoutes.ts
import { Router } from "express";
import { login, redirect } from "../controllers/spotifyAuthController";

const router = Router();

router.get("/login", login);
router.get("/redirect", redirect);

export default router;
