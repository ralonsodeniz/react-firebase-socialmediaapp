import styledComponent from "styled-components";

export const CommentsUserImage = styledComponent.img`
    max-width: 100%;
    height: 100px;
    object-fit: cover;
    border-radius: 50%;
`;

export const CommentDataContainer = styledComponent.div`
    margin-left: 20px;
`;

export const CommentsInvisibleSeparator = styledComponent.hr`
    border: none;
    margin: 4px;
`;

export const CommentsVisibleSeparator = styledComponent.hr`
    width: 100%;    
    border-bottom: 1px solid rgba(0,0,0,0.1);
    margin-bottom: 20px;
`;
