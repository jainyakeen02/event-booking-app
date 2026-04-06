import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import {
  createEvent,
  getAllEvents,
  deleteEvent,
  deletePastEvents,
} from "../controllers/eventController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getAllEvents);
router.post("/", protect, upload.single("image"), createEvent);
router.delete("/past/all", protect, deletePastEvents);
router.delete("/:id", protect, deleteEvent);

export default router;
