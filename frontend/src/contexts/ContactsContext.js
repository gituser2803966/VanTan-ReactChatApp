import React, { useContext, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const ContactsContext = React.createContext();

export function useContacts() {
  return useContext(ContactsContext);
}

export function ContactsProvider({ children }) {
  const [contacts, setContacts] = useLocalStorage("contacts", []);
  const [selectedContact, setSelectedContact] = useState();

  function addContact(user) {
    const _id = user._id;
    const username = user.username;
    console.log("_id contact: ", _id);
    setContacts((prevContacts) => {
      const ids = [];
      // console.log("prevContacts: ", prevContacts);
      prevContacts.forEach((prevContact) => {
        ids.push(prevContact._id);
      });
      // console.log("ids: ", ids);
      if (ids.includes(_id)) {
        return [...prevContacts];
      } else {
        return [...prevContacts, { _id, username }];
      }
    });
  }

  function hanldeSelectContact(contact) {
    return setSelectedContact(contact);
  }

  const value = {
    contacts,
    addContact,
    hanldeSelectContact,
    selectContact: selectedContact,
  };

  return (
    <ContactsContext.Provider value={value}>
      {children}
    </ContactsContext.Provider>
  );
}
