import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {
  CommentsUserImage,
  CommentDataContainer,
  CommentsInvisibleSeparator,
  CommentsVisibleSeparator
} from "./Comments.styles";

const Comments = ({ comments }) => {
  return (
    <Grid container>
      {comments.map((comment, commentIndex) => {
        const { body, createdAt, userImage, userHandle } = comment;
        return (
          <Fragment key={commentIndex}>
            <Grid item sm={12}>
              <Grid container>
                <Grid item sm={2}>
                  <CommentsUserImage src={userImage} alt="comment" />
                </Grid>
                <Grid item sm={10}>
                  <CommentDataContainer>
                    <Typography
                      variant="h5"
                      component={Link}
                      to={`/users/${userHandle}`}
                      color="primary"
                    >
                      {userHandle}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {dayjs(createdAt).format("h:mm a, MMMM DD YYYY")}
                    </Typography>
                    <CommentsInvisibleSeparator />
                    <Typography variant="body1">{body}</Typography>
                  </CommentDataContainer>
                </Grid>
              </Grid>
            </Grid>
            {commentIndex !== comments.length - 1 && (
              <CommentsVisibleSeparator />
            )}
          </Fragment>
        );
      })}
    </Grid>
  );
};

Comments.propTypes = {
  comments: PropTypes.array
};

export default Comments;
