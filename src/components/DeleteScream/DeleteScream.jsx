import React, { Fragment, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

import { deleteScreamStart } from "../../redux/actions/dataActions";

import CustomButton from "../CustomButton/CustomButton";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DeleteOutline from "@material-ui/icons/DeleteOutline";

const DeleteScream = ({ screamId }) => {
  const [showDialog, setShowDialog] = useState(false);

  const dispatch = useDispatch();

  const handleOpen = () => {
    setShowDialog(true);
  };

  const handleClose = () => {
    setShowDialog(false);
  };

  const handleDeleteScream = useCallback(() => {
    dispatch(deleteScreamStart(screamId));
    setShowDialog(false);
  }, [dispatch, screamId]);

  const buttonStyles = {
    position: "absolute",
    left: "90%",
    top: "10%"
  };

  return (
    <Fragment>
      <CustomButton
        title="delete scream"
        handleClick={handleOpen}
        buttonStyles={buttonStyles}
      >
        <DeleteOutline color="secondary" />
      </CustomButton>
      <Dialog open={showDialog} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>are you sure you want to delete this scream ?</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            cancel
          </Button>
          <Button onClick={handleDeleteScream} color="secondary">
            delete
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

DeleteScream.propTypes = {
  screamId: PropTypes.string.isRequired
};

export default DeleteScream;
