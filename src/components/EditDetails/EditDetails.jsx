import React, { Fragment, useState, useCallback } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectUserCredentials } from "../../redux/selectors/userSelectors";
import { updateUserDetailsStart } from "../../redux/actions/userActions";

import Tooltip from "@material-ui/core/Tooltip";
import EditIcon from "@material-ui/icons/Edit";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import {
  EditDetailsIconButton,
  EditDetailsTextField
} from "./EditDetails.styles";

const selectEditDetailsData = createStructuredSelector({
  userCredentials: selectUserCredentials
});

const EditDetails = () => {
  const {
    userCredentials: { bio, website, location }
  } = useSelector(selectEditDetailsData, shallowEqual);

  const [state, setState] = useState({
    userBio: bio ? bio : "",
    userWebsite: website ? website : "",
    userLocation: location ? location : "",
    showDialog: false
  });

  const { userBio, userWebsite, userLocation, showDialog } = state;

  const dispatch = useDispatch();

  const handleOpen = () => {
    setState(prevState => ({ ...prevState, showDialog: true }));
  };

  const handleClose = () => {
    setState(prevState => ({ ...prevState, showDialog: false }));
  };

  const handleChange = event => {
    const { name, value } = event.target;
    setState(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = useCallback(() => {
    const userDetails = {
      bio: userBio,
      website: userWebsite,
      location: userLocation
    };
    dispatch(updateUserDetailsStart(userDetails));
    handleClose();
  }, [dispatch, userBio, userWebsite, userLocation]);

  return (
    <Fragment>
      <Tooltip title="edit details" placement="top">
        <EditDetailsIconButton onClick={handleOpen}>
          <EditIcon color="primary" />
        </EditDetailsIconButton>
      </Tooltip>
      <Dialog open={showDialog} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>edit your details</DialogTitle>
        <DialogContent>
          <form>
            <EditDetailsTextField
              name="userBio"
              type="text"
              label="bio"
              multiline
              rows="3"
              placeholder="a shot bio about yourself"
              value={userBio}
              onChange={handleChange}
              fullWidth
            />
            <EditDetailsTextField
              name="userWebsite"
              type="text"
              label="website"
              placeholder="your personal/professional website"
              value={userWebsite}
              onChange={handleChange}
              fullWidth
            />
            <EditDetailsTextField
              name="userLocation"
              type="text"
              label="location"
              placeholder="where you live"
              value={userLocation}
              onChange={handleChange}
              fullWidth
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            save
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default EditDetails;
