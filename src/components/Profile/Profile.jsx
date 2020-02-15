import React, { Fragment, useCallback, useRef } from "react";
// Fragments allows us to wrap a piece of code that may be or not be rendered, or compound list items, etc without adding extra nodes (divs) to the DOM
// we can use <Fragments> or the short notation <> be careful since shot notation does not admit key property if you use it on a map
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { createStructuredSelector } from "reselect";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

import {
  selectUserCredentials,
  selectUserLikes,
  selectUserLoading,
  selectUserNotifications,
  selectUserAuthenticated
} from "../../redux/selectors/userSelectors";

import Button from "@material-ui/core/Button";
import MuiLink from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalendarToday from "@material-ui/icons/CalendarToday";
import EditIcon from "@material-ui/icons/Edit";
import Tooltip from "@material-ui/core/Tooltip";

import {
  uploadUserImageStart,
  logoutStart
} from "../../redux/actions/userActions";

import {
  ProfileButtonContainer,
  ProfilePaper,
  ProfileImageContainer,
  ProfileInvisibleSeparator,
  ProfileDetailsContainer,
  ProfileImage,
  ProfileIconButton
} from "./Profile.styles";

const selectProfileData = createStructuredSelector({
  userCredentials: selectUserCredentials,
  userLoading: selectUserLoading,
  userLikes: selectUserLikes,
  userNotifications: selectUserNotifications,
  userAuthenticated: selectUserAuthenticated
});

const Profile = () => {
  const {
    userCredentials: { handle, createdAt, imageUrl, bio, website, location },
    userLoading,
    userLikes,
    userNotifications,
    userAuthenticated
  } = useSelector(selectProfileData, shallowEqual);

  const dispatch = useDispatch();

  const fileInputRef = useRef(null);

  const handleImageChange = useCallback(
    event => {
      const image = event.target.files[0];
      // we create the form data needed to post it to our update imageUrl endpoint
      const formData = new FormData();
      formData.append("image", image, image.name);
      dispatch(uploadUserImageStart(formData));
    },
    [dispatch]
  );

  const handleEditPicture = () => {
    fileInputRef.current.click();
  };

  const profileMarkUp = !userLoading ? (
    userAuthenticated ? (
      <ProfilePaper>
        <ProfileImageContainer>
          <ProfileImage src={imageUrl} alt="profile" />
          <input
            type="file"
            id="imageInput"
            onChange={handleImageChange}
            hidden
            ref={fileInputRef}
          />
          <Tooltip title="edit profile picture" placement="top">
            <ProfileIconButton onClick={handleEditPicture}>
              <EditIcon color="primary" />
            </ProfileIconButton>
          </Tooltip>
        </ProfileImageContainer>
        <ProfileInvisibleSeparator />
        <ProfileDetailsContainer>
          <MuiLink
            component={Link}
            to={`/users/${handle}`}
            color="primary"
            variant="h5"
            underline="none"
          >
            @{handle}
          </MuiLink>
          <ProfileInvisibleSeparator />
          {bio && (
            <Fragment>
              <Typography variant="body2">{bio}</Typography>
              <ProfileInvisibleSeparator />
            </Fragment>
          )}
          {location && (
            <Fragment>
              <LocationOn color="primary" /> <span>{location}</span>
              <ProfileInvisibleSeparator />
            </Fragment>
          )}
          {website && (
            <Fragment>
              <LinkIcon color="primary" />
              <a href={website} target="_blank" rel="noopener noreferrer">
                {" "}
                {website}
              </a>
              <ProfileInvisibleSeparator />
            </Fragment>
          )}
          <CalendarToday color="primary" />{" "}
          <span>Joined {dayjs(createdAt).format("MMM YYYY")}</span>
        </ProfileDetailsContainer>
      </ProfilePaper>
    ) : (
      <ProfilePaper>
        <Typography variant="body2" align="center">
          No profile found, please login again
        </Typography>
        <ProfileButtonContainer>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/login/"
          >
            Login
          </Button>
          <Button
            variant="contained"
            color="secondary"
            component={Link}
            to="/signup/"
          >
            Signup
          </Button>
        </ProfileButtonContainer>
      </ProfilePaper>
    )
  ) : (
    <p>loading</p>
  );

  return profileMarkUp;
};

export default Profile;
