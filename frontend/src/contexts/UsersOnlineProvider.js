import React, { useContext, useState, useEffect } from "react";
import { useSocket } from "./SocketProvider";

const UsersOnlineContext = React.createContext();

export function useUsersOnline() {
  return useContext(UsersOnlineContext);
}

export function UsersOnlineProvider({ children }) {
  const socket = useSocket();
  const [usersOnline, setUsersOnline] = useState([]);

  function HandleStatusChange(user) {
    const { _id, status } = user;

    setUsersOnline((prevUsersOnline) => {
      const userExist = prevUsersOnline.find((u) => u._id === user._id);
      if (userExist) {
        const newUserStatus = prevUsersOnline.map((u) =>
          u._id === user._id ? { ...u, status: status } : { ...u }
        );
        return newUserStatus;
      } else {
        return [...prevUsersOnline, { _id, status }];
      }
    });
  }

  const value = {
    usersOnline,
  };

  useEffect(() => {
    if (socket == null) {
      return;
    }

    socket.on("user connected", (user) => {
      console.log("have user connected");
      //handle status change
      HandleStatusChange(user);
    });

    ////detect any user disconnected || logout ==> lắng nghe sự kiện từ server gởi xuống
    socket.on("user logout", (user) => {
      console.log("have user logged out");
      HandleStatusChange(user);
    });
  }, [socket]);

  return (
    <UsersOnlineContext.Provider value={value}>
      {children}
    </UsersOnlineContext.Provider>
  );
}
