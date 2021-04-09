import React, { useContext, useState } from "react";
import {
  LoginWithEmailAndPassword,
  CheckLoginWithSessionCooki,
} from "../services/api";

const Authcontext = React.createContext();

export function useAuth() {
  return useContext(Authcontext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();

  async function signin(email, password) {
    const responese = await LoginWithEmailAndPassword(email, password);
    if (responese.data.loggedin === true) {
      setCurrentUser(responese.data);
      return responese;
    }
    return responese;
  }

  async function getUserCredentialWithSessionCooki() {
    const responese = await CheckLoginWithSessionCooki();
    if (responese.data.loggedin === true) {
      setCurrentUser(responese.data);
    }
    return responese;
  }

  const value = { currentUser, signin, getUserCredentialWithSessionCooki };

  return <Authcontext.Provider value={value}>{children}</Authcontext.Provider>;
}
