import styled from "@material-ui/core/styles/styled";
import styledComponent from "styled-components";

import CircularProgress from "@material-ui/core/CircularProgress";
import DialogContent from "@material-ui/core/DialogContent";

export const ScreamDialogCircularProgress = styled(CircularProgress)({
  position: "absolute",
  margin: "auto",
  left: "35%"
});

export const ScreamDialogContent = styled(DialogContent)({
  padding: 20,
  height: 204,
  position: "relative"
});

export const ScreamDialogImg = styledComponent.img`
    max-width: 200px;
    height: 200px;
    border-radius: 50%;
    object-fit:cover;
`;

export const ScreamDialogInvisibleSeparator = styledComponent.hr`
    border: none;
    margin: 4px;
`;
