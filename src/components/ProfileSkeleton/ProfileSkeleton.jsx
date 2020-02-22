import React from "react";

import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalendarToday from "@material-ui/icons/CalendarToday";

import {
  ProfileSkeletonHandle,
  ProfileSkeletonFullLine,
  ProfileSkeletonDetailsContainer,
  ProfileSkeletonImage,
  ProfileSkeletonImageContainer,
  ProfileSkeletonInvisibleSeparator,
  ProfileSkeletonPaper
} from "./ProfileSkeleton.styles";

import NoImg from "../../media/no-image.webp";

const ProfileSkeleton = () => {
  return (
    <ProfileSkeletonPaper>
      <ProfileSkeletonImageContainer>
        <ProfileSkeletonImage src={NoImg} alt="profile" />
      </ProfileSkeletonImageContainer>
      <ProfileSkeletonInvisibleSeparator />
      <ProfileSkeletonDetailsContainer>
        <ProfileSkeletonHandle />
        <ProfileSkeletonInvisibleSeparator />
        <ProfileSkeletonFullLine />
        <ProfileSkeletonFullLine />
        <ProfileSkeletonInvisibleSeparator />
        <LocationOn color="primary" /> location
        <ProfileSkeletonInvisibleSeparator />
        <LinkIcon color="primary" /> https://website.com
        <ProfileSkeletonInvisibleSeparator />
        <CalendarToday color="primary" /> joined date
      </ProfileSkeletonDetailsContainer>
    </ProfileSkeletonPaper>
  );
};

export default ProfileSkeleton;
