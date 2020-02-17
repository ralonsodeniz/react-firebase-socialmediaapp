import React, { useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { createStructuredSelector } from "reselect";
// library to format times
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PropTypes from "prop-types";

import {
  likeScreamStart,
  unlikeScreamStart
} from "../../redux/actions/dataActions";
import {
  selectUserLikes,
  selectUserAuthenticated
} from "../../redux/selectors/userSelectors";
import { selectDataScream } from "../../redux/selectors/dataSelectors";

import {
  ScreamCard,
  ScreamCardContent,
  ScreamCardMedia,
  ScreamIconButton
} from "./Scream.styles";
import Typography from "@material-ui/core/Typography";
import ChatIcon from "@material-ui/icons/Chat";
import Tooltip from "@material-ui/core/Tooltip";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import Favorite from "@material-ui/icons/Favorite";

dayjs.extend(relativeTime);

const selectScreamData = createStructuredSelector({
  userLikes: selectUserLikes,
  userAuthenticated: selectUserAuthenticated
});

const Scream = ({ screamId }) => {
  const dispatch = useDispatch();

  const memoizedSelectDataScream = useMemo(() => selectDataScream, []);

  const {
    body,
    createdAt,
    userImage,
    userHandle,
    likeCount,
    commentCount
  } = useSelector(
    state => memoizedSelectDataScream(state, screamId),
    shallowEqual
  );

  const { userLikes, userAuthenticated } = useSelector(
    selectScreamData,
    shallowEqual
  );

  const likedScream =
    userLikes && userLikes.find(like => like.screamId === screamId)
      ? true
      : false;

  const handleLikeScream = useCallback(() => {
    dispatch(likeScreamStart(screamId));
  }, [dispatch, screamId]);

  const handleUnlikeScream = useCallback(() => {
    dispatch(unlikeScreamStart(screamId));
  }, [dispatch, screamId]);

  const likeButton = !userAuthenticated ? (
    <Tooltip title="like" placement="top">
      <ScreamIconButton>
        <Link to="/login">
          <FavoriteBorder color="primary" />
        </Link>
      </ScreamIconButton>
    </Tooltip>
  ) : likedScream ? (
    <Tooltip title="unlike" placement="top">
      <ScreamIconButton onClick={handleUnlikeScream}>
        <Favorite color="primary" />
      </ScreamIconButton>
    </Tooltip>
  ) : (
    <Tooltip title="like" placement="top">
      <ScreamIconButton onClick={handleLikeScream}>
        <FavoriteBorder color="primary" />
      </ScreamIconButton>
    </Tooltip>
  );

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
        {likeButton}
        <span>{likeCount} likes</span>
        <Tooltip title="comments" placement="top">
          <ScreamIconButton>
            <ChatIcon color="primary" />
          </ScreamIconButton>
        </Tooltip>
        <span>{commentCount} comments</span>
      </ScreamCardContent>
    </ScreamCard>
  );
};

Scream.propTypes = {
  screamId: PropTypes.string.isRequired
};

export default Scream;
