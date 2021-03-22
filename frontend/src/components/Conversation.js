import React from "react";
import "./Conversation.css";
import { Avatar } from "@material-ui/core";

function Conversation() {
  return (
    <div className="conversation">
      <Avatar />
      <div className="conversation__info">
        <div className="conversation__name">name</div>
        <div className="conversation__lastMessage">the last message ...</div>
      </div>
    </div>
  );
}

export default Conversation;
