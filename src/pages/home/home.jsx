import React, { useState, useEffect } from "react";
import axios from "axios";

import Grid from "@material-ui/core/Grid";

import Scream from "../../components/Scream/Scream";
import Profile from "../../components/Profile/Profile";

const Home = () => {
  const [screams, setScreams] = useState([]);

  useEffect(() => {
    // we create an abort controller to cleanup the fetch in the case the component is unmounted and the fetch has not finished
    const source = axios.CancelToken.source();

    const fetchScreams = async () => {
      try {
        // we do not need to put the entire rest api url, just the endpoint, because in te pacakge.json we have added the proxy key with the url to the rest api
        const res = await axios.get("/screams", {
          cancelToken: source.token
        });
        setScreams(res.data);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Api cancelled");
        } else {
          console.log(error.message);
        }
      }
    };

    fetchScreams();
    // cleanup function to cancel the api request
    return () => {
      source.cancel();
    };
  }, []);

  // const recentScreamsMarkup =
  //   screams.length > 0 ? (
  //     screams.map((scream, screamIndex) => (
  //       <Scream key={screamIndex} scream={scream} />
  //     ))
  //   ) : (
  //     <p>Loading...</p>
  //   );

  return (
    <Grid container spacing={7}>
      <Grid item sm={8} xs={12}>
        {/* {recentScreamsMarkup} */}
        {screams.length > 0 ? (
          screams.map((scream, screamIndex) => (
            <Scream key={screamIndex} scream={scream} />
          ))
        ) : (
          <p>Loading...</p>
        )}
      </Grid>
      <Grid item sm={4} xs={12}>
        <Profile />
      </Grid>
    </Grid>
  );
};

export default Home;
