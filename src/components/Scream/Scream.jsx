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
  selectUserAuthenticated,
  selectUserHandle
} from "../../redux/selectors/userSelectors";
import { selectDataScream } from "../../redux/selectors/dataSelectors";

import DeleteScream from "../DeleteScream/DeleteScream";
import CustomButton from "../CustomButton/CustomButton";

import {
  ScreamCard,
  ScreamCardContent,
  ScreamCardMedia
} from "./Scream.styles";
import Typography from "@material-ui/core/Typography";
import ChatIcon from "@material-ui/icons/Chat";
import Tooltip from "@material-ui/core/Tooltip";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import Favorite from "@material-ui/icons/Favorite";

dayjs.extend(relativeTime);

const selectScreamData = createStructuredSelector({
  userLikes: selectUserLikes,
  userAuthenticated: selectUserAuthenticated,
  currentUserHanle: selectUserHandle
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

  const { userLikes, userAuthenticated, currentUserHanle } = useSelector(
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
    <Link to="/login">
      <CustomButton title="like" placement="top">
        <FavoriteBorder color="primary" />
      </CustomButton>
    </Link>
  ) : likedScream ? (
    <CustomButton
      title="unlike"
      placement="top"
      handleClick={handleUnlikeScream}
    >
      <Favorite color="primary" />
    </CustomButton>
  ) : (
    <CustomButton title="like" placement="top" handleClick={handleLikeScream}>
      <FavoriteBorder color="primary" />
    </CustomButton>
  );

  const deleteButton =
    userAuthenticated && userHandle === currentUserHanle ? (
      <DeleteScream screamId={screamId} />
    ) : null;

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
        {deleteButton}
        <Typography variant="body2" color="textSecondary">
          {dayjs(createdAt).fromNow()}
        </Typography>
        <Typography variant="body1">{body}</Typography>
        {likeButton}
        <span>{likeCount} likes</span>
        <CustomButton title="comments" placement="top">
          <ChatIcon color="primary" />
        </CustomButton>
        <span>{commentCount} comments</span>
      </ScreamCardContent>
    </ScreamCard>
  );
};

Scream.propTypes = {
  screamId: PropTypes.string.isRequired
};

export default Scream;
