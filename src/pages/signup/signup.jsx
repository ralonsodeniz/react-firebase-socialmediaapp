import React, { useState, useCallback } from "react";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { createStructuredSelector } from "reselect";

import {
  selectUiErrors,
  selectUiLoading
} from "../../redux/selectors/uiSelectors";
import { signupStart } from "../../redux/actions/userActions";

import {
  SignupGridFormContainer,
  SignupTypography,
  SignupErrorTypography,
  SignupTextField,
  SignupButton,
  SignupCircularProgress,
  SignupImage
} from "./signup.styles";
import ApeIcon from "../../media/ApeIcon.png";

const selectSignupData = createStructuredSelector({
  errors: selectUiErrors,
  uiLoading: selectUiLoading
});

const Signup = () => {
  const [state, setState] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    handle: ""
  });

  const dispatch = useDispatch();

  const { email, password, confirmPassword, handle } = state;

  const { errors, uiLoading } = useSelector(selectSignupData, shallowEqual);

  const handleSubmit = useCallback(
    async event => {
      event.preventDefault();
      const signupData = {
        email,
        password,
        confirmPassword,
        handle
      };
      dispatch(signupStart(signupData));
    },
    [dispatch, email, password, confirmPassword, handle]
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
    <SignupGridFormContainer container>
      <Grid item sm />
      <Grid item sm>
        <SignupImage src={ApeIcon} alt={"monkey"} />
        <SignupTypography variant="h2">Signup</SignupTypography>
        <form noValidate onSubmit={handleSubmit}>
          <SignupTextField
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
          <SignupTextField
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
          <SignupTextField
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            label="Confirm password"
            value={confirmPassword}
            onChange={handleChange}
            fullWidth
            helperText={errors.confirmPassword}
            error={errors.confirmPassword ? true : false}
          />
          <SignupTextField
            id="handle"
            name="handle"
            type="text"
            label="Handle"
            value={handle}
            onChange={handleChange}
            fullWidth
            helperText={errors.handle}
            error={errors.handle ? true : false}
          />
          {errors.general && (
            <SignupErrorTypography variant="body2">
              {errors.general}
            </SignupErrorTypography>
          )}
          <SignupButton
            type="submit"
            variant="contained"
            color="primary"
            disabled={uiLoading}
          >
            Signup
            {uiLoading && <SignupCircularProgress size={30} />}
          </SignupButton>
          <br />
          <small>
            already have an account? login <Link to="/login">here!</Link>
          </small>
        </form>
      </Grid>
      <Grid item sm />
    </SignupGridFormContainer>
  );
};

export default Signup;
