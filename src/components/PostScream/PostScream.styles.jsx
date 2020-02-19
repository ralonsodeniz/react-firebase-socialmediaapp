import styled from "@material-ui/core/styles/styled";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

export const PostScreamTextField = styled(TextField)({
  margin: "10px auto 10px auto"
});

export const PostScreamButton = styled(Button)({
  position: "relative",
  float: "right",
  margin: "10px 0px"
});

export const PostScreamCircularProgress = styled(CircularProgress)({
  position: "absolute"
});
