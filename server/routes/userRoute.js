import express from "express";
import { postSignup, postSignin } from "../controllers/userController.js";
const router = express.Router();

router.post("/signup", postSignup);
router.post("/signin", postSignin);

export default router;
