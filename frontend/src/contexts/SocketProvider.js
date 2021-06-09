import React, { useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthProvider";
import { io } from "socket.io-client";

const SERVER_URL = "http://localhost:5000";

const SocketContext = React.createContext();

export function useSocket() {
  return useContext(SocketContext);
}

export function SocketProvider({ children }) {
  const {
    authState: { user },
  } = useAuth();

  const [socket, setSocket] = useState();

  useEffect(() => {

    const newSocket = io(SERVER_URL, { autoConnect: false });
    
    newSocket.auth = user;
    newSocket.connect();

    newSocket.on("connect_error", (err) => {
      if (err.message === "invalid username") {
        console.log("invalid username from socket ****: ", err);
      }
    });

    setSocket(newSocket);

    return () => newSocket.close();
  }, [user]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}
