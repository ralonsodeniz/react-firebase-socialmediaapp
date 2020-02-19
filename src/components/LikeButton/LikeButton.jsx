import React, { useCallback } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { createStructuredSelector } from "reselect";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import {
  likeScreamStart,
  unlikeScreamStart
} from "../../redux/actions/dataActions";
import {
  selectUserLikes,
  selectUserAuthenticated
} from "../../redux/selectors/userSelectors";

import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import Favorite from "@material-ui/icons/Favorite";

import CustomButton from "../CustomButton/CustomButton";

const selectLikeButtonData = createStructuredSelector({
  userLikes: selectUserLikes,
  userAuthenticated: selectUserAuthenticated
});

const LikeButton = ({ screamId }) => {
  const dispatch = useDispatch();

  const { userLikes, userAuthenticated } = useSelector(
    selectLikeButtonData,
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

  return likeButton;
};

LikeButton.propTypes = {
  screamId: PropTypes.string.isRequired
};

export default LikeButton;
