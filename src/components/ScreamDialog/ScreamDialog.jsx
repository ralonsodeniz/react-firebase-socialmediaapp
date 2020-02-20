import React, { useState, useCallback, Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { createStructuredSelector } from "reselect";
import { Link } from "react-router-dom";

import { selectUiLoading } from "../../redux/selectors/uiSelectors";
import { selectDataScream } from "../../redux/selectors/dataSelectors";
import { getScreamStart } from "../../redux/actions/dataActions";
import { setLoadingUi } from "../../redux/actions/uiActions";

import Dialog from "@material-ui/core/Dialog";
import CloseIcon from "@material-ui/icons/Close";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import UnfoldMore from "@material-ui/icons/UnfoldMore";
import ChatIcon from "@material-ui/icons/Chat";
import CircularProgress from "@material-ui/core/CircularProgress";

import {
  ScreamDialogCircularProgressContainer,
  ScreamDialogContent,
  ScreamDialogImg,
  ScreamDialogInvisibleSeparator,
  ScreamDialogVisibleSeparator
} from "./ScreamDialog.styles";

import CustomButton from "../CustomButton/CustomButton";
import LikeButton from "../LikeButton/LikeButton";
import Comments from "../Comments/Comments";
import CommentForm from "../CommentForm/CommentForm";

const selectScreamDialogData = createStructuredSelector({
  uiLoading: selectUiLoading,
  scream: selectDataScream
});

const ScreamDialog = ({ screamId, openDialog, userHandle }) => {
  const [state, setState] = useState({
    showDialog: false,
    oldPath: ""
  });

  const { showDialog, oldPath } = state;

  const dispatch = useDispatch();

  const {
    uiLoading,
    scream: { userImage, createdAt, body, likeCount, commentCount, comments }
  } = useSelector(selectScreamDialogData, shallowEqual);

  const handleOpen = useCallback(() => {
    let oldPath = window.location.pathname;
    const newPath = `/users/${userHandle}/scream/${screamId}`;
    if (oldPath === newPath) oldPath = `/users/${userHandle}`;
    window.history.pushState(null, null, newPath);
    dispatch(getScreamStart(screamId));
    setState({ showDialog: true, oldPath });
  }, [dispatch, screamId, userHandle]);

  const handleClose = () => {
    window.history.pushState(null, null, oldPath);
    setState({ showDialog: false, oldPath: "" });
  };

  useEffect(() => {
    if (openDialog) {
      dispatch(setLoadingUi());
      handleOpen();
    }
  }, [openDialog, handleOpen, dispatch]);

  const expandTooltipStyles = {
    position: "absolute",
    left: "90%"
  };
  const closeTooltipStyles = {
    position: "absolute",
    left: "90%",
    zIndex: "999"
  };

  const dialogMarkup = uiLoading ? (
    <ScreamDialogCircularProgressContainer>
      <CircularProgress size={200} thickness={2} />
    </ScreamDialogCircularProgressContainer>
  ) : (
    <Grid container>
      <Grid item sm={5}>
        <ScreamDialogImg src={userImage} alt="profile" />
      </Grid>
      <Grid item sm={7}>
        <Typography
          component={Link}
          color="primary"
          variant="h5"
          to={`/users/${userHandle}`}
        >
          @{userHandle}
        </Typography>
        <ScreamDialogInvisibleSeparator />
        <Typography variant="body2" color="textSecondary">
          {dayjs(createdAt).format("h:mm a, MMMM DD YYYY")}
        </Typography>
        <ScreamDialogInvisibleSeparator />
        <Typography variant="body1">{body}</Typography>
        <LikeButton screamId={screamId} />
        <span>{likeCount} likes</span>
        <CustomButton title="comments" placement="top">
          <ChatIcon color="primary" />
        </CustomButton>
        <span>{commentCount} comments</span>
      </Grid>
      <ScreamDialogVisibleSeparator />
      <CommentForm screamId={screamId} />
      <Comments comments={comments} />
    </Grid>
  );

  return (
    <Fragment>
      <CustomButton
        handleClick={handleOpen}
        title="expand scream"
        tooltipStyles={expandTooltipStyles}
      >
        <UnfoldMore color="primary" />
      </CustomButton>
      <Dialog open={showDialog} onClose={handleClose} fullWidth maxWidth="sm">
        <CustomButton
          title="close"
          handleClick={handleClose}
          tooltipStyles={closeTooltipStyles}
        >
          <CloseIcon />
        </CustomButton>
        <ScreamDialogContent>{dialogMarkup}</ScreamDialogContent>
      </Dialog>
    </Fragment>
  );
};

ScreamDialog.propTypes = {
  screamId: PropTypes.string.isRequired,
  openDialog: PropTypes.bool,
  userHandle: PropTypes.string.isRequired
};

export default ScreamDialog;
