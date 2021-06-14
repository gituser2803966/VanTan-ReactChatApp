import Auth from "./views/Auth";
import PrivateRoute from "./components/PrivateRoute";
import { AuthProvider } from "./contexts/AuthProvider";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => <Auth {...props} authRoute="login" />}
          />
          <Route
            exact
            path="/login"
            render={(props) => <Auth {...props} authRoute="login" />}
          />
          <Route
            exact
            path="/signup"
            render={(props) => <Auth {...props} authRoute="signup" />}
          />
          <PrivateRoute exact path="/chat" component={Dashboard} />
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
