import React, { Fragment, useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { createStructuredSelector } from "reselect";

import {
  selectUiLoading,
  selectUiErrors
} from "../../redux/selectors/uiSelectors";
import { postScreamStart } from "../../redux/actions/dataActions";
import { clearErrors } from "../../redux/actions/uiActions";

import AddIcon from "@material-ui/icons/Add";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import {
  PostScreamTextField,
  PostScreamCircularProgress,
  PostScreamButton
} from "./PostScream.styles";

import CustomButton from "../CustomButton/CustomButton";

const selectPostScreamData = createStructuredSelector({
  uiLoading: selectUiLoading,
  errors: selectUiErrors
});

const PostScream = () => {
  const dispatch = useDispatch();

  const [state, setState] = useState({
    body: "",
    showDialog: false
  });
  const { body, showDialog } = state;

  const { uiLoading, errors } = useSelector(selectPostScreamData, shallowEqual);

  useEffect(() => {
    if (!errors.body && !uiLoading) {
      setState({ body: "", showDialog: false });
    }
  }, [errors, uiLoading]);

  const handleOpen = () => {
    setState(prevState => ({ ...prevState, showDialog: true }));
  };

  const handleClose = useCallback(() => {
    setState(prevState => ({ ...prevState, showDialog: false }));
    errors.body && dispatch(clearErrors());
  }, [dispatch, errors.body]);

  const handleChange = useCallback(event => {
    const { name, value } = event.target;
    setState(prevState => ({ ...prevState, [name]: value }));
  }, []);

  const handleSubmit = useCallback(
    event => {
      event.preventDefault();
      dispatch(postScreamStart({ body }));
    },
    [dispatch, body]
  );

  const tooltipStyles = {
    position: "aboslute",
    left: "61%"
  };

  return (
    <Fragment>
      <CustomButton title="post a scream" handleClick={handleOpen}>
        <AddIcon />
      </CustomButton>
      <Dialog open={showDialog} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>
          post a new scream
          <CustomButton
            title="close"
            handleClick={handleClose}
            tooltipStyles={tooltipStyles}
          >
            <CloseIcon />
          </CustomButton>
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <PostScreamTextField
              name="body"
              type="text"
              label="scream"
              multiline
              rows="3"
              placeholder="scream at your fellow friends"
              helperText={errors.body}
              error={errors.body ? true : false}
              value={body}
              onChange={handleChange}
              fullWidth
            />
            <PostScreamButton
              type="submit"
              variant="contained"
              color="primary"
              disabled={uiLoading}
            >
              submit
              {uiLoading && <PostScreamCircularProgress size={30} />}
            </PostScreamButton>
          </form>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default PostScream;
