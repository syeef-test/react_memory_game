import express from "express";
import {
  saveResult,
  getScore,
  getHighScore,
} from "../controllers/gameController.js";
import authenticate from "../middleware/auth.js";
const router = express.Router();

router.post("/save", authenticate, saveResult);
router.get("/score", authenticate, getScore);
router.get("/high_score", authenticate, getHighScore);

export default router;
