import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { createStructuredSelector } from "reselect";

import { postCommentStart } from "../../redux/actions/dataActions";
import { selectUiErrors } from "../../redux/selectors/uiSelectors";
import { selectUserAuthenticated } from "../../redux/selectors/userSelectors";

import {
  CommentFormGrid,
  CommentFormButton,
  CommentFormTextField,
  CommentFormVisibleSeparator
} from "./CommentForm.styles";

const selectCommentFormData = createStructuredSelector({
  errors: selectUiErrors,
  userAuthenticated: selectUserAuthenticated
});

const CommentForm = ({ screamId }) => {
  const [body, setBody] = useState("");

  const dispatch = useDispatch();

  const { errors, userAuthenticated } = useSelector(
    selectCommentFormData,
    shallowEqual
  );

  const handleChange = useCallback(event => {
    setBody(event.target.value);
  }, []);

  const handleSubmit = useCallback(
    event => {
      event.preventDefault();
      dispatch(postCommentStart({ body }, screamId));
      setBody("");
    },
    [dispatch, body, screamId]
  );

  const commentFormMarkup = userAuthenticated ? (
    <CommentFormGrid item sm={12} style={{ textAlign: "center" }}>
      <form onSubmit={handleSubmit}>
        <CommentFormTextField
          name="body"
          type="text"
          label="comment on scream"
          error={errors.comment ? true : false}
          helperText={errors.comment}
          value={body}
          onChange={handleChange}
          fullWidth
        />
        <CommentFormButton type="submit" variant="contained" color="primary">
          post comment
        </CommentFormButton>
      </form>
      <CommentFormVisibleSeparator />
    </CommentFormGrid>
  ) : null;

  return commentFormMarkup;
};

CommentForm.propTypes = {
  screamId: PropTypes.string.isRequired
};

export default CommentForm;
