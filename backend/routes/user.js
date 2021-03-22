import express from "express";
import { register, login, LoginWithSessionCooki } from "../controllers/user.js";
const router = express.Router();

router.get("/login", LoginWithSessionCooki);

router.post("/login", login);

router.post("/register", register);

export default router;
