import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { Route, Redirect } from "react-router-dom";
import { ContactsProvider } from "../contexts/ContactsContext";
import { ConversationProvider } from "../contexts/ConversationContext";
import { SocketProvider } from "../contexts/SocketProvider";

function PrivateRoute({ component: Component, ...rest }) {
  const { currentUser } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) => {
        return currentUser ? (
          <ContactsProvider currentUser={currentUser}>
            <SocketProvider currentUser={currentUser}>
              <ConversationProvider currentUser={currentUser}>
                <Component {...props} />
              </ConversationProvider>
            </SocketProvider>
          </ContactsProvider>
        ) : (
          <Redirect to="/" />
        );
      }}
    ></Route>
  );
}

export default PrivateRoute;
