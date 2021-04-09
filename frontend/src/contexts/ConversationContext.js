import React, { useContext, useState, useEffect, useCallback } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { useContacts } from "./ContactsContext";
import { useSocket } from "./SocketProvider";

const ConversationContext = React.createContext();

export function useConversation() {
  return useContext(ConversationContext);
}

export function ConversationProvider({ children, currentUser }) {
  const { contacts } = useContacts();
  const socket = useSocket();
  const { _id } = currentUser.user;

  const [conversations, setConversations] = useLocalStorage(
    "conversations",
    []
  );

  const [selectedConversationIndex, setSelectedConversationIndex] = useState(0);

  function createConversation(recipients) {
    setConversations((prevConversation) => {
      return [...prevConversation, { recipients, messages: [] }];
    });
  }

  const formatedConversation = conversations.map((conversation, index) => {
    const recipients = conversation.recipients.map((recipient) => {
      const contact = contacts.find((contact) => {
        return contact._id === recipient;
      });
      const username = (contact && contact.username) || recipient;
      return { _id: recipient, username };
    });

    const messages = conversation.messages.map((message) => {
      const contact = contacts.find((contact) => {
        return contact._id === message.sender;
      });

      const senderName = (contact && contact.username) || message.sender;
      // console.log(currentUser.user._id);
      const fromMe = message.sender === _id;
      return { ...message, senderName, fromMe };
    });
    const selected = index === selectedConversationIndex;
    return { ...conversation, recipients, messages, selected };
  });

  const addMessageToConversation = useCallback(
    ({ recipients, text, sender }) => {
      setConversations((prevConversations) => {
        let madeChange = false;
        const newMessage = { text, sender };

        const newConversation = prevConversations.map((conversation, index) => {
          // kiểm tra xe
          if (arrayEquality(conversation.recipients, recipients)) {
            madeChange = true;

            return {
              ...conversation,
              messages: [...conversation.messages, newMessage],
            };
          }
          return conversation;
        });

        if (madeChange) {
          console.log("newConversation: ", newConversation);
          return newConversation;
        } else {
          console.log("2: ", madeChange);
          return [...prevConversations, { recipients, messages: [newMessage] }];
        }
      });
    },
    [setConversations]
  );

  function sendMessage(recipients, text) {
    socket.emit("send-message", { recipients, text });
    addMessageToConversation({
      recipients,
      text,
      sender: _id,
    });
  }

  const value = {
    conversations: formatedConversation,
    selectedConversation: formatedConversation[selectedConversationIndex],
    selectConversationIndex: setSelectedConversationIndex,
    createConversation,
    sendMessage,
  };

  const ReceiveMessage = useCallback(({ recipients, sender, text }) => {
    console.log("recipients: ", recipients);
    console.log("sender: ", sender);
    console.log("text: ", text);
  });

  useEffect(() => {
    if (socket == null) {
      console.log("socket nullllllllllllll");
      return;
    }

    console.log("socket: ", socket);

    socket.on("receive-message", addMessageToConversation);
  }, [socket, addMessageToConversation]);

  return (
    <ConversationContext.Provider value={value}>
      {children}
    </ConversationContext.Provider>
  );
}

function arrayEquality(a, b) {
  if (a.length !== b.length) return false;
  a.sort();
  b.sort();

  return a.every((element, index) => {
    return element === b[index];
  });
}
