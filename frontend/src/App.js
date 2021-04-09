import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import PrivateRoute from "./components/PrivateRoute";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <Route exact path="/" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <PrivateRoute path="/chat" component={Dashboard} />
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
