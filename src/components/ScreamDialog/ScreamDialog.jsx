import React, { useState, useCallback, Fragment } from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { createStructuredSelector } from "reselect";
import { Link } from "react-router-dom";

import { selectUiLoading } from "../../redux/selectors/uiSelectors";
import { selectDataScream } from "../../redux/selectors/dataSelectors";
import { getScreamStart } from "../../redux/actions/dataActions";

import Dialog from "@material-ui/core/Dialog";
import CloseIcon from "@material-ui/icons/Close";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import UnfoldMore from "@material-ui/icons/UnfoldMore";
import ChatIcon from "@material-ui/icons/Chat";

import {
  ScreamDialogCircularProgress,
  ScreamDialogContent,
  ScreamDialogImg,
  ScreamDialogInvisibleSeparator
} from "./ScreamDialog.styles";

import CustomButton from "../CustomButton/CustomButton";
import LikeButton from "../LikeButton/LikeButton";

const selectScreamDialogData = createStructuredSelector({
  uiLoading: selectUiLoading,
  scream: selectDataScream
});

const ScreamDialog = ({ screamId, userHandle }) => {
  const [showDialog, setShowDialog] = useState(false);

  const dispatch = useDispatch();

  const { uiLoading, scream } = useSelector(
    selectScreamDialogData,
    shallowEqual
  );

  const handleOpen = useCallback(() => {
    setShowDialog(true);
    dispatch(getScreamStart(screamId));
  }, [dispatch, screamId]);

  const handleClose = () => {
    setShowDialog(false);
  };

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
    <ScreamDialogCircularProgress size={185} thickness={2} />
  ) : (
    <Grid container>
      <Grid item sm={5}>
        <ScreamDialogImg src={scream.userImage} alt="profile" />
      </Grid>
      <Grid item sm={7}>
        <Typography
          component={Link}
          color="primary"
          variant="h5"
          to={`/users/${scream.userHandle}`}
        >
          @{scream.userHandle}
        </Typography>
        <ScreamDialogInvisibleSeparator />
        <Typography variant="body2" color="textSecondary">
          {dayjs(scream.createdAt).format("h:mm a, MMMM DD YYYY")}
        </Typography>
        <ScreamDialogInvisibleSeparator />
        <Typography variant="body1">{scream.body}</Typography>
        <LikeButton screamId={screamId} />
        <span>{scream.likeCount} likes</span>
        <CustomButton title="comments" placement="top">
          <ChatIcon color="primary" />
        </CustomButton>
        <span>{scream.commentCount} comments</span>
      </Grid>
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
  userHandle: PropTypes.string.isRequired
};

export default ScreamDialog;
