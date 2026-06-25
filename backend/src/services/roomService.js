import Room from "../models/Room.js";
import User from "../models/User.js";
import generateRoomId from "../utils/generateRoomId.js";

const generateUniqueRoomId = async () => {
  let roomId;
  let existingRoom = null;

  do {
    roomId = generateRoomId();
    existingRoom = await Room.findOne({ roomId });
  } while (existingRoom);

  return roomId;
};

export const createRoomService = async ({
  userId,
  accessMode = "open",
  language = "cpp",
  code = "",
  input = "",
}) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new Error("Authenticated user not found");
  }

  const roomId = await generateUniqueRoomId();

  const room = await Room.create({
    roomId,
    adminUserId: user._id,
    adminUsername: user.name,
    accessMode,
    language,
    code,
    input,
  });

  return room;
};

export const getRoomByRoomIdService = async (roomId) => {
  const room = await Room.findOne({ roomId });

  if (!room) {
    throw new Error("Room not found");
  }

  return room;
};