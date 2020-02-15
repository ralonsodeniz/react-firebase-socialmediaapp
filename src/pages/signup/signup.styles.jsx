import styled from "@material-ui/core/styles/styled";
import styledComponent from "styled-components";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

export const SignupGridFormContainer = styled(Grid)({
  textAlign: "center"
});

export const SignupTypography = styled(Typography)({
  margin: "10px auto 10px auto"
});

export const SignupErrorTypography = styled(Typography)({
  color: "red",
  fontSize: "0.8rem",
  marginTop: 10
});

export const SignupTextField = styled(TextField)({
  margin: "10px auto 10px auto"
});

export const SignupButton = styled(Button)({
  marginTop: 20,
  position: "relative"
});

export const SignupCircularProgress = styled(CircularProgress)({
  position: "absolute"
});

export const SignupImage = styledComponent.img`
  margin: 20px auto 20px auto
`;
