import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

const AuthRoute = ({ component: Component, authenticated, ...otherProps }) => (
  <Route
    {...otherProps}
    render={props =>
      authenticated ? <Redirect to="/" /> : <Component {...props} />
    }
  />
);

AuthRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
  authenticated: PropTypes.bool.isRequired,
  otherProps: PropTypes.array
};

export default AuthRoute;
