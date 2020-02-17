import styled from "@material-ui/core/styles/styled";
import styledComponent from "styled-components";

import Paper from "@material-ui/core/Paper";

export const ProfileButtonContainer = styledComponent.div`
    text-align: center;
    & a {
        margin: 20px 10px
    }
`;

export const ProfilePaper = styled(Paper)({
  padding: 20
});

export const ProfileImageContainer = styledComponent.div`
    text-align: center;
    position: relative;
    & button {
        position: absolute;
        top: 80%;
        left: 70%
    }
`;

export const ProfileImage = styledComponent.img`
    width: 200px;
    height: 200px;
    object-fit: cover;
    max-width: 100%;
    border-radius: 50%
`;

export const ProfileInvisibleSeparator = styledComponent.hr`
    border: none;
    margin: 0 0 10px 0;
`;

export const ProfileDetailsContainer = styledComponent.div`
    text-align: center;
    & span, svg {
        vertical-align: middle
    };
    & a {
        color: #00bcd4
    }
`;
