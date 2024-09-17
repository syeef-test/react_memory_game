import express from "express";
import { saveResult } from "../controllers/gameController.js";
import authenticate from "../middleware/auth.js";
const router = express.Router();

router.post("/save", saveResult);

export default router;
