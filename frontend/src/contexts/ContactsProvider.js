import React, { useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthProvider";
import { APIGetAllUser } from "../services/api";

const ContactsContext = React.createContext();

export function useContacts() {
  return useContext(ContactsContext);
}

export function ContactsProvider({ children }) {
  const {
    authState: { user },
  } = useAuth();
  const [contacts, setContacts] = useState();

  useEffect(() => {
    APIGetAllUser()
      .then((response) => {
        const result = response.data.users.filter((u) => u._id !== user._id);
        return setContacts(result);
      })
      .catch((error) => {
        console.log(error);
      });   
  },[]);
  
  const value = {
    contacts
  };

  return (
    <ContactsContext.Provider value={value}>
      {children}
    </ContactsContext.Provider>
  );
}
