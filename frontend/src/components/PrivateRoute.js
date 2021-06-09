import React from "react";
import { useAuth } from "../contexts/AuthProvider";
import { Route, Redirect } from "react-router-dom";
import { ContactsProvider } from "../contexts/ContactsProvider";
import { ConversationProvider } from "../contexts/ConversationsProvider";
import { SocketProvider } from "../contexts/SocketProvider";
import { UsersOnlineProvider } from "../contexts/UsersOnlineProvider";

function PrivateRoute({ component: Component, ...rest }) {
  const {
    authState: { isAuthenticated },
  } = useAuth();
  return (
    <Route
      {...rest}
      render={(props) => {
        return isAuthenticated ? (
          <ContactsProvider>
            <SocketProvider>
              <UsersOnlineProvider>
                <ConversationProvider>
                  <Component {...props} />
                </ConversationProvider>
              </UsersOnlineProvider>
            </SocketProvider>
          </ContactsProvider>
        ) : (
          <Redirect to="/login" />
        );
      }}
    ></Route>
  );
}

export default PrivateRoute;
