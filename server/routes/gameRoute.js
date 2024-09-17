import express from "express";
import { saveResult, getScore } from "../controllers/gameController.js";
import authenticate from "../middleware/auth.js";
const router = express.Router();

router.post("/save", saveResult);
router.get("/score", authenticate, getScore);

export default router;
