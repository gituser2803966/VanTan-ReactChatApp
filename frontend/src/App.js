import "./App.css";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
//
import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <Route exact path="/" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <Route path="/chat/me" component={Dashboard} />
        </Switch>
      </AuthProvider>
    </Router>
    // <Container
    //   className="d-flex align-items-center justify-content-center"
    //   style={{ minHeight: "100vh" }}
    // >
    //   <div className="w-100" style={{ maxWidth: "400px" }}>
    //     <SignUp />
    //   </div>
    // </Container>
    // <div className="app">
    //   <div className="app__body">

    //     {/* <SideBar />
    //     <Chat /> */}
    //   </div>
    // </div>
  );
}

export default App;
