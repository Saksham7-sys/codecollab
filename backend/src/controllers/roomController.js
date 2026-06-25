import { getRoomServiceMessage } from "../services/roomService.js";

export const getRoomControllerStatus = (req, res) => {
  const message = getRoomServiceMessage();

  res.status(200).json({
    success: true,
    message,
  });
};