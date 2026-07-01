import { io } from "socket.io-client";

const SERVER_URL = import.meta.env.VITE_API_URL;

class SocketService {
  constructor() {
    this.socket = null;
  }

  connect(token) {
    if (this.socket) {
      return this.socket;
    }

    this.socket = io(SERVER_URL, {
      auth: {
        token,
      },
      autoConnect: true,
    });

    return this.socket;
  }

  disconnect() {
    if (this.socket) {
      this.socket.removeAllListeners();
      this.socket.disconnect();
      this.socket = null;
    }
  }

  on(event, callback) {
    this.socket?.on(event, callback);
  }

  off(event, callback) {
    this.socket?.off(event, callback);
  }

  emit(event, data) {
    this.socket?.emit(event, data);
  }

  getSocket() {
    return this.socket;
  }
}

export default new SocketService();