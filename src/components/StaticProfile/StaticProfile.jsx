import React, { Fragment } from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

import MuiLink from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalendarToday from "@material-ui/icons/CalendarToday";

import {
  StaticProfilePaper,
  StaticProfileImageContainer,
  StaticProfileInvisibleSeparator,
  StaticProfileDetailsContainer,
  StaticProfileImage
} from "./StaticProfile.styles";

const StaticProfile = ({ profile }) => {
  const { handle, createdAt, imageUrl, bio, website, location } = profile;

  return (
    <StaticProfilePaper>
      <StaticProfileImageContainer>
        <StaticProfileImage src={imageUrl} alt="profile" />
      </StaticProfileImageContainer>
      <StaticProfileInvisibleSeparator />
      <StaticProfileDetailsContainer>
        <MuiLink
          component={Link}
          to={`/users/${handle}`}
          color="primary"
          variant="h5"
          underline="none"
        >
          @{handle}
        </MuiLink>
        <StaticProfileInvisibleSeparator />
        {bio && (
          <Fragment>
            <Typography variant="body2">{bio}</Typography>
            <StaticProfileInvisibleSeparator />
          </Fragment>
        )}
        {location && (
          <Fragment>
            <LocationOn color="primary" /> <span>{location}</span>
            <StaticProfileInvisibleSeparator />
          </Fragment>
        )}
        {website && (
          <Fragment>
            <LinkIcon color="primary" />
            <a href={website} target="_blank" rel="noopener noreferrer">
              {" "}
              {website}
            </a>
            <StaticProfileInvisibleSeparator />
          </Fragment>
        )}
        <CalendarToday color="primary" />{" "}
        <span>Joined {dayjs(createdAt).format("MMM YYYY")}</span>
      </StaticProfileDetailsContainer>
    </StaticProfilePaper>
  );
};

StaticProfile.propTypes = {
  profile: PropTypes.object.isRequired
};

export default StaticProfile;
