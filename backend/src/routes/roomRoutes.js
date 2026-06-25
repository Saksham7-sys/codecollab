import express from "express";
import { getRoomControllerStatus } from "../controllers/roomController.js";

const router = express.Router();

router.get("/status", getRoomControllerStatus);

export default router;