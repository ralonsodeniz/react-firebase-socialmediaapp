import React from "react";
import { Link } from "react-router-dom";
// library to format times
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PropTypes from "prop-types";

import {
  ScreamCard,
  ScreamCardContent,
  ScreamCardMedia
} from "./Scream.styles";
import Typography from "@material-ui/core/Typography";

dayjs.extend(relativeTime);

const Scream = ({ scream }) => {
  const {
    body,
    createdAt,
    userImage,
    userHandle,
    screamId,
    likeCount,
    commentCount
  } = scream;
  return (
    <ScreamCard>
      <ScreamCardMedia image={userImage} title="profile image" />
      <ScreamCardContent>
        <Typography
          variant="h5"
          component={Link}
          to={`/users/${userHandle}`}
          color="primary"
        >
          {userHandle}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {dayjs(createdAt).fromNow()}
        </Typography>
        <Typography variant="body1">{body}</Typography>
      </ScreamCardContent>
    </ScreamCard>
  );
};

Scream.propTypes = {
  scream: PropTypes.object.isRequired
};

export default Scream;
