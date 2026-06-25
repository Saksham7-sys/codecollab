import express from "express";
import {
  createRoomController,
  getRoomByRoomIdController,
} from "../controllers/roomController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createRoomController);
router.get("/:roomId", getRoomByRoomIdController);

export default router;