import express from "express";
const router = express.Router();

router.post("/signup", postSignup);
router.post("/signin", postSignin);

export default router;
