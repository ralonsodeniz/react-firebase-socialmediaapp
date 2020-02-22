import React, { useEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { createStructuredSelector } from "reselect";
import { useParams } from "react-router-dom";

import { getUserStart } from "../../redux/actions/dataActions";
import {
  selectDataScreams,
  selectDataUser,
  selectDataLoading
} from "../../redux/selectors/dataSelectors";

import Grid from "@material-ui/core/Grid";

import Scream from "../../components/Scream/Scream";
import StaticProfile from "../../components/StaticProfile/StaticProfile";
import ScreamSkeleton from "../../components/ScreamSkeleton/ScreamSkeleton";
import ProfileSkeleton from "../../components/ProfileSkeleton/ProfileSkeleton";

const selectUserData = createStructuredSelector({
  userScreams: selectDataScreams,
  selectedUser: selectDataUser,
  dataLoading: selectDataLoading
});

const User = () => {
  const dispatch = useDispatch();

  const { userScreams, selectedUser, dataLoading } = useSelector(
    selectUserData,
    shallowEqual
  );

  const { handle, screamId } = useParams();

  useEffect(() => {
    dispatch(getUserStart(handle));
  }, [dispatch, handle]);

  const userScreamsMarkup = dataLoading ? (
    <ScreamSkeleton />
  ) : !userScreams.length ? (
    <p>no screams from this user</p>
  ) : !screamId ? (
    userScreams.map((scream, screamIndex) => (
      <Scream key={screamIndex} screamId={scream.screamId} />
    ))
  ) : (
    userScreams.map((scream, screamIndex) => {
      if (scream.screamId !== screamId)
        return <Scream key={screamIndex} screamId={scream.screamId} />;
      else
        return (
          <Scream key={screamIndex} screamId={scream.screamId} openDialog />
        );
    })
  );

  return (
    <Grid container spacing={7}>
      <Grid item sm={8} xs={12}>
        {userScreamsMarkup}
      </Grid>
      <Grid item sm={4} xs={12}>
        {dataLoading ? (
          <ProfileSkeleton />
        ) : (
          <StaticProfile profile={selectedUser} />
        )}
      </Grid>
    </Grid>
  );
};

export default User;
