import React, { useState, useEffect } from "react";
import axios from "axios";

import Grid from "@material-ui/core/Grid";

import Scream from "../../components/Scream/Scream";

const Home = () => {
  const [state, setState] = useState({
    screams: [],
    loading: true
  });
  const { screams } = state;

  useEffect(() => {
    const fetchScreams = async () => {
      setState({ ...state, loading: true });
      try {
        // we do not need to put the entire rest api url, just the endpoint, because in te pacakge.json we have added the proxy key with the url to the rest api
        const res = await axios.get("/screams");
        setState({ loading: false, screams: res.data });
      } catch (error) {
        setState({ loading: false, screams: [] });
        console.log(error);
      }
    };
    fetchScreams();
  }, []);

  const recentScreamsMarkup =
    screams.length > 0 ? (
      screams.map((scream, screamIndex) => (
        <Scream key={screamIndex} scream={scream} />
      ))
    ) : (
      <p>Loading...</p>
    );

  return (
    <Grid container spacing={10}>
      <Grid item sm={8} xs={12}>
        {recentScreamsMarkup}
      </Grid>
      <Grid item sm={4} xs={12}>
        <p>Profile...</p>
      </Grid>
    </Grid>
  );
};

export default Home;
