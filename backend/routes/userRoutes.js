import express from "express";
import {
  getMyProfile,
  updateMyProfile,
  uploadProfilePhoto,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.get("/profile", protect, getMyProfile);
router.put("/profile", protect, updateMyProfile);
router.put("/profile/photo", protect, upload.single("profilePic"), uploadProfilePhoto);

export default router;
