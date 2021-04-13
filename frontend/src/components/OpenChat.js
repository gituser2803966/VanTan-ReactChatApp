import React, { useState, useCallback } from "react";
import { useConversation } from "../contexts/ConversationContext";
import "./OpenChat.css";
import CallIcon from "@material-ui/icons/Call";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicNoneIcon from "@material-ui/icons/MicNone";
import TelegramIcon from "@material-ui/icons/Telegram";
import { Avatar, IconButton } from "@material-ui/core";

function OpenChat() {
  const { sendMessage, selectedConversation } = useConversation();
  const [text, setText] = useState("");

  const setRef = useCallback((node) => {
    if (node) {
      node.scrollIntoView({ smooth: true });
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(
      selectedConversation.recipients.map((r) => r._id),
      text
    );
    setText("");
  };

  return (
    <div className="chat">
      <div className="chat__header">
        <div className="chat__headerLeft">
          <Avatar />
          <div className="chat__headerInfo">
            <div className="chat__headerRoomName">username</div>
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
        <div className="chat__container">
          {selectedConversation.messages.map((message, index) => {
            const lastMessage =
              selectedConversation.messages.length - 1 === index;

            return (
              <div
                key={index}
                ref={lastMessage ? setRef : null}
                className={`message ${
                  message.fromMe ? "send__message" : "receive__message"
                }`}
              >
                <span className="chat__name">
                  {message.fromMe ? "You" : message.senderName}
                </span>
                <div
                  className="chat__content"
                  // className={`chat__content ${
                  //   message.fromMe
                  //     ? "chat__content__bg__primary"
                  //     : "chat__content__non_bg"
                  // }`}
                >
                  {message.text}
                </div>
                <span className="chat__timestap">9:40 PM</span>
              </div>
            );
          })}
          {/* <p className="chat__message">
          <span className="chat__name">Pham Van Tan</span>this is a message
          <span className="chat__timestap">9:40 PM</span>
        </p> */}
        </div>
      </div>
      {/* chat form */}
      <div className="chat__footer">
        <InsertEmoticonIcon />
        <form className="chat__form" onSubmit={(e) => handleSubmit(e)}>
          <input
            multiple
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button type="submit" className="btn__submit">
            <TelegramIcon />
          </button>
        </form>
        <MicNoneIcon />
      </div>
    </div>
  );
}

export default OpenChat;
