import React, { useContext, useState, useEffect, useCallback } from "react";
// import useLocalStorage from "../hooks/useLocalStorage";
import { useContacts } from "./ContactsProvider";
import { useSocket } from "./SocketProvider";
import { useAuth } from "./AuthProvider";
import { APICreateConversation } from "../services/api";

const ConversationContext = React.createContext();

export function useConversation() {
  return useContext(ConversationContext);
}

export function ConversationProvider({ children }) {
  const {
    authState: { user, conversations },
  } = useAuth();

  console.log("conversations: ", conversations);

  const { contacts } = useContacts();
  const socket = useSocket();

  const [myConversations, setMyConversations] = useState(conversations);

  const [selectedConversationIndex, setSelectedConversationIndex] = useState(0);

  async function createConversation(conversationData) {
    //
    return await APICreateConversation(conversationData);
    // setMyConversations((prevConversation) => {
    //   return [...prevConversation, { recipients, messages: [] }];
    // });
  }

  // const formatedConversation = myConversations.map((conversation, index) => {
  //   const recipients = conversation.recipients.map((recipient) => {
  //     const contact = contacts.find((contact) => {
  //       return contact._id === recipient;
  //     });
  //     const username = (contact && contact.username) || recipient;
  //     return { _id: recipient, username };
  //   });

  //   const messages = conversation.messages.map((message) => {
  //     const contact = contacts.find((contact) => {
  //       return contact._id === message.sender;
  //     });

  //     const senderName = (contact && contact.username) || message.sender;
  //     // console.log(user.user._id);
  //     const fromMe = message.sender === user._id;
  //     return { ...message, senderName, fromMe };
  //   });
  //   const selected = index === selectedConversationIndex;
  //   return { ...conversation, recipients, messages, selected };
  // });

  //
  const addNewConversation = useCallback(
    (newConversation) => {
      console.log(" $$$$$ ham addNewConversation running ...");
      console.log(" $$$$$ cuoc tro chuyen moi duoc tao...", newConversation);
      // setMyConversations((prevConversations)=>{
      //   return [...prevMyConversations, newConversation];
      // })
      // @ kiểm tra nếu có current user trong đó

      setMyConversations((prevMyConversations) => {
        console.log("prevMyConversations: ", prevMyConversations);
        const madeChange = newConversation.participants.includes(user._id);
        if (madeChange) {
          // cuộc trò chuyện vừa được tạo ra có sự tham gia của current user trong đó
          return [...prevMyConversations, newConversation];
        }
        return [...prevMyConversations];
      });
    },
    [setMyConversations]
  );

  const addMessageToConversation = useCallback(
    ({ recipients, text, sender }) => {
      setMyConversations((prevMyConversations) => {
        let madeChange = false;
        const newMessage = { text, sender };

        const newConversation = prevMyConversations.map(
          (conversation, index) => {
            // kiểm tra xe
            if (arrayEquality(conversation.recipients, recipients)) {
              madeChange = true;

              return {
                ...conversation,
                messages: [...conversation.messages, newMessage],
              };
            }
            return conversation;
          }
        );

        if (madeChange) {
          console.log("newConversation: ", newConversation);
          return newConversation;
        } else {
          console.log("2: ", madeChange);
          // return ve cuoc tro chuyen moi
          return [
            ...prevMyConversations,
            { recipients, messages: [newMessage] },
          ];
        }
      });
    },
    [setMyConversations]
  );

  function sendMessage(recipients, text) {
    socket.emit("send-message", { recipients, text });
    addMessageToConversation({
      recipients,
      text,
      sender: user._id,
    });
  }

  const value = {
    myConversations,
    // selectedConversation: formatedConversation[selectedConversationIndex],
    // selectConversationIndex: setSelectedConversationIndex,
    createConversation,
    sendMessage,
  };

  useEffect(() => {
    if (socket == null) {
      return;
    }
    // get realtime tất cả các cuộc trò chuyện nếu  trong đó
    // socket.on("receive-message", addMessageToConversation);
    socket.on("create new conversation", addNewConversation);
  }, [socket, addNewConversation]);

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
