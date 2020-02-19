import styled from "@material-ui/core/styles/styled";
import styledComponent from "styled-components";

import DialogContent from "@material-ui/core/DialogContent";

export const ScreamDialogCircularProgressContainer = styledComponent.div`
    text-align: center;
    margin: 50px 0px 
`;

export const ScreamDialogContent = styled(DialogContent)({
  padding: 20,
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

export const ScreamDialogVisibleSeparator = styledComponent.hr`
    width: 100%;    
    border-bottom: 1px solid rgba(0,0,0,0.1);
    margin-bottom: 20px;
`;
