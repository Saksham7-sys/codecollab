const registerRoomSocket = (io, socket) => {
  socket.on("join-room", ({ roomId, username }) => {
    socket.join(roomId);

    console.log(`${username} joined room ${roomId}`);

    io.to(roomId).emit("user-joined", {
      username,
      socketId: socket.id,
    });
  });

  socket.on("leave-room", ({ roomId, username }) => {
    socket.leave(roomId);

    console.log(`${username} left room ${roomId}`);

    io.to(roomId).emit("user-left", {
      username,
    });
  });
};

export default registerRoomSocket;