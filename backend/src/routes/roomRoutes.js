import express from "express";
import {
  createRoomController,
  getRoomByRoomIdController,
  joinRoomController,
  getPendingJoinRequestsController,
  handleJoinRequestController,
  getApprovedUsersController,
  removeApprovedUserController,
  startSessionController,
  endSessionController,
  deleteRoomController,

} from "../controllers/roomController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createRoomController);
router.get("/:roomId", getRoomByRoomIdController);

router.post("/:roomId/join", protect, joinRoomController);

router.get("/:roomId/requests", protect, getPendingJoinRequestsController);
router.patch(
  "/:roomId/requests/:requestId",
  protect,
  handleJoinRequestController
);

router.get("/:roomId/approved-users", protect, getApprovedUsersController);
router.delete(
  "/:roomId/approved-users/:userId",
  protect,
  removeApprovedUserController
);

export default router;

router.patch(
  "/:roomId/start-session",
  protect,
  startSessionController
);

router.patch(
  "/:roomId/end-session",
  protect,
  endSessionController
);

router.delete(
  "/:roomId",
  protect,
  deleteRoomController
);