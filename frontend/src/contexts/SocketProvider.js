import React, { useContext, useEffect, useState } from "react";
import { useContacts } from "./ContactsContext";
import { io } from "socket.io-client";
const CONN_CONF = "http://localhost:5000";

const SocketContext = React.createContext();

export function useSocket() {
  return useContext(SocketContext);
}

export function SocketProvider({ children, currentUser }) {
  const { addContact } = useContacts();
  const [socket, setSocket] = useState();
  useEffect(() => {
    const newSocket = io(CONN_CONF);
    console.log("currentUser.user._id: ", currentUser.user._id);
    const { _id, email } = currentUser.user;
    newSocket.auth = { _id, username: email };
    newSocket.connect();
    // handler for the connect_error event:
    newSocket.on("connect_error", (err) => {
      if (err.message === "invalid username") {
        console.log("error from socket ****: ", err);
      }
    });

    // newSocket.on("users", (users) => {
    //   users.forEach((user) => {});
    // });

    //
    newSocket.on("user connected", (user) => {
      addContact(user);
    });

    setSocket(newSocket);

    return () => newSocket.close();
  }, [currentUser]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}
