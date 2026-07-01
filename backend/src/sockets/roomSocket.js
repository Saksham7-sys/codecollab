import { SOCKET_EVENTS } from "../../../shared/socketEvents.js";
import {
  userJoinedRoom,
  userLeftRoom,
} from "../services/socketRoomService.js";

import Room from "../models/Room.js";
const registerRoomSocket = (io, socket) => {
  socket.on(
  SOCKET_EVENTS.JOIN_ROOM,
  async ({ roomId, username }) => {
    socket.join(roomId);

    const room = await userJoinedRoom(
      roomId,
      socket.user.userId,
      username,
      socket.id
    );

    if (!room) return;

    io.to(roomId).emit(
      SOCKET_EVENTS.PARTICIPANTS_UPDATED,
      room.participants
    );

    io.to(roomId).emit(
      SOCKET_EVENTS.USER_JOINED,
      {
        username,
      }
    );

    console.log(`${username} joined room ${roomId}`);
  }
);

  socket.on(
  SOCKET_EVENTS.LEAVE_ROOM,
  async ({ roomId, username }) => {
    socket.leave(roomId);

    const room = await userLeftRoom(
      roomId,
      socket.id
    );

    if (room) {
      io.to(roomId).emit(
        SOCKET_EVENTS.PARTICIPANTS_UPDATED,
        room.participants
      );
    }

    io.to(roomId).emit(
      SOCKET_EVENTS.USER_LEFT,
      {
        username,
      }
    );

    console.log(`${username} left room ${roomId}`);
  }
);
socket.on(SOCKET_EVENTS.DISCONNECT, async () => {
  const rooms = [...socket.rooms];

  for (const roomId of rooms) {
    if (roomId === socket.id) continue;

    const room = await userLeftRoom(
      roomId,
      socket.id
    );

    if (room) {
      io.to(roomId).emit(
        SOCKET_EVENTS.PARTICIPANTS_UPDATED,
        room.participants
      );
    }
  }

  console.log(`${socket.id} disconnected`);
});
};

export default registerRoomSocket;