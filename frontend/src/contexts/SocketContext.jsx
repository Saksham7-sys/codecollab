import { createContext, useContext, useState } from "react";
import socketService from "../services/socketService";

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  const connect = (token) => {
    const socketInstance = socketService.connect(token);
    setSocket(socketInstance);
  };

  const disconnect = () => {
    socketService.disconnect();
    setSocket(null);
  };

  return (
    <SocketContext.Provider
      value={{
        socket,
        connect,
        disconnect,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  return useContext(SocketContext);
};