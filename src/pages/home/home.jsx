import React, { useEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { createStructuredSelector } from "reselect";

import { setScreamsStart } from "../../redux/actions/dataActions";
import {
  selectDataScreams,
  selectDataLoading
} from "../../redux/selectors/dataSelectors";

import Grid from "@material-ui/core/Grid";

import Scream from "../../components/Scream/Scream";
import Profile from "../../components/Profile/Profile";
import ScreamSkeleton from "../../components/ScreamSkeleton/ScreamSkeleton";

const selectHomeData = createStructuredSelector({
  screams: selectDataScreams,
  dataLoading: selectDataLoading
});

const Home = () => {
  const dispatch = useDispatch();
  const { screams, dataLoading } = useSelector(selectHomeData, shallowEqual);
  // const [screams, setScreams] = useState([]);

  useEffect(() => {
    // async fetch screams inside useEffect replaced by an action to get them through sagas
    //  // we create an abort controller to cleanup the fetch in the case the component is unmounted and the fetch has not finished
    //  const source = axios.CancelToken.source();

    //  const fetchScreams = async () => {
    //    try {
    //      // we do not need to put the entire rest api url, just the endpoint, because in te pacakge.json we have added the proxy key with the url to the rest api
    //      const res = await axios.get("/screams", {
    //        cancelToken: source.token
    //      });
    //      setScreams(res.data);
    //    } catch (error) {
    //      if (axios.isCancel(error)) {
    //        console.log("Api cancelled");
    //      } else {
    //        console.log(error.message);
    //      }
    //    }
    //  };

    //  fetchScreams();
    //  // cleanup function to cancel the api request
    //  return () => {
    //    source.cancel();
    //  };
    dispatch(setScreamsStart());
  }, [dispatch]);

  const recentScreamsMarkUp =
    !dataLoading && screams.length ? (
      screams.map((scream, screamIndex) => (
        <Scream key={screamIndex} screamId={scream.screamId} />
      ))
    ) : (
      <ScreamSkeleton />
    );

  return (
    <Grid container spacing={7}>
      <Grid item sm={8} xs={12}>
        {recentScreamsMarkUp}
      </Grid>
      <Grid item sm={4} xs={12}>
        <Profile />
      </Grid>
    </Grid>
  );
};

export default Home;
