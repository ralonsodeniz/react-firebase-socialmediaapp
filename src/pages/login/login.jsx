import React, { useState, useCallback } from "react";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { createStructuredSelector } from "reselect";

import { loginWithEmailAndPasswordStart } from "../../redux/actions/userActions";
import {
  selectUiLoading,
  selectUiErrors
} from "../../redux/selectors/uiSelectors";

import {
  LoginGridFormContainer,
  LoginTypography,
  LoginErrorTypography,
  LoginTextField,
  LoginButton,
  LoginCircularProgress,
  LoginImage
} from "./login.styles";
import ApeIcon from "../../media/ApeIcon.png";

const selectLoginData = createStructuredSelector({
  uiLoading: selectUiLoading,
  errors: selectUiErrors
});

const Login = () => {
  const [state, setState] = useState({
    email: "",
    password: ""
  });
  const { email, password } = state;

  const dispatch = useDispatch();

  const { uiLoading, errors } = useSelector(selectLoginData, shallowEqual);

  const handleSubmit = useCallback(
    event => {
      event.preventDefault();
      const loginData = {
        email,
        password
      };
      dispatch(loginWithEmailAndPasswordStart(loginData));
    },
    [dispatch, email, password]
  );

  const handleChange = useCallback(
    event => {
      const { name, value } = event.target;
      setState({
        ...state,
        [name]: value
      });
    },
    [state]
  );

  return (
    <LoginGridFormContainer container>
      <Grid item sm />
      <Grid item sm>
        <LoginImage src={ApeIcon} alt={"monkey"} />
        <LoginTypography variant="h2">Login</LoginTypography>
        <form noValidate onSubmit={handleSubmit}>
          <LoginTextField
            id="email"
            name="email"
            type="email"
            label="Email"
            value={email}
            onChange={handleChange}
            fullWidth
            helperText={errors.email}
            error={errors.email ? true : false}
          />
          <LoginTextField
            id="password"
            name="password"
            type="password"
            label="Password"
            value={password}
            onChange={handleChange}
            fullWidth
            helperText={errors.password}
            error={errors.password ? true : false}
          />
          {errors.general && (
            <LoginErrorTypography variant="body2">
              {errors.general}
            </LoginErrorTypography>
          )}
          <LoginButton
            type="submit"
            variant="contained"
            color="primary"
            disabled={uiLoading}
          >
            Login
            {uiLoading && <LoginCircularProgress size={30} />}
          </LoginButton>
          <br />
          <small>
            don't have an account? signup <Link to="/signup">here!</Link>
          </small>
        </form>
      </Grid>
      <Grid item sm />
    </LoginGridFormContainer>
  );
};

export default Login;
