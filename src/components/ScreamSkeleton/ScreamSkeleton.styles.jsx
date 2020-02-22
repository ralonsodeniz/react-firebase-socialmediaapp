import styled from "@material-ui/core/styles/styled";
import styledComponent from "styled-components";

import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";

export const ScreamSkeletonCard = styled(Card)({
  display: "flex",
  marginBottom: 18
});

export const ScreamSkeletonCardMedia = styled(CardMedia)({
  minWidth: 200,
  objectFit: "cover"
});

export const ScreamSkeletonCardContent = styled(CardContent)({
  width: "100%",
  flexDirection: "column",
  padding: 25
});

export const ScreamSkeletonHandle = styledComponent.div`
    width: 60px;
    height: 20px;
    background-color: #00bcd4;
    margin-bottom: 7px;
`;
export const ScreamSkeletonDate = styledComponent.div`
    height: 14px;
    width: 100px;
    background-color: rgba(0,0,0,0.3);
    margin-bottom: 10px;
`;
export const ScreamSkeletonFullLine = styledComponent.div`
    height: 15px;
    width: 90%;
    background-color: rgba(0,0,0,0.4);
    margin-bottom: 10px;
`;
export const ScreamSkeletonHalfLine = styledComponent.div`
    height: 15px;
    width: 50%;
    background-color: rgba(0,0,0,0.4);
    margin-bottom: 10px;
`;
