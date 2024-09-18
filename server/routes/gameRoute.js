import express from "express";
import {
  saveResult,
  getScore,
  getHighScore,
  getSingleHighScore,
} from "../controllers/gameController.js";
import authenticate from "../middleware/auth.js";
const router = express.Router();

router.post("/save", authenticate, saveResult);
router.get("/score", authenticate, getScore);
router.get("/high_score", authenticate, getHighScore);
router.get("/single_high_score", authenticate, getSingleHighScore);

export default router;
