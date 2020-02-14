// dependencies
import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { createStructuredSelector } from "reselect";

import { checkUserStart } from "./redux/actions/userActions";
import {
  selectUserAuthenticated,
  selectUserLoading
} from "./redux/selectors/userSelectors";
// pages
import Home from "./pages/home/home";
import Login from "./pages/login/login";
import Signup from "./pages/signup/signup";
// components
import Navbar from "./components/Navbar/Navbar";
import AuthRoute from "./components/AuthRoute/AuthRoute";
// styles
import { GlobalStyles, theme } from "./global.styles";
import { AppContainer } from "./App.styles";

const selectAppData = createStructuredSelector({
  authenticated: selectUserAuthenticated,
  userLoading: selectUserLoading
});

const App = () => {
  const dispatch = useDispatch();

  const { authenticated, userLoading } = useSelector(
    selectAppData,
    shallowEqual
  );

  // TODO USER LOADING

  useEffect(() => {
    // we check if there is a user token on app refresh and if it is valid
    // if there is a token and is valid we login if not we logout
    dispatch(checkUserStart());
  }, [dispatch]);

  return (
    <MuiThemeProvider theme={theme}>
      <div>
        <GlobalStyles />
        <Navbar />
        <AppContainer>
          {userLoading ? (
            <div> USER IS LOADING </div>
          ) : (
            <Switch>
              <Route exact path="/" component={Home} />
              <AuthRoute
                exact
                path="/login"
                component={Login}
                authenticated={authenticated}
              />
              <AuthRoute
                exact
                path="/signup"
                component={Signup}
                authenticated={authenticated}
              />
            </Switch>
          )}
        </AppContainer>
      </div>
    </MuiThemeProvider>
  );
};

export default App;
