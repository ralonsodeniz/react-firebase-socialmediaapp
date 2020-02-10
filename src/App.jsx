// dependencies
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// pages
import Home from "./pages/home/home";
import Login from "./pages/login/login";
import Signup from "./pages/signup/signup";
// components
import Navbar from "./components/Navbar/Navbar";
// styles
import { GlobalStyles } from "./global.styles";
import { AppContainer } from "./App.styles";

const App = () => {
  return (
    <div className="App">
      <GlobalStyles />
      <Router>
        <Navbar />
        <AppContainer>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
          </Switch>
        </AppContainer>
      </Router>
    </div>
  );
};

export default App;
