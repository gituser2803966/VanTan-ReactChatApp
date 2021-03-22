import React, { useEffect, useState } from "react";
import socket from "../components/socket";
import "./Chat.css";
import CallIcon from "@material-ui/icons/Call";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicNoneIcon from "@material-ui/icons/MicNone";
import TelegramIcon from "@material-ui/icons/Telegram";
import { Avatar, IconButton } from "@material-ui/core";

import { useAuth } from "../contexts/AuthContext";

function Chat() {
  const { currentUser } = useAuth();
  // const { email }

  useEffect(() => {
    const username =
      currentUser !== undefined ? currentUser.user.email : "vantan123";
    // console.log(username1);
    // test socket connection
    socket.auth = { username };
    socket.connect();
    // handler for the connect_error event:
    socket.on("connect_error", (err) => {
      if (err.message === "invalid username") {
        // this.usernameAlreadySelected = false;
        console.log("error from socket ****: ", err);
      }
    });
    // handler for the users event from server
    socket.on("users", (users) => {
      users.forEach((user) => {
        // user.self = user.userID === socket.id;
        // initReactiveProperties(user);
      });
      // put the current user first, and then sort by username
      // this.users = users.sort((a, b) => {
      //   if (a.self) return -1;
      //   if (b.self) return 1;
      //   if (a.username < b.username) return -1;
      //   return a.username > b.username ? 1 : 0;
      // });
    });
  }, []);

  return (
    <div className="chat">
      <div className="chat__header">
        <div className="chat__headerLeft">
          <Avatar />
          <div className="chat__headerInfo">
            <div className="chat__headerRoomName">Lionel Messi</div>
            <div className="chat__headerLastSeen">last seen: 30 minus</div>
          </div>
        </div>
        <div className="chat__headerRight">
          <IconButton>
            <CallIcon />
          </IconButton>
          <IconButton>
            <GroupAddIcon />
          </IconButton>
        </div>
      </div>
      <div className="chat__body">
        <p className="chat__message">
          <span className="chat__name">Pham Van Tan</span>this is a message
          <span className="chat__timestap">9:40 PM</span>
        </p>
        <p className="chat__message">
          <span className="chat__name">Pham Van Tan</span>this is a message
          <span className="chat__timestap">9:40 PM</span>
        </p>
      </div>
      {/* chat form */}
      <div className="chat__footer">
        <InsertEmoticonIcon />
        <form className="chat__form">
          <input type="text"></input>
          <button type="submit" className="btn__submit">
            <TelegramIcon />
          </button>
        </form>
        <MicNoneIcon />
      </div>
    </div>
  );
}

export default Chat;
