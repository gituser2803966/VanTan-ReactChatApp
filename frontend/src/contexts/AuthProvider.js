import React, { useContext, useEffect, useReducer } from "react";
import { Redirect } from "react-router-dom";
import {
  APILoginWithEmailAndPassword,
  APIAuthenticationWithSessionCookie,
  APISignout,
  APISignup,
} from "../services/api";
import authReducer from "../reducers/AuthReducer";

const Authcontext = React.createContext();

export function useAuth() {
  return useContext(Authcontext);
}

export function AuthProvider({ children }) {
  const [authState, dispatch] = useReducer(authReducer, {
    isLoading: true,
    isAuthenticated: false,
    user: null,
  });

  async function Signup(userData){
    const responese = await APISignup(userData)
    if (responese.data.success) {
      dispatch({
        type: "LOGIN",
        user: responese.data.user,
      });
    } else {
      return responese;
    }
  }

  async function Signin(email, password) {
    const responese = await APILoginWithEmailAndPassword(email, password);
    if (responese.data.logged) {
      dispatch({
        type: "LOGIN",
        user: responese.data.user,
      });
    } else {
      return responese;
    }
  }

  async function Signout() {
    try {
      const response = await APISignout();
      if (!response.data.logged) {
        dispatch({ type: "LOGOUT", user: null });
      }
    } catch (error) {
      console.log("signout user error: ", error);
    }
  }

  const checkUserLoggedIn = async () => {
    try {
      const result = await APIAuthenticationWithSessionCookie();
      if (result.data.logged) {
        //user logged
        dispatch({
          type: "REFRESH",
          user: result.data.user,
        });
        <Redirect to="/chat" />
      }
    } catch (error) {
      dispatch({
        type: "LOGOUT",
        user: null,
      });
    }
  };

  useEffect(() => {
    checkUserLoggedIn();
  }, []);

  const value = { authState:authState, Signin, Signup,Signout };

  return <Authcontext.Provider value={value}>{children}</Authcontext.Provider>;
}
