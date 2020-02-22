import styled from "@material-ui/core/styles/styled";
import styledComponent from "styled-components";

import Paper from "@material-ui/core/Paper";

export const ProfileSkeletonHandle = styledComponent.div`
    width: 60px;
    height: 20px;
    background-color: #00bcd4;
    margin: 0px auto 7px auto;
`;

export const ProfileSkeletonFullLine = styledComponent.div`
    height: 15px;
    width: 90%;
    background-color: rgba(0,0,0,0.4);
    margin: 0px auto 10px auto;
`;

export const ProfileSkeletonPaper = styled(Paper)({
  padding: 20
});

export const ProfileSkeletonImageContainer = styledComponent.div`
    text-align: center;
    position: relative;
    & button {
        position: absolute;
        top: 80%;
        left: 70%
    }
`;

export const ProfileSkeletonImage = styledComponent.img`
    width: 200px;
    height: 200px;
    object-fit: cover;
    max-width: 100%;
    border-radius: 50%
`;

export const ProfileSkeletonInvisibleSeparator = styledComponent.hr`
    border: none;
    margin: 0 0 10px 0;
`;

export const ProfileSkeletonDetailsContainer = styledComponent.div`
    text-align: center;
    & span, svg {
        vertical-align: middle
    };
    & a {
        color: #00bcd4
    }
`;
