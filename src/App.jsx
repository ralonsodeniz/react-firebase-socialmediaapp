// dependencies
import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { createStructuredSelector } from "reselect";

import { checkUserStart } from "./redux/actions/userActions";
import { selectUserAuthenticated } from "./redux/selectors/userSelectors";
import { selectUiInitialLoading } from "./redux/selectors/uiSelectors";
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
  uiInitialLoading: selectUiInitialLoading
});

const App = () => {
  const dispatch = useDispatch();

  const { authenticated, uiInitialLoading } = useSelector(
    selectAppData,
    shallowEqual
  );

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
          {uiInitialLoading ? (
            <div> app is loading </div>
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
