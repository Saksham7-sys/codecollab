import { useEffect, useState } from "react";
import { useSocket } from "../contexts/SocketContext";


function DeveloperDashboard() {
    const { socket, connect, disconnect } = useSocket();
  const [token, setToken] = useState("");
  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");
  const [logs, setLogs] = useState([]);

  const addLog = (message) => {
    setLogs((prev) => [...prev, message]);
  };

const connectSocket = () => {
  if (!token.trim()) {
    addLog("Please enter JWT token");
    return;
  }

  connect(token);
};

  const joinRoom = () => {
   socket?.emit("join-room", {
  roomId,
  username,
});
  };

  const leaveRoom = () => {
   socket?.emit("leave-room", {
  roomId,
  username,
});
  };

  const disconnectSocket = () => {
  disconnect();
  addLog("Socket disconnected");
};
useEffect(() => {
  if (!socket) return;

  const onConnect = () => {
    addLog(`✅ Connected : ${socket.id}`);
  };

  const onDisconnect = () => {
    addLog("Disconnected");
  };

  const onConnectError = (err) => {
    addLog(`❌ ${err.message}`);
  };

  const onUserJoined = (data) => {
    addLog(`${data.username} joined the room`);
  };

  const onUserLeft = (data) => {
    addLog(`${data.username} left the room`);
  };

  socket.on("connect", onConnect);
  socket.on("disconnect", onDisconnect);
  socket.on("connect_error", onConnectError);
  socket.on("user-joined", onUserJoined);
  socket.on("user-left", onUserLeft);

  return () => {
    socket.off("connect", onConnect);
    socket.off("disconnect", onDisconnect);
    socket.off("connect_error", onConnectError);
    socket.off("user-joined", onUserJoined);
    socket.off("user-left", onUserLeft);
  };
}, [socket]);
  return (
    <div style={{ padding: 40 }}>
      <h1>Developer Dashboard</h1>

      <input
        placeholder="JWT Token"
        value={token}
        onChange={(e) => setToken(e.target.value)}
        style={{ width: "600px", marginBottom: 10 }}
      />

      <br />

      <input
        placeholder="Room ID"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
      />

      <br />

      <input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <br />
      <br />

      <button onClick={connectSocket}>Connect</button>

      <button onClick={disconnectSocket}>Disconnect</button>

      <button onClick={joinRoom}>Join Room</button>

      <button onClick={leaveRoom}>Leave Room</button>

      <hr />

      <h2>Logs</h2>

      {logs.map((log, index) => (
        <p key={index}>{log}</p>
      ))}
    </div>
  );
}

export default DeveloperDashboard;