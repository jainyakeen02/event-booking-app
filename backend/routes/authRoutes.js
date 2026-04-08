import express from "express";
import { registerUser, loginUser, fakeGoogleLogin } from "../controllers/authController.js";

const router = express.Router();

// Existing routes
router.post("/register", registerUser);
router.post("/login", loginUser);

router.post("/fake-google", fakeGoogleLogin);

export default router;
