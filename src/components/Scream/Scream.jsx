import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { useSelector, shallowEqual } from "react-redux";
import { createStructuredSelector } from "reselect";
// library to format times
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PropTypes from "prop-types";

import {
  selectUserAuthenticated,
  selectUserHandle
} from "../../redux/selectors/userSelectors";
import { selectDataScreamWithId } from "../../redux/selectors/dataSelectors";

import DeleteScream from "../DeleteScream/DeleteScream";
import CustomButton from "../CustomButton/CustomButton";
import ScreamDialog from "../ScreamDialog/ScreamDialog";
import LikeButton from "../LikeButton/LikeButton";

import {
  ScreamCard,
  ScreamCardContent,
  ScreamCardMedia
} from "./Scream.styles";
import Typography from "@material-ui/core/Typography";
import ChatIcon from "@material-ui/icons/Chat";

dayjs.extend(relativeTime);

const selectScreamData = createStructuredSelector({
  userAuthenticated: selectUserAuthenticated,
  currentUserHanle: selectUserHandle
});

const Scream = ({ screamId, openDialog }) => {
  const memoizedSelectDataScreamWithId = useMemo(
    () => selectDataScreamWithId,
    []
  );

  const {
    body,
    createdAt,
    userImage,
    userHandle,
    likeCount,
    commentCount
  } = useSelector(
    state => memoizedSelectDataScreamWithId(state, screamId),
    shallowEqual
  );

  const { userAuthenticated, currentUserHanle } = useSelector(
    selectScreamData,
    shallowEqual
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
        <LikeButton screamId={screamId} />
        <span>{likeCount} likes</span>
        <CustomButton title="comments" placement="top">
          <ChatIcon color="primary" />
        </CustomButton>
        <span>{commentCount} comments</span>
        <ScreamDialog
          screamId={screamId}
          userHandle={userHandle}
          openDialog={openDialog}
        />
      </ScreamCardContent>
    </ScreamCard>
  );
};

Scream.propTypes = {
  screamId: PropTypes.string.isRequired,
  openDialog: PropTypes.bool
};

export default Scream;
