import LoadingCircularProgress from "../components/LoadingCircularProgress";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import { useAuth } from "../contexts/AuthProvider";

import { Redirect } from "react-router-dom";

const Auth = ({ authRoute }) => {
  const {
    authState: { isLoading, isAuthenticated },
  } = useAuth();

  let body;

  if (isLoading) body = <LoadingCircularProgress />;
  else if (isAuthenticated) return <Redirect to="/chat" />;
  else
    body = (
      <>
        {authRoute === "login" && <SignIn />}
        {authRoute === "signup" && <SignUp />}
      </>
    );

  return <>{body}</>;
};

export default Auth;
