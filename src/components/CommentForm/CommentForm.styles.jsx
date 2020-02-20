import styled from "@material-ui/core/styles/styled";
import styledComponent from "styled-components";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

export const CommentFormTextField = styled(TextField)({
  margin: "10px auto 10px auto"
});

export const CommentFormButton = styled(Button)({
  marginTop: 20,
  position: "relative"
});

export const CommentFormGrid = styled(Grid)({
  textAlign: "center"
});

export const CommentFormVisibleSeparator = styledComponent.hr`
    width: 100%;    
    border-bottom: 1px solid rgba(0,0,0,0.1);
    margin-bottom: 20px;
`;
