import {
  createRoomService,
  getRoomByRoomIdService,
} from "../services/roomService.js";

export const createRoomController = async (req, res) => {
  try {
    const { accessMode, language, code, input } = req.body;

    const room = await createRoomService({
      userId: req.user.userId,
      accessMode,
      language,
      code,
      input,
    });

    return res.status(201).json({
      success: true,
      message: "Room created successfully",
      room,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getRoomByRoomIdController = async (req, res) => {
  try {
    const { roomId } = req.params;

    const room = await getRoomByRoomIdService(roomId);

    return res.status(200).json({
      success: true,
      message: "Room fetched successfully",
      room,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};